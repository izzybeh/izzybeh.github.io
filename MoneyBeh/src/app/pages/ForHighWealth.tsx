import { Link as RouterLink } from "react-router";
import { ArrowRight, Shield, CheckCircle2, BarChart3, Layers } from "lucide-react";

const fearItems = [
  {
    fear: "\"What if I run out?\"",
    truth: "The Two-Stage model calculates a mathematically proven draw-down rate. You don't guess — you verify.",
  },
  {
    fear: "\"What if the market drops right after I stop?\"",
    truth: "Sequence-of-returns risk is real. MoneyBeh models it and builds a buffer stage into your plan.",
  },
  {
    fear: "\"I don't have a pension. No one's backing me up.\"",
    truth: "You are your own backing. The Bridge strategy turns your portfolio into a structured, self-sustaining income.",
  },
  {
    fear: "\"My identity is my work. What am I without it?\"",
    truth: "That's not a financial question. But getting the financial clarity first makes that question a lot easier to answer.",
  },
];

const stageData = [
  {
    stage: "Stage 1",
    label: "Growth Complete",
    detail: "Your portfolio has reached your Freedom Number — the point where your investment returns cover your lifestyle at a safe draw-down rate.",
    accent: "var(--seafoam-500)",
    bg: "var(--seafoam-50)",
    border: "var(--seafoam-200)",
    textAccent: "var(--seafoam-700)",
  },
  {
    stage: "Stage 2",
    label: "Structured Draw-Down",
    detail: "You shift from accumulation to a mathematically verified withdrawal schedule — one that's proven to last 30+ years, stress-tested against historical market cycles.",
    accent: "var(--deep-teal-500)",
    bg: "var(--deep-teal-50)",
    border: "var(--deep-teal-200)",
    textAccent: "var(--deep-teal-700)",
  },
];

