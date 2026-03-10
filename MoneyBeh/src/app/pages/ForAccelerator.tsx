import { Link as RouterLink } from "react-router";
import { ArrowRight, Zap, TrendingUp, Lock } from "lucide-react";

const driftVsCapture = [
  {
    path: "The Drift Path",
    desc: "Income rises. Lifestyle quietly absorbs the difference. Subscriptions stack. The apartment upgrades. The savings rate stays the same — or drops.",
    outcome: "In 3 years: same financial position, higher cost of living, harder to unwind.",
    type: "drift",
    bg: "var(--warm-gray-100)",
    border: "var(--warm-gray-300)",
    labelColor: "var(--warm-gray-500)",
    outcomeColor: "var(--warm-gray-600)",
  },
  {
    path: "The Momentum Window",
    desc: "Income rises. You capture the delta immediately — before lifestyle adjusts. The gap between old lifestyle and new income goes directly to Freedom savings.",
    outcome: "In 3 years: same lifestyle as before, but with 3 years of maximum-runway compounding running in the background.",
    type: "capture",
    bg: "var(--seafoam-50)",
    border: "var(--seafoam-300)",
    labelColor: "var(--seafoam-600)",
    outcomeColor: "var(--seafoam-700)",
  },
];

const momentumLevers = [
  {
    number: "1",
    lever: "Lock the baseline",
    action: "Keep your lifestyle at its current level for 12 months — exactly as it is today.",
    why: "Lifestyle doesn't feel the freeze. It feels the same. But the delta starts compounding immediately.",
    color: "var(--seafoam-500)",
    bg: "var(--seafoam-50)",
    border: "var(--seafoam-200)",
  },
  {
    number: "2",
    lever: "Capture the delta",
    action: "Route the income gap — the difference between old income and new — directly to Freedom savings.",
    why: "This money has no lifestyle attached to it yet. It goes to work before drift assigns it a job.",
    color: "var(--deep-teal-500)",
    bg: "var(--deep-teal-50)",
    border: "var(--deep-teal-200)",
  },
  {
    number: "3",
    lever: "Grow the Joy Fund intentionally",
    action: "Yes, celebrate the raise. Increase your Joy Fund by a deliberate amount — one you choose, not one drift chooses for you.",
    why: "This isn't deprivation. It's the difference between spending on purpose and spending on autopilot.",
    color: "var(--seafoam-600)",
    bg: "var(--seafoam-50)",
    border: "var(--seafoam-300)",
  },
];

