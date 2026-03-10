import { Link as RouterLink } from "react-router";
import { ArrowRight, TrendingUp, Brain, Sparkles } from "lucide-react";

const driftData = [
  { year: "Year 1", income: "$95k", savings: "$14k", pct: "15%", drift: false },
  { year: "Year 3", income: "$130k", savings: "$13k", pct: "10%", drift: true },
  { year: "Year 5", income: "$165k", savings: "$11k", pct: "7%", drift: true },
  { year: "Year 7", income: "$200k", savings: "$10k", pct: "5%", drift: true },
];

export function ForHighEarners() {
  return (
    <div>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-4xl mx-auto text-center" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mx-auto"
              style={{ backgroundColor: "var(--deep-teal-100)", border: "1px solid var(--deep-teal-200)" }}
            >
              <TrendingUp size={14} style={{ color: "var(--deep-teal-600)" }} />
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--deep-teal-700)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                The Trap
              </span>
            </div>
            <h1
              className="tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 500, lineHeight: 1.1, color: "var(--ink)" }}
            >
              Six figures.
              <br />
              <span style={{ color: "var(--deep-teal-600)" }}>Still checking your account before dinner.</span>
            </h1>
            <p
              className="max-w-2xl mx-auto"
              style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.375rem)", lineHeight: 1.6, color: "var(--warm-gray-700)" }}
            >
              You've earned more as your career has grown. But somehow, there's never quite enough left.
              That's not a discipline problem. It's Lifestyle Drift — and it has a cure.
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
        </div>
      </section>

      {/* ─── The Drift ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ backgroundColor: "var(--warm-gray-50)" }}>
        <div className="max-w-5xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          <div className="text-center" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="flex items-center justify-center gap-2">
              <TrendingUp size={20} style={{ color: "var(--deep-teal-500)" }} />
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--deep-teal-600)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Lifestyle Drift
              </span>
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)" }}>
              Your income went up. Your savings rate went down.
            </h2>
            <p className="max-w-xl mx-auto" style={{ fontSize: "1.125rem", lineHeight: 1.65, color: "var(--warm-gray-600)" }}>
              Lifestyle Drift isn't a character flaw. It's a system problem.
              When income rises without a plan, spending rises to fill the gap.
            </p>
          </div>

          {/* Drift table */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div
              className="rounded-xl px-6 py-3 grid grid-cols-4 gap-4"
              style={{ backgroundColor: "transparent" }}
            >
              {["", "Income", "Saved", "Savings Rate"].map((h, i) => (
                <div key={i} style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--warm-gray-400)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {h}
                </div>
              ))}
            </div>
            {driftData.map((row) => (
              <div
                key={row.year}
                className="rounded-[1.25rem] px-6 py-4 grid grid-cols-4 gap-4 items-center"
                style={{
                  backgroundColor: row.drift ? "var(--paper)" : "var(--seafoam-50)",
                  border: `1px solid ${row.drift ? "var(--warm-gray-200)" : "var(--seafoam-200)"}`,
                }}
              >
                <div style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--ink)" }}>{row.year}</div>
                <div style={{ fontSize: "0.9375rem", color: "var(--ink)" }}>{row.income}</div>
                <div style={{ fontSize: "0.9375rem", color: "var(--ink)" }}>{row.savings}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span
                    style={{
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      color: row.drift ? "var(--warm-gray-500)" : "var(--seafoam-700)",
                    }}
                  >
                    {row.pct}
                  </span>
                  {row.drift && (
                    <span style={{ fontSize: "0.75rem", color: "var(--warm-gray-400)", lineHeight: 1.5 }}>↓ drifting</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div
            className="rounded-[1.5rem] p-6 sm:p-8"
            style={{ backgroundColor: "var(--deep-teal-50)", border: "1px solid var(--deep-teal-200)" }}
          >
            <p style={{ fontSize: "1.125rem", fontWeight: 500, color: "var(--deep-teal-800)", lineHeight: 1.5, marginBottom: "0.75rem" }}>
              The pattern is almost universal among high earners.
            </p>
            <p style={{ fontSize: "1rem", color: "var(--deep-teal-700)", lineHeight: 1.65 }}>
              Subscriptions stack. Apartments upgrade. Vacations expand. Restaurants shift.
              None of it feels like a decision — until you look at the savings rate and realize freedom is actually getting further away, not closer.
            </p>
          </div>
        </div>
      </section>

      {/* ─── The Joy Fund Aha Moment ──────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div className="flex items-center gap-2">
                <Sparkles size={20} style={{ color: "var(--sand-600)" }} />
                <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--sand-600)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  The Joy Fund
                </span>
              </div>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)" }}>
                Spend freely.
                <br />
                <span style={{ color: "var(--seafoam-600)" }}>Without the mental math.</span>
              </h2>
              <p style={{ fontSize: "1.1875rem", color: "var(--warm-gray-700)", lineHeight: 1.5 }}>
                The Joy Fund isn't a spending limit. It's permission. Once you fund it, every dollar inside it is yours to spend without a second thought.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "1rem", color: "var(--warm-gray-700)", lineHeight: 1.65 }}>
              <p>
                Right now, every purchase comes with an invisible tax: the mental energy of checking whether you can afford it.
                That's not freedom — that's low-grade financial anxiety wearing a nice watch.
              </p>
              <p>
                MoneyBeh ends the mental checking. Your Joy Fund is pre-approved, every month, in the amount you deliberately chose.
                When dinner is $200? You already said yes.
              </p>
              <p>
                And because Essentials and Freedom savings are handled separately, spending your Joy Fund never comes at the cost of your future.
              </p>
            </div>
          </div>

          {/* Mockup */}
          <div
            className="rounded-[2rem] p-6 sm:p-8"
            style={{ backgroundColor: "var(--warm-gray-100)", boxShadow: "0 4px 24px 0 rgba(0,0,0,0.06)" }}
          >
            <div
              className="rounded-[1.5rem] p-6"
              style={{ backgroundColor: "var(--paper)", display: "flex", flexDirection: "column", gap: "1.25rem" }}
            >
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "1rem", borderBottom: "1px solid var(--warm-gray-200)" }}>
                <span style={{ fontSize: "1rem", fontWeight: 500, color: "var(--ink)" }}>Your Money This Month</span>
                <span style={{ fontSize: "0.75rem", color: "var(--warm-gray-500)", backgroundColor: "var(--warm-gray-50)", padding: "0.375rem 0.75rem", borderRadius: "9999px" }}>
                  $14,500/mo
                </span>
              </div>

              {/* The three buckets */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div className="rounded-xl p-4" style={{ backgroundColor: "var(--warm-gray-50)", border: "1px solid var(--warm-gray-200)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                    <span style={{ fontSize: "0.9375rem", fontWeight: 500, color: "var(--ink)" }}>Essentials</span>
                    <span style={{ fontSize: "1.0625rem", color: "var(--ink)" }}>$6,200</span>
                  </div>
                  <div style={{ fontSize: "0.8125rem", color: "var(--warm-gray-500)", lineHeight: 1.5 }}>Mortgage · childcare · car · insurance</div>
                </div>

                {/* Joy — the star */}
                <div className="rounded-xl p-4" style={{ backgroundColor: "var(--sand-50)", border: "2px solid var(--sand-300)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                        <Sparkles size={14} style={{ color: "var(--sand-600)" }} />
                        <span style={{ fontSize: "0.9375rem", fontWeight: 500, color: "var(--ink)" }}>Joy Fund</span>
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--sand-700)", fontWeight: 600 }}>Pre-approved. Spend freely.</div>
                    </div>
                    <span style={{ fontSize: "1.5rem", fontWeight: 400, color: "var(--sand-700)" }}>$3,200</span>
                  </div>
                  <div style={{ borderTop: "1px solid var(--sand-200)", paddingTop: "0.75rem", marginTop: "0.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", color: "var(--warm-gray-600)" }}>
                      <span>Spent so far</span>
                      <span style={{ color: "var(--sand-700)", fontWeight: 600 }}>$1,840 / $3,200</span>
                    </div>
                    <div style={{ marginTop: "0.5rem", height: "6px", backgroundColor: "var(--sand-100)", borderRadius: "9999px" }}>
                      <div style={{ width: "57%", height: "100%", backgroundColor: "var(--sand-400)", borderRadius: "9999px" }} />
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--warm-gray-500)", marginTop: "0.375rem" }}>$1,360 still yours — no guilt required</div>
                  </div>
                </div>

                <div className="rounded-xl p-4" style={{ backgroundColor: "var(--seafoam-50)", border: "1px solid var(--seafoam-200)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                    <span style={{ fontSize: "0.9375rem", fontWeight: 500, color: "var(--ink)" }}>Freedom Savings</span>
                    <span style={{ fontSize: "1.0625rem", color: "var(--ink)" }}>$5,100</span>
                  </div>
                  <div style={{ fontSize: "0.8125rem", color: "var(--seafoam-700)", lineHeight: 1.5 }}>Auto-routed. Already on its way.</div>
                </div>
              </div>

              {/* Mental bandwidth meter */}
              <div
                className="rounded-xl p-4 text-center"
                style={{ backgroundColor: "var(--seafoam-50)", border: "1px solid var(--seafoam-200)" }}
              >
                <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--seafoam-700)", marginBottom: "0.25rem" }}>Mental bandwidth reclaimed</div>
                <div style={{ fontSize: "0.75rem", color: "var(--warm-gray-600)", lineHeight: 1.5 }}>
                  0 purchases questioned this month. Every one was already approved.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── The Mental Bandwidth Section ─────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ backgroundColor: "var(--warm-gray-50)" }}>
        <div className="max-w-3xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: "2.5rem", alignItems: "center", textAlign: "center" }}>
          <div className="flex items-center gap-2">
            <Brain size={20} style={{ color: "var(--deep-teal-500)" }} />
            <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--deep-teal-600)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              The Hidden Cost
            </span>
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)" }}>
            The constant checking is more expensive than the dinners.
          </h2>
          <p style={{ fontSize: "1.125rem", color: "var(--warm-gray-600)", lineHeight: 1.65 }}>
            Financial anxiety doesn't announce itself. It shows up as a quick glance at your balance before you order.
            A moment of hesitation before booking the trip. A vague unease that follows you into the weekend.
            For high earners, this is the real problem — not the income.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 w-full">
            {[
              { label: "Before MoneyBeh", desc: "Check balance → feel vague guilt → spend anyway → repeat", bg: "var(--warm-gray-100)", border: "var(--warm-gray-300)", accent: "var(--warm-gray-600)" },
              { label: "First week", desc: "Set your three buckets. Pick your Joy Fund amount. Done.", bg: "var(--seafoam-50)", border: "var(--seafoam-200)", accent: "var(--seafoam-700)" },
              { label: "Every month after", desc: "Joy Fund says yes. No checking. No guilt. Just spending.", bg: "var(--seafoam-50)", border: "var(--seafoam-300)", accent: "var(--seafoam-700)" },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-[1.25rem] p-5 text-left"
                style={{ backgroundColor: item.bg, border: `1px solid ${item.border}` }}
              >
                <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: item.accent, marginBottom: "0.5rem" }}>{item.label}</div>
                <div style={{ fontSize: "0.9375rem", color: "var(--warm-gray-700)", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 text-center">
        <div className="max-w-2xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "center" }}>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)" }}>
            Stop checking.
            <br />
            <span style={{ color: "var(--seafoam-600)" }}>Start living on purpose.</span>
          </h2>
          <p style={{ fontSize: "1.125rem", color: "var(--warm-gray-600)", lineHeight: 1.65, maxWidth: "28rem" }}>
            Your income already gives you the life you want. MoneyBeh gives you the plan that makes it feel that way.
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
            Find your starting point
            <ArrowRight size={18} />
          </RouterLink>
        </div>
      </section>
    </div>
  );
}
