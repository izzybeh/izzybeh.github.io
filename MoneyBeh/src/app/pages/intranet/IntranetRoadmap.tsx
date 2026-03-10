import { useState } from "react";
import { CheckCircle2, Circle, Clock, Archive } from "lucide-react";

type Status = "done" | "in-progress" | "up-next" | "backlog";
type Tag = "FTU" | "public-site" | "dashboard" | "auth" | "content" | "infra" | "calculator";

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  tags: Tag[];
  status: Status;
  note?: string;
}

const items: RoadmapItem[] = [
  // ─── Done ──────────────────────────────────────────────────────
  {
    id: "home",
    title: "Home page",
    description: "Hero, features, social proof, CTA sections.",
    tags: ["public-site"],
    status: "done",
  },
  {
    id: "about",
    title: "About page",
    description: "Izzy's origin story, brand pillars, MoneyBeh manifesto.",
    tags: ["public-site"],
    status: "done",
  },
  {
    id: "articles",
    title: "Articles page",
    description: "Content hub for financial wellness posts.",
    tags: ["content", "public-site"],
    status: "done",
  },
  {
    id: "podcast",
    title: "Podcast page + audio player",
    description: "Episode list, persistent audio player across route changes via AudioContext.",
    tags: ["content", "public-site"],
    status: "done",
  },
  {
    id: "design-system",
    title: "Design system v2.0",
    description: "Ocean palette, Soft Geometry, The Exhale, Jost typography, CSS token system.",
    tags: ["infra"],
    status: "done",
  },
  {
    id: "ftu-v1",
    title: "FTU v1 — 5-step flow",
    description: "Basic onboarding: welcome → path → spending → investments → summary.",
    tags: ["FTU"],
    status: "done",
    note: "Being redesigned — see FTU Redesign in In Progress.",
  },
  {
    id: "intranet",
    title: "Internal intranet",
    description: "Design system, architecture, roadmap, guidelines — all in one internal hub.",
    tags: ["infra"],
    status: "done",
  },

  // ─── In Progress ───────────────────────────────────────────────
  {
    id: "ftu-v2-design",
    title: "FTU v2 — Redesign (structure)",
    description:
      "Path selection → personalized mirror → account creation → data inputs → dashboard. Freedom age is calculated, not declared.",
    tags: ["FTU"],
    status: "in-progress",
    note: "Path types and mirror content TBD. Target age input removed.",
  },
  {
    id: "ftu-mirror",
    title: "Personalized mirror moment",
    description:
      "The most important screen in the FTU — shows users their situation back to them before they've entered any data. Design not yet defined.",
    tags: ["FTU"],
    status: "in-progress",
    note: "Key open question: qualitative reflection vs. dummy dashboard preview.",
  },

  // ─── Up Next ───────────────────────────────────────────────────
  {
    id: "ftu-path-selection",
    title: "FTU — Path selection screen",
    description:
      "Three paths: beginner, mid-journey, optimizer. Path changes what the mirror shows and possibly what data inputs appear.",
    tags: ["FTU"],
    status: "up-next",
  },
  {
    id: "bridge-calculator",
    title: "Bridge strategy calculator",
    description:
      "Two-leg model: bridge leg (now → 59.5) + retirement leg (59.5 → 92). 5% real rate of return. Monthly spending in real dollars as the foundation.",
    tags: ["calculator"],
    status: "up-next",
    note: "Core MoneyBeh calculation — not the 4% rule.",
  },
  {
    id: "dashboard-v1",
    title: "Dashboard v1",
    description:
      "Freedom Timeline visual, Time Banked metric, Essentials Covered + Full Freedom milestones. Monthly spending as the anchor.",
    tags: ["dashboard"],
    status: "up-next",
  },

  // ─── Backlog ───────────────────────────────────────────────────
  {
    id: "auth",
    title: "Authentication",
    description:
      "Supabase auth. Needed for data persistence. Account creation is part of the FTU redesign.",
    tags: ["auth", "infra"],
    status: "backlog",
    note: "Deferred — Supabase connection not yet established.",
  },
  {
    id: "data-persistence",
    title: "Data persistence",
    description:
      "Save user inputs (DOB, spending, investment accounts) to Supabase. Required for returning user experience.",
    tags: ["auth", "dashboard"],
    status: "backlog",
  },
  {
    id: "spending-tracking",
    title: "Spending plan tool",
    description:
      "Essentials + Joy allocation. Zero-based budgeting flow within the app.",
    tags: ["dashboard"],
    status: "backlog",
  },
  {
    id: "freedom-timeline-visual",
    title: "Freedom Timeline visual",
    description:
      "The signature MoneyBeh visualization. Time-based (ages), not dollar-based. Two milestones: Essentials Covered and Full Freedom.",
    tags: ["dashboard", "calculator"],
    status: "backlog",
  },
  {
    id: "pulse-checks",
    title: "Pulse checks",
    description:
      "Periodic rebalancing prompts — calm, not alarming. 'Rebalance needed' not 'You overspent.'",
    tags: ["dashboard"],
    status: "backlog",
  },
  {
    id: "learn-content",
    title: "Learn content hub",
    description:
      "Behavioral translator in action. Financial concepts in plain language, linked contextually from the dashboard.",
    tags: ["content"],
    status: "backlog",
  },
  {
    id: "mobile-app",
    title: "Mobile app (React Native)",
    description: "MoneyBeh is designed mobile-first. Native app is the end state.",
    tags: ["infra"],
    status: "backlog",
  },
];

