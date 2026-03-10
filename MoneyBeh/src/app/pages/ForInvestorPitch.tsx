import { Link as RouterLink } from "react-router";
import { ArrowRight, Database, TrendingUp, Globe, Zap, Users, BarChart3 } from "lucide-react";

const marketStats = [
  { stat: "$1.5T+", label: "US consumer spending on financial advisory services annually", accent: "var(--seafoam-600)" },
  { stat: "78%", label: "of Americans report living paycheck to paycheck despite rising incomes", accent: "var(--deep-teal-600)" },
  { stat: "4%", label: "of personal finance apps address the behavioral gap — not just the budget", accent: "var(--seafoam-600)" },
];

const moatPillars = [
  {
    icon: Database,
    title: "Behavioral pattern data",
    desc: "MoneyBeh captures not just what users spend, but what makes them feel financially safe — joy allocation decisions, override behaviors, timeline adjustments. This is data no other platform collects.",
    color: "var(--deep-teal-500)",
    bg: "var(--deep-teal-50)",
    border: "var(--deep-teal-200)",
  },
  {
    icon: TrendingUp,
    title: "Longitudinal freedom pathfinding",
    desc: "We track users from early-career to post-work. The Bridge model evolves with each life event — income change, marriage, windfall, medical cost. Longitudinal data at this granularity doesn't exist anywhere else.",
    color: "var(--seafoam-500)",
    bg: "var(--seafoam-50)",
    border: "var(--seafoam-200)",
  },
  {
    icon: Users,
    title: "Joy allocation signals",
    desc: "The Joy Fund creates a category of spending data that is unique to MoneyBeh: intentional, values-aligned, permission-based spend. The signal-to-noise ratio for modeling behavioral financial health is unprecedented.",
    color: "var(--deep-teal-500)",
    bg: "var(--deep-teal-50)",
    border: "var(--deep-teal-200)",
  },
];

const revenueLegs = [
  {
    leg: "Consumer subscription",
    detail: "Freemium to premium. Core freedom tracking free forever; Two-Stage Bridge modeling and advanced projections behind a low-cost subscription ($8–$12/mo or $90/year).",
    stage: "Live",
    stageColor: "var(--seafoam-600)",
    stageBg: "var(--seafoam-50)",
    stageBorder: "var(--seafoam-200)",
  },
  {
    leg: "Employer wellness channel",
    detail: "MoneyBeh embedded in employee benefits packages. Employers pay per seat; employees get the app. The B2B multiplier for consumer-grade distribution — and the highest-trust acquisition channel we have.",
    stage: "Roadmap",
    stageColor: "var(--deep-teal-600)",
    stageBg: "var(--deep-teal-50)",
    stageBorder: "var(--deep-teal-200)",
  },
  {
    leg: "Fee-only advisor referral network",
    detail: "When users need human guidance MoneyBeh can't provide, we refer them to vetted, fee-only advisors — no commissions, no data selling, no conflicts. Advisors pay for qualified referrals. The Calm Friend never gets a cut from putting you in debt.",
    stage: "Future",
    stageColor: "var(--warm-gray-500)",
    stageBg: "var(--warm-gray-100)",
    stageBorder: "var(--warm-gray-300)",
  },
];

