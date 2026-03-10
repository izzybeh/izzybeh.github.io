// Guidelines — rendered from the Guidelines.md content

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

function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-sm leading-relaxed mb-3"
      style={{ color: "var(--warm-gray-700)" }}
    >
      {children}
    </p>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2 mb-4">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span
            className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: "var(--seafoam-400)" }}
          />
          <span
            className="text-sm leading-relaxed"
            style={{ color: "var(--warm-gray-700)" }}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Callout({
  children,
  variant = "seafoam",
}: {
  children: React.ReactNode;
  variant?: "seafoam" | "teal" | "sand" | "gray";
}) {
  const styles = {
    seafoam: {
      bg: "var(--seafoam-50)",
      border: "var(--seafoam-200)",
      text: "var(--seafoam-800)",
    },
    teal: {
      bg: "var(--deep-teal-50)",
      border: "var(--deep-teal-200)",
      text: "var(--deep-teal-800)",
    },
    sand: {
      bg: "var(--sand-50)",
      border: "var(--sand-200)",
      text: "var(--sand-800)",
    },
    gray: {
      bg: "var(--warm-gray-100)",
      border: "var(--warm-gray-200)",
      text: "var(--warm-gray-700)",
    },
  };
  const s = styles[variant];
  return (
    <div
      className="rounded-xl px-5 py-4 border mb-4"
      style={{
        backgroundColor: s.bg,
        borderColor: s.border,
      }}
    >
      <p className="text-sm leading-relaxed" style={{ color: s.text }}>
        {children}
      </p>
    </div>
  );
}

