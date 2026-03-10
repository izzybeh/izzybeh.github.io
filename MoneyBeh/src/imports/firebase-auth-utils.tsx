import React, { useState, useMemo, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithCustomToken, 
  signInAnonymously 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  collection, 
  onSnapshot, 
  query 
} from 'firebase/firestore';
import { 
  User, 
  Users, 
  Undo2, 
  Calendar, 
  FileUp, 
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  CreditCard,
  History,
  FastForward,
  LayoutList,
  Layers,
  DollarSign,
  Cloud,
  ListFilter
} from 'lucide-react';

// --- Firebase Configuration ---
const firebaseConfig = JSON.parse(__firebase_config);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'purchase-reviewer';

// --- Improved CSV Parsing to handle complex quotes and symbols ---
const parseCSV = (text) => {
  const result = [];
  let currentLine = [];
  let currentCell = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        currentCell += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        currentCell += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        currentLine.push(currentCell.trim());
        currentCell = '';
      } else if (char === '\r' || char === '\n') {
        currentLine.push(currentCell.trim());
        if (currentLine.some(cell => cell !== '')) {
          result.push(currentLine);
        }
        currentLine = [];
        currentCell = '';
        if (char === '\r' && nextChar === '\n') i++;
      } else {
        currentCell += char;
      }
    }
  }
  if (currentCell || currentLine.length > 0) {
    currentLine.push(currentCell.trim());
    result.push(currentLine);
  }

  const headers = result[0] || [];
  return result.slice(1).map(row => {
    const obj = {};
    headers.forEach((header, idx) => {
      obj[header] = row[idx] || '';
    });
    return obj;
  });
};