const columns: { status: Status; label: string; icon: typeof CheckCircle2; color: string; border: string; bg: string }[] = [
  {
    status: "done",
    label: "Shipped",
    icon: CheckCircle2,
    color: "var(--seafoam-600)",
    border: "var(--seafoam-200)",
    bg: "var(--seafoam-50)",
  },
  {
    status: "in-progress",
    label: "In Progress",
    icon: Clock,
    color: "var(--deep-teal-600)",
    border: "var(--deep-teal-200)",
    bg: "var(--deep-teal-50)",
  },
  {
    status: "up-next",
    label: "Up Next",
    icon: Circle,
    color: "var(--sand-600)",
    border: "var(--sand-200)",
    bg: "var(--sand-50)",
  },
  {
    status: "backlog",
    label: "Backlog",
    icon: Archive,
    color: "var(--warm-gray-500)",
    border: "var(--warm-gray-200)",
    bg: "var(--warm-gray-100)",
  },
];

const tagColors: Record<Tag, { bg: string; text: string; border: string }> = {
  FTU: {
    bg: "var(--deep-teal-50)",
    text: "var(--deep-teal-700)",
    border: "var(--deep-teal-200)",
  },
  "public-site": {
    bg: "var(--seafoam-50)",
    text: "var(--seafoam-700)",
    border: "var(--seafoam-200)",
  },
  dashboard: {
    bg: "var(--sand-50)",
    text: "var(--sand-700)",
    border: "var(--sand-200)",
  },
  auth: {
    bg: "var(--warm-gray-100)",
    text: "var(--warm-gray-600)",
    border: "var(--warm-gray-200)",
  },
  content: {
    bg: "var(--warm-gray-100)",
    text: "var(--warm-gray-600)",
    border: "var(--warm-gray-200)",
  },
  infra: {
    bg: "var(--warm-gray-100)",
    text: "var(--warm-gray-600)",
    border: "var(--warm-gray-200)",
  },
  calculator: {
    bg: "var(--seafoam-50)",
    text: "var(--seafoam-700)",
    border: "var(--seafoam-200)",
  },
};

