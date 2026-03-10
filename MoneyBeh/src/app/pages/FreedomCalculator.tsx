import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, ChevronDown, ChevronUp, Edit2 } from 'lucide-react';

export function FreedomCalculator() {
  const [inputs, setInputs] = useState({
    annualExpenses: 93016,
    currentTaxable: 360000,
    currentRetirement: 442286,
    currentAge: 37.5,
    freedomAge: 45,
    retirementAge: 59.5,
    endAge: 92,
    nominalRate: 8,
    inflationRate: 3,
  });

  const [showRateDetails, setShowRateDetails] = useState(false);

  // Calculate months from ages
  const monthsToFI = Math.round((inputs.freedomAge - inputs.currentAge) * 12);
  const monthsBridge = Math.round((inputs.retirementAge - inputs.freedomAge) * 12);
  const monthsRetirement = Math.round((inputs.endAge - inputs.retirementAge) * 12);

  const [results, setResults] = useState({
    pmtTaxable: 0,
    pmtRetirement: 0,
    targetNominalTaxable: 0,
    targetNominalRetirement: 0,
    pmtTaxableReal: 0,
    pmtRetirementReal: 0,
    targetRealTaxable: 0,
    targetRealRetirement: 0,
    lumpSumTaxable: 0,
    lumpSumRetirement: 0,
    details: null as any,
  });

  const [showWork, setShowWork] = useState(false);
  const [showAmortization, setShowAmortization] = useState(false);
  const [amortizationMethod, setAmortizationMethod] = useState('m1');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: Number(value),
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
    } = inputs;

    const r_nom_m = nominalRate / 100 / 12;
    const i_m = inflationRate / 100 / 12;
    const r_m = (1 + r_nom_m) / (1 + i_m) - 1;
    const monthlyE = E / 12;

    if (r_m === 0 || r_nom_m === 0 || monthsToFI <= 0 || monthsBridge <= 0 || monthsRetirement <= 0) return;

    const PV_59_5 = monthlyE * ((1 - Math.pow(1 + r_m, -monthsRetirement)) / r_m);
    const PV_45_taxable = monthlyE * ((1 - Math.pow(1 + r_m, -monthsBridge)) / r_m);
    const required_FV_45_ret = PV_59_5 / Math.pow(1 + r_m, monthsBridge);

    const targetNominalTaxable = PV_45_taxable * Math.pow(1 + i_m, monthsToFI);
    const fvCurrentTaxable = B_tax * Math.pow(1 + r_nom_m, monthsToFI);
    const shortfallTaxable = targetNominalTaxable - fvCurrentTaxable;
    const pmtTaxable =
      shortfallTaxable > 0 ? shortfallTaxable * (r_nom_m / (Math.pow(1 + r_nom_m, monthsToFI) - 1)) : 0;

    const targetNominalRetirement = required_FV_45_ret * Math.pow(1 + i_m, monthsToFI);
    const fvCurrentRetirement = B_ret * Math.pow(1 + r_nom_m, monthsToFI);
    const shortfallRetirement = targetNominalRetirement - fvCurrentRetirement;
    const pmtRetirement =
      shortfallRetirement > 0 ? shortfallRetirement * (r_nom_m / (Math.pow(1 + r_nom_m, monthsToFI) - 1)) : 0;

    const fvCurrentTaxableReal = B_tax * Math.pow(1 + r_m, monthsToFI);
    const shortfallTaxableReal = PV_45_taxable - fvCurrentTaxableReal;
    const pmtTaxableReal =
      shortfallTaxableReal > 0 ? shortfallTaxableReal * (r_m / (Math.pow(1 + r_m, monthsToFI) - 1)) : 0;

    const fvCurrentRetirementReal = B_ret * Math.pow(1 + r_m, monthsToFI);
    const shortfallRetirementReal = required_FV_45_ret - fvCurrentRetirementReal;
    const pmtRetirementReal =
      shortfallRetirementReal > 0 ? shortfallRetirementReal * (r_m / (Math.pow(1 + r_m, monthsToFI) - 1)) : 0;

    const lumpSumTaxable = shortfallTaxable > 0 ? shortfallTaxable / Math.pow(1 + r_nom_m, monthsToFI) : 0;
    const lumpSumRetirement = shortfallRetirement > 0 ? shortfallRetirement / Math.pow(1 + r_nom_m, monthsToFI) : 0;

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
        r_m,
        r_nom_m,
        i_m,
        PV_59_5,
        PV_45_taxable,
        required_FV_45_ret,
        fvCurrentTaxable,
        targetNominalTaxable,
        shortfallTaxable,
        fvCurrentRetirement,
        targetNominalRetirement,
        shortfallRetirement,
        lumpSumTaxable,
        lumpSumRetirement,
      },
    });
  };

  const schedule = useMemo(() => {
    if (!results.details) return { m1: [], m2: [] };

    const m1: any[] = [];
    const m2: any[] = [];
    const monthsToFI = Math.round((inputs.freedomAge - inputs.currentAge) * 12);
    const monthsBridge = Math.round((inputs.retirementAge - inputs.freedomAge) * 12);
    const monthsRetirement = Math.round((inputs.endAge - inputs.retirementAge) * 12);
    const { annualExpenses, currentTaxable, currentRetirement, currentAge } = inputs;
    const { r_nom_m, i_m, r_m } = results.details;
    const monthlyE = annualExpenses / 12;

    let b_tax_m1 = currentTaxable;
    let b_ret_m1 = currentRetirement;

    let b_tax_m2 = currentTaxable;
    let b_ret_m2 = currentRetirement;

    const totalPeriods = monthsToFI + monthsBridge + monthsRetirement;
    const startAge = currentAge;

    for (let p = 1; p <= totalPeriods; p++) {
      let phase = p <= monthsToFI ? 'Accumulation' : p <= monthsToFI + monthsBridge ? 'Bridge' : 'Retirement';
      const age = startAge + (p - 1) / 12;

      let int_tax_m1 = b_tax_m1 * r_nom_m;
      let int_ret_m1 = b_ret_m1 * r_nom_m;
      let cw_tax_m1 = 0;
      let cw_ret_m1 = 0;

      if (phase === 'Accumulation') {
        cw_tax_m1 = results.pmtTaxable;
        cw_ret_m1 = results.pmtRetirement;
      } else if (phase === 'Bridge') {
        cw_tax_m1 = -(monthlyE * Math.pow(1 + i_m, p));
      } else if (phase === 'Retirement') {
        cw_ret_m1 = -(monthlyE * Math.pow(1 + i_m, p));
      }

      let end_tax_m1 = b_tax_m1 + int_tax_m1 + cw_tax_m1;
      let end_ret_m1 = b_ret_m1 + int_ret_m1 + cw_ret_m1;

      if (phase === 'Retirement' || Math.abs(end_tax_m1) < 1) end_tax_m1 = 0;
      if (p === totalPeriods || Math.abs(end_ret_m1) < 1) end_ret_m1 = 0;

      m1.push({
        period: p,
        age,
        phase,
        taxBeg: b_tax_m1,
        taxInt: int_tax_m1,
        taxCW: cw_tax_m1,
        taxEnd: end_tax_m1,
        retBeg: b_ret_m1,
        retInt: int_ret_m1,
        retCW: cw_ret_m1,
        retEnd: end_ret_m1,
      });

      b_tax_m1 = end_tax_m1;
      b_ret_m1 = end_ret_m1;

      let int_tax_m2 = b_tax_m2 * r_m;
      let int_ret_m2 = b_ret_m2 * r_m;
      let cw_tax_m2 = 0;
      let cw_ret_m2 = 0;

      if (phase === 'Accumulation') {
        cw_tax_m2 = results.pmtTaxableReal;
        cw_ret_m2 = results.pmtRetirementReal;
      } else if (phase === 'Bridge') {
        cw_tax_m2 = -monthlyE;
      } else if (phase === 'Retirement') {
        cw_ret_m2 = -monthlyE;
      }

      let end_tax_m2 = b_tax_m2 + int_tax_m2 + cw_tax_m2;
      let end_ret_m2 = b_ret_m2 + int_ret_m2 + cw_ret_m2;

      if (phase === 'Retirement' || Math.abs(end_tax_m2) < 1) end_tax_m2 = 0;
      if (p === totalPeriods || Math.abs(end_ret_m2) < 1) end_ret_m2 = 0;

      m2.push({
        period: p,
        age,
        phase,
        taxBeg: b_tax_m2,
        taxInt: int_tax_m2,
        taxCW: cw_tax_m2,
        taxEnd: end_tax_m2,
        retBeg: b_ret_m2,
        retInt: int_ret_m2,
        retCW: cw_ret_m2,
        retEnd: end_ret_m2,
      });

      b_tax_m2 = end_tax_m2;
      b_ret_m2 = end_ret_m2;
    }

    return { m1, m2 };
  }, [inputs, results]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const activeSchedule = amortizationMethod === 'm1' ? schedule.m1 : schedule.m2;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--warm-gray-50)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
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
            Free calculator
          </p>
          <h1 className="text-3xl sm:text-4xl mb-3" style={{ color: 'var(--ink)', fontWeight: 700, lineHeight: 1.1 }}>
            Freedom Calculator
          </h1>
          <p className="text-base sm:text-lg max-w-3xl" style={{ color: 'var(--warm-gray-600)', lineHeight: 1.6 }}>
            Build your two-leg plan — bridge to 59½, retirement to 92. See exactly what you need to contribute, month by
            month.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Inputs */}
          <div className="lg:col-span-5 space-y-6">
            <InputSection title="Your baseline">
              <InputField
                label="Annual spending (today's dollars)"
                name="annualExpenses"
                value={inputs.annualExpenses}
                onChange={handleInputChange}
              />
              <InputField
                label="Bridge balance (money you can access anytime)"
                name="currentTaxable"
                value={inputs.currentTaxable}
                onChange={handleInputChange}
              />
              <InputField
                label="Retirement balance (401k, IRA, etc.)"
                name="currentRetirement"
                value={inputs.currentRetirement}
                onChange={handleInputChange}
              />
            </InputSection>

            <InputSection title="Timeline (your ages)">
              <div className="grid grid-cols-2 gap-3">
                <SmallInputField label="Current age" name="currentAge" value={inputs.currentAge} onChange={handleInputChange} step="0.5" />
                <SmallInputField label="Freedom age" name="freedomAge" value={inputs.freedomAge} onChange={handleInputChange} step="0.5" />
              </div>
              <div className="text-xs mt-2" style={{ color: 'var(--warm-gray-500)' }}>
                Retirement age defaults to 59½. End age defaults to 92.
              </div>
            </InputSection>

            <div
              className="rounded-2xl p-5 border"
              style={{ backgroundColor: 'var(--paper)', borderColor: 'var(--warm-gray-200)' }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm mb-1" style={{ color: 'var(--warm-gray-600)', fontWeight: 600 }}>
                    Growth rate
                  </h2>
                  {!showRateDetails && (
                    <p className="text-sm" style={{ color: 'var(--ink)', fontWeight: 600 }}>
                      {(((((1 + inputs.nominalRate / 100 / 12) / (1 + inputs.inflationRate / 100 / 12)) - 1) * 12) * 100).toFixed(2)}% after inflation
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setShowRateDetails(!showRateDetails)}
                  className="text-xs px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                  style={{
                    backgroundColor: 'var(--warm-gray-100)',
                    color: 'var(--warm-gray-700)',
                  }}
                >
                  <Edit2 size={12} />
                  {showRateDetails ? 'Done' : 'Edit'}
                </button>
              </div>

              {showRateDetails && (
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <SmallInputField
                    label="After inflation"
                    value={(((((1 + inputs.nominalRate / 100 / 12) / (1 + inputs.inflationRate / 100 / 12)) - 1) * 12) * 100).toFixed(3) + '%'}
                    disabled
                  />
                  <SmallInputField label="Before inflation" name="nominalRate" value={inputs.nominalRate} onChange={handleInputChange} step="0.1" />
                  <SmallInputField label="Inflation rate" name="inflationRate" value={inputs.inflationRate} onChange={handleInputChange} step="0.1" />
                </div>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-7 space-y-6">
            {/* Fixed Method */}
            <ResultCard
              title="Your monthly contributions"
              subtitle="Same dollar amount every month. Easier to automate."
              bg="var(--seafoam-500)"
              items={[
                {
                  label: 'Bridge',
                  value: formatCurrency(results.pmtTaxable),
                  target: formatCurrency(results.targetNominalTaxable),
                  lump: formatCurrency(results.lumpSumTaxable),
                },
                {
                  label: 'Retirement',
                  value: formatCurrency(results.pmtRetirement),
                  target: formatCurrency(results.targetNominalRetirement),
                  lump: formatCurrency(results.lumpSumRetirement),
                },
              ]}
              total={formatCurrency(results.pmtTaxable + results.pmtRetirement)}
            />

            {/* How it works */}
            <div
              className="rounded-2xl p-5 border"
              style={{ backgroundColor: 'var(--paper)', borderColor: 'var(--warm-gray-200)' }}
            >
              <h3 className="text-sm mb-2" style={{ color: 'var(--ink)', fontWeight: 600 }}>
                How this works
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--warm-gray-600)', lineHeight: 1.6 }}>
                <li>
                  • <strong>Two legs:</strong> Bridge covers you from freedom to 59½ with money you can access anytime. Retirement covers 59½ to 92 with your retirement accounts.
                </li>
                <li>
                  • <strong>Fixed contributions:</strong> Same dollar amount every month makes it easy to automate and
                  stick to the plan.
                </li>
                <li>
                  • <strong>Zero at 92:</strong> This plan spends down to zero. If you want to leave money behind, you'll need less each year.
                </li>
              </ul>
            </div>

            {/* Show Work */}
            <Collapsible
              title="The math behind it"
              isOpen={showWork}
              onToggle={() => setShowWork(!showWork)}
            >
              {results.details && (
                <div className="p-5 space-y-4 text-xs" style={{ color: 'var(--warm-gray-700)', fontFamily: 'monospace' }}>
                  <Section title="1. Monthly Rates">
                    <p>r_nominal = {(results.details.r_nom_m * 100).toFixed(4)}%</p>
                    <p>i_inflation = {(results.details.i_m * 100).toFixed(4)}%</p>
                    <p>
                      r_real = [(1 + r_nom) / (1 + i)] - 1 = {(results.details.r_m * 100).toFixed(4)}%
                    </p>
                  </Section>

                  <Section title="2. Age 59½ to 92 (Retirement Phase)">
                    <p>Monthly Expense (Today's $) = {formatCurrency(inputs.annualExpenses / 12)}</p>
                    <p>
                      Target at 59½ = PV(r_real, {inputs.monthsRetirement} periods) = {formatCurrency(results.details.PV_59_5)}
                    </p>
                  </Section>

                  <Section title="3. Age 45 to 59½ (Bridge Phase)">
                    <p>
                      Bridge Target at 45 = PV(r_real, {inputs.monthsBridge} periods) = {formatCurrency(results.details.PV_45_taxable)}
                    </p>
                    <p>
                      Retirement Target (Discounted to 45) = {formatCurrency(results.details.PV_59_5)} / (1 + r_real)^
                      {inputs.monthsBridge} = {formatCurrency(results.details.required_FV_45_ret)}
                    </p>
                  </Section>

                  <Section title="4. Fixed Accumulation (Taxable / Bridge)">
                    <p>
                      Nominal Target = {formatCurrency(results.details.PV_45_taxable)} * (1 + i_inflation)^
                      {inputs.monthsToFI} = {formatCurrency(results.details.targetNominalTaxable)}
                    </p>
                    <p>
                      FV of Current Balance = {formatCurrency(inputs.currentTaxable)} * (1 + r_nominal)^{inputs.monthsToFI} ={' '}
                      {formatCurrency(results.details.fvCurrentTaxable)}
                    </p>
                    <p>Shortfall (Future $) = {formatCurrency(results.details.shortfallTaxable)}</p>
                    <p style={{ fontWeight: 600 }}>PMT = {formatCurrency(results.pmtTaxable)}</p>
                    <p>
                      1-Time Deposit = Shortfall / (1 + r_nominal)^{inputs.monthsToFI} ={' '}
                      {formatCurrency(results.details.lumpSumTaxable)}
                    </p>
                  </Section>

                  <Section title="5. Fixed Accumulation (Retirement Account)">
                    <p>
                      Nominal Target = {formatCurrency(results.details.required_FV_45_ret)} * (1 + i_inflation)^
                      {inputs.monthsToFI} = {formatCurrency(results.details.targetNominalRetirement)}
                    </p>
                    <p>
                      FV of Current Balance = {formatCurrency(inputs.currentRetirement)} * (1 + r_nominal)^{inputs.monthsToFI} ={' '}
                      {formatCurrency(results.details.fvCurrentRetirement)}
                    </p>
                    <p>Shortfall (Future $) = {formatCurrency(results.details.shortfallRetirement)}</p>
                    <p style={{ fontWeight: 600 }}>PMT = {formatCurrency(results.pmtRetirement)}</p>
                    <p>
                      1-Time Deposit = Shortfall / (1 + r_nominal)^{inputs.monthsToFI} ={' '}
                      {formatCurrency(results.details.lumpSumRetirement)}
                    </p>
                  </Section>
                </div>
              )}
            </Collapsible>

            {/* Amortization Schedule */}
            <Collapsible
              title="Month-by-month breakdown"
              isOpen={showAmortization}
              onToggle={() => setShowAmortization(!showAmortization)}
            >
              <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                <table className="w-full text-xs text-right whitespace-nowrap">
                  <thead
                    className="sticky top-0 z-10 shadow-sm text-xs"
                    style={{ backgroundColor: 'var(--ink)', color: 'var(--warm-gray-200)' }}
                  >
                    <tr>
                      <th className="px-3 py-3 text-left border-r" style={{ borderColor: 'var(--warm-gray-700)' }}>
                        Month
                      </th>
                      <th className="px-3 py-3 text-left border-r" style={{ borderColor: 'var(--warm-gray-700)' }}>
                        Age
                      </th>
                      <th className="px-3 py-3 text-center border-r" style={{ borderColor: 'var(--warm-gray-700)' }}>
                        Phase
                      </th>
                      <th className="px-3 py-3" style={{ color: 'var(--seafoam-300)' }}>
                        Bridge Start
                      </th>
                      <th className="px-3 py-3" style={{ color: 'var(--seafoam-300)' }}>
                        Interest
                      </th>
                      <th className="px-3 py-3" style={{ color: 'var(--seafoam-300)' }}>
                        In/Out
                      </th>
                      <th className="px-3 py-3 border-r" style={{ color: 'var(--seafoam-300)', borderColor: 'var(--warm-gray-700)' }}>
                        Bridge End
                      </th>
                      <th className="px-3 py-3" style={{ color: 'var(--warm-gray-300)' }}>
                        Retirement Start
                      </th>
                      <th className="px-3 py-3" style={{ color: 'var(--warm-gray-300)' }}>
                        Interest
                      </th>
                      <th className="px-3 py-3" style={{ color: 'var(--warm-gray-300)' }}>
                        In/Out
                      </th>
                      <th className="px-3 py-3" style={{ color: 'var(--warm-gray-300)' }}>
                        Retirement End
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.m1.map((row: any) => {
                      let rowBg = 'var(--paper)';
                      if (row.phase === 'Bridge') rowBg = 'var(--seafoam-50)';
                      else if (row.phase === 'Retirement') rowBg = 'var(--warm-gray-100)';

                      return (
                        <tr
                          key={row.period}
                          className="border-b transition-colors hover:opacity-80"
                          style={{ backgroundColor: rowBg, borderColor: 'var(--warm-gray-200)' }}
                        >
                          <td className="px-3 py-2 text-left border-r" style={{ color: 'var(--warm-gray-400)', borderColor: 'var(--warm-gray-200)' }}>
                            {row.period}
                          </td>
                          <td className="px-3 py-2 text-left border-r" style={{ color: 'var(--warm-gray-600)', borderColor: 'var(--warm-gray-200)' }}>
                            {row.age.toFixed(1)}
                          </td>
                          <td className="px-3 py-2 text-center border-r text-xs" style={{ color: 'var(--ink)', fontWeight: 500, borderColor: 'var(--warm-gray-200)' }}>
                            {row.phase}
                          </td>

                          <td className="px-3 py-2" style={{ color: 'var(--warm-gray-700)' }}>{formatCurrency(row.taxBeg)}</td>
                          <td className="px-3 py-2" style={{ color: 'var(--warm-gray-500)' }}>{formatCurrency(row.taxInt)}</td>
                          <td className="px-3 py-2" style={{ color: row.taxCW < 0 ? 'var(--warm-gray-700)' : 'var(--seafoam-700)', fontWeight: row.taxCW !== 0 ? 600 : 400 }}>
                            {formatCurrency(row.taxCW)}
                          </td>
                          <td className="px-3 py-2 border-r" style={{ color: 'var(--ink)', fontWeight: 500, borderColor: 'var(--warm-gray-200)' }}>
                            {formatCurrency(row.taxEnd)}
                          </td>

                          <td className="px-3 py-2" style={{ color: 'var(--warm-gray-700)' }}>{formatCurrency(row.retBeg)}</td>
                          <td className="px-3 py-2" style={{ color: 'var(--warm-gray-500)' }}>{formatCurrency(row.retInt)}</td>
                          <td className="px-3 py-2" style={{ color: row.retCW < 0 ? 'var(--warm-gray-700)' : 'var(--seafoam-700)', fontWeight: row.retCW !== 0 ? 600 : 400 }}>
                            {formatCurrency(row.retCW)}
                          </td>
                          <td className="px-3 py-2" style={{ color: 'var(--ink)', fontWeight: 500 }}>
                            {formatCurrency(row.retEnd)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Collapsible>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Helper Components ────────────────────────────────────────────────────────

function InputSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-5 border"
      style={{ backgroundColor: 'var(--paper)', borderColor: 'var(--warm-gray-200)' }}
    >
      <h2 className="text-sm mb-4" style={{ color: 'var(--warm-gray-600)', fontWeight: 600 }}>
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  disabled,
}: {
  label: string;
  name?: string;
  value: number | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs mb-1.5" style={{ color: 'var(--warm-gray-600)', fontWeight: 500 }}>
        {label}
      </label>
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full px-3 py-2.5 rounded-lg border transition-all outline-none"
        style={{
          backgroundColor: disabled ? 'var(--warm-gray-100)' : 'var(--warm-gray-50)',
          borderColor: 'var(--warm-gray-200)',
          color: disabled ? 'var(--warm-gray-500)' : 'var(--ink)',
        }}
      />
    </div>
  );
}

function SmallInputField({
  label,
  name,
  value,
  onChange,
  disabled,
  step,
}: {
  label: string;
  name?: string;
  value: number | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  step?: string;
}) {
  return (
    <div>
      <label className="block text-xs mb-1.5" style={{ color: 'var(--warm-gray-600)', fontWeight: 500 }}>
        {label}
      </label>
      <input
        type={disabled ? 'text' : 'number'}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        step={step}
        className="w-full px-2 py-2 rounded-lg border transition-all outline-none text-sm"
        style={{
          backgroundColor: disabled ? 'var(--warm-gray-100)' : 'var(--warm-gray-50)',
          borderColor: 'var(--warm-gray-200)',
          color: disabled ? 'var(--warm-gray-500)' : 'var(--ink)',
        }}
      />
    </div>
  );
}

function ResultCard({
  title,
  subtitle,
  bg,
  items,
  total,
}: {
  title: string;
  subtitle: string;
  bg: string;
  items: Array<{ label: string; value: string; target: string; lump: string }>;
  total: string;
}) {
  return (
    <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: bg }}>
      <h2 className="text-lg mb-1" style={{ fontWeight: 600, opacity: 0.95 }}>
        {title}
      </h2>
      <p className="text-sm mb-5" style={{ opacity: 0.8, lineHeight: 1.5 }}>
        {subtitle}
      </p>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-xl p-4 border"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }}
          >
            <div className="text-xs uppercase tracking-wider mb-1" style={{ opacity: 0.8, fontWeight: 500 }}>
              {item.label}
            </div>
            <div className="text-3xl mb-2" style={{ fontWeight: 700 }}>
              {item.value} <span className="text-sm" style={{ opacity: 0.7 }}>/mo</span>
            </div>
            <div className="text-xs mb-3" style={{ opacity: 0.7 }}>
              Target: {item.target}
            </div>
            <div className="text-xs pt-3 flex justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
              <span style={{ opacity: 0.8 }}>Or 1-time deposit today:</span>
              <span style={{ fontWeight: 600 }}>{item.lump}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 mt-4 flex justify-between items-end" style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
        <span className="text-sm" style={{ opacity: 0.8, fontWeight: 500 }}>
          Total monthly
        </span>
        <span className="text-xl" style={{ fontWeight: 700 }}>
          {total}
        </span>
      </div>
    </div>
  );
}

function Collapsible({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ backgroundColor: 'var(--paper)', borderColor: 'var(--warm-gray-200)' }}
    >
      <button
        onClick={onToggle}
        className="w-full p-5 flex items-center justify-between transition-colors hover:bg-warm-gray-50"
      >
        <span className="text-sm" style={{ color: 'var(--ink)', fontWeight: 600 }}>
          {title}
        </span>
        {isOpen ? (
          <ChevronUp size={18} style={{ color: 'var(--warm-gray-400)' }} />
        ) : (
          <ChevronDown size={18} style={{ color: 'var(--warm-gray-400)' }} />
        )}
      </button>

      {isOpen && (
        <div className="border-t" style={{ borderColor: 'var(--warm-gray-200)', backgroundColor: 'var(--warm-gray-50)' }}>
          {children}
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-xs mb-2 pb-1 border-b" style={{ color: 'var(--ink)', fontWeight: 600, borderColor: 'var(--warm-gray-300)' }}>
        {title}
      </h4>
      <div className="space-y-1">{children}</div>
    </div>
  );
}