import { Link } from "react-router";
import { Palette, GitBranch, Map, Mic, FileText, ArrowRight, Calculator, Users, Target, Zap } from "lucide-react";

const sections = [
  {
    label: "Product Strategy",
    path: "/intranet/product-strategy",
    icon: Target,
    description:
      "Total product strategy — philosophy, personas, competitive moat, epics, roadmap, GTM, and KPIs. Includes decisions and open tensions.",
    accent: "var(--seafoam-500)",
    bg: "var(--seafoam-50)",
    border: "var(--seafoam-200)",
    text: "var(--seafoam-700)",
  },
  {
    label: "The Ecosystem of Intent",
    path: "/intranet/ecosystem",
    icon: Zap,
    description:
      "How features interconnect to create behavioral transformation. The virtuous cycle of Joy today and Freedom tomorrow.",
    accent: "var(--seafoam-500)",
    bg: "var(--seafoam-50)",
    border: "var(--seafoam-200)",
    text: "var(--seafoam-700)",
  },
  {
    label: "Design System",
    path: "/intranet/design-system",
    icon: Palette,
    color: "seafoam",
    description:
      "Live color swatches, typography scale, components, motion principles, and usage guidelines.",
    accent: "var(--seafoam-500)",
    bg: "var(--seafoam-50)",
    border: "var(--seafoam-200)",
    text: "var(--seafoam-700)",
  },
  {
    label: "Architecture",
    path: "/intranet/architecture",
    icon: GitBranch,
    description:
      "Tech stack, file structure, routing patterns, key contexts, and utility conventions.",
    accent: "var(--deep-teal-500)",
    bg: "var(--deep-teal-50)",
    border: "var(--deep-teal-200)",
    text: "var(--deep-teal-700)",
  },
  {
    label: "Calculator Math",
    path: "/intranet/calculator-math",
    icon: Calculator,
    description:
      "Mathematical foundation behind the Freedom Calculator — formulas, step-by-step logic, and verification methods.",
    accent: "var(--deep-teal-500)",
    bg: "var(--deep-teal-50)",
    border: "var(--deep-teal-200)",
    text: "var(--deep-teal-700)",
  },
  {
    label: "Roadmap",
    path: "/intranet/roadmap",
    icon: Map,
    description:
      "What's shipped, what's in progress, what's queued — in a visual board format.",
    accent: "var(--sand-500)",
    bg: "var(--sand-50)",
    border: "var(--sand-200)",
    text: "var(--sand-700)",
  },
  {
    label: "Podcast Scripts",
    path: "/intranet/podcast-scripts",
    icon: Mic,
    description:
      "Full series scripts for the MoneyBeh Podcast — all four parts, rendered cleanly.",
    accent: "var(--warm-gray-500)",
    bg: "var(--warm-gray-100)",
    border: "var(--warm-gray-200)",
    text: "var(--warm-gray-700)",
  },
  {
    label: "Guidelines",
    path: "/intranet/guidelines",
    icon: FileText,
    description:
      "Product philosophy, writing principles, FTU structure, and AI collaboration context.",
    accent: "var(--warm-gray-500)",
    bg: "var(--warm-gray-100)",
    border: "var(--warm-gray-200)",
    text: "var(--warm-gray-700)",
  },
];

const personaPages = [
  { label: "Early Career — The Foundation", path: "/for/early-career", desc: "The Multiplier Effect. Banking Time while young." },
  { label: "High Earners — The Trap", path: "/for/high-earners", desc: "Lifestyle Drift. The Joy Fund as permission to spend." },
  { label: "Spreadsheet — The Upgrade", path: "/for/spreadsheet", desc: "Precision without maintenance. The Two-Leg Bridge." },
  { label: "Late Boomers — The Catch-Up", path: "/for/late-boomers", desc: "Condensed Pathing. Mid-life, shorter window, optimized Bridge." },
  { label: "Income Accelerator — The Momentum Window", path: "/for/accelerator", desc: "Just got a raise or promotion. Capture the delta before drift does." },
  { label: "High Wealth — The Legacy", path: "/for/high-wealth", desc: "Mathematical Permission. Two-Stage model proves it." },
  { label: "Investor Pitch — The Vision", path: "/for/investor", desc: "Life as a Currency. Behavioral data moat." },
];