export function IntranetGuidelines() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <div
          className="text-xs tracking-widest uppercase mb-3"
          style={{ color: "var(--warm-gray-400)", fontWeight: 500 }}
        >
          MoneyBeh Internal · Guidelines
        </div>
        <h1
          className="text-3xl mb-3"
          style={{ color: "var(--ink)", fontWeight: 600, lineHeight: 1.3 }}
        >
          Guidelines
        </h1>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--warm-gray-600)" }}
        >
          Product philosophy, FTU structure, design rules, and collaboration
          context.
        </p>
      </div>

      {/* Framing */}
      <Callout variant="teal">
        I don't need you to agree with me. You are my thought partner, and I
        need you to help me know what I don't know.
      </Callout>

      {/* ─── Background ─────────────────────────────────────────── */}
      <Section title="Background">
        <P>
          MoneyBeh is a financial wellness companion app built around the
          philosophy of{" "}
          <em>"Clear decisions. Less stress. More freedom."</em> The site uses a
          calm, monochromatic design with a custom color palette (seafoam, deep
          teal, sand, warm grays).
        </P>
        <P>
          MoneyBeh positions itself as a friend guiding users toward financial
          freedom — not a budgeting tool — using plain language and no financial
          jargon.
        </P>

        <div
          className="rounded-xl p-5 border mb-4"
          style={{
            backgroundColor: "var(--paper)",
            borderColor: "var(--warm-gray-200)",
          }}
        >
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: "var(--warm-gray-400)", fontWeight: 500 }}
          >
            The Bridge Strategy (not the 4% rule)
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <div
                className="w-1 rounded-full shrink-0 self-stretch"
                style={{ backgroundColor: "var(--seafoam-300)" }}
              />
              <div>
                <p
                  className="text-xs mb-1"
                  style={{ color: "var(--ink)", fontWeight: 600 }}
                >
                  Bridge leg
                </p>
                <p className="text-xs" style={{ color: "var(--warm-gray-600)" }}>
                  Funds life from now until age 59.5
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div
                className="w-1 rounded-full shrink-0 self-stretch"
                style={{ backgroundColor: "var(--deep-teal-300)" }}
              />
              <div>
                <p
                  className="text-xs mb-1"
                  style={{ color: "var(--ink)", fontWeight: 600 }}
                >
                  Retirement leg
                </p>
                <p className="text-xs" style={{ color: "var(--warm-gray-600)" }}>
                  Funds life from 59.5 to 92
                </p>
              </div>
            </div>
            <p
              className="text-xs pt-2 border-t"
              style={{
                color: "var(--warm-gray-500)",
                borderColor: "var(--warm-gray-100)",
              }}
            >
              Assumes 5% real rate of return. Monthly spending in real dollars
              is the foundation of all calculations.
            </p>
          </div>
        </div>
      </Section>

      {/* ─── The Two-Step MoneyBeh Approach ─────────────────────── */}
      <Section title="The Two-Step Approach">
        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          <div
            className="rounded-xl p-5 border"
            style={{
              backgroundColor: "var(--seafoam-50)",
              borderColor: "var(--seafoam-200)",
            }}
          >
            <p
              className="text-xs uppercase tracking-widest mb-2"
              style={{ color: "var(--seafoam-500)", fontWeight: 500 }}
            >
              Step 1
            </p>
            <p
              className="text-sm"
              style={{ color: "var(--seafoam-800)", fontWeight: 600 }}
            >
              Build a life you enjoy today
            </p>
          </div>
          <div
            className="rounded-xl p-5 border"
            style={{
              backgroundColor: "var(--deep-teal-50)",
              borderColor: "var(--deep-teal-200)",
            }}
          >
            <p
              className="text-xs uppercase tracking-widest mb-2"
              style={{ color: "var(--deep-teal-500)", fontWeight: 500 }}
            >
              Step 2
            </p>
            <p
              className="text-sm"
              style={{ color: "var(--deep-teal-800)", fontWeight: 600 }}
            >
              Build toward freedom
            </p>
          </div>
        </div>
        <P>
          Monthly spending in real dollars anchors everything. Joy is not a
          reward for reaching a number — it's a budget category from day one.
        </P>
      </Section>

      {/* ─── Current State ───────────────────────────────────────── */}
      <Section title="What's Been Built">
        <BulletList
          items={[
            "/src/app/pages/Home.tsx — complete",
            "/src/app/pages/About.tsx — complete",
            "/src/app/pages/StartHere.tsx — FTU v1 (5-step), being redesigned",
            "/src/imports/DESIGN_SYSTEM.md — source of truth for all design tokens",
            "Intranet at /intranet — design system, architecture, roadmap, guidelines",
          ]}
        />
      </Section>

      {/* ─── FTU Structure ───────────────────────────────────────── */}
      <Section title="FTU — Confirmed Structure">
        <Callout variant="seafoam">
          Path selection → Personalized mirror → Account creation → Data inputs
          → Dashboard
        </Callout>
        <P>
          The system calculates the freedom age from inputs — users discover it,
          not declare it. Target age has been removed from the input flow.
        </P>

        <div
          className="rounded-xl p-5 border mb-4"
          style={{
            backgroundColor: "var(--paper)",
            borderColor: "var(--warm-gray-200)",
          }}
        >
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: "var(--warm-gray-400)", fontWeight: 500 }}
          >
            Data inputs (post-mirror)
          </p>
          <BulletList
            items={[
              "Date of birth — to calculate ages, not targets",
              "Monthly spending — essentials bucket + everything else bucket",
              "Retirement accounts — yes/no → details",
              "Regular investment accounts — yes/no → details",
            ]}
          />
        </div>

        <div
          className="rounded-xl p-5 border"
          style={{
            backgroundColor: "var(--sand-50)",
            borderColor: "var(--sand-200)",
          }}
        >
          <p
            className="text-xs uppercase tracking-widest mb-2"
            style={{ color: "var(--sand-600)", fontWeight: 500 }}
          >
            Open questions
          </p>
          <BulletList
            items={[
              "What are the three paths exactly? (beginner, mid-journey, optimizer — unconfirmed)",
              "Does path selection change the mirror, the data inputs, or both?",
              "What is the mirror actually showing? Qualitative reflection vs. dummy dashboard preview.",
              "The mirror is the most important moment in the FTU and it's currently not designed.",
            ]}
          />
        </div>
      </Section>

      {/* ─── Design Rules ────────────────────────────────────────── */}
      <Section title="Design Rules">
        <BulletList
          items={[
            "Some base components have styling (gap, typography) baked in as defaults — always explicitly set styling from the guidelines in generated React to override the defaults.",
            "Use inline style props for color — always CSS variables, never hardcoded hex.",
            "Use inline style props for font-size, font-weight, and line-height — these override theme.css defaults.",
            "Tailwind classes for layout and structure (padding, margin, flex, grid).",
            "No tailwind.config.js — all tokens live in /src/styles/theme.css.",
            "Soft Geometry: 32px corner radius on primary cards. Approaching, never attacking.",
            "The Exhale: 300–400ms transitions with cubic-bezier(0.4, 0, 0.2, 1).",
            "80/20 monochromatic: most UI is Paper + Ink. Color carries semantic meaning only.",
            "No exclamation points. No urgency. No shame. No 'you're behind.'",
          ]}
        />
      </Section>

      {/* ─── Voice Principles ────────────────────────────────────── */}
      <Section title="Voice Principles">
        <BulletList
          items={[
            "No anxiety-inducing language.",
            "No guilt or shame — ever.",
            "Never imply the user is behind, broken, or failing.",
            "Use second person ('you,' 'your').",
            "Active voice.",
            "Short sentences. One idea at a time.",
            "Name the problem before offering the solution.",
            "'Rebalancing' not 'overspending.' 'Adjust' not 'fix.' 'Recalibrate' not 'fail.'",
          ]}
        />
      </Section>

      {/* Footer */}
      <div
        className="mt-4 pt-6 border-t"
        style={{ borderColor: "var(--warm-gray-200)" }}
      >
        <p className="text-xs" style={{ color: "var(--warm-gray-400)" }}>
          Source: Guidelines.md — MoneyBeh Internal
        </p>
      </div>
    </div>
  );
}