// --- Hardened Price Parser ---
const parsePrice = (val) => {
  if (val === undefined || val === null || val === '') return 0;
  // Remove single quotes, commas, and other non-numeric noise, keep dots and minus
  let cleaned = String(val).replace(/['",\s]/g, "");
  // Handle parentheses as negative if necessary, but prioritize the raw number
  if (cleaned.startsWith('(') && cleaned.endsWith(')')) {
    cleaned = '-' + cleaned.slice(1, -1);
  }
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
};

const App = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [refunds, setRefunds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [decisions, setDecisions] = useState({}); 
  const [manualReturns, setManualReturns] = useState(new Set());
  const [dateRange, setDateRange] = useState({ start: '2019-01-01', end: new Date().toISOString().split('T')[0] });
  const [sortBy, setSortBy] = useState('date-desc'); 
  const [view, setView] = useState('upload'); 
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
        await signInWithCustomToken(auth, __initial_auth_token);
      } else {
        await signInAnonymously(auth);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    setIsSyncing(true);
    const decisionsRef = collection(db, 'artifacts', appId, 'users', user.uid, 'decisions');
    const unsubDecisions = onSnapshot(query(decisionsRef), (snapshot) => {
      const data = {};
      snapshot.forEach(doc => data[doc.id] = doc.data().type);
      setDecisions(data);
      setIsSyncing(false);
    }, (err) => console.error(err));

    const returnsRef = collection(db, 'artifacts', appId, 'users', user.uid, 'manualReturns');
    const unsubReturns = onSnapshot(query(returnsRef), (snapshot) => {
      const data = new Set();
      snapshot.forEach(doc => data.add(doc.id));
      setManualReturns(data);
    }, (err) => console.error(err));

    return () => {
      unsubDecisions();
      unsubReturns();
    };
  }, [user]);

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const text = await file.text();
    const data = parseCSV(text);
    if (type === 'orders') setOrders(data);
    else setRefunds(data);
  };

  const getReturnStatus = (orderRow) => {
    const orderId = orderRow['Order ID'];
    const itemTotal = parsePrice(orderRow['Total Amount']);
    const key = (orderRow['ASIN'] || 'NA') + orderId;
    if (manualReturns.has(key)) return { returned: true, source: 'manual' };
    const match = refunds.find(r => {
      const rId = r['Order ID'];
      const rAmt = parsePrice(r['Refund Amount']);
      return rId === orderId && Math.abs(rAmt - itemTotal) < 0.05;
    });
    return match ? { returned: true, source: 'csv', amount: match['Refund Amount'] } : { returned: false };
  };

  const processedOrders = useMemo(() => {
    let filtered = orders.filter(o => {
      const dateStr = o['Order Date'] || o['order date'];
      if (!dateStr) return false;
      const orderDate = new Date(dateStr);
      return orderDate >= new Date(dateRange.start) && orderDate <= new Date(dateRange.end);
    });

    return [...filtered].sort((a, b) => {
      const dateA = new Date(a['Order Date']);
      const dateB = new Date(b['Order Date']);
      const priceA = parsePrice(a['Total Amount']);
      const priceB = parsePrice(b['Total Amount']);
      const nameA = (a['Product Name'] || '').toLowerCase();
      const nameB = (b['Product Name'] || '').toLowerCase();

      switch(sortBy) {
        case 'date-desc': return dateB - dateA;
        case 'date-asc': return dateA - dateB;
        case 'price-desc': return priceB - priceA;
        case 'price-asc': return priceA - priceB;
        case 'alpha-asc': return nameA.localeCompare(nameB);
        case 'alpha-desc': return nameB.localeCompare(nameA);
        default: return 0;
      }
    });
  }, [orders, dateRange, sortBy]);

  const stats = useMemo(() => {
    const results = { personal: 0, family: 0, skipped: 0, uncategorized: 0, total: 0 };
    processedOrders.forEach((order) => {
      const key = (order['ASIN'] || 'NA') + order['Order ID'];
      const type = decisions[key];
      const isReturned = getReturnStatus(order).returned;
      const amt = parsePrice(order['Total Amount']);
      if (isReturned) return;
      if (type === 'personal') results.personal += amt;
      else if (type === 'family') results.family += amt;
      else if (type === 'skipped') results.skipped += amt;
      else results.uncategorized += amt;
      if (type && type !== 'skipped') results.total += amt;
    });
    return results;
  }, [decisions, processedOrders, manualReturns, refunds]);

  const currentItem = processedOrders[currentIndex];
  const returnInfo = currentItem ? getReturnStatus(currentItem) : { returned: false };

  const handleDecision = async (type, indexOverride = null) => {
    const idx = indexOverride !== null ? indexOverride : currentIndex;
    const item = processedOrders[idx];
    if (!item || !user) return;
    const key = (item['ASIN'] || 'NA') + item['Order ID'];
    setDecisions(prev => ({ ...prev, [key]: type }));
    try {
      const docRef = doc(db, 'artifacts', appId, 'users', user.uid, 'decisions', key);
      await setDoc(docRef, { type, timestamp: Date.now() });
    } catch (e) { console.error("Save failed", e); }
    if (indexOverride === null) {
      if (type === 'family') setSwipeDirection('right');
      else if (type === 'personal') setSwipeDirection('left');
      setTimeout(() => {
        if (currentIndex < processedOrders.length - 1) setCurrentIndex(prev => prev + 1);
        else setView('summary');
        setSwipeDirection(null);
      }, 250);
    }
  };

  const DashboardHeader = () => (
    <div className="w-full max-w-md mx-auto mb-4 space-y-3 px-2">
      <div className="flex items-center justify-between">
        <button onClick={() => setView('upload')} className="p-2 hover:bg-slate-200 rounded-full text-slate-400"><RotateCcw size={18} /></button>
        <div className="text-center">
          <div className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-0.5">Queue</div>
          <div className="text-sm font-black text-slate-800 leading-none">{currentIndex + 1} / {processedOrders.length}</div>
        </div>
        <button onClick={() => setView(view === 'swipe' ? 'bulk' : 'swipe')} className="p-2 hover:bg-slate-200 rounded-full text-slate-400">
          {view === 'swipe' ? <LayoutList size={18}/> : <History size={18}/>}
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-orange-50 border border-orange-100 px-3 py-2 rounded-xl text-center">
          <div className="text-[8px] font-black text-orange-400 uppercase mb-0.5">Personal</div>
          <div className="text-sm font-black text-orange-600 leading-none">${stats.personal.toFixed(0)}</div>
        </div>
        <div className="bg-blue-50 border border-blue-100 px-3 py-2 rounded-xl text-center">
          <div className="text-[8px] font-black text-blue-400 uppercase mb-0.5">Family</div>
          <div className="text-sm font-black text-blue-600 leading-none">${stats.family.toFixed(0)}</div>
        </div>
        <div className="bg-slate-100 border border-slate-200 px-3 py-2 rounded-xl text-center">
          <div className="text-[8px] font-black text-slate-400 uppercase mb-0.5">To Review</div>
          <div className="text-sm font-black text-slate-700 leading-none">${stats.uncategorized.toFixed(0)}</div>
        </div>
      </div>
    </div>
  );

  if (view === 'upload') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="bg-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg text-white">
              <Layers size={32} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Purchase Review</h1>
            <div className="flex items-center justify-center gap-2 text-indigo-500">
               <Cloud size={14} className={isSyncing ? 'animate-pulse' : ''} />
               <span className="text-[10px] font-black uppercase tracking-widest">Cloud Sync Active</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <input type="file" accept=".csv" onChange={(e) => handleFileUpload(e, 'orders')} className="hidden" id="orders-up" />
              <label htmlFor="orders-up" className={`cursor-pointer border-2 border-dashed rounded-xl p-4 flex items-center gap-3 transition-colors ${orders.length > 0 ? 'border-green-400 bg-green-50' : 'border-slate-200 hover:border-indigo-400'}`}>
                {orders.length > 0 ? <CheckCircle2 className="text-green-500" /> : <FileUp className="text-slate-400" />}
                <span className="text-sm text-slate-600 truncate font-bold">{orders.length > 0 ? `${orders.length} Items Loaded` : 'Upload Order History'}</span>
              </label>
              <input type="file" accept=".csv" onChange={(e) => handleFileUpload(e, 'refunds')} className="hidden" id="refunds-up" />
              <label htmlFor="refunds-up" className={`cursor-pointer border-2 border-dashed rounded-xl p-4 flex items-center gap-3 transition-colors ${refunds.length > 0 ? 'border-green-400 bg-green-50' : 'border-slate-200 hover:border-indigo-400'}`}>
                {refunds.length > 0 ? <CheckCircle2 className="text-green-500" /> : <FileUp className="text-slate-400" />}
                <span className="text-sm text-slate-600 truncate font-bold">{refunds.length > 0 ? `${refunds.length} Refunds Loaded` : 'Upload Refund Details'}</span>
              </label>
            </div>
            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Filter Since</label>
                <input type="date" value={dateRange.start} onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))} className="w-full border rounded-xl px-3 py-2 text-xs font-bold outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order By</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full border rounded-xl px-3 py-2 text-xs font-bold outline-none bg-white">
                  <option value="date-desc">Newest</option>
                  <option value="date-asc">Oldest</option>
                  <option value="price-desc">Highest $$$</option>
                  <option value="price-asc">Lowest $</option>
                  <option value="alpha-asc">Product (A-Z)</option>
                  <option value="alpha-desc">Product (Z-A)</option>
                </select>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <button disabled={orders.length === 0} onClick={() => setView('swipe')} className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 text-white font-black py-5 rounded-2xl shadow-lg transition-all flex flex-col items-center justify-center gap-1 uppercase text-[10px] tracking-widest">
              <History size={20} /> Swipe Mode
            </button>
            <button disabled={orders.length === 0} onClick={() => setView('bulk')} className="bg-slate-800 hover:bg-slate-900 disabled:bg-slate-200 text-white font-black py-5 rounded-2xl shadow-lg transition-all flex flex-col items-center justify-center gap-1 uppercase text-[10px] tracking-widest">
              <LayoutList size={20} /> Bulk Mode
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'bulk') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col p-4 max-w-2xl mx-auto w-full">
        <DashboardHeader />
        <div className="space-y-2 pb-24">
          {processedOrders.map((item, idx) => {
            const key = (item['ASIN'] || 'NA') + item['Order ID'];
            const decision = decisions[key];
            const isReturned = getReturnStatus(item).returned;
            if (isReturned) return null;
            return (
              <div key={key} className={`bg-white p-4 rounded-2xl border transition-all ${decision ? 'border-indigo-100 opacity-60 scale-[0.98]' : 'border-slate-100 shadow-sm'}`}>
                <div className="flex justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">{item['Order Date']?.split('T')[0]}</div>
                    <div className="font-bold text-slate-800 text-sm line-clamp-1">{item['Product Name']}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-slate-900">${parsePrice(item['Total Amount']).toFixed(2)}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={() => handleDecision('personal', idx)} className={`py-2 rounded-xl text-[10px] font-black uppercase transition-all ${decision === 'personal' ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>Personal</button>
                  <button onClick={() => handleDecision('family', idx)} className={`py-2 rounded-xl text-[10px] font-black uppercase transition-all ${decision === 'family' ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>Family</button>
                  <button onClick={() => handleDecision('skipped', idx)} className={`py-2 rounded-xl text-[10px] font-black uppercase transition-all ${decision === 'skipped' ? 'bg-slate-300 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>Skip</button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-xs bg-indigo-600 text-white p-4 rounded-3xl shadow-2xl flex justify-between items-center z-50">
           <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full"><DollarSign size={16}/></div>
              <div>
                <div className="text-[10px] uppercase font-bold opacity-70">To Sort</div>
                <div className="font-black leading-none">${stats.uncategorized.toFixed(2)}</div>
              </div>
           </div>
           <button onClick={() => setView('summary')} className="bg-white text-indigo-600 px-4 py-2 rounded-xl font-black text-xs uppercase hover:bg-indigo-50">Finish</button>
        </div>
      </div>
    );
  }

  if (view === 'summary') {
    return (
      <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:h-[85vh]">
          <div className="bg-indigo-600 p-8 text-white text-center shrink-0">
            <h2 className="text-2xl font-black mb-1 uppercase tracking-tight">Financial Tally</h2>
            <div className="flex items-center justify-center gap-2 opacity-80">
              <Cloud size={12} />
              <span className="text-[10px] font-black uppercase tracking-widest">Progress Saved</span>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-6 overflow-y-auto flex-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-orange-50 border border-orange-100 p-5 rounded-3xl">
                <div className="text-slate-400 text-[10px] font-black uppercase mb-1 flex items-center gap-2">
                  <User size={12} /> Personal
                </div>
                <div className="text-2xl font-black text-orange-600 leading-none">${stats.personal.toFixed(2)}</div>
              </div>
              <div className="bg-blue-50 border border-blue-100 p-5 rounded-3xl">
                <div className="text-slate-400 text-[10px] font-black uppercase mb-1 flex items-center gap-2">
                  <Users size={12} /> Family
                </div>
                <div className="text-2xl font-black text-blue-600 leading-none">${stats.family.toFixed(2)}</div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <div className="text-[10px] text-slate-400 font-black uppercase">Net Categorized</div>
                  <div className="text-3xl font-black text-slate-800 leading-none mt-1">${stats.total.toFixed(2)}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 font-black uppercase">Unsorted</div>
                  <div className="text-lg font-bold text-slate-500">${stats.uncategorized.toFixed(2)}</div>
                </div>
              </div>
              <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex">
                <div className="bg-orange-400 h-full transition-all duration-700" style={{ width: `${(stats.personal / stats.total) * 100 || 0}%` }} />
                <div className="bg-blue-400 h-full transition-all duration-700" style={{ width: `${(stats.family / stats.total) * 100 || 0}%` }} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <ListFilter size={12} /> Itemized Breakdown
                </h3>
              </div>
              <div className="space-y-2">
                {processedOrders.filter(o => !getReturnStatus(o).returned).map(item => {
                  const key = (item['ASIN'] || 'NA') + item['Order ID'];
                  const type = decisions[key];
                  if (!type) return null;

                  return (
                    <div key={key} className="flex items-center justify-between p-3 bg-white border border-slate-50 rounded-2xl hover:border-slate-200 transition-colors">
                      <div className="flex-1 min-w-0 pr-4">
                        <div className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">
                          {item['Order Date']?.split('T')[0]}
                        </div>
                        <div className="text-xs font-bold text-slate-800 truncate">{item['Product Name']}</div>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <div className="text-right">
                          <div className="text-xs font-black text-slate-900">${parsePrice(item['Total Amount']).toFixed(2)}</div>
                        </div>
                        <div className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-wider ${
                          type === 'personal' ? 'bg-orange-100 text-orange-600' : 
                          type === 'family' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {type}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-slate-100 bg-white shrink-0">
            <button onClick={() => setView('upload')} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] shadow-lg hover:bg-slate-800 transition-all">
              New Report
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col p-4 font-sans overflow-hidden select-none">
      <DashboardHeader />
      <div className="flex-1 max-w-md mx-auto w-full relative">
        {!currentItem ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
             <div className="bg-green-100 p-4 rounded-full text-green-600 mb-2"><CheckCircle2 size={48} /></div>
             <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Queue Cleared</h2>
             <button onClick={() => setView('summary')} className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl">View Summary</button>
          </div>
        ) : (
          <div 
            className={`
              h-[48vh] w-full bg-white rounded-[2.5rem] shadow-2xl p-8 flex flex-col justify-between relative transition-all duration-300 border border-slate-100
              ${swipeDirection === 'right' ? 'translate-x-full rotate-12 opacity-0' : ''}
              ${swipeDirection === 'left' ? '-translate-x-full -rotate-12 opacity-0' : ''}
            `}
          >
            <div className="space-y-6">
              <div className="space-y-1">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Detail View</div>
                  <div className="text-[10px] font-bold bg-indigo-50 px-2 py-0.5 rounded-full text-indigo-500">
                    {currentItem['Order Date']?.split('T')[0]}
                  </div>
                </div>
                <h2 className="text-lg font-black text-slate-900 leading-tight line-clamp-3">
                  {currentItem['Product Name']}
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Price</div>
                  <div className="text-2xl font-black text-slate-900">${parsePrice(currentItem['Total Amount']).toFixed(2)}</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
                   <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Qty</div>
                   <div className="text-xl font-black text-slate-800">{currentItem['Original Quantity'] || 1}</div>
                </div>
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-black uppercase tracking-widest border-t pt-4">
                <span>Tax: ${parsePrice(currentItem['Shipment Item Subtotal Tax']).toFixed(2)}</span>
                <span className="opacity-50">...{currentItem['Order ID']?.slice(-6)}</span>
              </div>
            </div>
            {returnInfo.returned && (
              <div className="bg-rose-50 border border-rose-100 rounded-2xl p-3 flex items-center gap-3">
                <Undo2 className="text-rose-600 w-4 h-4" />
                <div className="text-rose-700 font-black text-[10px] uppercase tracking-tight">Returned / Refunded</div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="max-w-md mx-auto w-full flex items-center justify-between py-8 px-2">
        <button disabled={!currentItem} onClick={() => handleDecision('personal')} className="w-16 h-16 rounded-full bg-white shadow-xl border-2 border-orange-100 flex items-center justify-center text-orange-500 active:scale-90 transition-all hover:bg-orange-50">
          <User size={32} />
        </button>
        <div className="flex flex-col gap-3">
          <button disabled={!currentItem} onClick={() => handleDecision('skipped')} className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 active:scale-90 transition-all hover:bg-slate-200">
            <FastForward size={20} />
          </button>
          <button disabled={currentIndex === 0} onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))} className="w-12 h-12 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-300 active:scale-90 transition-all">
            <RotateCcw size={18} />
          </button>
        </div>
        <button disabled={!currentItem} onClick={() => handleDecision('family')} className="w-16 h-16 rounded-full bg-white shadow-xl border-2 border-blue-100 flex items-center justify-center text-blue-500 active:scale-90 transition-all hover:bg-blue-50">
          <Users size={32} />
        </button>
      </div>
    </div>
  );
};

export default App;

