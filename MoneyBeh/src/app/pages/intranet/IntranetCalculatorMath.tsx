import { Calculator } from "lucide-react";

export function IntranetCalculatorMath() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              backgroundColor: "var(--deep-teal-50)",
              border: "1px solid var(--deep-teal-200)",
            }}
          >
            <Calculator size={18} style={{ color: "var(--deep-teal-500)" }} />
          </div>
          <div
            className="text-xs tracking-widest uppercase"
            style={{ color: "var(--deep-teal-600)", fontWeight: 500 }}
          >
            Reference Guide
          </div>
        </div>
        <h1
          className="text-3xl mb-3"
          style={{ color: "var(--ink)", fontWeight: 600, lineHeight: 1.3 }}
        >
          Calculator Math
        </h1>
        <p
          className="text-base leading-relaxed max-w-2xl"
          style={{ color: "var(--warm-gray-600)" }}
        >
          The mathematical foundation behind the Freedom Calculator. This guide
          explains how we calculate contributions, targets, and the two-leg
          bridge strategy in clear, simple terms.
        </p>
      </div>

      {/* Core Philosophy */}
      <Section title="Core Philosophy">
        <p className="mb-4">
          The Freedom Calculator solves a specific problem: <strong>How much do I need to
          contribute each month to reach financial freedom by a target age?</strong>
        </p>
        <p className="mb-4">
          We use a <strong>two-leg bridge strategy</strong>:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>
            <strong>Bridge leg:</strong> Money you can access anytime (taxable accounts)
            that covers from freedom age to 59½
          </li>
          <li>
            <strong>Retirement leg:</strong> Money in retirement accounts (401k, IRA) that
            covers from 59½ to end age (default 92)
          </li>
        </ul>
        <p>
          This strategy minimizes early withdrawal penalties while maximizing
          tax-advantaged growth.
        </p>
      </Section>

      {/* Variables & Inputs */}
      <Section title="Variables & Inputs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Variable
            name="E"
            label="Annual spending (today's dollars)"
            description="How much you spend per year in today's money"
          />
          <Variable
            name="B_bridge"
            label="Bridge balance"
            description="Current balance in accounts you can access anytime"
          />
          <Variable
            name="B_retirement"
            label="Retirement balance"
            description="Current balance in 401k, IRA, etc."
          />
          <Variable
            name="age_current"
            label="Current age"
            description="Your age today"
          />
          <Variable
            name="age_freedom"
            label="Freedom age"
            description="When you want financial freedom"
          />
          <Variable
            name="age_retirement"
            label="Retirement age"
            description="When you can access retirement accounts penalty-free (default 59.5)"
          />
          <Variable
            name="age_end"
            label="End age"
            description="Planning horizon (default 92)"
          />
          <Variable
            name="r_before"
            label="Growth rate before inflation"
            description="Expected annual return (default 8%)"
          />
          <Variable
            name="i"
            label="Inflation rate"
            description="Expected annual inflation (default 3%)"
          />
        </div>
      </Section>

      {/* Step 1: Calculate Rates */}
      <Section title="Step 1: Calculate Rates">
        <p className="mb-4">
          We work with monthly rates because contributions happen monthly.
        </p>
        
        <Formula
          title="Monthly growth rate (before inflation)"
          formula="r_before_monthly = r_before / 12"
          example="8% / 12 = 0.667% per month"
        />
        
        <Formula
          title="Monthly inflation rate"
          formula="i_monthly = i / 12"
          example="3% / 12 = 0.25% per month"
        />
        
        <Formula
          title="Real growth rate (after inflation)"
          formula="r_real = [(1 + r_before_monthly) / (1 + i_monthly)] - 1"
          example="[(1.00667) / (1.0025)] - 1 = 0.00416 or 0.416% per month"
          note="This is the 'true' growth rate after accounting for inflation. It's what we use for retirement planning calculations."
        />
      </Section>

      {/* Step 2: Calculate Timeline in Months */}
      <Section title="Step 2: Calculate Timeline in Months">
        <Formula
          title="Months until freedom"
          formula="n_accumulation = (age_freedom - age_current) × 12"
          example="(45 - 37.5) × 12 = 90 months"
        />
        
        <Formula
          title="Months in bridge phase"
          formula="n_bridge = (age_retirement - age_freedom) × 12"
          example="(59.5 - 45) × 12 = 174 months"
        />
        
        <Formula
          title="Months in retirement phase"
          formula="n_retirement = (age_end - age_retirement) × 12"
          example="(92 - 59.5) × 12 = 390 months"
        />
      </Section>

      {/* Step 3: Work Backwards */}
      <Section title="Step 3: Work Backwards from Age 92">
        <p className="mb-4">
          We calculate how much money is needed at each milestone by working
          backwards from the end.
        </p>

        <div className="space-y-6">
          <div>
            <h4
              className="text-sm mb-2 font-semibold"
              style={{ color: "var(--deep-teal-700)" }}
            >
              3a. Monthly spending (inflation-adjusted)
            </h4>
            <Formula
              formula="monthly_spending = E / 12"
              example="$93,016 / 12 = $7,751 per month"
              note="This is in today's dollars. The calculator inflates this each month during the schedule."
            />
          </div>

          <div>
            <h4
              className="text-sm mb-2 font-semibold"
              style={{ color: "var(--deep-teal-700)" }}
            >
              3b. Target at age 59½ (retirement account)
            </h4>
            <Formula
              formula="PV_retirement = monthly_spending × [(1 - (1 + r_real)^-n_retirement) / r_real]"
              example="$7,751 × [(1 - 1.00416^-390) / 0.00416] = $1,472,789"
              note="This is the present value formula. It tells us how much we need at 59½ to fund monthly spending until 92."
            />
          </div>

          <div>
            <h4
              className="text-sm mb-2 font-semibold"
              style={{ color: "var(--deep-teal-700)" }}
            >
              3c. Target at freedom age (bridge account)
            </h4>
            <Formula
              formula="PV_bridge = monthly_spending × [(1 - (1 + r_real)^-n_bridge) / r_real]"
              example="$7,751 × [(1 - 1.00416^-174) / 0.00416] = $1,109,362"
              note="How much we need in the bridge account at freedom age to fund spending until 59½."
            />
          </div>

          <div>
            <h4
              className="text-sm mb-2 font-semibold"
              style={{ color: "var(--deep-teal-700)" }}
            >
              3d. Discounted retirement target at freedom age
            </h4>
            <Formula
              formula="PV_retirement_at_freedom = PV_retirement / (1 + r_real)^n_bridge"
              example="$1,472,789 / 1.00416^174 = $723,371"
              note="We discount the retirement target back to freedom age because it will grow during the bridge phase."
            />
          </div>
        </div>
      </Section>

      {/* Step 4: Calculate Required Contributions */}
      <Section title="Step 4: Calculate Required Contributions">
        <p className="mb-4">
          Now we know our targets. We calculate how much to contribute monthly
          to reach those targets, accounting for what we already have.
        </p>

        <div className="space-y-6">
          <div>
            <h4
              className="text-sm mb-2 font-semibold"
              style={{ color: "var(--deep-teal-700)" }}
            >
              4a. Inflate targets to future dollars
            </h4>
            <p className="text-sm mb-3" style={{ color: "var(--warm-gray-600)" }}>
              We need to inflate our targets because contributions happen in
              future (inflated) dollars.
            </p>
            <Formula
              formula="target_bridge_future = PV_bridge × (1 + i_monthly)^n_accumulation"
              example="$1,109,362 × 1.0025^90 = $1,385,729"
            />
            <Formula
              formula="target_retirement_future = PV_retirement_at_freedom × (1 + i_monthly)^n_accumulation"
              example="$723,371 × 1.0025^90 = $903,464"
            />
          </div>

          <div>
            <h4
              className="text-sm mb-2 font-semibold"
              style={{ color: "var(--deep-teal-700)" }}
            >
              4b. Calculate future value of current balances
            </h4>
            <Formula
              formula="FV_bridge = B_bridge × (1 + r_before_monthly)^n_accumulation"
              example="$360,000 × 1.00667^90 = $629,823"
            />
            <Formula
              formula="FV_retirement = B_retirement × (1 + r_before_monthly)^n_accumulation"
              example="$442,286 × 1.00667^90 = $773,603"
            />
          </div>

          <div>
            <h4
              className="text-sm mb-2 font-semibold"
              style={{ color: "var(--deep-teal-700)" }}
            >
              4c. Calculate shortfalls
            </h4>
            <Formula
              formula="shortfall_bridge = target_bridge_future - FV_bridge"
              example="$1,385,729 - $629,823 = $755,906"
            />
            <Formula
              formula="shortfall_retirement = target_retirement_future - FV_retirement"
              example="$903,464 - $773,603 = $129,861"
            />
          </div>

          <div>
            <h4
              className="text-sm mb-2 font-semibold"
              style={{ color: "var(--deep-teal-700)" }}
            >
              4d. Calculate monthly contributions (PMT)
            </h4>
            <p className="text-sm mb-3" style={{ color: "var(--warm-gray-600)" }}>
              This is the payment formula from financial mathematics. It calculates
              the fixed monthly payment needed to reach a future value.
            </p>
            <Formula
              formula="PMT = shortfall × [r_before_monthly / ((1 + r_before_monthly)^n_accumulation - 1)]"
              example="Bridge: $755,906 × [0.00667 / (1.00667^90 - 1)] = $7,252/mo"
            />
            <Formula
              formula="PMT_retirement = shortfall_retirement × [r_before_monthly / ((1 + r_before_monthly)^n_accumulation - 1)]"
              example="Retirement: $129,861 × [0.00667 / (1.00667^90 - 1)] = $1,245/mo"
            />
          </div>
        </div>
      </Section>

      {/* Alternative: Lump Sum */}
      <Section title="Alternative: One-Time Deposit Today">
        <p className="mb-4">
          Instead of monthly contributions, you could make a single deposit today
          and let it grow.
        </p>
        
        <Formula
          formula="lump_sum = shortfall / (1 + r_before_monthly)^n_accumulation"
          example="Bridge: $755,906 / 1.00667^90 = $432,064"
          note="This is the present value of the shortfall. Deposit this amount today and it will grow to cover the gap."
        />
      </Section>

      {/* Amortization Schedule */}
      <Section title="Month-by-Month Verification">
        <p className="mb-4">
          The amortization schedule proves our math by simulating every month:
        </p>
        
        <div className="space-y-4">
          <div>
            <h4
              className="text-sm mb-2 font-semibold"
              style={{ color: "var(--deep-teal-700)" }}
            >
              During accumulation (current age → freedom age)
            </h4>
            <ol className="list-decimal pl-6 space-y-2 text-sm" style={{ color: "var(--warm-gray-700)" }}>
              <li>Start with beginning balance</li>
              <li>Add interest earned: balance × r_before_monthly</li>
              <li>Add monthly contribution (PMT)</li>
              <li>Calculate ending balance</li>
              <li>Repeat for next month</li>
            </ol>
          </div>

          <div>
            <h4
              className="text-sm mb-2 font-semibold"
              style={{ color: "var(--deep-teal-700)" }}
            >
              During bridge phase (freedom age → 59½)
            </h4>
            <ol className="list-decimal pl-6 space-y-2 text-sm" style={{ color: "var(--warm-gray-700)" }}>
              <li>Start with beginning balance (from bridge account)</li>
              <li>Add interest earned: balance × r_before_monthly</li>
              <li>Subtract monthly spending (inflated for this month): -monthly_spending × (1 + i_monthly)^month</li>
              <li>Calculate ending balance</li>
              <li>Repeat until bridge account reaches $0 at age 59½</li>
            </ol>
          </div>

          <div>
            <h4
              className="text-sm mb-2 font-semibold"
              style={{ color: "var(--deep-teal-700)" }}
            >
              During retirement phase (59½ → 92)
            </h4>
            <ol className="list-decimal pl-6 space-y-2 text-sm" style={{ color: "var(--warm-gray-700)" }}>
              <li>Start with beginning balance (from retirement account)</li>
              <li>Add interest earned: balance × r_before_monthly</li>
              <li>Subtract monthly spending (inflated): -monthly_spending × (1 + i_monthly)^month</li>
              <li>Calculate ending balance</li>
              <li>Repeat until retirement account reaches $0 at age 92</li>
            </ol>
          </div>
        </div>

        <div
          className="mt-6 p-4 rounded-lg border"
          style={{
            backgroundColor: "var(--seafoam-50)",
            borderColor: "var(--seafoam-200)",
          }}
        >
          <p className="text-sm" style={{ color: "var(--seafoam-800)" }}>
            <strong>Success criteria:</strong> Both accounts should reach exactly $0 (or
            within $1 due to rounding) at their respective end dates. This proves our
            contribution calculations are correct.
          </p>
        </div>
      </Section>

      {/* Why This Works */}
      <Section title="Why This Approach Works">
        <div className="space-y-4">
          <div>
            <h4
              className="text-sm mb-2 font-semibold"
              style={{ color: "var(--deep-teal-700)" }}
            >
              ✓ Tax optimization
            </h4>
            <p className="text-sm" style={{ color: "var(--warm-gray-700)" }}>
              By separating bridge and retirement accounts, we avoid early withdrawal
              penalties while maximizing tax-deferred growth.
            </p>
          </div>

          <div>
            <h4
              className="text-sm mb-2 font-semibold"
              style={{ color: "var(--deep-teal-700)" }}
            >
              ✓ Inflation-adjusted
            </h4>
            <p className="text-sm" style={{ color: "var(--warm-gray-700)" }}>
              Spending is maintained in today's dollars but adjusted for inflation each
              month. This maintains purchasing power.
            </p>
          </div>

          <div>
            <h4
              className="text-sm mb-2 font-semibold"
              style={{ color: "var(--deep-teal-700)" }}
            >
              ✓ Fixed contributions
            </h4>
            <p className="text-sm" style={{ color: "var(--warm-gray-700)" }}>
              Same dollar amount every month makes it easy to automate and budget.
              Set it and forget it.
            </p>
          </div>

          <div>
            <h4
              className="text-sm mb-2 font-semibold"
              style={{ color: "var(--deep-teal-700)" }}
            >
              ✓ Conservative planning
            </h4>
            <p className="text-sm" style={{ color: "var(--warm-gray-700)" }}>
              Planning to zero at age 92 is conservative. If you want to leave money
              behind, the plan naturally provides a buffer.
            </p>
          </div>
        </div>
      </Section>

      {/* Common Adjustments */}
      <Section title="Common Adjustments">
        <div className="space-y-4">
          <Adjustment
            title="Want to leave money behind?"
            description="Reduce your annual spending assumption or extend your end age beyond 92. This creates a buffer that becomes your legacy."
          />
          <Adjustment
            title="Expecting irregular income?"
            description="The calculator shows you the baseline. You can contribute more in good months and catch up when income dips."
          />
          <Adjustment
            title="Want to retire earlier than 59½?"
            description="You'll need more in your bridge account. Adjust your freedom age down and watch how contributions shift toward the bridge leg."
          />
          <Adjustment
            title="More conservative growth assumptions?"
            description="Lower the 'before inflation' rate. This increases required contributions but provides more confidence."
          />
        </div>
      </Section>

      {/* Footer */}
      <div
        className="mt-12 pt-6 border-t"
        style={{ borderColor: "var(--warm-gray-200)" }}
      >
        <p className="text-xs" style={{ color: "var(--warm-gray-400)" }}>
          Last updated: March 2026 — MoneyBeh Calculator Math v1.0
        </p>
      </div>
    </div>
  );
}