export function ForHighWealth() {
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
              <Shield size={14} style={{ color: "var(--deep-teal-600)" }} />
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--deep-teal-700)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                The Legacy
              </span>
            </div>
            <h1
              className="tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 500, lineHeight: 1.1, color: "var(--ink)" }}
            >
              You've already built it.
              <br />
              <span style={{ color: "var(--deep-teal-600)" }}>You just can't see permission yet.</span>
            </h1>
            <p
              className="max-w-2xl mx-auto"
              style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.375rem)", lineHeight: 1.6, color: "var(--warm-gray-700)" }}
            >
              Many high-wealth individuals have already crossed their Freedom Number — they just don't have a model that proves it.
              MoneyBeh gives you the math that says: you're done. Here's how.
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
              Run my numbers
            </RouterLink>
          </div>

          <p style={{ fontSize: "0.875rem", color: "var(--warm-gray-500)", lineHeight: 1.5 }}>
            Free to start. No credit card needed.
          </p>
        </div>
      </section>

      {/* ─── The Fear Section ─────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ backgroundColor: "var(--warm-gray-50)" }}>
        <div className="max-w-5xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          <div className="text-center" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="flex items-center justify-center gap-2">
              <Shield size={20} style={{ color: "var(--deep-teal-500)" }} />
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--deep-teal-600)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                The Wealth Paradox
              </span>
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)" }}>
              The more you have, the more you have to lose.
            </h2>
            <p className="max-w-xl mx-auto" style={{ fontSize: "1.125rem", lineHeight: 1.65, color: "var(--warm-gray-600)" }}>
              High-wealth anxiety isn't irrational — it's the absence of a model.
              Fear doesn't disappear when the number is big enough. It disappears when there's proof.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {fearItems.map((item, i) => (
              <div
                key={i}
                className="rounded-[1.5rem] p-6 sm:p-8 grid sm:grid-cols-2 gap-6 items-start"
                style={{ backgroundColor: "var(--paper)", border: "1px solid var(--warm-gray-200)" }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <span style={{ color: "var(--warm-gray-400)", fontWeight: 600, flexShrink: 0, lineHeight: 1.5, marginTop: "0.125rem" }}>✗</span>
                  <p style={{ fontSize: "1rem", fontWeight: 500, color: "var(--warm-gray-600)", lineHeight: 1.6 }}>{item.fear}</p>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <CheckCircle2 size={16} style={{ color: "var(--seafoam-500)", flexShrink: 0, marginTop: "0.1875rem" }} />
                  <p style={{ fontSize: "0.9375rem", color: "var(--warm-gray-700)", lineHeight: 1.65 }}>{item.truth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── The Two-Stage Model ──────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Copy */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div className="flex items-center gap-2">
                <Layers size={18} style={{ color: "var(--deep-teal-500)" }} />
                <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--deep-teal-600)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  The Two-Stage Model
                </span>
              </div>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)" }}>
                Mathematical permission.
                <br />
                <span style={{ color: "var(--seafoam-600)" }}>Not wishful thinking.</span>
              </h2>
              <p style={{ fontSize: "1.1875rem", color: "var(--warm-gray-700)", lineHeight: 1.5 }}>
                Permission doesn't come from a feeling. It comes from a model that shows you, clearly, that your money will outlive your needs.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "1rem", color: "var(--warm-gray-700)", lineHeight: 1.65 }}>
              <p>
                Most high-wealth individuals do back-of-napkin math and arrive at "probably fine." MoneyBeh replaces "probably" with proof — a Two-Stage bridge that models both growth and draw-down in a single, living plan.
              </p>
              <p>
                <strong style={{ fontWeight: 600, color: "var(--ink)" }}>Stage 1</strong> confirms that your portfolio has crossed your Freedom Number — the precise point where investment returns outpace your lifestyle cost.
              </p>
              <p>
                <strong style={{ fontWeight: 600, color: "var(--ink)" }}>Stage 2</strong> proves the draw-down is sustainable — not just for 10 years, but for 30+, stress-tested against historical downturns, sequence risk, and inflation.
              </p>
              <p>
                The output isn't a range or a projection. It's a clear answer: <em>"Your money outlives you. Here's the math."</em>
              </p>
            </div>
          </div>

          {/* Visual model */}
          <div
            className="rounded-[2rem] p-6 sm:p-8"
            style={{ backgroundColor: "var(--paper)", border: "1px solid var(--warm-gray-200)", boxShadow: "0 4px 24px 0 rgba(0,0,0,0.04)", display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <BarChart3 size={16} style={{ color: "var(--deep-teal-500)" }} />
              <span style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--ink)" }}>Your Two-Stage Bridge</span>
            </div>

            {/* Portfolio snapshot */}
            <div className="rounded-xl p-4" style={{ backgroundColor: "var(--warm-gray-100)", border: "1px solid var(--warm-gray-300)" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--warm-gray-500)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>Your snapshot</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[
                  { label: "Portfolio value", val: "$2.4M" },
                  { label: "Annual lifestyle cost", val: "$120k" },
                  { label: "Draw-down rate needed", val: "5.0%" },
                  { label: "Safe draw-down threshold", val: "≤ 4.0%" },
                ].map((row, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.875rem", color: "var(--warm-gray-600)" }}>{row.label}</span>
                    <span style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--ink)" }}>{row.val}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid var(--warm-gray-300)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "9999px", backgroundColor: "var(--deep-teal-500)" }} />
                  <span style={{ fontSize: "0.8125rem", color: "var(--deep-teal-700)", fontWeight: 600 }}>2 more years closes the gap entirely</span>
                </div>
              </div>
            </div>

            {/* Stage 1 & 2 */}
            {stageData.map((stage, i) => (
              <div key={i} className="rounded-xl p-5" style={{ backgroundColor: stage.bg, border: `1px solid ${stage.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.625rem" }}>
                  <div>
                    <div style={{ fontSize: "0.75rem", fontWeight: 600, color: stage.textAccent, textTransform: "uppercase", letterSpacing: "0.06em" }}>{stage.stage}</div>
                    <div style={{ fontSize: "1rem", fontWeight: 500, color: "var(--ink)", marginTop: "0.125rem" }}>{stage.label}</div>
                  </div>
                  <div style={{ width: "8px", height: "8px", borderRadius: "9999px", backgroundColor: stage.accent, marginTop: "0.375rem", flexShrink: 0 }} />
                </div>
                <p style={{ fontSize: "0.875rem", color: "var(--warm-gray-700)", lineHeight: 1.65 }}>{stage.detail}</p>
              </div>
            ))}

            {/* Verdict */}
            <div className="rounded-xl p-5 text-center" style={{ backgroundColor: "var(--deep-teal-500)" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--deep-teal-100)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.375rem" }}>
                Model Verdict
              </div>
              <div style={{ fontSize: "1.125rem", fontWeight: 500, color: "var(--paper)" }}>Your money outlasts you by 22 years</div>
              <div style={{ fontSize: "0.8125rem", color: "var(--deep-teal-200)", marginTop: "0.25rem" }}>
                At age 67 — stress-tested. Permission granted.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── The Legacy Frame ────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ backgroundColor: "var(--warm-gray-50)" }}>
        <div className="max-w-3xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: "2.5rem", alignItems: "center", textAlign: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)" }}>
              Freedom isn't the end.
              <br />
              <span style={{ color: "var(--deep-teal-600)" }}>It's the beginning of what's next.</span>
            </h2>
            <p style={{ fontSize: "1.125rem", color: "var(--warm-gray-600)", lineHeight: 1.65 }}>
              When the math is clear and the permission is real, the question shifts from "Can I afford to stop?" to "What will I build when I do?"
              That's the Legacy question. And MoneyBeh exists to get you there.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 w-full">
            {[
              {
                label: "Financial clarity",
                desc: "A precise model — not a range — that tells you when you cross the threshold.",
                accent: "var(--seafoam-700)",
                bg: "var(--seafoam-50)",
                border: "var(--seafoam-200)",
              },
              {
                label: "Proof, not hope",
                desc: "Stress-tested against market downturns, sequence risk, and 30 years of inflation.",
                accent: "var(--deep-teal-700)",
                bg: "var(--deep-teal-50)",
                border: "var(--deep-teal-200)",
              },
              {
                label: "Permission to act",
                desc: "The model tells you when you're ready. You decide what you do with it.",
                accent: "var(--warm-gray-600)",
                bg: "var(--warm-gray-100)",
                border: "var(--warm-gray-300)",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-[1.25rem] p-5 text-left"
                style={{ backgroundColor: item.bg, border: `1px solid ${item.border}`, display: "flex", flexDirection: "column", gap: "0.5rem" }}
              >
                <div style={{ fontSize: "0.9375rem", fontWeight: 600, color: item.accent }}>{item.label}</div>
                <div style={{ fontSize: "0.875rem", color: "var(--warm-gray-700)", lineHeight: 1.65 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 text-center">
        <div className="max-w-2xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "center" }}>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)" }}>
            Stop running the math in your head.
            <br />
            <span style={{ color: "var(--seafoam-600)" }}>Let the model run it for you.</span>
          </h2>
          <p style={{ fontSize: "1.125rem", color: "var(--warm-gray-600)", lineHeight: 1.65, maxWidth: "28rem" }}>
            Enter your numbers. See your Two-Stage Bridge. Get your permission — with proof.
            It takes less than 10 minutes.
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
            Run my numbers
            <ArrowRight size={18} />
          </RouterLink>
        </div>
      </section>
    </div>
  );
}