export function ForAccelerator() {
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
                The Momentum Window
              </span>
            </div>
            <h1
              className="tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 500, lineHeight: 1.1, color: "var(--ink)" }}
            >
              Your income just jumped.
              <br />
              <span style={{ color: "var(--seafoam-600)" }}>This window won't stay open long.</span>
            </h1>
            <p
              className="max-w-2xl mx-auto"
              style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.375rem)", lineHeight: 1.6, color: "var(--warm-gray-700)" }}
            >
              The moment income rises, lifestyle starts adjusting to fill it.
              The gap between your old lifestyle and your new income — the best financial opportunity of your life — exists for about 90 days.
              MoneyBeh helps you capture it before drift does.
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
              Capture my window
            </RouterLink>
          </div>

          <p style={{ fontSize: "0.875rem", color: "var(--warm-gray-500)", lineHeight: 1.5 }}>
            Free to start. No credit card needed.
          </p>
        </div>
      </section>

      {/* ─── The Fork ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ backgroundColor: "var(--warm-gray-50)" }}>
        <div className="max-w-5xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          <div className="text-center" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="flex items-center justify-center gap-2">
              <TrendingUp size={20} style={{ color: "var(--seafoam-500)" }} />
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--seafoam-600)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                The Fork
              </span>
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)" }}>
              Two paths open the moment income rises.
            </h2>
            <p className="max-w-xl mx-auto" style={{ fontSize: "1.125rem", lineHeight: 1.65, color: "var(--warm-gray-600)" }}>
              Most people don't choose. Drift chooses for them.
              MoneyBeh makes the choice visible — before it's made by default.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-5">
            {driftVsCapture.map((item, i) => (
              <div
                key={i}
                className="rounded-[1.5rem] p-6 sm:p-8"
                style={{ backgroundColor: item.bg, border: `1.5px solid ${item.border}`, display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "9999px", backgroundColor: item.type === "drift" ? "var(--warm-gray-400)" : "var(--seafoam-500)" }} />
                  <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: item.labelColor, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {item.path}
                  </span>
                </div>
                <p style={{ fontSize: "0.9375rem", color: "var(--warm-gray-700)", lineHeight: 1.65 }}>{item.desc}</p>
                <div
                  className="rounded-xl p-4"
                  style={{ backgroundColor: item.type === "drift" ? "var(--warm-gray-200)" : "var(--seafoam-100)", marginTop: "0.25rem" }}
                >
                  <p style={{ fontSize: "0.875rem", fontWeight: 500, color: item.outcomeColor, lineHeight: 1.55 }}>{item.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── The Delta Math ───────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Visual: The Opportunity Gap */}
          <div
            className="rounded-[2rem] p-6 sm:p-8"
            style={{ backgroundColor: "var(--warm-gray-100)", boxShadow: "0 4px 24px 0 rgba(0,0,0,0.06)" }}
          >
            <div
              className="rounded-[1.5rem] p-6"
              style={{ backgroundColor: "var(--paper)", display: "flex", flexDirection: "column", gap: "1.25rem" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "1rem", borderBottom: "1px solid var(--warm-gray-200)" }}>
                <span style={{ fontSize: "1rem", fontWeight: 500, color: "var(--ink)" }}>Your Income Jump</span>
                <span style={{ fontSize: "0.75rem", color: "var(--warm-gray-500)", backgroundColor: "var(--warm-gray-50)", padding: "0.375rem 0.75rem", borderRadius: "9999px" }}>
                  This month
                </span>
              </div>

              {/* Old income */}
              <div className="rounded-xl p-4" style={{ backgroundColor: "var(--warm-gray-100)", border: "1px solid var(--warm-gray-200)", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.875rem", color: "var(--warm-gray-500)" }}>Previous income</span>
                  <span style={{ fontSize: "1.0625rem", color: "var(--warm-gray-600)" }}>$6,500/mo</span>
                </div>
              </div>

              {/* New income */}
              <div className="rounded-xl p-4" style={{ backgroundColor: "var(--seafoam-50)", border: "1px solid var(--seafoam-200)", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--seafoam-700)" }}>New income</span>
                  <span style={{ fontSize: "1.0625rem", fontWeight: 600, color: "var(--seafoam-700)" }}>$8,800/mo</span>
                </div>
              </div>

              {/* The Gap — highlighted */}
              <div className="rounded-xl p-5" style={{ backgroundColor: "var(--deep-teal-50)", border: "2px solid var(--deep-teal-300)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--deep-teal-600)", textTransform: "uppercase", letterSpacing: "0.06em" }}>The Opportunity Gap</span>
                    <span style={{ fontSize: "0.875rem", color: "var(--warm-gray-600)" }}>Money without a lifestyle yet</span>
                  </div>
                  <span style={{ fontSize: "1.5rem", fontWeight: 400, color: "var(--deep-teal-700)" }}>$2,300/mo</span>
                </div>
                <div style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid var(--deep-teal-200)" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                    {[
                      { label: "Joy Fund increase", val: "+$500", color: "var(--sand-700)" },
                      { label: "Freedom savings", val: "+$1,800", color: "var(--seafoam-700)" },
                    ].map((row, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "0.8125rem", color: "var(--warm-gray-600)" }}>{row.label}</span>
                        <span style={{ fontSize: "0.9375rem", fontWeight: 600, color: row.color }}>{row.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Compounding note */}
              <div className="rounded-xl p-4 text-center" style={{ backgroundColor: "var(--seafoam-500)" }}>
                <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--paper)" }}>
                  $1,800/mo captured now → $612,000 in 15 years
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--seafoam-100)", marginTop: "0.25rem" }}>at 7% avg return · your maximum-runway window</div>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)" }}>
                The gap is money without a job yet.
                <br />
                <span style={{ color: "var(--seafoam-600)" }}>Don't let drift hire it first.</span>
              </h2>
              <p style={{ fontSize: "1.1875rem", color: "var(--warm-gray-700)", lineHeight: 1.5 }}>
                The difference between your old lifestyle and your new income is the most powerful financial asset you'll ever have — because it's unattached.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "1rem", color: "var(--warm-gray-700)", lineHeight: 1.65 }}>
              <p>
                Most people think about income jumps in terms of what they can now afford. MoneyBeh flips the question: what do you want to capture before affordability becomes expectation?
              </p>
              <p>
                Drift doesn't feel like a decision. The Amazon Prime upgrade, the nicer gym, the slightly better apartment — each one is small. Together, they absorb the raise entirely. Six months later, nothing has changed except your baseline.
              </p>
              <p>
                The Opportunity Gap is the number MoneyBeh shows you immediately. Then it helps you assign it a job — Joy Fund, Freedom savings, or both — before drift assigns it one for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── The Three Momentum Levers ────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ backgroundColor: "var(--warm-gray-50)" }}>
        <div className="max-w-5xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          <div className="text-center" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="flex items-center justify-center gap-2">
              <Lock size={20} style={{ color: "var(--deep-teal-500)" }} />
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--deep-teal-600)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Momentum Capture
              </span>
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)" }}>
              Three moves. Done once. Working forever.
            </h2>
            <p className="max-w-xl mx-auto" style={{ fontSize: "1.125rem", lineHeight: 1.65, color: "var(--warm-gray-600)" }}>
              You don't need a full financial overhaul. You need three intentional moves made right now — while the window is still open.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {momentumLevers.map((item, i) => (
              <div
                key={i}
                className="rounded-[1.5rem] p-6 sm:p-8"
                style={{ backgroundColor: item.bg, border: `1px solid ${item.border}`, display: "flex", flexDirection: "column", gap: "0.875rem" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: item.color }}
                  >
                    <span style={{ color: "var(--paper)", fontSize: "0.875rem", fontWeight: 600 }}>{item.number}</span>
                  </div>
                  <div style={{ fontSize: "1.0625rem", fontWeight: 600, color: "var(--ink)" }}>{item.lever}</div>
                </div>
                <div style={{ paddingLeft: "2.75rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <p style={{ fontSize: "0.9375rem", color: "var(--warm-gray-700)", lineHeight: 1.6 }}>{item.action}</p>
                  <div
                    className="rounded-lg px-3 py-2"
                    style={{ backgroundColor: "rgba(255,255,255,0.7)", border: `1px solid ${item.border}`, maxWidth: "fit-content" }}
                  >
                    <span style={{ fontSize: "0.8125rem", color: item.color, fontWeight: 500 }}>Why: {item.why}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="rounded-[1.5rem] p-6 sm:p-8"
            style={{ backgroundColor: "var(--deep-teal-50)", border: "1px solid var(--deep-teal-200)" }}
          >
            <p style={{ fontSize: "1.125rem", fontWeight: 500, color: "var(--deep-teal-800)", lineHeight: 1.5, marginBottom: "0.5rem" }}>
              This isn't about living the same life after a raise.
            </p>
            <p style={{ fontSize: "1rem", color: "var(--deep-teal-700)", lineHeight: 1.65 }}>
              Your Joy Fund goes up. You feel the raise. You celebrate it. The difference is you also capture the opportunity — deliberately — instead of watching it silently become subscription fees and habit creep. Both things can be true.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 text-center">
        <div className="max-w-2xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "center" }}>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)" }}>
            The window is open right now.
            <br />
            <span style={{ color: "var(--seafoam-600)" }}>Let's use it.</span>
          </h2>
          <p style={{ fontSize: "1.125rem", color: "var(--warm-gray-600)", lineHeight: 1.65, maxWidth: "28rem" }}>
            See your Opportunity Gap. Set your three levers. Let MoneyBeh calculate the Freedom impact before drift does the math for you.
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
            Capture my window
            <ArrowRight size={18} />
          </RouterLink>
        </div>
      </section>
    </div>
  );
}