export function ForInvestorPitch() {
  return (
    <div>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-4xl mx-auto text-center" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mx-auto"
              style={{ backgroundColor: "var(--warm-gray-100)", border: "1px solid var(--warm-gray-300)" }}
            >
              <Globe size={14} style={{ color: "var(--warm-gray-600)" }} />
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--warm-gray-600)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                The Vision
              </span>
            </div>
            <h1
              className="tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 500, lineHeight: 1.1, color: "var(--ink)" }}
            >
              Life is the currency.
              <br />
              <span style={{ color: "var(--seafoam-600)" }}>Time is what we're actually buying.</span>
            </h1>
            <p
              className="max-w-2xl mx-auto"
              style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.375rem)", lineHeight: 1.6, color: "var(--warm-gray-700)" }}
            >
              MoneyBeh is not a budgeting app. It's the behavioral infrastructure layer for the next generation of financial wellness —
              and it's capturing a category of data that doesn't exist anywhere else.
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", paddingTop: "0.5rem" }}>
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
              See the product live
            </RouterLink>
            <a
              href="mailto:invest@moneybeh.com"
              className="inline-block transition-all duration-300 ease-out"
              style={{
                backgroundColor: "transparent",
                color: "var(--ink)",
                padding: "1rem 2.5rem",
                borderRadius: "1.5rem",
                fontSize: "1.0625rem",
                fontWeight: 500,
                lineHeight: 1.5,
                textDecoration: "none",
                border: "1.5px solid var(--warm-gray-300)",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--seafoam-400)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--warm-gray-300)")}
            >
              Request a deck
            </a>
          </div>
        </div>
      </section>

      {/* ─── The Market ───────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ backgroundColor: "var(--warm-gray-50)" }}>
        <div className="max-w-5xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          <div className="text-center" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="flex items-center justify-center gap-2">
              <BarChart3 size={20} style={{ color: "var(--deep-teal-500)" }} />
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--deep-teal-600)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                The Opportunity
              </span>
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)" }}>
              A massive market with a behavioral blind spot.
            </h2>
            <p className="max-w-xl mx-auto" style={{ fontSize: "1.125rem", lineHeight: 1.65, color: "var(--warm-gray-600)" }}>
              Personal finance tools have optimized for tracking and alerts.
              No one has built the behavioral layer that answers the only question that matters: <em>When will I be free?</em>
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {marketStats.map((item, i) => (
              <div
                key={i}
                className="rounded-[1.5rem] p-6 text-center"
                style={{ backgroundColor: "var(--paper)", border: "1px solid var(--warm-gray-200)", display: "flex", flexDirection: "column", gap: "0.75rem" }}
              >
                <div style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 400, color: item.accent, lineHeight: 1.1 }}>{item.stat}</div>
                <div style={{ fontSize: "0.9375rem", color: "var(--warm-gray-600)", lineHeight: 1.6 }}>{item.label}</div>
              </div>
            ))}
          </div>

          <div
            className="rounded-[1.5rem] p-6 sm:p-8"
            style={{ backgroundColor: "var(--ink)", display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <p style={{ fontSize: "1.25rem", fontWeight: 500, color: "var(--paper)", lineHeight: 1.5 }}>
              The gap isn't information. It's <span style={{ color: "var(--seafoam-300)" }}>permission and proof.</span>
            </p>
            <p style={{ fontSize: "1rem", color: "var(--warm-gray-300)", lineHeight: 1.65 }}>
              Users don't fail to save because they lack a budget. They fail because they lack a model that makes the future feel real and achievable.
              MoneyBeh is the first platform built around this insight — combining behavioral design with financial mathematics to give users a clear, living answer to "when will I be free?"
            </p>
          </div>
        </div>
      </section>

      {/* ─── The Moat ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          <div className="text-center" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="flex items-center justify-center gap-2">
              <Database size={20} style={{ color: "var(--seafoam-500)" }} />
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--seafoam-600)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                The Data Moat
              </span>
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)" }}>
              Proprietary data that compounds with every user.
            </h2>
            <p className="max-w-xl mx-auto" style={{ fontSize: "1.125rem", lineHeight: 1.65, color: "var(--warm-gray-600)" }}>
              MoneyBeh's behavioral dataset is a category-defining moat. It grows more valuable as the user base grows — and it cannot be replicated.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {moatPillars.map((item, i) => (
              <div
                key={i}
                className="rounded-[1.5rem] p-6 sm:p-8 grid sm:grid-cols-[auto_1fr] gap-5 items-start"
                style={{ backgroundColor: item.bg, border: `1px solid ${item.border}` }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: item.color }}
                >
                  <item.icon size={20} style={{ color: "var(--paper)" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div style={{ fontSize: "1.0625rem", fontWeight: 600, color: "var(--ink)" }}>{item.title}</div>
                  <p style={{ fontSize: "0.9375rem", color: "var(--warm-gray-700)", lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── The Revenue Model ────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ backgroundColor: "var(--warm-gray-50)" }}>
        <div className="max-w-5xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          <div className="text-center" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="flex items-center justify-center gap-2">
              <Zap size={20} style={{ color: "var(--seafoam-500)" }} />
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--seafoam-600)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Business Model
              </span>
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)" }}>
              Three revenue legs. One compounding moat.
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {revenueLegs.map((item, i) => (
              <div
                key={i}
                className="rounded-[1.5rem] p-6 sm:p-8"
                style={{ backgroundColor: "var(--paper)", border: "1px solid var(--warm-gray-200)", display: "flex", flexDirection: "column", gap: "0.875rem" }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "var(--warm-gray-200)" }}
                    >
                      <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--warm-gray-700)" }}>{i + 1}</span>
                    </div>
                    <span style={{ fontSize: "1.0625rem", fontWeight: 600, color: "var(--ink)" }}>{item.leg}</span>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full"
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: item.stageColor,
                      backgroundColor: item.stageBg,
                      border: `1px solid ${item.stageBorder}`,
                    }}
                  >
                    {item.stage}
                  </span>
                </div>
                <p style={{ fontSize: "0.9375rem", color: "var(--warm-gray-700)", lineHeight: 1.65, paddingLeft: "2.875rem" }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── The Vision Statement ─────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div
            className="rounded-[2rem] p-8 sm:p-12 text-center"
            style={{ backgroundColor: "var(--ink)", display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "center" }}
          >
            <div className="flex items-center gap-2">
              <Globe size={18} style={{ color: "var(--seafoam-400)" }} />
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--seafoam-400)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                The Long Game
              </span>
            </div>
            <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontWeight: 500, lineHeight: 1.2, color: "var(--paper)" }}>
              We're building the operating system for financial freedom — not another tool for managing last month's spending.
            </h2>
            <p style={{ fontSize: "1.125rem", color: "var(--warm-gray-400)", lineHeight: 1.65, maxWidth: "36rem" }}>
              Every user who finds their freedom date generates behavioral data. Every data point makes the model sharper. Every sharper model attracts more users.
              This is a flywheel that doesn't exist in personal finance yet.
            </p>
            <div className="grid sm:grid-cols-3 gap-3 w-full" style={{ marginTop: "0.5rem" }}>
              {[
                { label: "Users", val: "→ Data" },
                { label: "Data", val: "→ Model accuracy" },
                { label: "Accuracy", val: "→ Trust → Users" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl p-4 text-center"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
                >
                  <div style={{ fontSize: "0.75rem", color: "var(--warm-gray-500)", marginBottom: "0.25rem" }}>{item.label}</div>
                  <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--seafoam-400)" }}>{item.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 text-center">
        <div className="max-w-2xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "center" }}>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)" }}>
            Ready to see the full picture?
            <br />
            <span style={{ color: "var(--seafoam-600)" }}>Let's talk.</span>
          </h2>
          <p style={{ fontSize: "1.125rem", color: "var(--warm-gray-600)", lineHeight: 1.65, maxWidth: "28rem" }}>
            We're sharing the investor deck with a small group of aligned partners. If you're building toward a world where people have genuine financial clarity, we'd like to hear from you.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginTop: "0.5rem" }}>
            <a
              href="mailto:invest@moneybeh.com"
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
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--seafoam-600)")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--seafoam-500)")}
            >
              Request the deck
              <ArrowRight size={18} />
            </a>
            <RouterLink
              to="/start"
              className="inline-flex items-center gap-2 transition-all duration-300 ease-out"
              style={{
                backgroundColor: "transparent",
                color: "var(--ink)",
                padding: "1rem 2.5rem",
                borderRadius: "1.5rem",
                fontSize: "1.0625rem",
                fontWeight: 500,
                lineHeight: 1.5,
                textDecoration: "none",
                border: "1.5px solid var(--warm-gray-300)",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--seafoam-400)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--warm-gray-300)")}
            >
              See the product
            </RouterLink>
          </div>
        </div>
      </section>
    </div>
  );
}