export function IntranetHub() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <div
          className="text-xs tracking-widest uppercase mb-3"
          style={{ color: "var(--warm-gray-400)", fontWeight: 500 }}
        >
          MoneyBeh Internal
        </div>
        <h1
          className="text-3xl mb-3"
          style={{ color: "var(--ink)", fontWeight: 600, lineHeight: 1.3 }}
        >
          What we're building and why
        </h1>
        <p
          className="text-base leading-relaxed max-w-xl"
          style={{ color: "var(--warm-gray-600)" }}
        >
          Everything a contributor needs to understand the product, the design
          language, the technical structure, and the direction.
        </p>
      </div>

      {/* Manifesto card */}
      <div
        className="rounded-2xl p-6 mb-8 border"
        style={{
          backgroundColor: "var(--seafoam-50)",
          borderColor: "var(--seafoam-200)",
        }}
      >
        <p
          className="text-sm leading-relaxed mb-3"
          style={{ color: "var(--seafoam-800)" }}
        >
          Most financial tools only show you half the picture. Budgeting apps
          tell you whether this month is working. Wealth trackers show you where
          you stand. But almost none of them connect the two — so you can do
          everything right and still have no idea when you'll actually be free.
        </p>
        <p
          className="text-sm"
          style={{ color: "var(--seafoam-700)", fontWeight: 600 }}
        >
          MoneyBeh closes that gap.
        </p>
      </div>

      {/* Section cards */}
      <div className="flex flex-col gap-3">
        {sections.map((section) => (
          <Link
            key={section.path}
            to={section.path}
            className="flex items-center gap-4 rounded-2xl p-5 border transition-all group"
            style={{
              backgroundColor: "var(--paper)",
              borderColor: "var(--warm-gray-200)",
            }}
          >
            {/* Icon */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{
                backgroundColor: section.bg,
                border: `1px solid ${section.border}`,
              }}
            >
              <section.icon size={18} style={{ color: section.accent }} />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div
                className="text-sm mb-0.5"
                style={{ color: "var(--ink)", fontWeight: 600 }}
              >
                {section.label}
              </div>
              <div
                className="text-sm leading-snug"
                style={{ color: "var(--warm-gray-500)" }}
              >
                {section.description}
              </div>
            </div>

            {/* Arrow */}
            <ArrowRight
              size={16}
              className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: "var(--warm-gray-400)" }}
            />
          </Link>
        ))}
      </div>

      {/* Persona Landing Pages */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-3">
          <Users size={16} style={{ color: "var(--warm-gray-400)" }} />
          <div className="text-xs tracking-widest uppercase" style={{ color: "var(--warm-gray-400)", fontWeight: 500 }}>
            Persona Landing Pages
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {personaPages.map((page) => (
            <Link
              key={page.path}
              to={page.path}
              className="flex items-center gap-3 rounded-xl px-4 py-3 border transition-all group"
              style={{ backgroundColor: "var(--paper)", borderColor: "var(--warm-gray-200)" }}
            >
              <div className="flex-1 min-w-0">
                <div className="text-sm" style={{ color: "var(--ink)", fontWeight: 600 }}>{page.label}</div>
                <div className="text-xs" style={{ color: "var(--warm-gray-500)" }}>{page.desc}</div>
              </div>
              <ArrowRight size={14} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--warm-gray-400)" }} />
            </Link>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-10 pt-6 border-t" style={{ borderColor: "var(--warm-gray-200)" }}>
        <p className="text-xs" style={{ color: "var(--warm-gray-400)" }}>
          v2.0 — Ocean Palette — Clear decisions. Less stress. More freedom.
        </p>
      </div>
    </div>
  );
}