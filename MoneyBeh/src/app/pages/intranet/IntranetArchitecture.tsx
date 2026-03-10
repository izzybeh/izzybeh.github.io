// ─── Architecture doc — rendered as a structured HTML page ────────────────

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2
        className="text-lg mb-4 pb-2 border-b"
        style={{
          color: "var(--ink)",
          fontWeight: 600,
          borderColor: "var(--warm-gray-200)",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function Code({ children }: { children: string }) {
  return (
    <pre
      className="rounded-xl p-4 text-xs leading-relaxed overflow-x-auto"
      style={{
        backgroundColor: "var(--warm-gray-900)",
        color: "var(--warm-gray-200)",
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      }}
    >
      <code>{children}</code>
    </pre>
  );
}

function Pill({
  children,
  color = "gray",
}: {
  children: React.ReactNode;
  color?: "seafoam" | "teal" | "sand" | "gray";
}) {
  const styles: Record<string, React.CSSProperties> = {
    seafoam: {
      backgroundColor: "var(--seafoam-50)",
      color: "var(--seafoam-700)",
      border: "1px solid var(--seafoam-200)",
    },
    teal: {
      backgroundColor: "var(--deep-teal-50)",
      color: "var(--deep-teal-700)",
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
      className="inline-block px-2.5 py-0.5 rounded-full text-xs"
      style={{ ...styles[color], fontWeight: 500 }}
    >
      {children}
    </span>
  );
}

export function IntranetArchitecture() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <div
          className="text-xs tracking-widest uppercase mb-3"
          style={{ color: "var(--warm-gray-400)", fontWeight: 500 }}
        >
          MoneyBeh Internal · Architecture
        </div>
        <h1
          className="text-3xl mb-3"
          style={{ color: "var(--ink)", fontWeight: 600, lineHeight: 1.3 }}
        >
          System Architecture
        </h1>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--warm-gray-600)" }}
        >
          Tech stack, file structure, routing, key patterns, and conventions.
        </p>
      </div>

      {/* ─── Tech Stack ──────────────────────────────────────────── */}
      <Section title="Tech Stack">
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            {
              layer: "Framework",
              value: "React 18",
              note: "Functional components, hooks",
              color: "seafoam" as const,
            },
            {
              layer: "Language",
              value: "TypeScript",
              note: "Strict mode, .tsx files only",
              color: "seafoam" as const,
            },
            {
              layer: "Routing",
              value: "react-router (Data mode)",
              note: "RouterProvider + createBrowserRouter",
              color: "teal" as const,
            },
            {
              layer: "Styling",
              value: "Tailwind CSS v4",
              note: "No tailwind.config.js — theme.css only",
              color: "teal" as const,
            },
            {
              layer: "Icons",
              value: "lucide-react",
              note: "Consistent icon set",
              color: "gray" as const,
            },
            {
              layer: "Charts",
              value: "recharts",
              note: "For data visualization",
              color: "gray" as const,
            },
            {
              layer: "Fonts",
              value: "Jost (Google Fonts)",
              note: "Single family, 400–700 weight",
              color: "gray" as const,
            },
            {
              layer: "Images",
              value: "Unsplash + figma:asset",
              note: "ImageWithFallback component",
              color: "gray" as const,
            },
          ].map(({ layer, value, note, color }) => (
            <div
              key={layer}
              className="rounded-xl p-4 border"
              style={{
                backgroundColor: "var(--paper)",
                borderColor: "var(--warm-gray-200)",
              }}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span
                  className="text-xs"
                  style={{ color: "var(--warm-gray-400)", fontWeight: 500 }}
                >
                  {layer}
                </span>
                <Pill color={color}>{value}</Pill>
              </div>
              <p
                className="text-xs"
                style={{ color: "var(--warm-gray-500)" }}
              >
                {note}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── File Structure ───────────────────────────────────────── */}
      <Section title="File Structure">
        <Code>{`/src
├── app/
│   ├── App.tsx                    # Entry — RouterProvider only
│   ├── routes.ts                  # createBrowserRouter config
│   ├── components/
│   │   ├── Layout.tsx             # Public site shell (Nav + Footer)
│   │   ├── Navigation.tsx         # Sticky top nav
│   │   ├── Footer.tsx
│   │   ├── AudioPlayer.tsx        # Full player
│   │   ├── MinimizedAudioPlayer.tsx
│   │   ├── figma/
│   │   │   └── ImageWithFallback.tsx  # Protected — do not modify
│   │   ├── icons/                 # Custom SVG icon components
│   │   └── ui/                    # Shared UI primitives
│   ├── contexts/
│   │   └── AudioContext.tsx       # Global podcast audio state
│   ├── data/                      # Static data files
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Articles.tsx
│   │   ├── Podcast.tsx
│   │   ├── LearnContent.tsx
│   │   ├── Backlog.tsx
│   │   ├── StartHere.tsx          # FTU — 5-step, standalone (no Layout)
│   │   └── intranet/              # Internal pages
│   │       ├── IntranetLayout.tsx
│   │       ├── IntranetHub.tsx
│   │       ├── IntranetDesignSystem.tsx
│   │       ├── IntranetArchitecture.tsx
│   │       ├── IntranetRoadmap.tsx
│   │       ├── IntranetPodcastScripts.tsx
│   │       └── IntranetGuidelines.tsx
│   └── utils/
│       └── seo.ts                 # updateSEO(), structuredData helpers
├── imports/
│   ├── DESIGN_SYSTEM.md           # Source of truth for design tokens
│   └── moneybeh-podcast-scripts.md
└── styles/
    ├── theme.css                  # CSS custom properties (all tokens)
    ├── fonts.css                  # Google Fonts imports
    └── globals.css`}</Code>
      </Section>

      {/* ─── Routing ──────────────────────────────────────────────── */}
      <Section title="Routing">
        <p
          className="text-sm mb-4 leading-relaxed"
          style={{ color: "var(--warm-gray-600)" }}
        >
          React Router Data mode. Two root-level routes: the public{" "}
          <code
            className="px-1.5 py-0.5 rounded text-xs"
            style={{
              backgroundColor: "var(--warm-gray-100)",
              color: "var(--warm-gray-700)",
            }}
          >
            Layout
          </code>{" "}
          and the standalone{" "}
          <code
            className="px-1.5 py-0.5 rounded text-xs"
            style={{
              backgroundColor: "var(--warm-gray-100)",
              color: "var(--warm-gray-700)",
            }}
          >
            StartHere
          </code>
          . Intranet is a third root with its own{" "}
          <code
            className="px-1.5 py-0.5 rounded text-xs"
            style={{
              backgroundColor: "var(--warm-gray-100)",
              color: "var(--warm-gray-700)",
            }}
          >
            IntranetLayout
          </code>
          .
        </p>
        <Code>{`// routes.ts
createBrowserRouter([
  {
    // Public site — with nav + footer
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "articles", Component: Articles },
      { path: "podcast", Component: Podcast },
      { path: "about", Component: About },
      { path: "learn/:slug", Component: LearnContent },
      { path: "backlog", Component: Backlog },
    ],
  },
  {
    // FTU — fullscreen, no nav/footer
    path: "/start",
    Component: StartHere,
  },
  {
    // Internal intranet — own sidebar layout
    path: "/intranet",
    Component: IntranetLayout,
    children: [
      { index: true, Component: IntranetHub },
      { path: "design-system", Component: IntranetDesignSystem },
      { path: "architecture", Component: IntranetArchitecture },
      { path: "roadmap", Component: IntranetRoadmap },
      { path: "podcast-scripts", Component: IntranetPodcastScripts },
      { path: "guidelines", Component: IntranetGuidelines },
    ],
  },
])`}</Code>
      </Section>

      {/* ─── Key Patterns ──────────────────────────────────────────── */}
      <Section title="Key Patterns">
        {/* Audio context */}
        <div className="mb-6">
          <p
            className="text-sm mb-2"
            style={{ color: "var(--ink)", fontWeight: 600 }}
          >
            AudioContext
          </p>
          <p
            className="text-sm mb-3 leading-relaxed"
            style={{ color: "var(--warm-gray-600)" }}
          >
            Global podcast audio state. Wraps the public{" "}
            <code
              className="px-1.5 py-0.5 rounded text-xs"
              style={{
                backgroundColor: "var(--warm-gray-100)",
                color: "var(--warm-gray-700)",
              }}
            >
              Layout
            </code>
            . The{" "}
            <code
              className="px-1.5 py-0.5 rounded text-xs"
              style={{
                backgroundColor: "var(--warm-gray-100)",
                color: "var(--warm-gray-700)",
              }}
            >
              MinimizedAudioPlayer
            </code>{" "}
            persists across route changes via the Layout outlet. Controls:
            play/pause, seek, episode selection.
          </p>
        </div>

        {/* SEO utils */}
        <div className="mb-6">
          <p
            className="text-sm mb-2"
            style={{ color: "var(--ink)", fontWeight: 600 }}
          >
            SEO Utilities
          </p>
          <p
            className="text-sm mb-3 leading-relaxed"
            style={{ color: "var(--warm-gray-600)" }}
          >
            <code
              className="px-1.5 py-0.5 rounded text-xs"
              style={{
                backgroundColor: "var(--warm-gray-100)",
                color: "var(--warm-gray-700)",
              }}
            >
              updateSEO()
            </code>{" "}
            called in each page's{" "}
            <code
              className="px-1.5 py-0.5 rounded text-xs"
              style={{
                backgroundColor: "var(--warm-gray-100)",
                color: "var(--warm-gray-700)",
              }}
            >
              useEffect
            </code>
            . Structured data (JSON-LD) for org, website, and mobile app
            schemas on the homepage.
          </p>
          <Code>{`updateSEO({
  title: "MoneyBeh - ...",
  description: "...",
  keywords: "...",
  url: "https://moneybeh.com/path",
  type: "website" | "article",
});`}</Code>
        </div>

        {/* Styling convention */}
        <div className="mb-6">
          <p
            className="text-sm mb-2"
            style={{ color: "var(--ink)", fontWeight: 600 }}
          >
            Styling Convention
          </p>
          <p
            className="text-sm mb-3 leading-relaxed"
            style={{ color: "var(--warm-gray-600)" }}
          >
            Tailwind v4 classes for layout and structure. Inline{" "}
            <code
              className="px-1.5 py-0.5 rounded text-xs"
              style={{
                backgroundColor: "var(--warm-gray-100)",
                color: "var(--warm-gray-700)",
              }}
            >
              style
            </code>{" "}
            props for color (always CSS variables). Never hardcode hex values
            in components — always reference the token. Typography (size,
            weight, line-height) set via inline styles to override theme.css
            defaults.
          </p>
          <Code>{`// ✅ Correct
<div style={{ color: "var(--seafoam-700)", fontWeight: 600 }}>
  Clear decisions.
</div>

// ❌ Wrong — hardcoded hex, bypasses token system
<div style={{ color: "#3B6F62" }}>
  Clear decisions.
</div>`}</Code>
        </div>

        {/* FTU */}
        <div>
          <p
            className="text-sm mb-2"
            style={{ color: "var(--ink)", fontWeight: 600 }}
          >
            First-Time User (FTU) Experience
          </p>
          <p
            className="text-sm mb-3 leading-relaxed"
            style={{ color: "var(--warm-gray-600)" }}
          >
            Currently a 5-step flow at{" "}
            <code
              className="px-1.5 py-0.5 rounded text-xs"
              style={{
                backgroundColor: "var(--warm-gray-100)",
                color: "var(--warm-gray-700)",
              }}
            >
              /start
            </code>
            . Planned redesign: <strong>path selection → personalized
            mirror → account creation → data inputs → dashboard</strong>. The
            system calculates the freedom age from inputs — users discover it,
            not declare it. Target age input removed from the current flow.
          </p>
        </div>
      </Section>

      {/* ─── Rules ──────────────────────────────────────────────────── */}
      <Section title="Hard Rules">
        <div className="flex flex-col gap-2">
          {[
            [
              "Never modify protected files",
              "/src/app/components/figma/ImageWithFallback.tsx and /pnpm-lock.yaml",
            ],
            [
              "Only .tsx files",
              "No .js or .jsx. TypeScript throughout.",
            ],
            [
              "No tailwind.config.js",
              "Tailwind v4 — all tokens live in theme.css.",
            ],
            [
              "Use react-router (not react-router-dom)",
              "react-router-dom does not work in this environment.",
            ],
            [
              "Install before import",
              "Check package.json before using any external package.",
            ],
            [
              "CSS variables for color",
              "All color references use var(--token-name), never hex literals in JSX.",
            ],
            [
              "Inline styles for typography",
              "Set font-size, font-weight, line-height via style prop to override theme.css defaults.",
            ],
          ].map(([rule, detail]) => (
            <div
              key={rule}
              className="flex gap-3 rounded-xl p-4 border"
              style={{
                backgroundColor: "var(--paper)",
                borderColor: "var(--warm-gray-200)",
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                style={{ backgroundColor: "var(--seafoam-400)" }}
              />
              <div>
                <p
                  className="text-sm mb-0.5"
                  style={{ color: "var(--ink)", fontWeight: 500 }}
                >
                  {rule}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--warm-gray-500)" }}
                >
                  {detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Footer */}
      <div
        className="mt-4 pt-6 border-t"
        style={{ borderColor: "var(--warm-gray-200)" }}
      >
        <p className="text-xs" style={{ color: "var(--warm-gray-400)" }}>
          MoneyBeh Architecture — Last updated March 2026
        </p>
      </div>
    </div>
  );
}
