import React, { useState, useEffect, useMemo } from 'react';
import { Calculator, DollarSign, TrendingUp, Wallet, ArrowRight, ChevronDown, ChevronUp, BookOpen, Table } from 'lucide-react';

export default function App() {
  const [inputs, setInputs] = useState({
    annualExpenses: 93016,
    currentTaxable: 360000,
    currentRetirement: 442286,
    realRate: 5,
    nominalRate: 8,
    inflationRate: 3,
    monthsToFI: 89,
    monthsBridge: 174,
    monthsRetirement: 390
  });

  const [results, setResults] = useState({
    pmtTaxable: 0,
    pmtRetirement: 0,
    targetNominalTaxable: 0,
    targetNominalRetirement: 0,
    pmtTaxableReal: 0,
    pmtRetirementReal: 0,
    targetRealTaxable: 0,
    targetRealRetirement: 0,
    details: null,
  });

  const [showWork, setShowWork] = useState(false);
  const [showAmortization, setShowAmortization] = useState(false);
  const [amortizationMethod, setAmortizationMethod] = useState('m1');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  useEffect(() => {
    calculatePlan();
  }, [inputs]);

  const calculatePlan = () => {
    const { 
      annualExpenses: E, 
      currentTaxable: B_tax, 
      currentRetirement: B_ret, 
      nominalRate, 
      inflationRate,
      monthsToFI,
      monthsBridge,
      monthsRetirement
    } = inputs;
    
    // Convert annual nominal and inflation percentages to monthly decimals
    const r_nom_m = (nominalRate / 100) / 12;
    const i_m = (inflationRate / 100) / 12;
    
    // High-precision: Derive exact monthly real rate using the Fisher equation
    const r_m = ((1 + r_nom_m) / (1 + i_m)) - 1;
    
    const monthlyE = E / 12;

    // Prevent division by zero
    if (r_m === 0 || r_nom_m === 0) return;

    // --- Step 1: Traditional Retirement Target (Real Dollars at age 59.5) ---
    // PV of annuity for retirement months
    const PV_59_5 = monthlyE * ((1 - Math.pow(1 + r_m, -monthsRetirement)) / r_m);

    // --- Step 2: Bridge Target (Real Dollars at age 45) ---
    // PV of annuity for bridge months
    const PV_45_taxable = monthlyE * ((1 - Math.pow(1 + r_m, -monthsBridge)) / r_m);
    
    // The age 45 target for retirement in Real Dollars
    const required_FV_45_ret = PV_59_5 / Math.pow(1 + r_m, monthsBridge);

    // --- Step 3A: METHOD 1 - Mixed Approach (Nominal Monthly Payments) ---
    
    // Taxable Account (Bridge) - Mixed
    const targetNominalTaxable = PV_45_taxable * Math.pow(1 + i_m, monthsToFI);
    const fvCurrentTaxable = B_tax * Math.pow(1 + r_nom_m, monthsToFI);
    const shortfallTaxable = targetNominalTaxable - fvCurrentTaxable;
    const pmtTaxable = shortfallTaxable > 0 
      ? shortfallTaxable * (r_nom_m / (Math.pow(1 + r_nom_m, monthsToFI) - 1)) 
      : 0;

    // Retirement Account (Post-59.5) - Mixed
    const targetNominalRetirement = required_FV_45_ret * Math.pow(1 + i_m, monthsToFI);
    const fvCurrentRetirement = B_ret * Math.pow(1 + r_nom_m, monthsToFI);
    const shortfallRetirement = targetNominalRetirement - fvCurrentRetirement;
    const pmtRetirement = shortfallRetirement > 0 
      ? shortfallRetirement * (r_nom_m / (Math.pow(1 + r_nom_m, monthsToFI) - 1)) 
      : 0;

    // --- Step 3B: METHOD 2 - Strict Real Approach (Scaling Monthly Payments) ---
    
    // Taxable Account (Bridge) - Strict Real
    const fvCurrentTaxableReal = B_tax * Math.pow(1 + r_m, monthsToFI);
    const shortfallTaxableReal = PV_45_taxable - fvCurrentTaxableReal;
    const pmtTaxableReal = shortfallTaxableReal > 0
      ? shortfallTaxableReal * (r_m / (Math.pow(1 + r_m, monthsToFI) - 1))
      : 0;
      
    // Retirement Account (Post-59.5) - Strict Real
    const fvCurrentRetirementReal = B_ret * Math.pow(1 + r_m, monthsToFI);
    const shortfallRetirementReal = required_FV_45_ret - fvCurrentRetirementReal;
    const pmtRetirementReal = shortfallRetirementReal > 0
      ? shortfallRetirementReal * (r_m / (Math.pow(1 + r_m, monthsToFI) - 1))
      : 0;

    // --- Step 4: 1-Time Deposit (Present Value of the Shortfall) ---
    // Discount the nominal shortfall back to today using the nominal rate
    const lumpSumTaxable = shortfallTaxable > 0 
      ? shortfallTaxable / Math.pow(1 + r_nom_m, monthsToFI) 
      : 0;
      
    const lumpSumRetirement = shortfallRetirement > 0 
      ? shortfallRetirement / Math.pow(1 + r_nom_m, monthsToFI) 
      : 0;

    setResults({
      pmtTaxable,
      pmtRetirement,
      targetNominalTaxable,
      targetNominalRetirement,
      pmtTaxableReal,
      pmtRetirementReal,
      targetRealTaxable: PV_45_taxable,
      targetRealRetirement: required_FV_45_ret,
      lumpSumTaxable,
      lumpSumRetirement,
      details: {
        r_m, r_nom_m, i_m,
        PV_59_5, PV_45_taxable, required_FV_45_ret,
        fvCurrentTaxable, targetNominalTaxable, shortfallTaxable,
        fvCurrentRetirement, targetNominalRetirement, shortfallRetirement,
        lumpSumTaxable, lumpSumRetirement
      }
    });
  };

  // Generate the Amortization Schedule Live
  const schedule = useMemo(() => {
    if (!results.details) return { m1: [], m2: [] };

    const m1 = [];
    const m2 = [];
    const { monthsToFI, monthsBridge, monthsRetirement, annualExpenses, currentTaxable, currentRetirement } = inputs;
    const { r_nom_m, i_m, r_m } = results.details;
    const monthlyE = annualExpenses / 12;

    let b_tax_m1 = currentTaxable;
    let b_ret_m1 = currentRetirement;
    
    let b_tax_m2 = currentTaxable;
    let b_ret_m2 = currentRetirement;

    const totalPeriods = monthsToFI + monthsBridge + monthsRetirement;
    const startAge = 45 - (monthsToFI / 12);

    for (let p = 1; p <= totalPeriods; p++) {
      let phase = p <= monthsToFI ? 'Accumulation' : p <= monthsToFI + monthsBridge ? 'Bridge' : 'Retirement';
      const age = startAge + ((p - 1) / 12);

      // --- METHOD 1 (NOMINAL) ---
      let int_tax_m1 = b_tax_m1 * r_nom_m;
      let int_ret_m1 = b_ret_m1 * r_nom_m;
      let cw_tax_m1 = 0;
      let cw_ret_m1 = 0;

      if (phase === 'Accumulation') {
        cw_tax_m1 = results.pmtTaxable;
        cw_ret_m1 = results.pmtRetirement;
      } else if (phase === 'Bridge') {
        // Withdrawal inflates every month
        cw_tax_m1 = -(monthlyE * Math.pow(1 + i_m, p));
      } else if (phase === 'Retirement') {
        // Bridge is empty. Ret withdrawal inflates.
        cw_ret_m1 = -(monthlyE * Math.pow(1 + i_m, p));
      }

      let end_tax_m1 = b_tax_m1 + int_tax_m1 + cw_tax_m1;
      let end_ret_m1 = b_ret_m1 + int_ret_m1 + cw_ret_m1;

      // Snap tiny float remnants to zero
      if (phase === 'Retirement' || Math.abs(end_tax_m1) < 1) end_tax_m1 = 0;
      if (p === totalPeriods || Math.abs(end_ret_m1) < 1) end_ret_m1 = 0;

      m1.push({
        period: p, age, phase,
        taxBeg: b_tax_m1, taxInt: int_tax_m1, taxCW: cw_tax_m1, taxEnd: end_tax_m1,
        retBeg: b_ret_m1, retInt: int_ret_m1, retCW: cw_ret_m1, retEnd: end_ret_m1
      });

      b_tax_m1 = end_tax_m1;
      b_ret_m1 = end_ret_m1;

      // --- METHOD 2 (STRICT REAL) ---
      let int_tax_m2 = b_tax_m2 * r_m;
      let int_ret_m2 = b_ret_m2 * r_m;
      let cw_tax_m2 = 0;
      let cw_ret_m2 = 0;

      if (phase === 'Accumulation') {
        cw_tax_m2 = results.pmtTaxableReal;
        cw_ret_m2 = results.pmtRetirementReal;
      } else if (phase === 'Bridge') {
        // Real withdrawal stays flat
        cw_tax_m2 = -monthlyE;
      } else if (phase === 'Retirement') {
        cw_ret_m2 = -monthlyE;
      }

      let end_tax_m2 = b_tax_m2 + int_tax_m2 + cw_tax_m2;
      let end_ret_m2 = b_ret_m2 + int_ret_m2 + cw_ret_m2;

      // Snap tiny float remnants to zero
      if (phase === 'Retirement' || Math.abs(end_tax_m2) < 1) end_tax_m2 = 0;
      if (p === totalPeriods || Math.abs(end_ret_m2) < 1) end_ret_m2 = 0;

      m2.push({
        period: p, age, phase,
        taxBeg: b_tax_m2, taxInt: int_tax_m2, taxCW: cw_tax_m2, taxEnd: end_tax_m2,
        retBeg: b_ret_m2, retInt: int_ret_m2, retCW: cw_ret_m2, retEnd: end_ret_m2
      });

      b_tax_m2 = end_tax_m2;
      b_ret_m2 = end_ret_m2;
    }

    return { m1, m2 };
  }, [inputs, results]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  const activeSchedule = amortizationMethod === 'm1' ? schedule.m1 : schedule.m2;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <header>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Calculator className="w-8 h-8 text-blue-600" />
            FI Bridge Strategy Calculator
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            Age 37 to 45 Accumulation Phase → 45 to 59.5 Bridge Phase → 59.5 to 92 Retirement
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Inputs Section */}
          <div className="lg:col-span-5 space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <Wallet className="w-5 h-5 text-slate-400" />
              Your Baseline
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Target Annual Expenses (Today's $)</label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="number" 
                    name="annualExpenses" 
                    value={inputs.annualExpenses} 
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Current Taxable Balance (Bridge)</label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="number" 
                    name="currentTaxable" 
                    value={inputs.currentTaxable} 
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Current Retirement Balance</label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="number" 
                    name="currentRetirement" 
                    value={inputs.currentRetirement} 
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  />
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold flex items-center gap-2 mt-8 mb-4 border-t pt-6">
              <TrendingUp className="w-5 h-5 text-slate-400" />
              Timeline (Months)
            </h2>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Months to FI</label>
                <input 
                  type="number" 
                  name="monthsToFI" 
                  value={inputs.monthsToFI} 
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Bridge Months</label>
                <input 
                  type="number" 
                  name="monthsBridge" 
                  value={inputs.monthsBridge} 
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Retirement Months</label>
                <input 
                  type="number" 
                  name="monthsRetirement" 
                  value={inputs.monthsRetirement} 
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                />
              </div>
            </div>

            <h2 className="text-xl font-semibold flex items-center gap-2 mt-8 mb-4 border-t pt-6">
              <TrendingUp className="w-5 h-5 text-slate-400" />
              Assumptions (%)
            </h2>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Real Rate (Derived)</label>
                <input 
                  type="text" 
                  disabled
                  value={`${(((((1 + (inputs.nominalRate / 100) / 12) / (1 + (inputs.inflationRate / 100) / 12)) - 1) * 12) * 100).toFixed(3)}%`}
                  className="w-full px-3 py-2 bg-slate-100 text-slate-500 border border-slate-200 rounded-lg outline-none cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Nominal Return</label>
                <input 
                  type="number" 
                  step="0.1"
                  name="nominalRate" 
                  value={inputs.nominalRate} 
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Inflation</label>
                <input 
                  type="number" 
                  step="0.1"
                  name="inflationRate" 
                  value={inputs.inflationRate} 
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                />
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Mixed Approach Column */}
              <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <DollarSign className="w-24 h-24" />
                </div>
                
                <h2 className="text-lg font-medium text-blue-100 mb-2">Method 1: Mixed Rate</h2>
                <p className="text-sm text-blue-200 mb-6 min-h-[40px]">Fixed nominal payments. Hurts more today, gets easier over time.</p>
                
                <div className="space-y-4 relative z-10 flex-grow">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-xs text-blue-100 uppercase tracking-wider font-semibold mb-1">Bridge (Fixed)</div>
                    <div className="text-3xl font-bold">
                      {formatCurrency(results.pmtTaxable)} <span className="text-sm font-normal text-blue-200">/mo</span>
                    </div>
                    <div className="text-xs text-blue-200 mt-1">
                      Target: {formatCurrency(results.targetNominalTaxable)} (Future $)
                    </div>
                    <div className="text-xs text-blue-100 mt-3 pt-3 border-t border-white/20 flex justify-between">
                      <span>Or 1-Time Deposit Today:</span>
                      <span className="font-bold">{formatCurrency(results.lumpSumTaxable)}</span>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-xs text-blue-100 uppercase tracking-wider font-semibold mb-1">Retirement (Fixed)</div>
                    <div className="text-3xl font-bold">
                      {formatCurrency(results.pmtRetirement)} <span className="text-sm font-normal text-blue-200">/mo</span>
                    </div>
                    <div className="text-xs text-blue-200 mt-1">
                      Target: {formatCurrency(results.targetNominalRetirement)} (Future $)
                    </div>
                    <div className="text-xs text-blue-100 mt-3 pt-3 border-t border-white/20 flex justify-between">
                      <span>Or 1-Time Deposit Today:</span>
                      <span className="font-bold">{formatCurrency(results.lumpSumRetirement)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/20">
                  <div className="flex justify-between items-end">
                    <span className="text-blue-100 text-sm font-medium">Total Fixed Target</span>
                    <span className="text-xl font-bold">{formatCurrency(results.pmtTaxable + results.pmtRetirement)}</span>
                  </div>
                </div>
              </div>

              {/* Strict Real Approach Column */}
              <div className="bg-emerald-600 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <TrendingUp className="w-24 h-24" />
                </div>
                
                <h2 className="text-lg font-medium text-emerald-100 mb-2">Method 2: Strict Real</h2>
                <p className="text-sm text-emerald-200 mb-6 min-h-[40px]">Starting payment in today's $. Must increase annually by inflation.</p>
                
                <div className="space-y-4 relative z-10 flex-grow">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-xs text-emerald-100 uppercase tracking-wider font-semibold mb-1">Bridge (Starting)</div>
                    <div className="text-3xl font-bold">
                      {formatCurrency(results.pmtTaxableReal)} <span className="text-sm font-normal text-emerald-200">/mo</span>
                    </div>
                    <div className="text-xs text-emerald-200 mt-1">
                      Target: {formatCurrency(results.targetRealTaxable)} (Today's $)
                    </div>
                    <div className="text-xs text-emerald-100 mt-3 pt-3 border-t border-white/20 flex justify-between">
                      <span>Or 1-Time Deposit Today:</span>
                      <span className="font-bold">{formatCurrency(results.lumpSumTaxable)}</span>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-xs text-emerald-100 uppercase tracking-wider font-semibold mb-1">Retirement (Starting)</div>
                    <div className="text-3xl font-bold">
                      {formatCurrency(results.pmtRetirementReal)} <span className="text-sm font-normal text-emerald-200">/mo</span>
                    </div>
                    <div className="text-xs text-emerald-200 mt-1">
                      Target: {formatCurrency(results.targetRealRetirement)} (Today's $)
                    </div>
                    <div className="text-xs text-emerald-100 mt-3 pt-3 border-t border-white/20 flex justify-between">
                      <span>Or 1-Time Deposit Today:</span>
                      <span className="font-bold">{formatCurrency(results.lumpSumRetirement)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 mt-4 border-t border-white/20">
                  <div className="flex justify-between items-end">
                    <span className="text-emerald-100 text-sm font-medium">Total Starting Target</span>
                    <span className="text-xl font-bold">{formatCurrency(results.pmtTaxableReal + results.pmtRetirementReal)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-3">How this works</h3>
              <ul className="space-y-2 text-sm text-slate-600 list-disc pl-4">
                <li><strong>Targets are in nominal (future) dollars:</strong> We calculate your exact purchasing power needs using the real rate, then inflate those targets by 8 years so you have a fixed dollar amount to aim for at age 45.</li>
                <li><strong>Contributions are fixed:</strong> By solving for a nominal target using a nominal rate, these monthly contribution numbers are fixed amounts you can set up on auto-draft today.</li>
                <li><strong>Zero at 92:</strong> This assumes capital depletion by age 92. If you want to leave a legacy, you would lower your real withdrawal rate.</li>
              </ul>
            </div>

            {/* Show Work Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <button 
                onClick={() => setShowWork(!showWork)}
                className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3 font-semibold text-slate-800">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Mathematical Proof (Show Work)
                </div>
                {showWork ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>
              
              {showWork && results.details && (
                <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-6 text-sm text-slate-700 font-mono">
                  
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2 border-b pb-1">// 1. Monthly Rates</h4>
                    <p>r_nominal = {(results.details.r_nom_m * 100).toFixed(4)}%</p>
                    <p>i_inflation = {(results.details.i_m * 100).toFixed(4)}%</p>
                    <p>r_real = [(1 + r_nom) / (1 + i)] - 1 = {(results.details.r_m * 100).toFixed(4)}%</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-2 border-b pb-1">// 2. Step 1: Age 59.5 to 92 (Retirement Phase)</h4>
                    <p>Monthly Expense (Today's $) = {formatCurrency(inputs.annualExpenses / 12)}</p>
                    <p>Target at 59.5 = PV(r_real, {inputs.monthsRetirement} periods) = {formatCurrency(results.details.PV_59_5)}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-2 border-b pb-1">// 3. Step 2: Age 45 to 59.5 (Bridge Phase)</h4>
                    <p>Bridge Target at 45 = PV(r_real, {inputs.monthsBridge} periods) = {formatCurrency(results.details.PV_45_taxable)}</p>
                    <p>Retirement Target (Discounted to 45) = {formatCurrency(results.details.PV_59_5)} / (1 + r_real)^{inputs.monthsBridge} = {formatCurrency(results.details.required_FV_45_ret)}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-2 border-b pb-1">// 4. Step 3: Mixed Rate Accumulation (Taxable / Bridge)</h4>
                    <p>Nominal Target = {formatCurrency(results.details.PV_45_taxable)} * (1 + i_inflation)^{inputs.monthsToFI} = {formatCurrency(results.details.targetNominalTaxable)}</p>
                    <p>FV of Current Balance = {formatCurrency(inputs.currentTaxable)} * (1 + r_nominal)^{inputs.monthsToFI} = {formatCurrency(results.details.fvCurrentTaxable)}</p>
                    <p>Shortfall (Future $) = {formatCurrency(results.details.shortfallTaxable)}</p>
                    <p className="font-bold text-blue-700 mt-1">PMT = {formatCurrency(results.pmtTaxable)}</p>
                    <p className="font-bold text-slate-700 mt-1">1-Time Deposit = Shortfall / (1 + r_nominal)^{inputs.monthsToFI} = {formatCurrency(results.details.lumpSumTaxable)}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-2 border-b pb-1">// 5. Step 3: Mixed Rate Accumulation (Retirement Account)</h4>
                    <p>Nominal Target = {formatCurrency(results.details.required_FV_45_ret)} * (1 + i_inflation)^{inputs.monthsToFI} = {formatCurrency(results.details.targetNominalRetirement)}</p>
                    <p>FV of Current Balance = {formatCurrency(inputs.currentRetirement)} * (1 + r_nominal)^{inputs.monthsToFI} = {formatCurrency(results.details.fvCurrentRetirement)}</p>
                    <p>Shortfall (Future $) = {formatCurrency(results.details.shortfallRetirement)}</p>
                    <p className="font-bold text-blue-700 mt-1">PMT = {formatCurrency(results.pmtRetirement)}</p>
                    <p className="font-bold text-slate-700 mt-1">1-Time Deposit = Shortfall / (1 + r_nominal)^{inputs.monthsToFI} = {formatCurrency(results.details.lumpSumRetirement)}</p>
                  </div>

                </div>
              )}
            </div>

            {/* Amortization Schedule Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <button 
                onClick={() => setShowAmortization(!showAmortization)}
                className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3 font-semibold text-slate-800">
                  <Table className="w-5 h-5 text-indigo-600" />
                  Live Amortization Schedule (Zero-Out Check)
                </div>
                {showAmortization ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>
              
              {showAmortization && (
                <div className="border-t border-slate-200 flex flex-col">
                  {/* Toggle Header */}
                  <div className="flex p-4 gap-4 bg-slate-50 border-b border-slate-200 justify-center">
                    <button 
                      onClick={() => setAmortizationMethod('m1')}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${amortizationMethod === 'm1' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}
                    >
                      Method 1: Nominal (Bank View)
                    </button>
                    <button 
                      onClick={() => setAmortizationMethod('m2')}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${amortizationMethod === 'm2' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}
                    >
                      Method 2: Strict Real (Purchasing Power View)
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                    <table className="w-full text-xs text-right whitespace-nowrap">
                      <thead className="sticky top-0 bg-slate-800 text-slate-200 z-10 shadow-sm">
                        <tr>
                          <th className="px-3 py-3 font-medium text-left border-r border-slate-700">Per.</th>
                          <th className="px-3 py-3 font-medium text-left border-r border-slate-700">Age</th>
                          <th className="px-3 py-3 font-medium text-center border-r border-slate-700 bg-slate-900">Phase</th>
                          {/* Bridge Account Headers */}
                          <th className="px-3 py-3 font-medium text-blue-300">FI Beg</th>
                          <th className="px-3 py-3 font-medium text-blue-300">FI Int</th>
                          <th className="px-3 py-3 font-medium text-blue-300">FI C/W</th>
                          <th className="px-3 py-3 font-medium text-blue-300 border-r border-slate-700">FI End</th>
                          {/* Retirement Account Headers */}
                          <th className="px-3 py-3 font-medium text-emerald-300">R Beg</th>
                          <th className="px-3 py-3 font-medium text-emerald-300">R Int</th>
                          <th className="px-3 py-3 font-medium text-emerald-300">R C/W</th>
                          <th className="px-3 py-3 font-medium text-emerald-300">R End</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeSchedule.map((row) => {
                          // Styling rows based on Phase
                          let rowClass = "border-b border-slate-200 hover:bg-slate-100 ";
                          if (row.phase === 'Accumulation') rowClass += "bg-white text-slate-700";
                          else if (row.phase === 'Bridge') rowClass += "bg-blue-50/50 text-slate-800";
                          else rowClass += "bg-emerald-50/50 text-slate-800";

                          return (
                            <tr key={row.period} className={rowClass}>
                              <td className="px-3 py-2 text-left border-r border-slate-200 text-slate-400">{row.period}</td>
                              <td className="px-3 py-2 text-left border-r border-slate-200 text-slate-500 font-medium">{row.age.toFixed(1)}</td>
                              <td className="px-3 py-2 text-center border-r border-slate-200 font-semibold">{row.phase}</td>
                              
                              <td className="px-3 py-2">{formatCurrency(row.taxBeg)}</td>
                              <td className="px-3 py-2 text-slate-500">{formatCurrency(row.taxInt)}</td>
                              <td className={`px-3 py-2 ${row.taxCW < 0 ? 'text-red-500' : 'text-blue-600'}`}>{formatCurrency(row.taxCW)}</td>
                              <td className="px-3 py-2 border-r border-slate-200 font-medium">{formatCurrency(row.taxEnd)}</td>
                              
                              <td className="px-3 py-2">{formatCurrency(row.retBeg)}</td>
                              <td className="px-3 py-2 text-slate-500">{formatCurrency(row.retInt)}</td>
                              <td className={`px-3 py-2 ${row.retCW < 0 ? 'text-red-500' : 'text-emerald-600'}`}>{formatCurrency(row.retCW)}</td>
                              <td className="px-3 py-2 font-medium">{formatCurrency(row.retEnd)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}



