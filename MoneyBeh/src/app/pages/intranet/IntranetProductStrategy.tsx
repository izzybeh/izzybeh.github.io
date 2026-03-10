import { Link } from "react-router";
import {
  Target,
  Zap,
  Shield,
  Layers,
  Map,
  Cpu,
  TrendingUp,
  DollarSign,
  BarChart2,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

// ─── Primitive components ────────────────────────────────────────

function Section({
  id,
  number,
  title,
  icon: Icon,
  children,
}: {
  id: string;
  number: string;
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-14">
      <div
        className="flex items-center gap-3 mb-5 pb-3 border-b"
        style={{ borderColor: "var(--warm-gray-200)" }}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: "var(--seafoam-100)", border: "1px solid var(--seafoam-200)" }}
        >
          <Icon size={14} style={{ color: "var(--seafoam-600)" }} />
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "var(--warm-gray-400)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {number}
          </span>
          <h2 style={{ fontSize: "1.0625rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.3 }}>
            {title}
          </h2>
        </div>
      </div>
      {children}
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--warm-gray-700)" }}>
      {children}
    </p>
  );
}

function Bullets({ items }: { items: (string | React.ReactNode)[] }) {
  return (
    <ul className="flex flex-col gap-2 mb-4">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span
            className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: "var(--seafoam-400)" }}
          />
          <span className="text-sm leading-relaxed" style={{ color: "var(--warm-gray-700)" }}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Callout({
  type = "info",
  label,
  children,
}: {
  type?: "info" | "decision" | "tension" | "note";
  label?: string;
  children: React.ReactNode;
}) {
  const styles = {
    info: {
      bg: "var(--seafoam-50)",
      border: "var(--seafoam-200)",
      labelColor: "var(--seafoam-700)",
      dot: "var(--seafoam-500)",
    },
    decision: {
      bg: "var(--deep-teal-50)",
      border: "var(--deep-teal-200)",
      labelColor: "var(--deep-teal-700)",
      dot: "var(--deep-teal-500)",
    },
    tension: {
      bg: "var(--sand-50)",
      border: "var(--sand-200)",
      labelColor: "var(--sand-700)",
      dot: "var(--sand-500)",
    },
    note: {
      bg: "var(--warm-gray-100)",
      border: "var(--warm-gray-300)",
      labelColor: "var(--warm-gray-600)",
      dot: "var(--warm-gray-400)",
    },
  };
  const s = styles[type];
  const defaultLabels = { info: "Note", decision: "Decision made", tension: "Open tension", note: "Context" };
  return (
    <div
      className="rounded-xl p-4 mb-4"
      style={{ backgroundColor: s.bg, border: `1px solid ${s.border}` }}
    >
      {(label || defaultLabels[type]) && (
        <div
          className="flex items-center gap-1.5 mb-2"
        >
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: s.dot }}
          />
          <span
            style={{ fontSize: "0.6875rem", fontWeight: 700, color: s.labelColor, textTransform: "uppercase", letterSpacing: "0.07em" }}
          >
            {label ?? defaultLabels[type]}
          </span>
        </div>
      )}
      <div className="text-sm leading-relaxed" style={{ color: "var(--warm-gray-700)" }}>
        {children}
      </div>
    </div>
  );
}

function KV({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex items-start gap-3 py-2.5 border-b"
      style={{ borderColor: "var(--warm-gray-100)" }}
    >
      <span className="text-xs shrink-0 w-36" style={{ color: "var(--warm-gray-400)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", paddingTop: "1px" }}>
        {label}
      </span>
      <span className="text-sm leading-relaxed" style={{ color: "var(--warm-gray-800)" }}>
        {value}
      </span>
    </div>
  );
}

