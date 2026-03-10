import { useState, useEffect, useRef } from "react";
import {
  Heart,
  Lightbulb,
  Star,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Copy,
  Check,
  Eye,
  EyeOff,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type TagVariant = "seafoam" | "teal" | "sand" | "gray";

// ─── In-page nav ──────────────────────────────────────────────────────────────

const SECTIONS = [
  { id: "brand", label: "Brand" },
  { id: "voice", label: "Voice & Tone" },
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "spacing", label: "Spacing" },
  { id: "radius", label: "Radius" },
  { id: "shadows", label: "Shadows" },
  { id: "motion", label: "Motion" },
  { id: "components", label: "Components" },
];

function SectionNav() {
  const [active, setActive] = useState("brand");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="sticky top-0 z-30 -mx-6 px-6 py-3 mb-10 overflow-x-auto"
      style={{
        backgroundColor: "var(--warm-gray-100)",
        borderBottom: "1px solid var(--warm-gray-200)",
      }}
    >
      <div className="flex gap-1 min-w-max">
        {SECTIONS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="px-3 py-1.5 rounded-lg text-xs transition-colors whitespace-nowrap"
            style={{
              backgroundColor: active === id ? "var(--seafoam-500)" : "transparent",
              color: active === id ? "white" : "var(--warm-gray-600)",
              fontWeight: active === id ? 600 : 400,
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Section wrapper ───────────────────────────────────────────────────────────

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-16 scroll-mt-12">
      <div className="mb-6">
        <h2
          className="text-xl mb-1"
          style={{ color: "var(--ink)", fontWeight: 600 }}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm" style={{ color: "var(--warm-gray-500)" }}>
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

// ─── Subsection label ─────────────────────────────────────────────────────────

function SubLabel({
  children,
  color,
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <p
      className="text-xs uppercase tracking-widest mb-3"
      style={{ color: color ?? "var(--warm-gray-400)", fontWeight: 500 }}
    >
      {children}
    </p>
  );
}

// ─── Card wrapper ─────────────────────────────────────────────────────────────

function Card({
  children,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`rounded-2xl p-6 border ${className}`}
      style={{
        backgroundColor: "var(--paper)",
        borderColor: "var(--warm-gray-200)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Color swatch ─────────────────────────────────────────────────────────────

function ColorSwatch({
  name,
  value,
  label,
}: {
  name: string;
  value: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <button
      onClick={copy}
      title={`Copy ${value}`}
      className="flex flex-col gap-1.5 text-left group"
    >
      <div
        className="w-full h-10 rounded-xl border transition-transform group-hover:scale-[1.03]"
        style={{ backgroundColor: value, borderColor: "rgba(0,0,0,0.08)" }}
      />
      <div>
        <div
          className="text-xs"
          style={{ color: "var(--warm-gray-700)", fontWeight: 500 }}
        >
          {name}
        </div>
        <div className="text-xs" style={{ color: "var(--warm-gray-400)" }}>
          {copied ? "Copied!" : value}
        </div>
        {label && (
          <div
            className="text-xs mt-0.5"
            style={{ color: "var(--warm-gray-400)" }}
          >
            {label}
          </div>
        )}
      </div>
    </button>
  );
}

// ─── Code block ───────────────────────────────────────────────────────────────

function Code({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="relative group">
      <pre
        className="rounded-xl p-4 text-xs leading-relaxed overflow-x-auto"
        style={{
          backgroundColor: "var(--warm-gray-900)",
          color: "var(--warm-gray-200)",
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
        }}
      >
        <code>{children}</code>
      </pre>
      <button
        onClick={copy}
        className="absolute top-3 right-3 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: "var(--warm-gray-700)", color: "var(--warm-gray-300)" }}
      >
        {copied ? <Check size={12} /> : <Copy size={12} />}
      </button>
    </div>
  );
}

// ─── Tag ──────────────────────────────────────────────────────────────────────

function Tag({
  children,
  variant = "seafoam",
}: {
  children: React.ReactNode;
  variant?: TagVariant;
}) {
  const styles: Record<TagVariant, React.CSSProperties> = {
    seafoam: {
      backgroundColor: "var(--seafoam-50)",
      color: "var(--seafoam-700)",
      border: "1px solid var(--seafoam-200)",
    },
    teal: {
      backgroundColor: "var(--deep-teal-50)",
      color: "var(--deep-teal-600)",
      border: "1px solid var(--deep-teal-200)",
    },
    sand: {
      backgroundColor: "var(--sand-50)",
      color: "var(--sand-700)",
      border: "1px solid var(--sand-200)",
    },
    gray: {
      backgroundColor: "var(--warm-gray-100)",
      color: "var(--warm-gray-600)",
      border: "1px solid var(--warm-gray-200)",
    },
  };
  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-xs"
      style={{ ...styles[variant], fontWeight: 500 }}
    >
      {children}
    </span>
  );
}

// ─── Principle card ───────────────────────────────────────────────────────────

function PrincipleCard({
  icon,
  label,
  headline,
  body,
  color,
  bg,
  border,
}: {
  icon: React.ReactNode;
  label: string;
  headline: string;
  body: string;
  color: string;
  bg: string;
  border: string;
}) {
  return (
    <div
      className="rounded-2xl p-6 border"
      style={{ backgroundColor: bg, borderColor: border }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span style={{ color }}>{icon}</span>
        <span
          className="text-xs uppercase tracking-widest"
          style={{ color, fontWeight: 500 }}
        >
          {label}
        </span>
      </div>
      <div className="text-base mb-2" style={{ color: "var(--ink)", fontWeight: 600 }}>
        {headline}
      </div>
      <p className="text-sm" style={{ color: "var(--warm-gray-600)", lineHeight: 1.6 }}>
        {body}
      </p>
    </div>
  );
}

// ─── Callout component preview ────────────────────────────────────────────────

function LearnThisCallout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-4 border flex gap-3"
      style={{
        backgroundColor: "var(--deep-teal-50)",
        borderColor: "var(--deep-teal-200)",
      }}
    >
      <Lightbulb
        size={16}
        className="shrink-0 mt-0.5"
        style={{ color: "var(--deep-teal-500)" }}
      />
      <div>
        <div
          className="text-xs uppercase tracking-widest mb-1"
          style={{ color: "var(--deep-teal-500)", fontWeight: 600 }}
        >
          Learn This
        </div>
        <div className="text-sm" style={{ color: "var(--deep-teal-800)", lineHeight: 1.6 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function YouDidItBanner({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-5 border flex gap-3 items-start"
      style={{
        backgroundColor: "var(--sand-50)",
        borderColor: "var(--sand-200)",
      }}
    >
      <Star
        size={18}
        className="shrink-0 mt-0.5"
        style={{ color: "var(--sand-500)" }}
      />
      <div>
        <div
          className="text-xs uppercase tracking-widest mb-1"
          style={{ color: "var(--sand-600)", fontWeight: 600 }}
        >
          You Did It
        </div>
        <div className="text-sm" style={{ color: "var(--sand-800)", lineHeight: 1.6 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function OnTrackCallout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-4 border flex gap-3"
      style={{
        backgroundColor: "var(--seafoam-50)",
        borderColor: "var(--seafoam-200)",
      }}
    >
      <CheckCircle
        size={16}
        className="shrink-0 mt-0.5"
        style={{ color: "var(--seafoam-500)" }}
      />
      <div className="text-sm" style={{ color: "var(--seafoam-800)", lineHeight: 1.6 }}>
        {children}
      </div>
    </div>
  );
}

function ErrorCallout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-4 border flex gap-3"
      style={{
        backgroundColor: "var(--critical-subtle)",
        borderColor: "#FCA5A5",
      }}
    >
      <AlertCircle
        size={16}
        className="shrink-0 mt-0.5"
        style={{ color: "var(--critical)" }}
      />
      <div className="text-sm" style={{ color: "#7F1D1D", lineHeight: 1.6 }}>
        {children}
      </div>
    </div>
  );
}

// ─── Form input previews ──────────────────────────────────────────────────────

function InputDemo() {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      {/* Standard input */}
      <div>
        <SubLabel>Standard input</SubLabel>
        <div className="flex flex-col gap-1.5">
          <label
            className="text-sm"
            style={{ color: "var(--warm-gray-700)", fontWeight: 500 }}
          >
            Monthly spending
          </label>
          <input
            type="text"
            placeholder="e.g. 4,200"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
            style={{
              backgroundColor: "var(--warm-gray-50)",
              border: focused
                ? "1.5px solid var(--seafoam-400)"
                : "1.5px solid var(--warm-gray-200)",
              color: "var(--ink)",
              boxShadow: focused
                ? "0 0 0 3px rgba(95,166,150,0.12)"
                : "none",
            }}
          />
          <p className="text-xs" style={{ color: "var(--warm-gray-400)" }}>
            This is your lifestyle cost — the number everything else builds from.
          </p>
        </div>
      </div>

      {/* Password input */}
      <div>
        <SubLabel>Password input</SubLabel>
        <div className="flex flex-col gap-1.5">
          <label
            className="text-sm"
            style={{ color: "var(--warm-gray-700)", fontWeight: 500 }}
          >
            Password
          </label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="At least 8 characters"
              className="w-full px-4 py-3 pr-11 rounded-xl text-sm outline-none transition-all"
              style={{
                backgroundColor: "var(--warm-gray-50)",
                border: "1.5px solid var(--warm-gray-200)",
                color: "var(--ink)",
              }}
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2"
              style={{ color: "var(--warm-gray-400)" }}
            >
              {passwordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Error state */}
      <div>
        <SubLabel>Error state</SubLabel>
        <div className="flex flex-col gap-1.5">
          <label
            className="text-sm"
            style={{ color: "var(--warm-gray-700)", fontWeight: 500 }}
          >
            Date of birth
          </label>
          <input
            type="text"
            placeholder="MM / DD / YYYY"
            defaultValue="13/45/1990"
            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
            style={{
              backgroundColor: "var(--critical-subtle)",
              border: "1.5px solid var(--critical)",
              color: "var(--ink)",
            }}
          />
          <p className="text-xs" style={{ color: "var(--critical)" }}>
            That doesn't look like a valid date — let's try again.
          </p>
        </div>
      </div>

      {/* Dollar amount */}
      <div>
        <SubLabel>Dollar prefix input</SubLabel>
        <div className="flex flex-col gap-1.5">
          <label
            className="text-sm"
            style={{ color: "var(--warm-gray-700)", fontWeight: 500 }}
          >
            Retirement account balance
          </label>
          <div className="relative">
            <span
              className="absolute left-4 top-1/2 -translate-y-1/2 text-sm pointer-events-none"
              style={{ color: "var(--warm-gray-400)" }}
            >
              $
            </span>
            <input
              type="text"
              placeholder="0"
              className="w-full pl-8 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{
                backgroundColor: "var(--warm-gray-50)",
                border: "1.5px solid var(--warm-gray-200)",
                color: "var(--ink)",
              }}
            />
          </div>
          <p className="text-xs" style={{ color: "var(--warm-gray-400)" }}>
            Include all 401k, IRA, and pension balances.
          </p>
        </div>
      </div>

      <Code>{`/* Standard input */
<input
  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
  style={{
    backgroundColor: "var(--warm-gray-50)",
    border: focused
      ? "1.5px solid var(--seafoam-400)"
      : "1.5px solid var(--warm-gray-200)",
    color: "var(--ink)",
    boxShadow: focused ? "0 0 0 3px rgba(95,166,150,0.12)" : "none",
  }}
/>

/* Error state */
style={{
  backgroundColor: "var(--critical-subtle)",
  border: "1.5px solid var(--critical)",
}}`}</Code>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export function IntranetDesignSystem() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      {/* Header */}
      <div className="mb-8">
        <div
          className="text-xs tracking-widest uppercase mb-3"
          style={{ color: "var(--warm-gray-400)", fontWeight: 500 }}
        >
          MoneyBeh Internal · Design System
        </div>
        <h1
          className="text-3xl mb-3"
          style={{ color: "var(--ink)", fontWeight: 600, lineHeight: 1.3 }}
        >
          Design System
        </h1>
        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: "var(--warm-gray-600)" }}
        >
          Brand philosophy, voice, tokens, and components — one source of truth.
          Start at the top. The <em>why</em> comes before the <em>how</em>.
        </p>
        <div className="flex flex-wrap gap-2">
          <Tag variant="seafoam">Seafoam — Do This</Tag>
          <Tag variant="teal">Deep Teal — Learn This</Tag>
          <Tag variant="sand">Sand — You Did It</Tag>
          <Tag variant="gray">Warm Gray — Foundation</Tag>
        </div>
      </div>

      {/* Sticky in-page nav */}
      <SectionNav />

      {/* ─── BRAND FOUNDATION ───────────────────────────────────────── */}
      <Section
        id="brand"
        title="Brand Foundation"
        subtitle="The why before the how. Every pixel reflects these principles."
      >
        {/* Position statement */}
        <div
          className="rounded-2xl p-7 mb-6 border"
          style={{
            backgroundColor: "var(--seafoam-50)",
            borderColor: "var(--seafoam-200)",
          }}
        >
          <div
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: "var(--seafoam-500)", fontWeight: 500 }}
          >
            Position Statement
          </div>
          <blockquote
            className="text-2xl mb-4"
            style={{ color: "var(--seafoam-900)", fontWeight: 600, lineHeight: 1.4 }}
          >
            "Clear decisions. Less stress. More freedom."
          </blockquote>
          <p className="text-sm" style={{ color: "var(--seafoam-700)", lineHeight: 1.7 }}>
            MoneyBeh isn't a budgeting tool — it's a financial wellness companion. 
            It doesn't lecture. It doesn't shame. It walks alongside you like the calm 
            friend who's already walked this road and is showing you the way.
          </p>
        </div>

        {/* Three principles */}
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <PrincipleCard
            icon={<Heart size={16} />}
            label="Joy Today"
            headline="Build a life you enjoy now"
            body="Lifestyle cost — what it actually costs to live the life you want — is the foundation. Not a ceiling to be cut. A starting point."
            color="var(--seafoam-600)"
            bg="var(--seafoam-50)"
            border="var(--seafoam-200)"
          />
          <PrincipleCard
            icon={<ChevronRight size={16} />}
            label="Bridge to Freedom"
            headline="Fund the gap before 59½"
            body="The bridge leg carries you from today to 59.5. Regular taxable accounts, not retirement accounts. That's the practical bridge."
            color="var(--deep-teal-600)"
            bg="var(--deep-teal-50)"
            border="var(--deep-teal-200)"
          />
          <PrincipleCard
            icon={<Star size={16} />}
            label="Freedom After"
            headline="Retire on your terms from 59½"
            body="The retirement leg takes over at 59.5, funded to 92, assuming 5% real rate of return. Freedom Age is calculated — never declared."
            color="var(--sand-600)"
            bg="var(--sand-50)"
            border="var(--sand-200)"
          />
        </div>

        {/* Friend not tool */}
        <Card>
          <SubLabel>MoneyBeh is a friend. These are friend rules.</SubLabel>
          <div className="flex flex-col gap-3">
            {[
              ["Plain language always", "No jargon survives the friend filter. If your actual friend wouldn't say it, MoneyBeh doesn't say it."],
              ["No shame, no panic", "Financial setbacks are never shown in red. Red is reserved for true system errors only."],
              ["User sets the pace", "We calculate Freedom Age — we never ask users to declare a goal age upfront. Less pressure = more honesty."],
              ["Calm is a design decision", "Slow transitions (300–400ms), generous whitespace, monochromatic palettes. The interface breathes with the user."],
            ].map(([rule, detail]) => (
              <div
                key={rule}
                className="flex gap-3 py-3 border-b last:border-b-0"
                style={{ borderColor: "var(--warm-gray-100)" }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                  style={{ backgroundColor: "var(--seafoam-400)" }}
                />
                <div>
                  <div className="text-sm mb-0.5" style={{ color: "var(--ink)", fontWeight: 500 }}>
                    {rule}
                  </div>
                  <div className="text-sm" style={{ color: "var(--warm-gray-500)", lineHeight: 1.6 }}>
                    {detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* ─── VOICE & TONE ───────────────────────────────────────────── */}
      <Section
        id="voice"
        title="Voice & Tone"
        subtitle="The calm friend who's already walked this road."
      >
        {/* Don't say / Say instead */}
        <div className="mb-6">
          <SubLabel>Language — Don't say / Say instead</SubLabel>
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: "var(--warm-gray-200)" }}
          >
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: "var(--warm-gray-100)" }}>
                  <th
                    className="px-4 py-3 text-left text-xs"
                    style={{ color: "var(--critical)", fontWeight: 500 }}
                  >
                    ✗  Don't say
                  </th>
                  <th
                    className="px-4 py-3 text-left text-xs"
                    style={{ color: "var(--seafoam-600)", fontWeight: 500 }}
                  >
                    ✓  Say instead
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["You're behind on retirement", "You just can't see the full picture yet."],
                  ["Get your finances under control", "See where you stand. See where you're headed."],
                  ["Start saving now", "Find your starting point."],
                  ["You're losing money to inflation", "A dollar today buys more than a dollar next year."],
                  ["You're overspending", "A small rebalance could change everything."],
                  ["Budget", "Spending plan"],
                  ["Financial independence", "Full Freedom"],
                  ["Retirement account", "Freedom fund"],
                  ["Emergency fund", "Safety reserve"],
                ].map(([dont, say], i) => (
                  <tr
                    key={dont}
                    style={{
                      backgroundColor: i % 2 === 0 ? "var(--paper)" : "var(--warm-gray-50)",
                      borderTop: "1px solid var(--warm-gray-100)",
                    }}
                  >
                    <td
                      className="px-4 py-3 text-xs"
                      style={{ color: "var(--warm-gray-500)", textDecoration: "line-through" }}
                    >
                      {dont}
                    </td>
                    <td
                      className="px-4 py-3 text-xs"
                      style={{ color: "var(--seafoam-700)", fontWeight: 500 }}
                    >
                      {say}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Product vocabulary */}
        <div>
          <SubLabel>Product Vocabulary — Canonical Terms</SubLabel>
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: "var(--warm-gray-200)" }}
          >
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: "var(--warm-gray-100)" }}>
                  <th
                    className="px-4 py-3 text-left text-xs"
                    style={{ color: "var(--warm-gray-500)", fontWeight: 500 }}
                  >
                    Finance Term
                  </th>
                  <th
                    className="px-4 py-3 text-left text-xs"
                    style={{ color: "var(--seafoam-600)", fontWeight: 500 }}
                  >
                    MoneyBeh Term
                  </th>
                  <th
                    className="px-4 py-3 text-left text-xs hidden sm:table-cell"
                    style={{ color: "var(--warm-gray-500)", fontWeight: 500 }}
                  >
                    Context
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Financial Independence", "Full Freedom", "The goal state — used in dashboard, milestones"],
                  ["FI Number", "Freedom Number", "The target portfolio value"],
                  ["Budget", "Spending plan", "Everywhere in the UI"],
                  ["Retirement", "Freedom timeline", "In progress trackers and projections"],
                  ["Overspending", "Rebalance needed", "Status indicators, alerts"],
                  ["Emergency Fund", "Safety reserve", "Input labels, dashboard cards"],
                  ["Compound Interest", "Growth momentum", "Educational content only"],
                  ["59½ Withdrawal Age", "The bridge to 59.5", "FTU flow, architecture explainers"],
                  ["Portfolio Withdrawal Rate", "Freedom pace", "Advanced users, projection screens"],
                ].map(([finance, moneybeh, context], i) => (
                  <tr
                    key={finance}
                    style={{
                      backgroundColor: i % 2 === 0 ? "var(--paper)" : "var(--warm-gray-50)",
                      borderTop: "1px solid var(--warm-gray-100)",
                    }}
                  >
                    <td
                      className="px-4 py-3 text-xs"
                      style={{ color: "var(--warm-gray-500)" }}
                    >
                      {finance}
                    </td>
                    <td
                      className="px-4 py-3 text-xs"
                      style={{ color: "var(--seafoam-700)", fontWeight: 500 }}
                    >
                      {moneybeh}
                    </td>
                    <td
                      className="px-4 py-3 text-xs hidden sm:table-cell"
                      style={{ color: "var(--warm-gray-400)" }}
                    >
                      {context}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* ─── COLORS ─────────────────────────────────────────────────── */}
      <Section
        id="colors"
        title="Color System"
        subtitle="80/20 monochromatic. Most UI is Paper + Ink. Color signals meaning — not decoration."
      >
        {/* Intent overview */}
        <div className="grid sm:grid-cols-3 gap-3 mb-8">
          {[
            {
              label: "Seafoam — Do This",
              sub: "Primary CTAs, on-track states, progress, success",
              bg: "var(--seafoam-50)",
              border: "var(--seafoam-200)",
              dot: "var(--seafoam-500)",
              text: "var(--seafoam-800)",
            },
            {
              label: "Deep Teal — Learn This",
              sub: "Educational content, insights, recommendations, explanations",
              bg: "var(--deep-teal-50)",
              border: "var(--deep-teal-200)",
              dot: "var(--deep-teal-500)",
              text: "var(--deep-teal-800)",
            },
            {
              label: "Sand — You Did It",
              sub: "Celebrations, achievements, milestones. Use sparingly.",
              bg: "var(--sand-50)",
              border: "var(--sand-200)",
              dot: "var(--sand-500)",
              text: "var(--sand-800)",
            },
          ].map(({ label, sub, bg, border, dot, text }) => (
            <div
              key={label}
              className="rounded-2xl p-4 border"
              style={{ backgroundColor: bg, borderColor: border }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: dot }}
                />
                <span className="text-xs" style={{ color: text, fontWeight: 600 }}>
                  {label}
                </span>
              </div>
              <p className="text-xs" style={{ color: text, opacity: 0.75, lineHeight: 1.6 }}>
                {sub}
              </p>
            </div>
          ))}
        </div>

        {/* Foundation */}
        <div className="mb-6">
          <SubLabel>Foundation — Paper & Ink</SubLabel>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ColorSwatch name="Paper" value="#F7FAFA" label="--paper · Background" />
            <ColorSwatch name="Paper Dark" value="#EEF5F5" label="Subtle tinted surfaces" />
            <ColorSwatch name="Ink" value="#1A1A1B" label="--ink · Primary text" />
            <ColorSwatch name="Ink Light" value="#4A4540" label="Secondary text" />
          </div>
        </div>

        {/* Seafoam */}
        <div className="mb-6">
          <SubLabel color="var(--seafoam-500)">Seafoam — Primary "Do This"</SubLabel>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {[
              ["50", "#F3F9F8"],["100", "#E0F2EE"],["200", "#C5E6DF"],["300", "#9DD4C8"],
              ["400", "#75C1B1"],["500", "#5FA696"],["600", "#4A8979"],["700", "#3B6F62"],
              ["800", "#2E574D"],["900", "#1F3A34"],
            ].map(([shade, hex]) => (
              <ColorSwatch key={shade} name={shade} value={hex} />
            ))}
          </div>
          <p className="text-xs mt-2" style={{ color: "var(--warm-gray-500)" }}>
            <strong style={{ color: "var(--seafoam-600)" }}>500</strong> = primary buttons &amp; CTAs ·{" "}
            <strong style={{ color: "var(--seafoam-600)" }}>50–100</strong> = card backgrounds ·{" "}
            <strong style={{ color: "var(--seafoam-600)" }}>700</strong> = text on tinted bg
          </p>
        </div>

        {/* Deep Teal */}
        <div className="mb-6">
          <SubLabel color="var(--deep-teal-500)">Deep Teal — Secondary "Learn This"</SubLabel>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {[
              ["50", "#F1F7F9"],["100", "#D9ECF0"],["200", "#B3D9E2"],["300", "#7FBFD0"],
              ["400", "#5BA2B5"],["500", "#3D7A8A"],["600", "#306270"],["700", "#264F5A"],
              ["800", "#1D3C45"],["900", "#13282F"],
            ].map(([shade, hex]) => (
              <ColorSwatch key={shade} name={shade} value={hex} />
            ))}
          </div>
          <p className="text-xs mt-2" style={{ color: "var(--warm-gray-500)" }}>
            <strong style={{ color: "var(--deep-teal-600)" }}>500</strong> = icon &amp; text accents ·{" "}
            <strong style={{ color: "var(--deep-teal-600)" }}>50–100</strong> = "Learn This" callout bg ·{" "}
            <strong style={{ color: "var(--deep-teal-600)" }}>800</strong> = callout body text
          </p>
        </div>

        {/* Sand */}
        <div className="mb-6">
          <SubLabel color="var(--sand-600)">Sand — Tertiary "You Did It!"</SubLabel>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {[
              ["50", "#FBF8F4"],["100", "#F5EFE3"],["200", "#EBE0C9"],["300", "#DFCCA5"],
              ["400", "#D9C087"],["500", "#D4AF6A"],["600", "#B89454"],["700", "#967842"],
              ["800", "#745C32"],["900", "#4F3E22"],
            ].map(([shade, hex]) => (
              <ColorSwatch key={shade} name={shade} value={hex} />
            ))}
          </div>
          <p className="text-xs mt-2" style={{ color: "var(--warm-gray-500)" }}>
            Reserved for milestone moments only. Never use for general UI decoration.
          </p>
        </div>

        {/* Warm Gray */}
        <div className="mb-6">
          <SubLabel color="var(--warm-gray-600)">Warm Gray — Neutral Foundation</SubLabel>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {[
              ["50", "#FAF9F8"],["100", "#F2F0EE"],["200", "#E7E4E0"],["300", "#D4CFC8"],
              ["400", "#B8B1A8"],["500", "#938A7E"],["600", "#6F6760"],["700", "#4A4540"],
              ["800", "#2D2926"],["900", "#1A1715"],
            ].map(([shade, hex]) => (
              <ColorSwatch key={shade} name={shade} value={hex} />
            ))}
          </div>
        </div>

        {/* Critical */}
        <div>
          <SubLabel color="var(--critical)">Critical — Errors only. Never financial setbacks.</SubLabel>
          <div className="grid grid-cols-2 gap-3 max-w-xs">
            <ColorSwatch name="Critical" value="#DC2626" label="True errors only" />
            <ColorSwatch name="Subtle" value="#FFF3F3" label="Error backgrounds" />
          </div>
        </div>
      </Section>

      {/* ─── TYPOGRAPHY ─────────────────────────────────────────────── */}
      <Section
        id="typography"
        title="Typography"
        subtitle="Jost — geometric sans-serif. One family, four weights. Clarity above all."
      >
        <Card className="mb-4">
          {[
            { label: "4xl · 36px", size: "2.25rem", weight: 600 },
            { label: "3xl · 30px", size: "1.875rem", weight: 600 },
            { label: "2xl · 24px", size: "1.5rem", weight: 600 },
            { label: "xl · 20px", size: "1.25rem", weight: 500 },
            { label: "lg · 18px", size: "1.125rem", weight: 500 },
            { label: "base · 16px", size: "1rem", weight: 400 },
            { label: "sm · 14px", size: "0.875rem", weight: 400 },
            { label: "xs · 12px", size: "0.75rem", weight: 400 },
          ].map(({ label, size, weight }) => (
            <div
              key={label}
              className="flex items-baseline gap-4 py-3 border-b last:border-b-0"
              style={{ borderColor: "var(--warm-gray-100)" }}
            >
              <span
                className="w-28 shrink-0 text-xs"
                style={{ color: "var(--warm-gray-400)" }}
              >
                {label}
              </span>
              <span style={{ fontSize: size, fontWeight: weight, color: "var(--ink)", lineHeight: 1.3 }}>
                Joy today. Freedom tomorrow.
              </span>
            </div>
          ))}
        </Card>

        <Card>
          <SubLabel>Weights in use</SubLabel>
          <div className="flex flex-col gap-3">
            {[
              [400, "Normal", "Body copy, descriptions, helper text"],
              [500, "Medium", "Labels, secondary headings, nav items"],
              [600, "Semibold", "Headings, card titles, emphasis"],
              [700, "Bold", "Hero text, strong CTA copy"],
            ].map(([w, name, use]) => (
              <div key={w} className="flex items-center gap-4">
                <span
                  className="w-8 text-xs shrink-0 text-right"
                  style={{ color: "var(--warm-gray-400)" }}
                >
                  {w}
                </span>
                <span
                  style={{ fontWeight: Number(w), color: "var(--ink)", fontSize: "1rem" }}
                >
                  Clear decisions. Less stress. More freedom.
                </span>
                <span
                  className="text-xs shrink-0 hidden sm:block"
                  style={{ color: "var(--warm-gray-400)" }}
                >
                  {name} — {use}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* ─── SPACING ────────────────────────────────────────────────── */}
      <Section
        id="spacing"
        title="Spacing"
        subtitle="Generous spacing supports calm, breathable interfaces. When in doubt, go bigger."
      >
        <Card>
          {[
            ["1", "4px", "0.25rem", "Icon nudges"],
            ["2", "8px", "0.5rem", "Tight gaps"],
            ["3", "12px", "0.75rem", "Inline element gaps"],
            ["4", "16px", "1rem", "Standard padding unit"],
            ["5", "20px", "1.25rem", "Form field spacing"],
            ["6", "24px", "1.5rem", "Card padding base"],
            ["8", "32px", "2rem", "Section breathing room"],
            ["10", "40px", "2.5rem", "Between major groups"],
            ["12", "48px", "3rem", "Section to section"],
            ["16", "64px", "4rem", "Page-level breathing"],
          ].map(([name, px, rem, use]) => (
            <div
              key={name}
              className="flex items-center gap-4 py-2 border-b last:border-b-0"
              style={{ borderColor: "var(--warm-gray-100)" }}
            >
              <span
                className="w-6 text-xs shrink-0 text-right"
                style={{ color: "var(--warm-gray-400)" }}
              >
                {name}
              </span>
              <div
                className="shrink-0"
                style={{
                  width: px,
                  height: "20px",
                  backgroundColor: "var(--seafoam-200)",
                  borderRadius: "4px",
                  minWidth: "4px",
                }}
              />
              <span className="text-xs w-24 shrink-0" style={{ color: "var(--warm-gray-500)" }}>
                {px} · {rem}
              </span>
              <span className="text-xs hidden sm:block" style={{ color: "var(--warm-gray-400)" }}>
                {use}
              </span>
            </div>
          ))}
        </Card>
      </Section>

      {/* ─── BORDER RADIUS ──────────────────────────────────────────── */}
      <Section
        id="radius"
        title="Border Radius — Soft Geometry"
        subtitle="Generous corners signal approachability. The interface never has sharp edges."
      >
        <Card>
          <div className="flex flex-wrap gap-6">
            {[
              ["sm", "8px", "Tags, small chips"],
              ["md", "12px", "Input fields"],
              ["lg", "16px", "Small cards"],
              ["xl", "24px", "Standard cards"],
              ["2xl", "32px", "Primary cards, modals"],
              ["full", "9999px", "Pills, badges"],
            ].map(([name, px, use]) => (
              <div key={name} className="flex flex-col items-center gap-2">
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    backgroundColor: "var(--seafoam-100)",
                    border: "1px solid var(--seafoam-200)",
                    borderRadius: px === "9999px" ? "9999px" : px,
                  }}
                />
                <div className="text-center">
                  <div
                    className="text-xs"
                    style={{ color: "var(--warm-gray-700)", fontWeight: 500 }}
                  >
                    {name}
                  </div>
                  <div className="text-xs" style={{ color: "var(--warm-gray-400)" }}>
                    {px}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--warm-gray-300)" }}>
                    {use}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* ─── SHADOWS ────────────────────────────────────────────────── */}
      <Section
        id="shadows"
        title="Shadows"
        subtitle="Depth without drama. Elevation conveys hierarchy, not decoration."
      >
        <Card>
          <div className="flex flex-wrap gap-8">
            {[
              ["xs", "0 1px 2px rgba(26,26,27,0.05)", "Subtle lift — tags, chips"],
              ["sm", "0 2px 8px rgba(26,26,27,0.08)", "Cards, inputs on hover"],
              ["md", "0 4px 16px rgba(26,26,27,0.10)", "Floating cards, tooltips"],
              ["lg", "0 8px 24px rgba(26,26,27,0.12)", "Modals, sheets, overlays"],
            ].map(([name, shadow, use]) => (
              <div key={name} className="flex flex-col items-center gap-3">
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "var(--paper)",
                    borderRadius: "16px",
                    boxShadow: shadow,
                  }}
                />
                <div className="text-center">
                  <div className="text-xs" style={{ color: "var(--warm-gray-700)", fontWeight: 500 }}>
                    shadow-{name}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--warm-gray-400)" }}>
                    {use}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* ─── MOTION ─────────────────────────────────────────────────── */}
      <Section
        id="motion"
        title="Motion — The Exhale"
        subtitle="The app breathes with you. Slow, deliberate transitions reduce cognitive load."
      >
        <Card>
          <div className="flex flex-col gap-3 mb-5">
            {[
              ["fast", "200ms", "Micro-interactions, icon swaps, checkboxes"],
              ["base — The Exhale", "300ms", "Page transitions, panel reveals, dropdowns"],
              ["slow — The Exhale", "400ms", "Complex state changes, modals, onboarding steps"],
            ].map(([name, ms, use]) => (
              <div
                key={name}
                className="flex items-center gap-4 py-2 border-b last:border-b-0"
                style={{ borderColor: "var(--warm-gray-100)" }}
              >
                <span
                  className="w-40 text-xs shrink-0"
                  style={{ color: "var(--warm-gray-700)", fontWeight: 500 }}
                >
                  {name}
                </span>
                <span
                  className="w-16 text-xs shrink-0"
                  style={{ color: "var(--seafoam-600)", fontWeight: 600 }}
                >
                  {ms}
                </span>
                <span className="text-xs" style={{ color: "var(--warm-gray-500)" }}>
                  {use}
                </span>
              </div>
            ))}
          </div>
          <Code>{`/* Motion tokens */
--easing: cubic-bezier(0.4, 0.0, 0.2, 1);
--transition-fast: 200ms;
--transition-base: 300ms;  /* The Exhale */
--transition-slow: 400ms;  /* The Exhale */

/* Usage */
transition: all var(--transition-base) var(--easing);`}</Code>
        </Card>
      </Section>

      {/* ─── COMPONENTS ─────────────────────────────────────────────── */}
      <Section
        id="components"
        title="Components"
        subtitle="Live examples with inline styles. Copy the pattern, not just the code."
      >
        {/* Buttons */}
        <div className="mb-8">
          <SubLabel>Buttons</SubLabel>
          <Card>
            <div className="flex flex-wrap gap-3 mb-5">
              <button
                className="px-6 py-3 rounded-2xl transition-colors text-sm"
                style={{
                  backgroundColor: "var(--seafoam-500)",
                  color: "white",
                  fontWeight: 500,
                  boxShadow: "0 2px 8px rgba(26,26,27,0.08)",
                }}
              >
                Primary action
              </button>
              <button
                className="px-6 py-3 rounded-2xl border transition-colors text-sm"
                style={{
                  backgroundColor: "var(--warm-gray-100)",
                  color: "var(--warm-gray-800)",
                  border: "1px solid var(--warm-gray-300)",
                  fontWeight: 500,
                }}
              >
                Secondary action
              </button>
              <button
                className="px-6 py-3 rounded-2xl border transition-colors text-sm"
                style={{
                  backgroundColor: "transparent",
                  color: "var(--seafoam-600)",
                  border: "1px solid var(--seafoam-300)",
                  fontWeight: 500,
                }}
              >
                Ghost action
              </button>
              <button
                className="px-6 py-3 rounded-2xl text-sm"
                style={{
                  backgroundColor: "var(--warm-gray-100)",
                  color: "var(--warm-gray-400)",
                  fontWeight: 500,
                  cursor: "not-allowed",
                }}
                disabled
              >
                Disabled
              </button>
            </div>
            <Code>{`/* Primary */
style={{
  backgroundColor: "var(--seafoam-500)",
  color: "white",
  fontWeight: 500,
  borderRadius: "1rem",
  padding: "12px 24px",
}}

/* Secondary */
style={{
  backgroundColor: "var(--warm-gray-100)",
  color: "var(--warm-gray-800)",
  border: "1px solid var(--warm-gray-300)",
}}`}</Code>
          </Card>
        </div>

        {/* Cards */}
        <div className="mb-8">
          <SubLabel>Cards</SubLabel>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <Card style={{ boxShadow: "0 2px 8px rgba(26,26,27,0.08)" }}>
              <p
                className="text-xs uppercase tracking-widest mb-2"
                style={{ color: "var(--warm-gray-400)", fontWeight: 500 }}
              >
                Default card
              </p>
              <p className="text-sm" style={{ color: "var(--warm-gray-600)" }}>
                Paper background · warm-gray-200 border · shadow-sm · radius 2xl (32px)
              </p>
            </Card>
            <div
              className="rounded-2xl p-6 border"
              style={{
                backgroundColor: "var(--seafoam-50)",
                borderColor: "var(--seafoam-200)",
              }}
            >
              <p
                className="text-xs uppercase tracking-widest mb-2"
                style={{ color: "var(--seafoam-500)", fontWeight: 500 }}
              >
                Seafoam card — Do This
              </p>
              <p className="text-sm" style={{ color: "var(--seafoam-700)" }}>
                Primary highlights, on-track states, key action callouts.
              </p>
            </div>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="mb-8">
          <SubLabel>Form Inputs</SubLabel>
          <Card>
            <InputDemo />
          </Card>
        </div>

        {/* Callouts & Banners */}
        <div className="mb-8">
          <SubLabel>Callouts & Banners</SubLabel>
          <div className="flex flex-col gap-4 mb-5">
            <LearnThisCallout>
              At 5% real return, money doubles roughly every 14 years. Starting 
              at 30 vs. 35 isn't five years — it's one full doubling cycle.
            </LearnThisCallout>

            <YouDidItBanner>
              Your bridge fund just crossed $50,000. You've bought yourself 
              14 months of freedom. That's real.
            </YouDidItBanner>

            <OnTrackCallout>
              Based on your current spending plan and contributions, your 
              Freedom Age is 52. You're on track.
            </OnTrackCallout>

            <ErrorCallout>
              We couldn't load your account data. Please check your connection 
              and try again.
            </ErrorCallout>
          </div>
          <Code>{`/* Learn This — Deep Teal */
<div style={{
  backgroundColor: "var(--deep-teal-50)",
  borderColor: "var(--deep-teal-200)",
  color: "var(--deep-teal-800)",
}}>
  <Lightbulb style={{ color: "var(--deep-teal-500)" }} />
  <span className="label">Learn This</span>
  {content}
</div>

/* You Did It — Sand */
<div style={{
  backgroundColor: "var(--sand-50)",
  borderColor: "var(--sand-200)",
  color: "var(--sand-800)",
}}>
  <Star style={{ color: "var(--sand-500)" }} />
  <span className="label">You Did It</span>
  {content}
</div>

/* On Track — Seafoam */
<div style={{
  backgroundColor: "var(--seafoam-50)",
  borderColor: "var(--seafoam-200)",
  color: "var(--seafoam-800)",
}} />`}</Code>
        </div>

        {/* Status indicators */}
        <div className="mb-8">
          <SubLabel>Status Indicators</SubLabel>
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { label: "On track", bg: "var(--seafoam-50)", color: "var(--seafoam-700)", dot: "var(--seafoam-500)", border: "var(--seafoam-200)" },
              { label: "Insight", bg: "var(--deep-teal-50)", color: "var(--deep-teal-600)", dot: "var(--deep-teal-500)", border: "var(--deep-teal-200)" },
              { label: "Milestone", bg: "var(--sand-50)", color: "var(--sand-700)", dot: "var(--sand-500)", border: "var(--sand-200)" },
              { label: "Neutral", bg: "var(--warm-gray-100)", color: "var(--warm-gray-600)", dot: "var(--warm-gray-400)", border: "var(--warm-gray-200)" },
            ].map(({ label, bg, color, dot, border }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs border"
                style={{ backgroundColor: bg, color, border: `1px solid ${border}`, fontWeight: 500 }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dot }} />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Progress bars */}
        <div className="mb-8">
          <SubLabel>Progress Bars</SubLabel>
          <Card>
            <div className="flex flex-col gap-4">
              {[
                { label: "Bridge fund progress", pct: 28, color: "var(--seafoam-500)" },
                { label: "Essentials covered", pct: 62, color: "var(--deep-teal-500)" },
                { label: "Full Freedom", pct: 41, color: "var(--sand-500)" },
              ].map(({ label, pct, color }) => (
                <div key={label}>
                  <div
                    className="flex justify-between mb-1.5 text-xs"
                    style={{ color: "var(--warm-gray-600)" }}
                  >
                    <span>{label}</span>
                    <span>{pct}%</span>
                  </div>
                  <div
                    className="h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: "var(--warm-gray-200)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: color,
                        transition: "width 400ms cubic-bezier(0.4,0,0.2,1)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Iconography */}
        <div>
          <SubLabel>Iconography — Lucide React</SubLabel>
          <Card>
            <p className="text-sm mb-5" style={{ color: "var(--warm-gray-600)", lineHeight: 1.6 }}>
              All icons from <strong style={{ color: "var(--ink)" }}>lucide-react</strong>. 
              Default size is <code className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: "var(--warm-gray-100)", color: "var(--ink)" }}>16px</code> for inline, 
              <code className="text-xs px-1.5 py-0.5 rounded ml-1" style={{ backgroundColor: "var(--warm-gray-100)", color: "var(--ink)" }}>20px</code> for standalone, 
              <code className="text-xs px-1.5 py-0.5 rounded ml-1" style={{ backgroundColor: "var(--warm-gray-100)", color: "var(--ink)" }}>24px</code> for nav &amp; empty states.
              Never use filled icons — Lucide is outline-only by design.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: <Heart size={20} />, name: "Heart", use: "Wellbeing moments", color: "var(--seafoam-500)" },
                { icon: <Lightbulb size={20} />, name: "Lightbulb", use: "Learn This", color: "var(--deep-teal-500)" },
                { icon: <Star size={20} />, name: "Star", use: "You Did It", color: "var(--sand-500)" },
                { icon: <CheckCircle size={20} />, name: "CheckCircle", use: "On track", color: "var(--seafoam-500)" },
                { icon: <AlertCircle size={20} />, name: "AlertCircle", use: "Errors only", color: "var(--critical)" },
                { icon: <ChevronRight size={20} />, name: "ChevronRight", use: "Navigation", color: "var(--warm-gray-500)" },
              ].map(({ icon, name, use, color }) => (
                <div
                  key={name}
                  className="rounded-xl p-3 border flex flex-col gap-2"
                  style={{ borderColor: "var(--warm-gray-200)", backgroundColor: "var(--warm-gray-50)" }}
                >
                  <span style={{ color }}>{icon}</span>
                  <div>
                    <div className="text-xs" style={{ color: "var(--ink)", fontWeight: 500 }}>{name}</div>
                    <div className="text-xs" style={{ color: "var(--warm-gray-400)" }}>{use}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* Footer */}
      <div
        className="mt-4 pt-6 border-t"
        style={{ borderColor: "var(--warm-gray-200)" }}
      >
        <p className="text-xs" style={{ color: "var(--warm-gray-400)" }}>
          MoneyBeh Design System v2.1 — Brand + tokens in one place. 
          Last updated March 2026. If something here conflicts with Guidelines.md, Guidelines.md wins.
        </p>
      </div>

    </div>
  );
}
