import { Outlet, NavLink, Link } from "react-router";
import { useState } from "react";
import {
  LayoutGrid,
  Palette,
  GitBranch,
  Map,
  Mic,
  ChevronLeft,
  Menu,
  X,
  FileText,
  Calculator,
} from "lucide-react";

const navItems = [
  { label: "Hub", path: "/intranet", icon: LayoutGrid, end: true },
  { label: "Design System", path: "/intranet/design-system", icon: Palette },
  { label: "Architecture", path: "/intranet/architecture", icon: GitBranch },
  { label: "Calculator Math", path: "/intranet/calculator-math", icon: Calculator },
  { label: "Roadmap", path: "/intranet/roadmap", icon: Map },
  { label: "Podcast Scripts", path: "/intranet/podcast-scripts", icon: Mic },
  { label: "Guidelines", path: "/intranet/guidelines", icon: FileText },
];

export function IntranetLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: "var(--warm-gray-100)" }}
    >
      {/* Sidebar — desktop */}
      <aside
        className="hidden md:flex flex-col w-56 lg:w-64 shrink-0 border-r sticky top-0 h-screen"
        style={{
          backgroundColor: "var(--paper)",
          borderColor: "var(--warm-gray-200)",
        }}
      >
        <SidebarContents />
      </aside>

      {/* Sidebar — mobile overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="w-64 h-full flex flex-col border-r"
            style={{
              backgroundColor: "var(--paper)",
              borderColor: "var(--warm-gray-200)",
            }}
          >
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <span
                className="text-xs tracking-widest uppercase"
                style={{ color: "var(--warm-gray-400)" }}
              >
                Internal
              </span>
              <button
                onClick={() => setSidebarOpen(false)}
                style={{ color: "var(--warm-gray-500)" }}
              >
                <X size={18} />
              </button>
            </div>
            <SidebarContents onNavigate={() => setSidebarOpen(false)} />
          </div>
          <div
            className="flex-1 bg-ink/20"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header
          className="md:hidden flex items-center gap-3 px-4 py-3 border-b sticky top-0 z-40"
          style={{
            backgroundColor: "var(--paper)",
            borderColor: "var(--warm-gray-200)",
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            style={{ color: "var(--warm-gray-600)" }}
          >
            <Menu size={20} />
          </button>
          <span
            className="text-sm"
            style={{ color: "var(--warm-gray-700)", fontWeight: 500 }}
          >
            MoneyBeh Internal
          </span>
        </header>

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SidebarContents({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div
          className="text-xs tracking-widest uppercase mb-1"
          style={{ color: "var(--warm-gray-400)", fontWeight: 500 }}
        >
          MoneyBeh
        </div>
        <div
          className="text-base"
          style={{ color: "var(--ink)", fontWeight: 600 }}
        >
          Internal
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 pb-4 flex flex-col gap-0.5">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-seafoam-50 text-seafoam-700"
                  : "text-warm-gray-700 hover:bg-warm-gray-100 hover:text-warm-gray-900"
              }`
            }
            style={({ isActive }) =>
              isActive
                ? {
                    backgroundColor: "var(--seafoam-50)",
                    color: "var(--seafoam-700)",
                    fontWeight: 500,
                  }
                : { color: "var(--warm-gray-700)" }
            }
          >
            <item.icon size={15} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div
        className="px-5 py-4 border-t"
        style={{ borderColor: "var(--warm-gray-200)" }}
      >
        <Link
          to="/"
          className="flex items-center gap-2 text-sm transition-colors"
          style={{ color: "var(--warm-gray-500)" }}
          onClick={onNavigate}
        >
          <ChevronLeft size={14} />
          Public site
        </Link>
      </div>
    </>
  );
}