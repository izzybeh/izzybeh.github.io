import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router';
import { 
  ArrowLeft, 
  Upload, 
  ThumbsUp,
  ThumbsDown,
  Undo2,
  Users, 
  SkipForward,
  ChevronLeft,
  CheckCircle2,
  FileText,
  Calendar,
  DollarSign,
  TrendingUp
} from 'lucide-react';

// CSV Parser
const parseCSV = (text: string) => {
  const result: string[][] = [];
  let currentLine: string[] = [];
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
    const obj: Record<string, string> = {};
    headers.forEach((header, idx) => {
      obj[header] = row[idx] || '';
    });
    return obj;
  });
};

// Price Parser
const parsePrice = (val: string | number | undefined): number => {
  if (val === undefined || val === null || val === '') return 0;
  let cleaned = String(val).replace(/['\",\s]/g, "");
  if (cleaned.startsWith('(') && cleaned.endsWith(')')) {
    cleaned = '-' + cleaned.slice(1, -1);
  }
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
};

type OrderData = Record<string, string>;
type DecisionType = 'yes' | 'no' | 'skipped';

// Helper to get quantity from various field names
const getQuantity = (order: OrderData): string => {
  return order['Quantity'] || order['Qty'] || order['Item Quantity'] || order['quantity'] || '';
};

export function PurchaseReviewer() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [refunds, setRefunds] = useState<OrderData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [decisions, setDecisions] = useState<Record<string, DecisionType>>({});
  const [manualReturns, setManualReturns] = useState<Set<string>>(new Set());
  const [dateRange, setDateRange] = useState({ 
    start: '2019-01-01', 
    end: new Date().toISOString().split('T')[0] 
  });
  const [sortBy, setSortBy] = useState('date-desc');
  const [view, setView] = useState<'upload' | 'review' | 'summary'>('upload');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('moneybeh-purchase-review');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.decisions) setDecisions(data.decisions);
        if (data.orders) setOrders(data.orders);
        if (data.refunds) setRefunds(data.refunds);
      } catch (e) {
        console.error('Failed to load saved data', e);
      }
    }
  }, []);

  // Save to localStorage when decisions change
  useEffect(() => {
    if (Object.keys(decisions).length > 0 || orders.length > 0) {
      localStorage.setItem('moneybeh-purchase-review', JSON.stringify({
        decisions,
        orders,
        refunds,
        timestamp: Date.now()
      }));
    }
  }, [decisions, orders, refunds]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'orders' | 'refunds') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const data = parseCSV(text);
    if (type === 'orders') setOrders(data);
    else setRefunds(data);
  };

  const getReturnStatus = (orderRow: OrderData) => {
    const orderId = orderRow['Order ID'];
    const itemTotal = parsePrice(orderRow['Total Amount']);
    const key = (orderRow['ASIN'] || 'NA') + orderId;
    
    if (manualReturns.has(key)) return { returned: true, source: 'manual' };
    
    const match = refunds.find(r => {
      const rId = r['Order ID'];
      const rAmt = parsePrice(r['Refund Amount']);
      return rId === orderId && Math.abs(rAmt - itemTotal) < 0.05;
    });
    
    return match ? { returned: true, source: 'csv' } : { returned: false };
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
        case 'date-desc': return dateB.getTime() - dateA.getTime();
        case 'date-asc': return dateA.getTime() - dateB.getTime();
        case 'price-desc': return priceB - priceA;
        case 'price-asc': return priceA - priceB;
        case 'name-asc': return nameA.localeCompare(nameB);
        case 'name-desc': return nameB.localeCompare(nameA);
        default: return 0;
      }
    });
  }, [orders, dateRange, sortBy]);

  const stats = useMemo(() => {
    const results = { yes: 0, no: 0, skipped: 0, uncategorized: 0, total: 0 };
    processedOrders.forEach((order) => {
      const key = (order['ASIN'] || 'NA') + order['Order ID'];
      const type = decisions[key];
      const isReturned = getReturnStatus(order).returned;
      const amt = parsePrice(order['Total Amount']);
      
      if (isReturned) return;
      
      if (type === 'yes') results.yes += amt;
      else if (type === 'no') results.no += amt;
      else if (type === 'skipped') results.skipped += amt;
      else results.uncategorized += amt;
      
      if (type && type !== 'skipped') results.total += amt;
    });
    return results;
  }, [decisions, processedOrders]);

  const currentItem = processedOrders[currentIndex];

  const handleDecision = (type: DecisionType) => {
    if (!currentItem) return;
    
    const key = (currentItem['ASIN'] || 'NA') + currentItem['Order ID'];
    setDecisions(prev => ({ ...prev, [key]: type }));
    
    // Move to next item
    if (currentIndex < processedOrders.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setView('summary');
    }
  };

  const handleReturn = () => {
    if (!currentItem) return;
    
    const key = (currentItem['ASIN'] || 'NA') + currentItem['Order ID'];
    setManualReturns(prev => new Set(prev).add(key));
    
    // Move to next item
    if (currentIndex < processedOrders.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setView('summary');
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Upload View
  if (view === 'upload') {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--warm-gray-50)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Back Link */}
          <Link
            to="/tools"
            className="inline-flex items-center gap-2 mb-6 text-sm transition-colors"
            style={{ color: 'var(--warm-gray-600)' }}
          >
            <ArrowLeft size={16} />
            Back to tools
          </Link>

          {/* Header */}
          <div className="mb-8">
            <p
              className="text-xs uppercase tracking-widest mb-3"
              style={{ color: 'var(--seafoam-600)', fontWeight: 500 }}
            >
              Free tool
            </p>
            <h1 className="text-3xl sm:text-4xl mb-3" style={{ color: 'var(--ink)', fontWeight: 700, lineHeight: 1.1 }}>
              Purchase Reviewer
            </h1>
            <p className="text-base sm:text-lg max-w-2xl" style={{ color: 'var(--warm-gray-600)', lineHeight: 1.6 }}>
              Upload your order history and we'll walk through each purchase together. Was it worth it? Would you buy it again? Let's get honest about where your money went.
            </p>
          </div>

          {/* Upload Section */}
          <div 
            className="rounded-2xl p-6 sm:p-8 border max-w-2xl"
            style={{ backgroundColor: 'var(--paper)', borderColor: 'var(--warm-gray-200)' }}
          >
            <div className="space-y-6">
              {/* File Uploads */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2" style={{ color: 'var(--warm-gray-600)', fontWeight: 600 }}>
                    Order history CSV
                  </label>
                  <input 
                    type="file" 
                    accept=".csv" 
                    onChange={(e) => handleFileUpload(e, 'orders')} 
                    className="hidden" 
                    id="orders-upload" 
                  />
                  <label 
                    htmlFor="orders-upload" 
                    className="cursor-pointer border-2 border-dashed rounded-xl p-5 flex items-center gap-4 transition-all"
                    style={{ 
                      borderColor: orders.length > 0 ? 'var(--seafoam-300)' : 'var(--warm-gray-200)',
                      backgroundColor: orders.length > 0 ? 'var(--seafoam-50)' : 'var(--warm-gray-50)'
                    }}
                  >
                    {orders.length > 0 ? (
                      <>
                        <CheckCircle2 size={20} style={{ color: 'var(--seafoam-600)' }} />
                        <div className="flex-1">
                          <p className="text-sm" style={{ color: 'var(--ink)', fontWeight: 600 }}>
                            {orders.length} orders loaded
                          </p>
                          <p className="text-xs" style={{ color: 'var(--warm-gray-500)' }}>
                            Click to replace
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <Upload size={20} style={{ color: 'var(--warm-gray-400)' }} />
                        <div className="flex-1">
                          <p className="text-sm" style={{ color: 'var(--ink)', fontWeight: 600 }}>
                            Upload order history
                          </p>
                          <p className="text-xs" style={{ color: 'var(--warm-gray-500)' }}>
                            CSV file from your retailer
                          </p>
                        </div>
                      </>
                    )}
                  </label>
                </div>

                <div>
                  <label className="block text-sm mb-2" style={{ color: 'var(--warm-gray-600)', fontWeight: 600 }}>
                    Refunds CSV (optional)
                  </label>
                  <input 
                    type="file" 
                    accept=".csv" 
                    onChange={(e) => handleFileUpload(e, 'refunds')} 
                    className="hidden" 
                    id="refunds-upload" 
                  />
                  <label 
                    htmlFor="refunds-upload" 
                    className="cursor-pointer border-2 border-dashed rounded-xl p-5 flex items-center gap-4 transition-all"
                    style={{ 
                      borderColor: refunds.length > 0 ? 'var(--seafoam-300)' : 'var(--warm-gray-200)',
                      backgroundColor: refunds.length > 0 ? 'var(--seafoam-50)' : 'var(--warm-gray-50)'
                    }}
                  >
                    {refunds.length > 0 ? (
                      <>
                        <CheckCircle2 size={20} style={{ color: 'var(--seafoam-600)' }} />
                        <div className="flex-1">
                          <p className="text-sm" style={{ color: 'var(--ink)', fontWeight: 600 }}>
                            {refunds.length} refunds loaded
                          </p>
                          <p className="text-xs" style={{ color: 'var(--warm-gray-500)' }}>
                            Click to replace
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <Upload size={20} style={{ color: 'var(--warm-gray-400)' }} />
                        <div className="flex-1">
                          <p className="text-sm" style={{ color: 'var(--ink)', fontWeight: 600 }}>
                            Upload refund history
                          </p>
                          <p className="text-xs" style={{ color: 'var(--warm-gray-500)' }}>
                            We'll filter out returned items
                          </p>
                        </div>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Filters */}
              {orders.length > 0 && (
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <label className="block text-xs mb-1.5" style={{ color: 'var(--warm-gray-600)', fontWeight: 500 }}>
                      Start date
                    </label>
                    <input 
                      type="date" 
                      value={dateRange.start} 
                      onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))} 
                      className="w-full px-3 py-2 rounded-lg border transition-all outline-none text-sm"
                      style={{
                        backgroundColor: 'var(--warm-gray-50)',
                        borderColor: 'var(--warm-gray-200)',
                        color: 'var(--ink)'
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs mb-1.5" style={{ color: 'var(--warm-gray-600)', fontWeight: 500 }}>
                      Sort by
                    </label>
                    <select 
                      value={sortBy} 
                      onChange={(e) => setSortBy(e.target.value)} 
                      className="w-full px-3 py-2 rounded-lg border transition-all outline-none text-sm"
                      style={{
                        backgroundColor: 'var(--warm-gray-50)',
                        borderColor: 'var(--warm-gray-200)',
                        color: 'var(--ink)'
                      }}
                    >
                      <option value="date-desc">Newest first</option>
                      <option value="date-asc">Oldest first</option>
                      <option value="price-desc">Highest price</option>
                      <option value="price-asc">Lowest price</option>
                      <option value="name-asc">Name A-Z</option>
                      <option value="name-desc">Name Z-A</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Start Button */}
              <button
                disabled={orders.length === 0}
                onClick={() => setView('review')}
                className="w-full py-4 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: 'var(--seafoam-500)',
                  color: 'white',
                  fontWeight: 600
                }}
              >
                {processedOrders.length > 0 ? `Review ${processedOrders.length} purchases` : 'Upload orders to start'}
              </button>
            </div>
          </div>

          {/* Learn This */}
          <div
            className="rounded-2xl p-5 border mt-8 max-w-2xl"
            style={{ backgroundColor: 'var(--deep-teal-50)', borderColor: 'var(--deep-teal-200)' }}
          >
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: 'var(--deep-teal-500)', fontWeight: 600 }}
            >
              Learn This
            </span>
            <p className="text-sm mt-2" style={{ color: 'var(--deep-teal-800)', lineHeight: 1.7 }}>
              This tool runs entirely in your browser — your purchase data never leaves your device. 
              Your decisions are saved locally so you can come back later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Review View
  if (view === 'review') {
    const returnInfo = currentItem ? getReturnStatus(currentItem) : { returned: false };
    const progress = processedOrders.length > 0 ? Math.round((currentIndex / processedOrders.length) * 100) : 0;

    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--warm-gray-50)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          {/* Back to Upload Link */}
          <button
            onClick={() => setView('upload')}
            className="inline-flex items-center gap-2 mb-6 text-sm transition-colors"
            style={{ color: 'var(--warm-gray-600)' }}
          >
            <ArrowLeft size={16} />
            Back to upload
          </button>

          {/* Header with Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => currentIndex > 0 && setCurrentIndex(prev => prev - 1)}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all disabled:opacity-30"
                style={{
                  color: currentIndex === 0 ? 'var(--warm-gray-400)' : 'var(--deep-teal)',
                  backgroundColor: 'var(--warm-gray-100)'
                }}
              >
                <ChevronLeft size={16} />
                <span className="text-sm" style={{ fontWeight: 600 }}>Previous</span>
              </button>
              
              <div className="text-sm" style={{ color: 'var(--warm-gray-600)', fontWeight: 600 }}>
                {currentIndex + 1} of {processedOrders.length}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--warm-gray-200)' }}>
              <div 
                className="h-full transition-all duration-300" 
                style={{ 
                  backgroundColor: 'var(--seafoam-500)',
                  width: `${progress}%`
                }}
              />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div 
              className="rounded-xl p-4 border text-center"
              style={{ backgroundColor: 'var(--seafoam-50)', borderColor: 'var(--seafoam-200)' }}
            >
              <p className="text-xs mb-1" style={{ color: 'var(--seafoam-600)', fontWeight: 500 }}>
                Worth it
              </p>
              <p className="text-lg" style={{ color: 'var(--seafoam-700)', fontWeight: 700 }}>
                {formatCurrency(stats.yes)}
              </p>
            </div>
            <div 
              className="rounded-xl p-4 border text-center"
              style={{ backgroundColor: 'var(--warm-gray-100)', borderColor: 'var(--warm-gray-300)' }}
            >
              <p className="text-xs mb-1" style={{ color: 'var(--warm-gray-600)', fontWeight: 500 }}>
                Not worth it
              </p>
              <p className="text-lg" style={{ color: 'var(--warm-gray-700)', fontWeight: 700 }}>
                {formatCurrency(stats.no)}
              </p>
            </div>
            <div 
              className="rounded-xl p-4 border text-center"
              style={{ backgroundColor: 'var(--warm-gray-100)', borderColor: 'var(--warm-gray-200)' }}
            >
              <p className="text-xs mb-1" style={{ color: 'var(--warm-gray-600)', fontWeight: 500 }}>
                To review
              </p>
              <p className="text-lg" style={{ color: 'var(--warm-gray-700)', fontWeight: 700 }}>
                {formatCurrency(stats.uncategorized)}
              </p>
            </div>
          </div>

          {/* Current Item Card */}
          {currentItem ? (
            <div
              className="rounded-2xl p-6 sm:p-8 border mb-6"
              style={{ backgroundColor: 'var(--paper)', borderColor: 'var(--warm-gray-200)' }}
            >
              <div className="space-y-6">
                {/* Product Info */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={14} style={{ color: 'var(--warm-gray-500)' }} />
                    <p className="text-xs" style={{ color: 'var(--warm-gray-500)' }}>
                      {currentItem['Order Date']?.split('T')[0]}
                    </p>
                    {getQuantity(currentItem) && (
                      <>
                        <span style={{ color: 'var(--warm-gray-300)' }}>•</span>
                        <p className="text-xs" style={{ color: 'var(--warm-gray-500)' }}>
                          Qty: {getQuantity(currentItem)}
                        </p>
                      </>
                    )}
                  </div>
                  <h2 className="text-xl mb-3" style={{ color: 'var(--ink)', fontWeight: 600, lineHeight: 1.3 }}>
                    {currentItem['Product Name']}
                  </h2>
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} style={{ color: 'var(--seafoam-600)' }} />
                    <p className="text-2xl" style={{ color: 'var(--ink)', fontWeight: 700 }}>
                      {formatCurrency(parsePrice(currentItem['Total Amount']))}
                    </p>
                  </div>
                </div>

                {/* Return Badge */}
                {returnInfo.returned && (
                  <div 
                    className="rounded-xl p-3 border"
                    style={{ backgroundColor: 'var(--warm-gray-100)', borderColor: 'var(--warm-gray-200)' }}
                  >
                    <p className="text-xs" style={{ color: 'var(--warm-gray-600)', fontWeight: 600 }}>
                      ↩ Returned or refunded
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleDecision('no')}
                      className="py-4 rounded-xl transition-all flex flex-col items-center gap-2"
                      style={{
                        backgroundColor: 'var(--warm-gray-100)',
                        borderWidth: 2,
                        borderStyle: 'solid',
                        borderColor: 'var(--warm-gray-300)',
                        color: 'var(--warm-gray-700)'
                      }}
                    >
                      <ThumbsDown size={20} />
                      <span className="text-xs" style={{ fontWeight: 600 }}>Not worth it</span>
                    </button>
                    <button
                      onClick={() => handleDecision('yes')}
                      className="py-4 rounded-xl transition-all flex flex-col items-center gap-2"
                      style={{
                        backgroundColor: 'var(--seafoam-100)',
                        borderWidth: 2,
                        borderStyle: 'solid',
                        borderColor: 'var(--seafoam-300)',
                        color: 'var(--seafoam-700)'
                      }}
                    >
                      <ThumbsUp size={20} />
                      <span className="text-xs" style={{ fontWeight: 600 }}>Worth it</span>
                    </button>
                  </div>
                  <button
                    onClick={handleReturn}
                    className="w-full py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: 'transparent',
                      color: 'var(--warm-gray-500)',
                      fontSize: '0.75rem'
                    }}
                  >
                    <Undo2 size={14} />
                    <span>Mark as returned</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div 
              className="rounded-2xl p-12 border text-center"
              style={{ backgroundColor: 'var(--paper)', borderColor: 'var(--warm-gray-200)' }}
            >
              <CheckCircle2 size={48} style={{ color: 'var(--seafoam-500)', margin: '0 auto 1rem' }} />
              <h2 className="text-xl mb-2" style={{ color: 'var(--ink)', fontWeight: 600 }}>
                All done!
              </h2>
              <p className="mb-6" style={{ color: 'var(--warm-gray-600)' }}>
                You've reviewed all your purchases.
              </p>
              <button
                onClick={() => setView('summary')}
                className="px-6 py-3 rounded-xl"
                style={{
                  backgroundColor: 'var(--seafoam-500)',
                  color: 'white',
                  fontWeight: 600
                }}
              >
                View summary
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Summary View
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--warm-gray-50)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Back Link */}
        <Link
          to="/tools"
          className="inline-flex items-center gap-2 mb-6 text-sm transition-colors"
          style={{ color: 'var(--warm-gray-600)' }}
        >
          <ArrowLeft size={16} />
          Back to tools
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl mb-3" style={{ color: 'var(--ink)', fontWeight: 700, lineHeight: 1.1 }}>
            Your purchase honesty check
          </h1>
          <p className="text-base sm:text-lg max-w-2xl" style={{ color: 'var(--warm-gray-600)', lineHeight: 1.6 }}>
            Here's what you decided about each purchase — worth it, or not.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div 
            className="rounded-2xl p-8 border"
            style={{ backgroundColor: 'var(--seafoam-50)', borderColor: 'var(--seafoam-200)' }}
          >
            <div className="flex items-center gap-3 mb-3">
              <ThumbsUp size={24} style={{ color: 'var(--seafoam-600)' }} />
              <h2 className="text-sm uppercase tracking-widest" style={{ color: 'var(--seafoam-600)', fontWeight: 600 }}>
                Worth it
              </h2>
            </div>
            <p className="text-4xl mb-2" style={{ color: 'var(--seafoam-700)', fontWeight: 700 }}>
              {formatCurrency(stats.yes)}
            </p>
            <p className="text-sm" style={{ color: 'var(--seafoam-600)' }}>
              Money well spent
            </p>
          </div>

          <div 
            className="rounded-2xl p-8 border"
            style={{ backgroundColor: 'var(--warm-gray-100)', borderColor: 'var(--warm-gray-300)' }}
          >
            <div className="flex items-center gap-3 mb-3">
              <ThumbsDown size={24} style={{ color: 'var(--warm-gray-600)' }} />
              <h2 className="text-sm uppercase tracking-widest" style={{ color: 'var(--warm-gray-600)', fontWeight: 600 }}>
                Not worth it
              </h2>
            </div>
            <p className="text-4xl mb-2" style={{ color: 'var(--warm-gray-700)', fontWeight: 700 }}>
              {formatCurrency(stats.no)}
            </p>
            <p className="text-sm" style={{ color: 'var(--warm-gray-600)' }}>
              Regret spending
            </p>
          </div>
        </div>

        {/* Total */}
        <div 
          className="rounded-2xl p-8 border mb-8"
          style={{ backgroundColor: 'var(--paper)', borderColor: 'var(--warm-gray-200)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--warm-gray-500)', fontWeight: 600 }}>
                Total categorized
              </p>
              <p className="text-4xl" style={{ color: 'var(--ink)', fontWeight: 700 }}>
                {formatCurrency(stats.total)}
              </p>
            </div>
            <TrendingUp size={48} style={{ color: 'var(--warm-gray-300)' }} />
          </div>

          {/* Progress Bar */}
          <div className="h-3 w-full rounded-full overflow-hidden" style={{ backgroundColor: 'var(--warm-gray-200)' }}>
            <div 
              className="h-full transition-all duration-700" 
              style={{ 
                backgroundColor: 'var(--seafoam-500)',
                width: `${stats.total > 0 ? (stats.yes / stats.total) * 100 : 0}%`
              }} 
            />
            <div 
              className="h-full transition-all duration-700" 
              style={{ 
                backgroundColor: 'var(--deep-teal-500)',
                width: `${stats.total > 0 ? (stats.no / stats.total) * 100 : 0}%`
              }} 
            />
          </div>

          {stats.uncategorized > 0 && (
            <p className="text-xs mt-3" style={{ color: 'var(--warm-gray-500)' }}>
              {formatCurrency(stats.uncategorized)} still needs review
            </p>
          )}
        </div>

        {/* Item List */}
        <div 
          className="rounded-2xl p-6 border"
          style={{ backgroundColor: 'var(--paper)', borderColor: 'var(--warm-gray-200)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <FileText size={18} style={{ color: 'var(--warm-gray-500)' }} />
            <h3 className="text-sm uppercase tracking-widest" style={{ color: 'var(--warm-gray-600)', fontWeight: 600 }}>
              Item breakdown
            </h3>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {processedOrders
              .filter(o => !getReturnStatus(o).returned)
              .map(item => {
                const key = (item['ASIN'] || 'NA') + item['Order ID'];
                const type = decisions[key];
                if (!type || type === 'skipped') return null;

                return (
                  <div 
                    key={key} 
                    className="flex items-center justify-between p-3 rounded-lg border transition-colors"
                    style={{ 
                      backgroundColor: 'var(--warm-gray-50)',
                      borderColor: 'var(--warm-gray-200)'
                    }}
                  >
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="text-xs mb-1" style={{ color: 'var(--warm-gray-500)' }}>
                        {item['Order Date']?.split('T')[0]}
                      </p>
                      <p className="text-sm truncate" style={{ color: 'var(--ink)', fontWeight: 500 }}>
                        {item['Product Name']}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <p className="text-sm" style={{ color: 'var(--ink)', fontWeight: 600 }}>
                        {formatCurrency(parsePrice(item['Total Amount']))}
                      </p>
                      <span 
                        className="px-2 py-1 rounded-lg text-xs uppercase tracking-wider"
                        style={{
                          backgroundColor: type === 'yes' ? 'var(--seafoam-100)' : 'var(--deep-teal-100)',
                          color: type === 'yes' ? 'var(--seafoam-700)' : 'var(--deep-teal-700)',
                          fontWeight: 600
                        }}
                      >
                        {type}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <button
            onClick={() => {
              setView('review');
              setCurrentIndex(0);
            }}
            className="py-4 rounded-xl transition-all"
            style={{
              backgroundColor: 'var(--warm-gray-100)',
              color: 'var(--warm-gray-700)',
              fontWeight: 600
            }}
          >
            Review again
          </button>
          <button
            onClick={() => {
              setDecisions({});
              setOrders([]);
              setRefunds([]);
              setCurrentIndex(0);
              setView('upload');
              localStorage.removeItem('moneybeh-purchase-review');
            }}
            className="py-4 rounded-xl transition-all"
            style={{
              backgroundColor: 'var(--seafoam-500)',
              color: 'white',
              fontWeight: 600
            }}
          >
            Start new review
          </button>
        </div>
      </div>
    </div>
  );
}