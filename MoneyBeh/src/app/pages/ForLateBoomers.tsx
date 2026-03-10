import { Link as RouterLink } from "react-router";
import { ArrowRight, Flame, GitBranch, TrendingUp } from "lucide-react";

const condensedLevers = [
  {
    lever: "Cut the drag",
    action: "Eliminate the lifestyle categories that don't survive an honest Joy audit",
    impact: "Instantly increases your savings rate without feeling like sacrifice",
    color: "var(--seafoam-500)",
    bg: "var(--seafoam-50)",
    border: "var(--seafoam-200)",
  },
  {
    lever: "Velocity, not volume",
    action: "Route additional income — bonuses, raises, consulting work — directly to freedom savings",
    impact: "Each extra dollar has an outsized effect when compounding time is shorter",
    color: "var(--deep-teal-500)",
    bg: "var(--deep-teal-50)",
    border: "var(--deep-teal-200)",
  },
  {
    lever: "The Bridge strategy",
    action: "Use a Two-Stage model: grow aggressively now, then shift to a controlled draw-down",
    impact: "Turns a 20-year window into a viable path — without reckless moves",
    color: "var(--seafoam-600)",
    bg: "var(--seafoam-50)",
    border: "var(--seafoam-300)",
  },
];

export function ForLateBoomers() {
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
              <Flame size={14} style={{ color: "var(--deep-teal-600)" }} />
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--deep-teal-700)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                The Catch-Up
              </span>
            </div>
            <h1
              className="tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 500, lineHeight: 1.1, color: "var(--ink)" }}
            >
              You're not behind.
              <br />
              <span style={{ color: "var(--deep-teal-600)" }}>You're on a different path.</span>
            </h1>
            <p
              className="max-w-2xl mx-auto"
              style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.375rem)", lineHeight: 1.6, color: "var(--warm-gray-700)" }}
            >
              Starting your financial life at 45 or 52 isn't a disadvantage — it's a different optimization problem.
              One with real, proven levers. One that MoneyBeh is built to solve.
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

      {/* ─── The Reframe ──────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ backgroundColor: "var(--warm-gray-50)" }}>
        <div className="max-w-4xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          <div className="text-center" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)" }}>
              The problem isn't where you started.
              <br />It's the frame you're using.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div
              className="rounded-[1.5rem] p-6"
              style={{ backgroundColor: "var(--warm-gray-100)", border: "1px solid var(--warm-gray-300)", display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--warm-gray-500)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                The wrong frame
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {[
                  "\"I'm 20 years behind — I'll never catch up\"",
                  "\"I need to take big risks to make up for lost time\"",
                  "\"Compound interest doesn't work for me now\"",
                  "\"I should have started sooner. It's too late.\"",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                    <span style={{ color: "var(--warm-gray-400)", fontWeight: 600, flexShrink: 0, lineHeight: 1.5 }}>✗</span>
                    <span style={{ fontSize: "0.9375rem", color: "var(--warm-gray-600)", lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-[1.5rem] p-6"
              style={{ backgroundColor: "var(--seafoam-50)", border: "1px solid var(--seafoam-200)", display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--seafoam-600)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                The right frame
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {[
                  "\"I have a shorter window — so I optimize differently\"",
                  "\"Higher savings rates outperform higher risk\"",
                  "\"My peak earning years overlap with my freedom window\"",
                  "\"The Bridge strategy was designed for exactly this.\"",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                    <span style={{ color: "var(--seafoam-500)", fontWeight: 600, flexShrink: 0, lineHeight: 1.5 }}>✓</span>
                    <span style={{ fontSize: "0.9375rem", color: "var(--warm-gray-700)", lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="rounded-[1.5rem] p-6 sm:p-8"
            style={{ backgroundColor: "var(--deep-teal-50)", border: "1px solid var(--deep-teal-200)" }}
          >
            <p style={{ fontSize: "1.125rem", fontWeight: 500, color: "var(--deep-teal-800)", lineHeight: 1.5, marginBottom: "0.5rem" }}>
              A 52-year-old with 20 years still has 20 years of compounding.
            </p>
            <p style={{ fontSize: "1rem", color: "var(--deep-teal-700)", lineHeight: 1.65 }}>
              The math changes, but it doesn't disappear. What changes is your strategy — you optimize for velocity, not just volume.
              MoneyBeh shows you exactly which levers matter most at your stage.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Condensed Pathing ────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          <div className="text-center" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="flex items-center justify-center gap-2">
              <Flame size={20} style={{ color: "var(--deep-teal-500)" }} />
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--deep-teal-600)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Condensed Pathing
              </span>
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)" }}>
              Three levers. One focused strategy.
            </h2>
            <p className="max-w-xl mx-auto" style={{ fontSize: "1.125rem", lineHeight: 1.65, color: "var(--warm-gray-600)" }}>
              Condensed Pathing isn't about doing more — it's about doing the right things with higher precision.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {condensedLevers.map((item, i) => (
              <div
                key={i}
                className="rounded-[1.5rem] p-6 sm:p-8"
                style={{ backgroundColor: item.bg, border: `1px solid ${item.border}`, display: "flex", flexDirection: "column", gap: "0.75rem" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: item.color }}
                  >
                    <span style={{ color: "var(--paper)", fontSize: "0.875rem", fontWeight: 600 }}>{i + 1}</span>
                  </div>
                  <div style={{ fontSize: "1.0625rem", fontWeight: 600, color: "var(--ink)" }}>{item.lever}</div>
                </div>
                <div style={{ paddingLeft: "2.75rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <p style={{ fontSize: "0.9375rem", color: "var(--warm-gray-700)", lineHeight: 1.6 }}>{item.action}</p>
                  <div
                    className="inline-block px-3 py-1 rounded-full"
                    style={{ backgroundColor: item.color, maxWidth: "fit-content" }}
                  >
                    <span style={{ fontSize: "0.8125rem", color: "var(--paper)", fontWeight: 500 }}>Result: {item.impact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── The Bridge ───────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ backgroundColor: "var(--warm-gray-50)" }}>
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Bridge visual */}
          <div
            className="rounded-[2rem] p-6 sm:p-8"
            style={{ backgroundColor: "var(--paper)", border: "1px solid var(--warm-gray-200)", boxShadow: "0 4px 24px 0 rgba(0,0,0,0.04)" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <GitBranch size={16} style={{ color: "var(--deep-teal-500)" }} />
                <span style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--ink)" }}>Your Condensed Bridge</span>
              </div>

              {/* Current */}
              <div className="rounded-xl p-4" style={{ backgroundColor: "var(--warm-gray-100)", border: "1px solid var(--warm-gray-300)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--warm-gray-500)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Today</div>
                    <div style={{ fontSize: "1.0625rem", fontWeight: 500, color: "var(--ink)", marginTop: "0.25rem" }}>Age 52 · You are here</div>
                    <div style={{ fontSize: "0.875rem", color: "var(--warm-gray-600)", marginTop: "0.25rem" }}>$180k saved · $7,200/mo income</div>
                  </div>
                  <div style={{ width: "8px", height: "8px", borderRadius: "9999px", backgroundColor: "var(--warm-gray-700)", marginTop: "0.375rem" }} />
                </div>
              </div>

              {/* Vertical connector */}
              <div style={{ display: "flex", alignItems: "stretch", marginLeft: "1.25rem" }}>
                <div style={{ width: "2px", backgroundColor: "var(--seafoam-300)", minHeight: "2.5rem", flexShrink: 0 }} />
                <div style={{ paddingLeft: "1rem", paddingTop: "0.25rem" }}>
                  <div style={{ fontSize: "0.8125rem", color: "var(--seafoam-700)", fontWeight: 600 }}>Condensed Pathing activated</div>
                  <div style={{ fontSize: "0.8125rem", color: "var(--warm-gray-500)", lineHeight: 1.5 }}>Savings rate: 34% · Joy audit complete · Bridge routing set</div>
                </div>
              </div>

              {/* Milestone 1 */}
              <div className="rounded-xl p-4" style={{ backgroundColor: "var(--seafoam-50)", border: "1px solid var(--seafoam-200)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--seafoam-600)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Stage 1 Complete</div>
                    <div style={{ fontSize: "1.0625rem", fontWeight: 500, color: "var(--ink)", marginTop: "0.25rem" }}>Age 60 · Essentials Covered</div>
                    <div style={{ fontSize: "0.875rem", color: "var(--warm-gray-600)", marginTop: "0.25rem" }}>Bills pay themselves · work becomes a choice</div>
                  </div>
                  <div style={{ width: "8px", height: "8px", borderRadius: "9999px", backgroundColor: "var(--seafoam-500)", marginTop: "0.375rem" }} />
                </div>
              </div>

              {/* Connector */}
              <div style={{ display: "flex", alignItems: "stretch", marginLeft: "1.25rem" }}>
                <div style={{ width: "2px", backgroundColor: "var(--deep-teal-300)", minHeight: "2rem", flexShrink: 0 }} />
                <div style={{ paddingLeft: "1rem", paddingTop: "0.25rem" }}>
                  <div style={{ fontSize: "0.8125rem", color: "var(--deep-teal-600)", fontWeight: 600 }}>Stage 2 transition · draw-down begins</div>
                </div>
              </div>

              {/* Milestone 2 */}
              <div className="rounded-xl p-4" style={{ backgroundColor: "var(--deep-teal-50)", border: "1px solid var(--deep-teal-200)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--deep-teal-600)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Full Freedom</div>
                    <div style={{ fontSize: "1.0625rem", fontWeight: 500, color: "var(--ink)", marginTop: "0.25rem" }}>Age 65 · Work is optional</div>
                    <div style={{ fontSize: "0.875rem", color: "var(--warm-gray-600)", marginTop: "0.25rem" }}>Proven sustainable. 30-year model verified.</div>
                  </div>
                  <div style={{ width: "8px", height: "8px", borderRadius: "9999px", backgroundColor: "var(--deep-teal-500)", marginTop: "0.375rem" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div className="flex items-center gap-2">
                <TrendingUp size={18} style={{ color: "var(--seafoam-500)" }} />
                <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--seafoam-600)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  The Bridge Strategy
                </span>
              </div>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)" }}>
                Two stages. One clear path.
              </h2>
              <p style={{ fontSize: "1.1875rem", color: "var(--warm-gray-700)", lineHeight: 1.5 }}>
                The Bridge isn't a shortcut. It's an optimized path designed specifically for people who have a shorter window and a higher savings rate to work with.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "1rem", color: "var(--warm-gray-700)", lineHeight: 1.65 }}>
              <p>
                <strong style={{ fontWeight: 600, color: "var(--ink)" }}>Stage 1</strong> is the growth phase — maximizing savings rate, running the Condensed Path levers, and building to your Freedom Number.
              </p>
              <p>
                <strong style={{ fontWeight: 600, color: "var(--ink)" }}>Stage 2</strong> is the draw-down — shifting from accumulation to a structured withdrawal that's mathematically proven to last.
              </p>
              <p>
                MoneyBeh calculates your personal Bridge in both stages, with the specific numbers at each milestone — so you can see your exact path, not just a vague direction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 text-center">
        <div className="max-w-2xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "center" }}>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)" }}>
            Your path is shorter.
            <br />
            <span style={{ color: "var(--seafoam-600)" }}>But it's still a path.</span>
          </h2>
          <p style={{ fontSize: "1.125rem", color: "var(--warm-gray-600)", lineHeight: 1.65, maxWidth: "28rem" }}>
            See your Bridge. Know your levers. Get the specific milestones that apply to you — not someone who started at 25.
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