// ─── Helper Components ────────────────────────────────────────────────────────

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2
        className="text-xl mb-4 pb-2 border-b"
        style={{
          color: "var(--ink)",
          fontWeight: 600,
          borderColor: "var(--warm-gray-200)",
        }}
      >
        {title}
      </h2>
      <div
        className="text-sm leading-relaxed"
        style={{ color: "var(--warm-gray-700)" }}
      >
        {children}
      </div>
    </section>
  );
}

function Variable({
  name,
  label,
  description,
}: {
  name: string;
  label: string;
  description: string;
}) {
  return (
    <div
      className="p-4 rounded-lg border"
      style={{
        backgroundColor: "var(--warm-gray-50)",
        borderColor: "var(--warm-gray-200)",
      }}
    >
      <div className="flex items-baseline gap-2 mb-1">
        <code
          className="text-xs px-1.5 py-0.5 rounded"
          style={{
            backgroundColor: "var(--deep-teal-100)",
            color: "var(--deep-teal-700)",
            fontFamily: "monospace",
          }}
        >
          {name}
        </code>
        <span className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
          {label}
        </span>
      </div>
      <p className="text-xs" style={{ color: "var(--warm-gray-600)" }}>
        {description}
      </p>
    </div>
  );
}

function Formula({
  title,
  formula,
  example,
  note,
}: {
  title?: string;
  formula: string;
  example?: string;
  note?: string;
}) {
  return (
    <div
      className="mb-4 p-4 rounded-lg border"
      style={{
        backgroundColor: "var(--paper)",
        borderColor: "var(--warm-gray-200)",
      }}
    >
      {title && (
        <h5
          className="text-sm mb-2 font-medium"
          style={{ color: "var(--warm-gray-700)" }}
        >
          {title}
        </h5>
      )}
      <code
        className="block p-3 rounded text-sm mb-2"
        style={{
          backgroundColor: "var(--warm-gray-100)",
          color: "var(--deep-teal-800)",
          fontFamily: "monospace",
          overflowX: "auto",
        }}
      >
        {formula}
      </code>
      {example && (
        <p
          className="text-xs mb-2"
          style={{ color: "var(--warm-gray-600)", fontStyle: "italic" }}
        >
          Example: {example}
        </p>
      )}
      {note && (
        <p className="text-xs" style={{ color: "var(--warm-gray-500)" }}>
          💡 {note}
        </p>
      )}
    </div>
  );
}

function Adjustment({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      className="p-4 rounded-lg border"
      style={{
        backgroundColor: "var(--warm-gray-50)",
        borderColor: "var(--warm-gray-200)",
      }}
    >
      <h5
        className="text-sm mb-1 font-semibold"
        style={{ color: "var(--ink)" }}
      >
        {title}
      </h5>
      <p className="text-sm" style={{ color: "var(--warm-gray-600)" }}>
        {description}
      </p>
    </div>
  );
}