function EpicCard({
  number,
  name,
  tagline,
  features,
  accentColor,
  accentBg,
  accentBorder,
}: {
  number: string;
  name: string;
  tagline: string;
  features: { name: string; why: string }[];
  accentColor: string;
  accentBg: string;
  accentBorder: string;
}) {
  return (
    <div
      className="rounded-xl p-5 mb-4"
      style={{ backgroundColor: accentBg, border: `1px solid ${accentBorder}` }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: accentColor, textTransform: "uppercase", letterSpacing: "0.07em" }}>
          Epic {number}
        </span>
      </div>
      <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.25rem" }}>{name}</div>
      <div style={{ fontSize: "0.8125rem", color: "var(--warm-gray-500)", marginBottom: "1rem" }}>{tagline}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        {features.map((f, i) => (
          <div
            key={i}
            className="rounded-lg p-3"
            style={{ backgroundColor: "rgba(255,255,255,0.7)", border: `1px solid ${accentBorder}` }}
          >
            <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.25rem" }}>{f.name}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--warm-gray-600)", lineHeight: 1.5 }}>
              <span style={{ fontWeight: 600, color: accentColor }}>Why: </span>
              {f.why}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhaseCard({
  number,
  name,
  goal,
  items,
  status,
}: {
  number: string;
  name: string;
  goal: string;
  items: string[];
  status: "current" | "next" | "future";
}) {
  const statusStyles = {
    current: { bg: "var(--seafoam-50)", border: "var(--seafoam-300)", badge: "var(--seafoam-600)", badgeBg: "var(--seafoam-100)", label: "Current focus" },
    next: { bg: "var(--deep-teal-50)", border: "var(--deep-teal-200)", badge: "var(--deep-teal-600)", badgeBg: "var(--deep-teal-100)", label: "Next" },
    future: { bg: "var(--warm-gray-100)", border: "var(--warm-gray-300)", badge: "var(--warm-gray-500)", badgeBg: "var(--warm-gray-200)", label: "Future" },
  };
  const s = statusStyles[status];
  return (
    <div className="rounded-xl p-5" style={{ backgroundColor: s.bg, border: `1.5px solid ${s.border}` }}>
      <div className="flex items-start justify-between gap-2 mb-1">
        <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: s.badge, textTransform: "uppercase", letterSpacing: "0.07em" }}>
          Phase {number}
        </span>
        <span style={{ fontSize: "0.625rem", fontWeight: 700, color: s.badge, backgroundColor: s.badgeBg, padding: "0.125rem 0.5rem", borderRadius: "9999px" }}>
          {s.label}
        </span>
      </div>
      <div style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.125rem" }}>{name}</div>
      <div style={{ fontSize: "0.8125rem", color: "var(--warm-gray-500)", marginBottom: "0.875rem", fontStyle: "italic" }}>{goal}</div>
      <ul style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
            <CheckCircle2 size={13} style={{ color: s.badge, marginTop: "2px", flexShrink: 0 }} />
            <span style={{ fontSize: "0.8125rem", color: "var(--warm-gray-700)", lineHeight: 1.5 }}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── TOC ────────────────────────────────────────────────────────

const toc = [
  { id: "summary", label: "Executive Summary" },
  { id: "brand", label: "Brand Identity" },
  { id: "market", label: "Target Market & TAM" },
  { id: "moat", label: "Competitive Moat" },
  { id: "features", label: "Core Features (Epics)" },
  { id: "ia", label: "Information Architecture" },
  { id: "tech", label: "System Design" },
  { id: "roadmap", label: "Roadmap" },
  { id: "gtm", label: "Business Model & GTM" },
  { id: "kpis", label: "KPIs" },
  { id: "future", label: "Future Considerations" },
];

// ─── Page ────────────────────────────────────────────────────────

export function IntranetProductStrategy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">

      {/* Header */}
      <div className="mb-8">
        <div
          className="text-xs tracking-widest uppercase mb-3"
          style={{ color: "var(--warm-gray-400)", fontWeight: 500 }}
        >
          MoneyBeh Internal · Product
        </div>
        <h1 className="text-3xl mb-2" style={{ color: "var(--ink)", fontWeight: 700, lineHeight: 1.25 }}>
          Total Product Strategy
        </h1>
        <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--warm-gray-500)" }}>
          The canonical reference for what MoneyBeh is, who it's for, and why every decision was made.
          Includes decisions and tensions surfaced during strategy review.
        </p>
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
          style={{ backgroundColor: "var(--sand-100)", border: "1px solid var(--sand-200)", color: "var(--sand-700)", fontWeight: 600 }}
        >
          <AlertTriangle size={11} />
          Living document — decisions annotated in context
        </div>
      </div>

      {/* TOC */}
      <div
        className="rounded-2xl p-5 mb-12"
        style={{ backgroundColor: "var(--warm-gray-50)", border: "1px solid var(--warm-gray-200)" }}
      >
        <div
          className="text-xs tracking-widest uppercase mb-3"
          style={{ color: "var(--warm-gray-400)", fontWeight: 600 }}
        >
          Contents
        </div>
        <div className="grid sm:grid-cols-2 gap-1">
          {toc.map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all"
              style={{ color: "var(--warm-gray-700)", textDecoration: "none" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "var(--seafoam-50)";
                (e.currentTarget as HTMLElement).style.color = "var(--seafoam-700)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLElement).style.color = "var(--warm-gray-700)";
              }}
            >
              <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "var(--warm-gray-400)", width: "1.25rem", textAlign: "right", flexShrink: 0 }}>
                {i + 1}
              </span>
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* ── 1. Executive Summary ─────────────────────────────── */}
      <Section id="summary" number="01" title="Executive Summary & Philosophy" icon={Target}>
        <Callout type="info" label="Product Positioning Statement">
          For intentional builders who want to achieve financial independence without sacrificing joy in their present life, MoneyBeh is a human-centric financial OS that transforms financial anxiety into peace and confidence by providing mathematical clarity and behavioral guardrails. Unlike traditional budgeting apps and net-worth trackers that focus on past mistakes and scarcity, our product acts as a reliable, calm friend that actively models your two-stage future and aligns your daily spending with your actual Joy.
        </Callout>
        <P>
          MoneyBeh is a human-centric financial independence OS. Traditional budgeting apps cause stress by
          focusing on past mistakes and scarcity. MoneyBeh acts as a "reliable, calm friend," focusing on
          intention and the future.
        </P>
        <P>
          We transform financial anxiety into peace and confidence by automating the essentials, modeling
          the future, and giving every dollar a job — ultimately shifting money from running a user's life
          to funding their Joy and Freedom.
        </P>
        <Callout type="info" label="Core Paradigm Shift">
          We move users from measuring wealth in <strong>Dollars</strong> to measuring it in{" "}
          <strong>Time</strong> (Years of Freedom Banked) and <strong>Lifestyle</strong> (dollars their
          savings can support today). This reframe is the foundation of every product decision.
        </Callout>
        <div
          className="rounded-xl p-5 mb-4"
          style={{ backgroundColor: "var(--seafoam-50)", border: "1px solid var(--seafoam-200)" }}
        >
          <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--seafoam-700)", marginBottom: "0.75rem" }}>
            Three Brand Pillars
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {[
              { pill: "Clear decisions.", detail: "Reduce cognitive load and decision fatigue at every step." },
              { pill: "Less stress.", detail: "Proactive behavioral correction before mistakes happen." },
              { pill: "More freedom.", detail: "A measurable timeline to the life you actually want." },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start" }}>
                <span
                  className="shrink-0 px-2 py-0.5 rounded-full text-xs"
                  style={{ backgroundColor: "var(--seafoam-500)", color: "var(--paper)", fontWeight: 700, marginTop: "1px" }}
                >
                  {item.pill}
                </span>
                <span style={{ fontSize: "0.8125rem", color: "var(--warm-gray-700)", lineHeight: 1.5 }}>{item.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 2. Brand Identity ────────────────────────────────── */}
      <Section id="brand" number="02" title="Brand Identity: The Calm Friend" icon={Shield}>
        <KV label="Tone" value="Empathetic, mathematically sound, proactive, non-judgmental. Plain language always. No financial jargon." />
        <KV label="Voice archetype" value="A reliable friend who happens to know the math — not an advisor, not a coach, not a tool." />
        <KV label="What we don't do" value="We do not sell user data for credit card affiliate offers. The Calm Friend does not push you into debt to make a commission." />
        <KV label="Color system" value="Seafoam for primary CTAs. Deep Teal for Learn This moments. Sand for celebrations only. Warm Grays as the foundation." />
        <div style={{ marginTop: "1rem" }} />
        <Callout type="info" label="Brand definition: What is overspending?">
          Most financial tools define overspending as "exceeded your category budget." MoneyBeh defines it
          differently: <strong>did you have to borrow to fund your life?</strong> A month where you spent
          more on restaurants than planned but stayed debt-free is not an overspend. A month where you put
          groceries on a credit card you can't pay off is. This reframe removes the guilt and shame of
          category-level budgeting, and replaces it with a single honest question that connects directly
          to the freedom plan.
        </Callout>
        <Callout type="decision" label="Confirmed: No data monetization">
          The data licensing revenue leg (aggregated behavioral signals sold to third parties) was removed
          from the product strategy. MoneyBeh's revenue model is transparent SaaS + fee-only advisor
          referrals. The behavioral dataset is a <em>competitive moat</em>, not a revenue line. This
          eliminates the trust conflict between "no data selling" and investor pitch framing.
        </Callout>
      </Section>

      {/* ── 3. Market ────────────────────────────────────────── */}
      <Section id="market" number="03" title="Target Market & TAM" icon={TrendingUp}>
        <KV label="Archetype" value='"Intentional Builders" — people who want financial independence by building a life of meaning and joy, not just hoarding cash.' />
        <KV label="US TAM" value="~35M US Millennials/Gen Z professionals earning $75k+. At $10/mo: $4.2B annual revenue pool." />
        <div style={{ marginTop: "1rem" }} />
        <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem" }}>
          The Six Personas
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
          {[
            {
              name: "Early Career — The Foundation",
              path: "/for/early-career",
              desc: "Building the foundation; maximizing the multiplier effect. Time is the superpower they can't see yet.",
            },
            {
              name: "High Earners — The Trap",
              path: "/for/high-earners",
              desc: "Earning well but leaking cash; lifestyle drift has a name. The Joy Fund provides permission to spend.",
            },
            {
              name: "Spreadsheet Switchers — The Upgrade",
              path: "/for/spreadsheet",
              desc: "Already doing the math manually; seeking an automated OS. GTM priority — first acquisition target.",
            },
            {
              name: "Income Accelerator — The Momentum Window",
              path: "/for/accelerator",
              desc: "Recent income jump (raise, promotion, new job). The 90-day window where lifestyle hasn't caught up. Capture the Opportunity Gap before drift does.",
            },
            {
              name: "Late Boomers — The Catch-Up",
              path: "/for/late-boomers",
              desc: "Mid-life, shorter window, feels behind. Condensed Pathing strategy. Emotional entry: reckoning, not shame.",
            },
            {
              name: "High Wealth — The Legacy",
              path: "/for/high-wealth",
              desc: "Have the assets; seeking mathematical permission to exit. Coast Mode proves they can stop.",
            },
          ].map((p, i) => (
            <Link
              key={i}
              to={p.path}
              className="flex items-start gap-3 rounded-xl px-4 py-3 border transition-all group"
              style={{ backgroundColor: "var(--paper)", borderColor: "var(--warm-gray-200)", textDecoration: "none" }}
            >
              <div className="flex-1 min-w-0">
                <div className="text-sm" style={{ color: "var(--ink)", fontWeight: 600 }}>{p.name}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--warm-gray-500)", lineHeight: 1.5 }}>{p.desc}</div>
              </div>
              <ArrowRight size={13} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" style={{ color: "var(--warm-gray-400)" }} />
            </Link>
          ))}
        </div>
        <Callout type="decision" label="Persona split: Late Bloomers → two distinct personas">
          The original strategy described "Late Bloomers" as "recent income jumps; needing a condensed,
          aggressive path." This was two different people: a 32-year-old who just made VP (income jump,
          maximum runway ahead) vs. a 45-year-old in mid-life reckoning (shorter window, Condensed Pathing).
          These are now separate pages with distinct emotional entry points and messaging strategies.
        </Callout>
      </Section>

      {/* ── 4. Competitive Moat ──────────────────────────────── */}
      <Section id="moat" number="04" title="Competitive Moat & Differentiation" icon={Shield}>
        <div
          className="rounded-xl p-5 mb-4"
          style={{ backgroundColor: "var(--warm-gray-50)", border: "1px solid var(--warm-gray-200)" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {[
              { competitor: "YNAB / Mint / Copilot", do: "Track the past (budgets)", gap: "No future model, no freedom timeline" },
              { competitor: "Empower / Monarch", do: "Track the present (net worth)", gap: "No behavioral layer, no joy optimization" },
              { competitor: "MoneyBeh", do: "Engineers the future (Two-Stage Bridge) and optimizes the behavior (Joy-Swipes)", gap: "— This is the moat —" },
            ].map((row, i) => (
              <div
                key={i}
                className="rounded-lg p-3"
                style={{
                  backgroundColor: i === 2 ? "var(--seafoam-50)" : "var(--paper)",
                  border: i === 2 ? "1.5px solid var(--seafoam-300)" : "1px solid var(--warm-gray-200)",
                }}
              >
                <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: i === 2 ? "var(--seafoam-700)" : "var(--ink)", marginBottom: "0.25rem" }}>
                  {row.competitor}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--warm-gray-600)", lineHeight: 1.5 }}>
                  {row.do}
                  {" · "}
                  <span style={{ color: i === 2 ? "var(--seafoam-600)" : "var(--warm-gray-400)", fontStyle: "italic" }}>{row.gap}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <P>
          The actual moat is the Behavioral Dataset. By having users swipe on actual items via Computer Vision
          ("Did this bring joy?"), MoneyBeh builds a proprietary model of human financial happiness that
          standard bank data cannot replicate. Standard apps see transaction amounts. MoneyBeh sees whether
          the transaction was worth it.
        </P>
        <Callout type="tension" label="Tension: The moat arrives in Phase 2, not Phase 1">
          The MVP (Phase 1) is math and dashboards — replicable by well-funded competitors. The behavioral
          dataset doesn't exist until Phase 2 Joy-Swipes are live. This means Phase 1 competes on math
          quality and UX alone. If Phase 1 takes 12+ months, there's a window of vulnerability. The investor
          pitch should frame Phase 1 as "proving the math" and Phase 2 as "building the irreplaceable asset."
        </Callout>
      </Section>

      {/* ── 5. Features ──────────────────────────────────────── */}
      <Section id="features" number="05" title="Core Features & Strategic Justification" icon={Layers}>
        <EpicCard
          number="1"
          name="Clarity of Health"
          tagline="The Foundation — reduce cognitive load, protect the baseline"
          accentColor="var(--seafoam-600)"
          accentBg="var(--seafoam-50)"
          accentBorder="var(--seafoam-200)"
          features={[
            { name: "Next Step Guide — Specific Guidance Questions", why: "Point-of-need guidance at the moment of choice: Should I pay off debt first or invest? Should I build an emergency fund? Should I go into debt for this purchase? What is a healthy way to use a credit card? Reduces decision fatigue by giving a clear, personalized answer — not a list of options." },
            { name: "Emergency Fund Tracker", why: "A 3–6 month buffer is the prerequisite to everything else in the Next Step Guide. Without it, any unexpected expense forces borrowing, which triggers the Debt Guard and sets back the freedom timeline. MoneyBeh tracks fund status and surfaces it as the first milestone for most new users." },
            { name: "Debt Payoff Roadmap", why: "Distinct from the Debt Guard (which prevents new debt) — this is an active plan to eliminate existing debt. Avalanche vs. snowball method selection. Monthly payoff progress. Clear milestone: zero debt unlocks the next step in the guide. Debt is not just a financial problem; it is a psychological one — MoneyBeh surfaces the finish line." },
            { name: "Simple Investment Guidance (Low-Cost Index Funds)", why: "MoneyBeh tells users when to invest (after emergency fund, after debt). It must also tell them how. The answer for most users is simple: low-cost, diversified index funds. Not stock picking. Not timing the market. This democratizes the how without pretending to be an advisor." },
            { name: "Auto-Pilot Essentials", why: "Pre-pays annual bills (1/26th per paycheck). Eliminates 'expensive month' anxiety and protects the baseline." },
            { name: "Debt-Spending Guard & Widget", why: "Lock-screen alert when spending requires borrowing. Implements the brand's overspending definition: not 'did you exceed a category?' but 'did you have to borrow to fund your life?' Proactive behavioral correction before the mistake is made." },
          ]}
        />
        <EpicCard
          number="2"
          name="The Ritual of Joy"
          tagline="The Behavior — change the relationship with spending from guilt to values-alignment"
          accentColor="var(--sand-700)"
          accentBg="var(--sand-50)"
          accentBorder="var(--sand-200)"
          features={[
            { name: "Computer Vision Reflection (Joy-Swipes)", why: "Item-level receipt parsing for 'Definite Yes' reflection moments. This is the behavioral data capture mechanism — the moat builder." },
            { name: "Values-Based Joy Buckets — Dual Mode", why: "Two distinct modes for two distinct personalities: (1) Prescriptive — set a target for each Joy bucket and track toward it. (2) Emergent — spend freely from the Joy fund, then review what you actually chose at month-end. The emergent mode is critical for users who resist budgeting; it surfaces their real values without requiring them to predict them upfront." },
            { name: "Lifestyle Creep Audit", why: "Proactive insight engine: 'You've consistently spent 23% under your dining budget for 4 months. Lower the target and redirect the savings to your bridge fund?' This connects the micro (spending habits) to the macro (freedom timeline) in a way users can act on immediately." },
          ]}
        />
        <EpicCard
          number="3"
          name="Clarity of Future"
          tagline="The Destination — make the abstract concept of 'future time' tangible today"
          accentColor="var(--deep-teal-600)"
          accentBg="var(--deep-teal-50)"
          accentBorder="var(--deep-teal-200)"
          features={[
            { name: "Two-Stage Bridge Modeler", why: "Math for funding life between early exit and 59.5 (tax-advantaged age). Solves the biggest math problem ignored by standard retirement calculators." },
            { name: "Zero-Sum Trade-off Engine", why: "Sliders that show how increasing Joy/Essentials reduces Freedom Years. Makes the abstract concept of 'future time' tangible today." },
            { name: "Coast Mode / Lifestyle Dollars", why: "'If I stopped saving today, what could I afford?' Gives high-wealth users mathematical permission to relax." },
            { name: "Bridge vs. Retirement Prioritization Guide", why: "A high-stakes guidance question the Bridge Modeler raises but doesn't answer alone: when does money go into Roth vs. taxable brokerage? How much bridge fund is enough before maxing retirement accounts? This is where MoneyBeh earns deep trust — by answering the question that every other tool leaves to the user." },
          ]}
        />
        <EpicCard
          number="4"
          name="The Partnership"
          tagline="The Household — money is the #1 cause of relationship stress; this solves it"
          accentColor="var(--warm-gray-600)"
          accentBg="var(--warm-gray-100)"
          accentBorder="var(--warm-gray-300)"
          features={[
            { name: "Partner Path-Sync & Privacy Vaults", why: "Shared timelines with individual, private Joy funds. Shared goals with individual autonomy — the core relationship tension resolved." },
          ]}
        />
        <Callout type="tension" label="Tension: Viral loop depends on Phase 3">
          The organic growth mechanic (Player 1 invites Player 2 for Household Sync) doesn't exist until
          Phase 3. Phases 1 and 2 are entirely acquisition-driven with no embedded referral mechanic.
          Retention in the early phases must be earned on product value alone.
        </Callout>
        <Callout type="tension" label="Needs further exploration: Credit card guidance nuance">
          The Next Step Guide asks "Should I use a credit card?" — but the answer is nuanced in a way that
          matters for user trust. The Calm Friend is not anti-credit-card. A card paid off in full monthly
          is fine: rewards, consumer protection, credit building. The actual question is "can you afford
          this without borrowing?" We need to decide how MoneyBeh frames this at the UI level. Getting it
          wrong either alienates sophisticated users (by sounding naively anti-credit) or provides cover
          for behavior that damages the freedom plan. The framing must be precise.
        </Callout>
      </Section>

      {/* ── 6. IA ────────────────────────────────────────────── */}
      <Section id="ia" number="06" title="Information Architecture" icon={Layers}>
        <P>The five primary app surfaces, each with a distinct time orientation:</P>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
          {[
            { surface: "The Dashboard (Home)", time: "Now", desc: "Hero metric (Years Banked / Lifestyle Dollars), Next Step Guide, immediate Trade-off sliders." },
            { surface: "The Engine (Future)", time: "Future", desc: "Visual bridge strategy, liquidity order map, Coast Mode simulator." },
            { surface: "The Joy Fund (Present)", time: "Present", desc: "14-day spending allocation, progress bars, upcoming essential funding status." },
            { surface: "The Ritual (Past)", time: "Past", desc: "Tinder-style swipe interface for reviewing Computer Vision-enriched transactions." },
            { surface: "The Vault (Settings)", time: "Config", desc: "Plaid connections, Partner Sync, Tax/Location settings." },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-4"
              style={{ backgroundColor: "var(--paper)", border: "1px solid var(--warm-gray-200)" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--ink)" }}>{item.surface}</span>
                <span
                  className="shrink-0 px-2 py-0.5 rounded-full"
                  style={{ fontSize: "0.625rem", fontWeight: 700, color: "var(--seafoam-600)", backgroundColor: "var(--seafoam-100)", textTransform: "uppercase", letterSpacing: "0.06em" }}
                >
                  {item.time}
                </span>
              </div>
              <p style={{ fontSize: "0.8125rem", color: "var(--warm-gray-600)", lineHeight: 1.5, marginTop: "0.25rem" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 7. Tech ──────────────────────────────────────────── */}
      <Section id="tech" number="07" title="System Design & Architecture" icon={Cpu}>
        <KV label="Frontend" value="React Native (Expo) — single codebase for iOS/Android. Critical for Partner Sync across different devices." />
        <KV label="Backend" value="Node.js (TypeScript) + Supabase (PostgreSQL). High concurrency for real-time syncing. Row-Level Security (RLS) for financial data privacy." />
        <KV label="Plaid API" value="Secure, read-only transaction and balance syncing. Connection retention rate is a primary KPI (System Trust)." />
        <KV label="OpenAI Vision API" value="Receipt and item-level parsing for the Reflection Ritual (Joy-Swipes). The data capture pipeline for the behavioral moat." />
        <div style={{ marginTop: "1rem" }} />
        <Callout type="note" label="Web (this site)">
          The public website and intranet run on React + React Router (web). The product app is React Native.
          These are separate codebases sharing brand tokens and design system conventions.
        </Callout>
      </Section>

      {/* ── 8. Roadmap ───────────────────────────────────────── */}
      <Section id="roadmap" number="08" title="Phased Development Roadmap" icon={Map}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1rem" }}>
          <PhaseCard
            number="1"
            name="The Engine (MVP)"
            goal="Prove the math."
            status="current"
            items={[
              "Plaid sync — secure, read-only transaction and balance data",
              "Two-Stage Bridge Modeler — the core math no competitor has",
              "Zero-Sum Trade-off sliders — make future time tangible",
              "Dashboard — Years Banked hero metric",
            ]}
          />
          <PhaseCard
            number="2"
            name="The Behavior"
            goal="Prove the habit. Build the moat."
            status="next"
            items={[
              "Joy Fund allocation and bucket management",
              "Computer Vision Reflection (Joy-Swipes) — item-level receipt parsing",
              "Auto-Pilot Essentials tracking",
              "Lifestyle Creep Audit insights",
            ]}
          />
          <PhaseCard
            number="3"
            name="The Household"
            goal="Drive organic growth through invites."
            status="future"
            items={[
              "Partner Path-Sync — shared freedom timelines",
              "Privacy Vaults — individual Joy funds within shared household",
              "Joint modeling — two-income Bridge scenarios",
            ]}
          />
          <PhaseCard
            number="4"
            name="The Agent"
            goal="Achieve full autonomy."
            status="future"
            items={[
              "Agent trained by the user's own swipe history — worth-it/not-worth-it decisions become the training corpus for a personalized financial agent. The Agent doesn't just automate; it acts according to the user's revealed values, not generic rules.",
              "Autonomous money movement — executes savings allocations automatically based on learned preferences",
              "Predictive tax modeling",
              "Advanced Lifestyle Creep audits with behavioral pattern recognition",
            ]}
          />
        </div>
        <Callout type="tension" label="Needs further exploration: Tax planning — Phase 4 feature or Phase 1 dependency?">
          Tax planning is currently scoped to Phase 4 as a predictive enhancement. But the Two-Stage Bridge
          Modeler (Phase 1) requires tax-aware math to be accurate. Roth conversion ladder timing, capital
          gains rate thresholds, and 72(t) SEPP rules are not Phase 4 enhancements — they affect whether
          the bridge calculation is correct from day one. The question to resolve: does Phase 1 ship the
          Bridge Modeler with a "tax planning coming soon" caveat and directionally correct math, or is
          basic tax-aware modeling (filing status, income bracket, state) a Phase 1 requirement? The
          answer affects build scope significantly.
        </Callout>
        <P>
          See the{" "}
          <Link to="/intranet/roadmap" style={{ color: "var(--seafoam-600)", textDecoration: "underline" }}>
            Roadmap intranet page
          </Link>{" "}
          for current sprint status, shipped items, and what's queued.
        </P>
      </Section>

      {/* ── 9. GTM ───────────────────────────────────────────── */}
      <Section id="gtm" number="09" title="Business Model & Go-To-Market" icon={DollarSign}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
          {[
            {
              leg: "Consumer subscription",
              detail: "Freemium to premium. Core freedom tracking free forever. Two-Stage Bridge modeling and advanced projections behind a low-cost subscription ($8–$12/mo or $90/year). No ads. No data selling.",
              status: "Phase 1",
              statusColor: "var(--seafoam-600)",
              statusBg: "var(--seafoam-100)",
            },
            {
              leg: "Employer wellness channel",
              detail: "MoneyBeh embedded in employee benefits packages. Employers pay per seat. The B2B multiplier for consumer-grade distribution — and the highest-trust acquisition channel we have.",
              status: "Roadmap",
              statusColor: "var(--deep-teal-600)",
              statusBg: "var(--deep-teal-100)",
            },
            {
              leg: "Fee-only advisor referral network",
              detail: "When users need human guidance MoneyBeh can't provide, we refer them to vetted, fee-only advisors — no commissions, no data selling, no conflicts. Advisors pay for qualified referrals. The Calm Friend never earns a cut from putting you in debt.",
              status: "Future",
              statusColor: "var(--warm-gray-500)",
              statusBg: "var(--warm-gray-200)",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-4"
              style={{ backgroundColor: "var(--paper)", border: "1px solid var(--warm-gray-200)" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.375rem" }}>
                <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--ink)" }}>{item.leg}</span>
                <span
                  className="shrink-0 px-2 py-0.5 rounded-full"
                  style={{ fontSize: "0.625rem", fontWeight: 700, color: item.statusColor, backgroundColor: item.statusBg, textTransform: "uppercase", letterSpacing: "0.06em" }}
                >
                  {item.status}
                </span>
              </div>
              <p style={{ fontSize: "0.8125rem", color: "var(--warm-gray-600)", lineHeight: 1.5 }}>{item.detail}</p>
            </div>
          ))}
        </div>

        <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--ink)", margin: "1.25rem 0 0.75rem" }}>
          Go-To-Market Entry
        </div>
        <P>
          <strong>Target Spreadsheet Switchers first.</strong> They're already sold on the math. They've
          built the two-leg bridge in a spreadsheet. They know the 59.5 tax-advantaged problem. They just
          want it to stop being a manual process. Acquisition cost is low because they're pre-convinced —
          MoneyBeh just needs to be the obviously better interface.
        </P>
        <Bullets
          items={[
            "r/financialindependence, r/HENRYfinance — Spreadsheet Switchers live here",
            "Personal finance creators — authentic integration with the FIRE content ecosystem",
            "Organic growth loop (Phase 3): Player 1 invites Player 2 for Household Sync",
          ]}
        />
        <Callout type="tension" label="GTM and website are not yet synchronized">
          The public site currently shows all six personas simultaneously with no clear primary funnel.
          The Spreadsheet Switchers persona gets a "Most popular" badge on the home page persona grid, but
          the hero CTA ("Find your starting point") doesn't route specifically toward them. Consider
          whether the hero itself should speak more directly to the GTM-priority persona in early days,
          with the full persona chooser as a secondary entry point.
        </Callout>
      </Section>

      {/* ── 10. KPIs ─────────────────────────────────────────── */}
      <Section id="kpis" number="10" title="Key Performance Indicators" icon={BarChart2}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {[
            {
              kpi: "Time Reclaimed",
              category: "User Success",
              measure: "Average increase in Years Banked per user over 6 months.",
              why: "The north-star metric. If this moves, the product is working. Everything else is a leading indicator.",
            },
            {
              kpi: "Ritual Engagement",
              category: "Behavior",
              measure: "% of transactions successfully categorized via the Joy-Swipe weekly.",
              why: "This is the moat-building metric. Low ritual engagement = no behavioral dataset = no competitive differentiation.",
            },
            {
              kpi: "System Trust",
              category: "Retention",
              measure: "Plaid connection retention rate — are users keeping their accounts linked?",
              why: "If users disconnect Plaid, they've broken the data pipeline. It's the single leading indicator for churn.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-4"
              style={{ backgroundColor: "var(--paper)", border: "1px solid var(--warm-gray-200)" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.25rem" }}>
                <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--ink)" }}>{item.kpi}</span>
                <span
                  className="shrink-0 px-2 py-0.5 rounded-full"
                  style={{ fontSize: "0.625rem", fontWeight: 600, color: "var(--deep-teal-600)", backgroundColor: "var(--deep-teal-50)", textTransform: "uppercase", letterSpacing: "0.06em" }}
                >
                  {item.category}
                </span>
              </div>
              <p style={{ fontSize: "0.8125rem", color: "var(--warm-gray-700)", lineHeight: 1.5, marginBottom: "0.375rem" }}>
                {item.measure}
              </p>
              <p style={{ fontSize: "0.75rem", color: "var(--seafoam-700)", lineHeight: 1.5, fontStyle: "italic" }}>
                {item.why}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 11. Future Considerations ────────────────────────── */}
      <Section id="future" number="11" title="Future Considerations" icon={TrendingUp}>
        <P>
          The current roadmap focuses on building the core engine and establishing the behavioral habit loop.
          Below are strategic enhancements that could significantly improve accuracy and user confidence but
          are not yet prioritized for development.
        </P>
        
        <div
          className="rounded-xl p-4 mb-4"
          style={{ backgroundColor: "var(--paper)", border: "1px solid var(--warm-gray-200)" }}
        >
          <h3 className="text-sm mb-2" style={{ fontWeight: 700, color: "var(--ink)" }}>
            Life-Stage Spending Pattern Modeling
          </h3>
          <P>
            Spending isn't constant across decades. The US Bureau of Labor Statistics (Consumer Expenditure Survey)
            provides detailed data showing how household spending patterns shift by age cohort. A 35-year-old with
            young children has dramatically different expenses than a 55-year-old with an empty nest or a 70-year-old
            retiree.
          </P>
          <P>
            MoneyBeh currently models a static lifestyle cost in the Bridge Modeler—users set their desired monthly
            spend, and the calculator assumes it remains constant until Freedom. This works for short timelines but
            becomes less accurate for users planning 15–20+ year Bridges.
          </P>
          <div
            className="rounded-lg p-3 mb-3"
            style={{ backgroundColor: "var(--seafoam-50)", border: "1px solid var(--seafoam-200)" }}
          >
            <p className="text-xs mb-2" style={{ fontWeight: 700, color: "var(--seafoam-700)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              The Enhancement
            </p>
            <Bullets items={[
              "Integrate BLS data to model typical spending curves by decade (30s, 40s, 50s, 60s+)",
              "Allow users to mark expected life events: having children, paying for college, downsizing a home, or other major expense shifts",
              "Adjust the Bridge Modeler to account for high-expense periods (e.g., age 40–50 with children) and low-expense periods (e.g., age 60+ empty nest)",
              "Surface these insights proactively: \"Your 40s will likely cost 18% more than your current lifestyle. We've adjusted your Bridge timeline to reflect this.\"",
            ]} />
          </div>
          <div
            className="rounded-lg p-3"
            style={{ backgroundColor: "var(--deep-teal-50)", border: "1px solid var(--deep-teal-200)" }}
          >
            <p className="text-xs mb-2" style={{ fontWeight: 700, color: "var(--deep-teal-700)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              The Impact
            </p>
            <P>
              Users gain confidence that their freedom timeline accounts for reality, not just current spending.
              A 35-year-old user planning to retire at 50 would see that their lifestyle costs will peak during
              their 40s (childcare, education, larger home), then decline sharply in their 50s and beyond. The
              Calm Friend can then guide: "Your peak expense years are behind you—this gives you optionality to
              either accelerate freedom or increase Joy spending guilt-free."
            </P>
            <P>
              This prevents the common failure mode where users build a plan assuming static costs, then abandon
              it when life doesn't cooperate. By baking in predictable variability, MoneyBeh becomes the only
              tool that doesn't just model the present—it models the entire arc of a life.
            </P>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <div className="mt-10 pt-6 border-t" style={{ borderColor: "var(--warm-gray-200)" }}>
        <p className="text-xs" style={{ color: "var(--warm-gray-400)" }}>
          MoneyBeh Total Product Strategy · Last reviewed March 2026 · Decisions annotated in context
        </p>
      </div>
    </div>
  );
}