import { Link as RouterLink } from "react-router";
import { ArrowRight, Table2, Zap, CheckCircle2, RefreshCw } from "lucide-react";

const spreadsheetPains = [
  { icon: "🕰️", label: "40 minutes every Sunday", desc: "Manually entering transactions, fixing formula errors, updating projected savings" },
  { icon: "🔗", label: "12 tabs, 3 breaking formulas", desc: "One wrong paste and your entire projection model cascades into chaos" },
  { icon: "📱", label: "Can't use it on your phone", desc: "Your model is too complex for mobile. You check it on your laptop or you don't check it at all" },
  { icon: "👤", label: "Built for your past self", desc: "Your life changed. Your spreadsheet half-adapted. Now it's held together with conditional notes" },
];

export function ForSpreadsheet() {
  return (
    <div>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-4xl mx-auto text-center" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mx-auto"
              style={{ backgroundColor: "var(--seafoam-100)", border: "1px solid var(--seafoam-200)" }}
            >
              <Table2 size={14} style={{ color: "var(--seafoam-600)" }} />
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--seafoam-700)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                The Upgrade
              </span>
            </div>
            <h1
              className="tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 500, lineHeight: 1.1, color: "var(--ink)" }}
            >
              Twelve tabs.
              <br />
              Three broken formulas.
              <br />
              <span style={{ color: "var(--seafoam-600)" }}>Still 40 minutes every Sunday.</span>
            </h1>
            <p
              className="max-w-2xl mx-auto"
              style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.375rem)", lineHeight: 1.6, color: "var(--warm-gray-700)" }}
            >
              You built that model because you understand your money better than 95% of people.
              MoneyBeh respects that. It takes your level of thinking and handles all the maintenance.
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

      {/* ─── We Speak Your Language ─────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ backgroundColor: "var(--warm-gray-50)" }}>
        <div className="max-w-5xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          <div className="text-center" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)" }}>
              We know what you already know.
            </h2>
            <p className="max-w-xl mx-auto" style={{ fontSize: "1.125rem", lineHeight: 1.65, color: "var(--warm-gray-600)" }}>
              You're not here for a budgeting 101 tutorial. You're here because maintenance is eating your Sundays.
            </p>
          </div>

          {/* Pain points */}
          <div className="grid sm:grid-cols-2 gap-4">
            {spreadsheetPains.map((item, i) => (
              <div
                key={i}
                className="rounded-[1.5rem] p-6"
                style={{ backgroundColor: "var(--paper)", border: "1px solid var(--warm-gray-200)", display: "flex", flexDirection: "column", gap: "0.75rem" }}
              >
                <div style={{ fontSize: "1.5rem" }}>{item.icon}</div>
                <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--ink)" }}>{item.label}</div>
                <div style={{ fontSize: "0.9375rem", color: "var(--warm-gray-600)", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Before / After ──────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          <div className="text-center" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)" }}>
              Same precision. Zero maintenance.
            </h2>
            <p className="max-w-xl mx-auto" style={{ fontSize: "1.125rem", lineHeight: 1.65, color: "var(--warm-gray-600)" }}>
              Everything you built in Excel — your logic, your categories, your projections — lives in MoneyBeh. Without the Sunday ritual.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Before */}
            <div
              className="rounded-[1.5rem] p-6"
              style={{ backgroundColor: "var(--warm-gray-100)", border: "1px solid var(--warm-gray-300)", display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--warm-gray-500)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Your spreadsheet
              </div>
              <div
                className="rounded-xl p-4 font-mono"
                style={{ backgroundColor: "var(--warm-gray-200)", border: "1px solid var(--warm-gray-300)", display: "flex", flexDirection: "column", gap: "0.5rem" }}
              >
                {[
                  { cell: "B47", val: "=SUM(B12:B46)-D3", warn: false },
                  { cell: "E52", val: "=IF(E51>0,E51*F3,#REF!)", warn: true },
                  { cell: "H3", val: "=VLOOKUP(A3,'Rate Table'!A:C,3,0)", warn: false },
                  { cell: "L89", val: "=(B47*12*H3)^(1/C2)-1... #NAME?", warn: true },
                ].map((row, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--warm-gray-500)", minWidth: "2.5rem" }}>{row.cell}</span>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: row.warn ? "var(--critical)" : "var(--warm-gray-700)",
                        flex: 1,
                        paddingLeft: "0.75rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.val}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {["Manual transaction entry", "Broken formula after bank export", "Doesn't update between Sundays", "Mobile: not feasible"].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "9999px", backgroundColor: "var(--warm-gray-400)", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.875rem", color: "var(--warm-gray-600)", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* After */}
            <div
              className="rounded-[1.5rem] p-6"
              style={{ backgroundColor: "var(--seafoam-50)", border: "1px solid var(--seafoam-200)", display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--seafoam-600)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                MoneyBeh
              </div>

              {/* Clean dashboard preview */}
              <div
                className="rounded-xl p-4"
                style={{ backgroundColor: "var(--paper)", border: "1px solid var(--seafoam-200)", display: "flex", flexDirection: "column", gap: "0.75rem" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.75rem", borderBottom: "1px solid var(--warm-gray-200)" }}>
                  <span style={{ fontSize: "0.9375rem", fontWeight: 500, color: "var(--ink)" }}>Freedom Timeline</span>
                  <span style={{ fontSize: "0.875rem", color: "var(--seafoam-700)", fontWeight: 600 }}>Age 51</span>
                </div>
                {[
                  { label: "Essentials", val: "$3,200", color: "var(--warm-gray-500)" },
                  { label: "Joy Fund", val: "$1,800", color: "var(--sand-600)" },
                  { label: "Freedom savings", val: "$2,400", color: "var(--seafoam-600)" },
                ].map((row, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.875rem", color: "var(--warm-gray-600)" }}>{row.label}</span>
                    <span style={{ fontSize: "0.9375rem", fontWeight: 600, color: row.color }}>{row.val}</span>
                  </div>
                ))}
                <div style={{ paddingTop: "0.75rem", borderTop: "1px solid var(--warm-gray-200)", fontSize: "0.8125rem", color: "var(--seafoam-700)", fontWeight: 600 }}>
                  Last updated: 3 minutes ago · Auto-synced
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {["Transactions auto-imported", "Formulas never break", "Updates in real-time", "Full detail on any device"].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <CheckCircle2 size={14} style={{ color: "var(--seafoam-500)", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.875rem", color: "var(--warm-gray-700)", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Two-Leg Bridge ─────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ backgroundColor: "var(--warm-gray-50)" }}>
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div className="flex items-center gap-2">
                <RefreshCw size={18} style={{ color: "var(--deep-teal-500)" }} />
                <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--deep-teal-600)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  The Two-Leg Bridge
                </span>
              </div>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)" }}>
                The model you've been trying to build in Excel.
              </h2>
              <p style={{ fontSize: "1.1875rem", color: "var(--warm-gray-700)", lineHeight: 1.5 }}>
                MoneyBeh's core framework mirrors the logic sophisticated self-trackers build — and extends it into projections most spreadsheets can't handle.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "1rem", color: "var(--warm-gray-700)", lineHeight: 1.65 }}>
              <p>
                <strong style={{ fontWeight: 600, color: "var(--ink)" }}>Leg 1 — Lifestyle Optimization:</strong> Your monthly cash flow, category-level precision, and Joy Fund allocation. The engine that funds your life now.
              </p>
              <p>
                <strong style={{ fontWeight: 600, color: "var(--ink)" }}>Leg 2 — Freedom Acceleration:</strong> Your investment rate, projected timeline, and compound growth model. The engine that buys your future.
              </p>
              <p>
                The two legs connect in the Freedom Timeline — a single output that answers the question your spreadsheet has been trying to answer for years: <em>"When exactly will I be free?"</em>
              </p>
            </div>
          </div>

          {/* Bridge visual */}
          <div
            className="rounded-[2rem] p-6 sm:p-8"
            style={{ backgroundColor: "var(--paper)", border: "1px solid var(--warm-gray-200)", boxShadow: "0 4px 24px 0 rgba(0,0,0,0.04)" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", justifyContent: "center", marginBottom: "0.5rem" }}>
                <Zap size={16} style={{ color: "var(--seafoam-500)" }} />
                <span style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--ink)" }}>The Two-Leg Bridge Model</span>
              </div>

              {/* Leg 1 */}
              <div
                className="rounded-xl p-5"
                style={{ backgroundColor: "var(--seafoam-50)", border: "1px solid var(--seafoam-200)" }}
              >
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--seafoam-700)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>
                  Leg 1 — Lifestyle
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                  {["Income → Essentials split", "Joy Fund allocation", "Category-level precision", "Monthly surplus calculation"].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <div style={{ width: "4px", height: "4px", borderRadius: "9999px", backgroundColor: "var(--seafoam-400)", flexShrink: 0 }} />
                      <span style={{ fontSize: "0.875rem", color: "var(--warm-gray-700)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Connector */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                <div style={{ flex: 1, height: "1px", backgroundColor: "var(--warm-gray-300)" }} />
                <span style={{ fontSize: "0.75rem", color: "var(--warm-gray-400)", padding: "0 0.5rem", fontWeight: 600 }}>feeds into</span>
                <div style={{ flex: 1, height: "1px", backgroundColor: "var(--warm-gray-300)" }} />
              </div>

              {/* Leg 2 */}
              <div
                className="rounded-xl p-5"
                style={{ backgroundColor: "var(--deep-teal-50)", border: "1px solid var(--deep-teal-200)" }}
              >
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--deep-teal-700)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>
                  Leg 2 — Freedom
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                  {["Investment rate projection", "Compound growth model", "Freedom number calculation", "Timeline to independence"].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <div style={{ width: "4px", height: "4px", borderRadius: "9999px", backgroundColor: "var(--deep-teal-400)", flexShrink: 0 }} />
                      <span style={{ fontSize: "0.875rem", color: "var(--warm-gray-700)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Output */}
              <div
                className="rounded-xl p-5 text-center"
                style={{ backgroundColor: "var(--seafoam-500)" }}
              >
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--seafoam-100)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.375rem" }}>
                  Output
                </div>
                <div style={{ fontSize: "1.25rem", fontWeight: 500, color: "var(--paper)" }}>Freedom at Age 51</div>
                <div style={{ fontSize: "0.8125rem", color: "var(--seafoam-100)", marginTop: "0.25rem" }}>Updating automatically. No Sundays required.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 text-center">
        <div className="max-w-2xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "center" }}>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)" }}>
            Close the spreadsheet.
            <br />
            <span style={{ color: "var(--seafoam-600)" }}>Keep all the precision.</span>
          </h2>
          <p style={{ fontSize: "1.125rem", color: "var(--warm-gray-600)", lineHeight: 1.65, maxWidth: "28rem" }}>
            Your Sunday afternoons back. Your financial picture clearer than ever.
            It takes 10 minutes to set up.
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
