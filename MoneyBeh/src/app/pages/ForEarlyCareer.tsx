import { Link as RouterLink } from "react-router";
import { Clock, TrendingUp, Zap, ArrowRight } from "lucide-react";

const multiplierData = [
  { age: 22, label: "Start at 22", monthly: 500, result: "$1,890,000", years: 43, color: "var(--seafoam-500)", textColor: "var(--seafoam-700)", bg: "var(--seafoam-50)", border: "var(--seafoam-200)", barPct: "100%" },
  { age: 32, label: "Start at 32", monthly: 500, result: "$871,000", years: 33, color: "var(--deep-teal-500)", textColor: "var(--deep-teal-700)", bg: "var(--deep-teal-50)", border: "var(--deep-teal-200)", barPct: "46%" },
  { age: 42, label: "Start at 42", monthly: 500, result: "$349,000", years: 23, color: "var(--warm-gray-400)", textColor: "var(--warm-gray-600)", bg: "var(--warm-gray-100)", border: "var(--warm-gray-300)", barPct: "18%" },
];

export function ForEarlyCareer() {
  return (
    <div>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-4xl mx-auto text-center" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mx-auto"
              style={{ backgroundColor: "var(--seafoam-100)", border: "1px solid var(--seafoam-200)" }}
            >
              <Zap size={14} style={{ color: "var(--seafoam-600)" }} />
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--seafoam-700)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                The Foundation
              </span>
            </div>
            <h1
              className="tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 500, lineHeight: 1.1, color: "var(--ink)" }}
            >
              You're sitting on a superpower.
              <br />
              <span style={{ color: "var(--seafoam-600)" }}>You just can't see it yet.</span>
            </h1>
            <p
              className="max-w-2xl mx-auto"
              style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.375rem)", lineHeight: 1.6, color: "var(--warm-gray-700)" }}
            >
              Every dollar you invest at 22 is worth roughly 10× what it would be at 52.
              Not because of discipline. Because of Time — the one asset no one can buy more of.
            </p>
          </div>

          <div style={{ paddingTop: "0.5rem" }}>
            <RouterLink
              to="/start"
              className="inline-block transition-all duration-300 ease-out"
              style={{
                backgroundColor: "var(--seafoam-500)",
                color: "var(--paper)",
                padding: "1rem 2.5rem",
                borderRadius: "1.5rem",
                fontSize: "1.0625rem",
                fontWeight: 500,
                lineHeight: 1.5,
                textDecoration: "none",
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--seafoam-600)")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--seafoam-500)")}
            >
              Find your starting point
            </RouterLink>
          </div>

          <p style={{ fontSize: "0.875rem", color: "var(--warm-gray-500)", lineHeight: 1.5 }}>
            Free to start. No credit card needed.
          </p>
        </div>
      </section>

      {/* ─── The Multiplier Effect ─────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ backgroundColor: "var(--warm-gray-50)" }}>
        <div className="max-w-5xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          <div className="text-center" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="flex items-center justify-center gap-2">
              <Clock size={24} style={{ color: "var(--seafoam-600)" }} />
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--seafoam-600)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                The Multiplier Effect
              </span>
            </div>
            <h2
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)" }}
            >
              Same $500/month. Wildly different outcomes.
            </h2>
            <p
              className="max-w-xl mx-auto"
              style={{ fontSize: "1.125rem", lineHeight: 1.65, color: "var(--warm-gray-600)" }}
            >
              This isn't a lecture about sacrifice. This is math.
              Starting earlier doesn't just help — it multiplies.
            </p>
          </div>

          {/* Multiplier visualization */}
          <div className="grid md:grid-cols-3 gap-4">
            {multiplierData.map((row) => (
              <div
                key={row.age}
                className="rounded-[1.5rem] p-6"
                style={{
                  backgroundColor: row.bg,
                  border: `1px solid ${row.border}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                <div>
                  <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: row.textColor, marginBottom: "0.25rem" }}>
                    {row.label}
                  </div>
                  <div style={{ fontSize: "0.8125rem", color: "var(--warm-gray-500)", lineHeight: 1.5 }}>
                    $500/month · {row.years} years · 7% avg return
                  </div>
                </div>

                {/* Bar */}
                <div
                  className="rounded-full"
                  style={{ height: "6px", backgroundColor: "var(--warm-gray-200)" }}
                >
                  <div
                    className="rounded-full transition-all"
                    style={{ width: row.barPct, height: "100%", backgroundColor: row.color }}
                  />
                </div>

                <div>
                  <div style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 400, color: row.textColor, lineHeight: 1.1 }}>
                    {row.result}
                  </div>
                  <div style={{ fontSize: "0.8125rem", color: "var(--warm-gray-500)", marginTop: "0.25rem", lineHeight: 1.5 }}>
                    by retirement at 65
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="rounded-[1.5rem] p-6 sm:p-8"
            style={{ backgroundColor: "var(--paper)", border: "1px solid var(--seafoam-200)", display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <p style={{ fontSize: "1.25rem", fontWeight: 500, color: "var(--ink)", lineHeight: 1.5 }}>
              The 10-year difference between starting at 22 vs. 32: <span style={{ color: "var(--seafoam-600)" }}>$1,019,000.</span>
            </p>
            <p style={{ fontSize: "1rem", color: "var(--warm-gray-600)", lineHeight: 1.65 }}>
              That's not money you invested. That's time compounding on your behalf while you slept. You're in that window right now.
              MoneyBeh helps you see your timeline clearly so you never accidentally let it close.
            </p>
          </div>
        </div>
      </section>

      {/* ─── The Joy Fund ──────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Mockup */}
          <div
            className="rounded-[2rem] p-6 sm:p-8"
            style={{ backgroundColor: "var(--warm-gray-100)", boxShadow: "0 4px 24px 0 rgba(0,0,0,0.06)" }}
          >
            <div
              className="rounded-[1.5rem] p-6"
              style={{ backgroundColor: "var(--paper)", display: "flex", flexDirection: "column", gap: "1.25rem" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "1rem", borderBottom: "1px solid var(--warm-gray-200)" }}>
                <span style={{ fontSize: "1rem", fontWeight: 500, color: "var(--ink)" }}>Your 20s Budget</span>
                <span style={{ fontSize: "0.75rem", color: "var(--warm-gray-500)", backgroundColor: "var(--warm-gray-50)", padding: "0.375rem 0.75rem", borderRadius: "9999px" }}>
                  $3,400/mo
                </span>
              </div>

              {/* Essentials */}
              <div className="rounded-xl p-4" style={{ backgroundColor: "var(--warm-gray-50)", border: "1px solid var(--warm-gray-200)", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.9375rem", fontWeight: 500, color: "var(--ink)" }}>Essentials</span>
                  <span style={{ fontSize: "1.125rem", color: "var(--ink)" }}>$1,700</span>
                </div>
                <div style={{ fontSize: "0.8125rem", color: "var(--warm-gray-500)", lineHeight: 1.5 }}>Rent · groceries · utilities · phone</div>
              </div>

              {/* Joy — elevated */}
              <div className="rounded-xl p-4" style={{ backgroundColor: "var(--sand-50)", border: "2px solid var(--sand-300)", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "9999px", backgroundColor: "var(--sand-500)" }} />
                    <span style={{ fontSize: "0.9375rem", fontWeight: 500, color: "var(--ink)" }}>Joy Fund</span>
                  </div>
                  <span style={{ fontSize: "1.125rem", color: "var(--ink)" }}>$850</span>
                </div>
                <div style={{ fontSize: "0.8125rem", color: "var(--warm-gray-600)", lineHeight: 1.5 }}>Concerts, travel, dining, hobbies</div>
                <div style={{ paddingTop: "0.5rem", borderTop: "1px solid var(--sand-200)" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--sand-700)", fontWeight: 600 }}>Guilt-free. Always. →</span>
                </div>
              </div>

              {/* Savings */}
              <div className="rounded-xl p-4" style={{ backgroundColor: "var(--seafoam-50)", border: "1px solid var(--seafoam-200)", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "9999px", backgroundColor: "var(--seafoam-500)" }} />
                    <span style={{ fontSize: "0.9375rem", fontWeight: 500, color: "var(--ink)" }}>Freedom Savings</span>
                  </div>
                  <span style={{ fontSize: "1.125rem", color: "var(--ink)" }}>$850</span>
                </div>
                <div style={{ fontSize: "0.8125rem", color: "var(--warm-gray-600)", lineHeight: 1.5 }}>Compounding while you live your life</div>
                <div style={{ paddingTop: "0.5rem", borderTop: "1px solid var(--seafoam-200)" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--seafoam-700)", fontWeight: 600 }}>Buying you 43 years of compounding time</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)" }}>
                Your 20s are for living.
                <br />
                <span style={{ color: "var(--seafoam-600)" }}>Both things are true.</span>
              </h2>
              <p style={{ fontSize: "1.1875rem", color: "var(--warm-gray-700)", lineHeight: 1.5 }}>
                The Joy Fund isn't a compromise. It's a commitment to spending on what actually matters to you.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "1rem", color: "var(--warm-gray-700)", lineHeight: 1.65 }}>
              <p>
                MoneyBeh splits your money into three intentional buckets: Essentials, Joy, and Freedom savings.
                You decide the sizes. We handle the math.
              </p>
              <p>
                This isn't about deprivation. It's about intention. You'll spend the same amount — or less — and enjoy it more
                because every dollar has a purpose. Including the ones you spend on yourself.
              </p>
              <p>
                The best part? You're building freedom at the same time.
                Not "someday" freedom. A specific date, getting closer every month.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Freedom Timeline ──────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ backgroundColor: "var(--warm-gray-50)" }}>
        <div className="max-w-5xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          <div className="text-center" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="flex items-center justify-center gap-2">
              <TrendingUp size={24} style={{ color: "var(--deep-teal-500)" }} />
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--deep-teal-600)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Your Freedom Timeline
              </span>
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)" }}>
              See the finish line. Then stop worrying.
            </h2>
            <p className="max-w-xl mx-auto" style={{ fontSize: "1.125rem", lineHeight: 1.65, color: "var(--warm-gray-600)" }}>
              Most people your age are operating without a map. MoneyBeh gives you one —
              with a real date for when work becomes optional.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "You are here", sub: "Age 24", note: "Starting your journey", accent: "var(--warm-gray-400)", bg: "var(--warm-gray-100)", border: "var(--warm-gray-300)" },
              { label: "Essentials Covered", sub: "Age 38", note: "Your bills pay themselves from investments", accent: "var(--seafoam-500)", bg: "var(--seafoam-50)", border: "var(--seafoam-200)" },
              { label: "Full Freedom", sub: "Age 47", note: "Work if you want. Never because you have to.", accent: "var(--deep-teal-500)", bg: "var(--deep-teal-50)", border: "var(--deep-teal-200)" },
            ].map((milestone, i) => (
              <div
                key={i}
                className="rounded-[1.5rem] p-6"
                style={{ backgroundColor: milestone.bg, border: `1px solid ${milestone.border}`, display: "flex", flexDirection: "column", gap: "0.75rem" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "9999px", backgroundColor: milestone.accent }} />
                  <span style={{ fontSize: "0.75rem", fontWeight: 600, color: milestone.accent, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {i === 0 ? "Now" : `+${i === 1 ? "14" : "23"} years`}
                  </span>
                </div>
                <div>
                  <div style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--ink)", lineHeight: 1.4 }}>{milestone.label}</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 400, color: milestone.accent, lineHeight: 1.2, marginTop: "0.25rem" }}>{milestone.sub}</div>
                </div>
                <div style={{ fontSize: "0.8125rem", color: "var(--warm-gray-600)", lineHeight: 1.5 }}>{milestone.note}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p style={{ fontSize: "1rem", color: "var(--warm-gray-500)", lineHeight: 1.65, maxWidth: "36rem", margin: "0 auto" }}>
              These aren't generic projections. MoneyBeh calculates your actual timeline based on your income, spending, and savings rate.
              Then updates it every time you do.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 text-center">
        <div className="max-w-2xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "center" }}>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)" }}>
            The best time to start was yesterday.
            <br />
            <span style={{ color: "var(--seafoam-600)" }}>The second best time is now.</span>
          </h2>
          <p style={{ fontSize: "1.125rem", color: "var(--warm-gray-600)", lineHeight: 1.65, maxWidth: "28rem" }}>
            Every month you wait is a month of compounding you don't get back.
            It takes less than 10 minutes to see your timeline.
          </p>
          <RouterLink
            to="/start"
            className="inline-flex items-center gap-2 transition-all duration-300 ease-out"
            style={{
              backgroundColor: "var(--seafoam-500)",
              color: "var(--paper)",
              padding: "1rem 2.5rem",
              borderRadius: "1.5rem",
              fontSize: "1.0625rem",
              fontWeight: 500,
              lineHeight: 1.5,
              textDecoration: "none",
              marginTop: "0.5rem",
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--seafoam-600)")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--seafoam-500)")}
          >
            Start here
            <ArrowRight size={18} />
          </RouterLink>
        </div>
      </section>
    </div>
  );
}