function RoadmapCard({ item }: { item: RoadmapItem }) {
  return (
    <div
      className="rounded-xl p-4 border"
      style={{
        backgroundColor: "var(--paper)",
        borderColor: "var(--warm-gray-200)",
        boxShadow: "0 1px 2px rgba(26,26,27,0.05)",
      }}
    >
      <p
        className="text-sm mb-1 leading-snug"
        style={{ color: "var(--ink)", fontWeight: 500 }}
      >
        {item.title}
      </p>
      <p
        className="text-xs leading-relaxed mb-2"
        style={{ color: "var(--warm-gray-500)" }}
      >
        {item.description}
      </p>
      {item.note && (
        <p
          className="text-xs leading-relaxed mb-2 italic"
          style={{ color: "var(--warm-gray-400)" }}
        >
          {item.note}
        </p>
      )}
      <div className="flex flex-wrap gap-1">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="inline-block px-2 py-0.5 rounded-full text-xs border"
            style={{
              backgroundColor: tagColors[tag].bg,
              color: tagColors[tag].text,
              borderColor: tagColors[tag].border,
              fontWeight: 500,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export function IntranetRoadmap() {
  const [filter, setFilter] = useState<Tag | "all">("all");

  const filtered =
    filter === "all" ? items : items.filter((i) => i.tags.includes(filter));

  const allTags: Tag[] = [
    "FTU",
    "public-site",
    "dashboard",
    "calculator",
    "auth",
    "content",
    "infra",
  ];

  return (
    <div className="px-6 py-12">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <div
          className="text-xs tracking-widest uppercase mb-3"
          style={{ color: "var(--warm-gray-400)", fontWeight: 500 }}
        >
          MoneyBeh Internal · Roadmap
        </div>
        <h1
          className="text-3xl mb-3"
          style={{ color: "var(--ink)", fontWeight: 600, lineHeight: 1.3 }}
        >
          Roadmap
        </h1>
        <p
          className="text-sm leading-relaxed mb-6"
          style={{ color: "var(--warm-gray-600)" }}
        >
          What's shipped, what's in flight, what's queued.
        </p>

        {/* Tag filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className="px-3 py-1.5 rounded-full text-xs border transition-colors"
            style={{
              backgroundColor:
                filter === "all" ? "var(--ink)" : "var(--warm-gray-100)",
              color: filter === "all" ? "var(--paper)" : "var(--warm-gray-600)",
              borderColor:
                filter === "all" ? "var(--ink)" : "var(--warm-gray-200)",
              fontWeight: 500,
            }}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className="px-3 py-1.5 rounded-full text-xs border transition-colors"
              style={{
                backgroundColor:
                  filter === tag
                    ? tagColors[tag].text
                    : tagColors[tag].bg,
                color:
                  filter === tag ? "white" : tagColors[tag].text,
                borderColor: tagColors[tag].border,
                fontWeight: 500,
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Board */}
      <div className="max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((col) => {
            const colItems = filtered.filter((i) => i.status === col.status);
            return (
              <div key={col.status}>
                {/* Column header */}
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-xl mb-3 border"
                  style={{
                    backgroundColor: col.bg,
                    borderColor: col.border,
                  }}
                >
                  <col.icon size={14} style={{ color: col.color }} />
                  <span
                    className="text-xs"
                    style={{ color: col.color, fontWeight: 600 }}
                  >
                    {col.label}
                  </span>
                  <span
                    className="ml-auto text-xs"
                    style={{ color: col.color, opacity: 0.7 }}
                  >
                    {colItems.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="flex flex-col gap-2">
                  {colItems.length === 0 ? (
                    <div
                      className="rounded-xl p-4 border text-center text-xs"
                      style={{
                        borderColor: "var(--warm-gray-200)",
                        color: "var(--warm-gray-400)",
                        borderStyle: "dashed",
                      }}
                    >
                      Nothing here
                    </div>
                  ) : (
                    colItems.map((item) => (
                      <RoadmapCard key={item.id} item={item} />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto mt-10 pt-6 border-t" style={{ borderColor: "var(--warm-gray-200)" }}>
        <p className="text-xs" style={{ color: "var(--warm-gray-400)" }}>
          MoneyBeh Roadmap — March 2026
        </p>
      </div>
    </div>
  );
}
