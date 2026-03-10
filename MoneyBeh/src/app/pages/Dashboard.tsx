import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router';
import { ArrowRight, LayoutGrid, Repeat2, Clock, Sparkles, ChevronRight } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type DataForm = {
  targetAge: string;
  currentAge: string;
  monthlyEssentials: string;
  monthlyJoy: string;
  retirementBalance: string;
  bridgeBalance: string;
  monthlySavings: string;
};

type OnboardingData = {
  path: 'target' | 'calculate';
  dataForm: DataForm;
};

// ─── Calculations ─────────────────────────────────────────────────────────────

function calcFreedomAgeFor(annualSpending: number, data: DataForm): number {
  const age = parseInt(data.currentAge) || 35;
  const target = annualSpending * 25;
  const currentSavings =
    (parseFloat(data.retirementBalance) || 0) + (parseFloat(data.bridgeBalance) || 0);
  const annualSavings = (parseFloat(data.monthlySavings) || 0) * 12;
  if (annualSpending === 0) return age;
  let years = 0;
  let balance = currentSavings;
  while (balance < target && years < 60) {
    balance = balance * 1.05 + annualSavings;
    years++;
  }
  return age + years;
}

function calcYearsBanked(currentSavings: number, annualSpending: number): number {
  if (annualSpending <= 0 || currentSavings <= 0) return 0;
  let balance = currentSavings;
  let years = 0;
  while (balance > 0 && years < 70) {
    balance = balance * 1.05 - annualSpending;
    years++;
  }
  return years;
}

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}k`;
  return `$${Math.round(n)}`;
}

// ─── Bottom nav ───────────────────────────────────────────────────────────────

const navItems = [
  { icon: LayoutGrid, label: 'Overview', active: true },
  { icon: Sparkles, label: 'Plan', active: false },
  { icon: Repeat2, label: 'Reflect', active: false },
  { icon: Clock, label: 'Freedom', active: false },
];

function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 flex items-center justify-around px-2 pb-safe"
      style={{
        backgroundColor: 'var(--paper)',
        borderTop: '1px solid var(--warm-gray-200)',
        height: '60px',
        zIndex: 50,
      }}
    >
      {navItems.map((item) => (
        <button
          key={item.label}
          className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all"
          style={{
            color: item.active ? 'var(--seafoam-600)' : 'var(--warm-gray-400)',
          }}
        >
          <item.icon size={20} strokeWidth={item.active ? 2 : 1.5} />
          <span className="text-xs" style={{ fontWeight: item.active ? 600 : 400 }}>
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
}

// ─── App header ───────────────────────────────────────────────────────────────

function AppBar() {
  return (
    <header
      className="fixed top-0 left-0 right-0 flex items-center justify-between px-5"
      style={{
        height: '56px',
        backgroundColor: 'var(--paper)',
        borderBottom: '1px solid var(--warm-gray-150, var(--warm-gray-200))',
        zIndex: 50,
      }}
    >
      <span
        className="text-base"
        style={{ color: 'var(--ink)', fontWeight: 700, letterSpacing: '-0.02em' }}
      >
        MoneyBeh
      </span>
      <span
        className="text-xs uppercase tracking-widest"
        style={{ color: 'var(--warm-gray-400)', fontWeight: 500 }}
      >
        Overview
      </span>
    </header>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs uppercase tracking-widest"
      style={{ color: 'var(--warm-gray-400)', fontWeight: 500 }}
    >
      {children}
    </p>
  );
}

// ─── Freedom Age hero ─────────────────────────────────────────────────────────

function FreedomAgeCard({
  freedomAge,
  currentAge,
  isTarget,
  targetAge,
}: {
  freedomAge: number;
  currentAge: number;
  isTarget: boolean;
  targetAge: number;
}) {
  const yearsAway = Math.max(0, freedomAge - currentAge);
  const onTrack = isTarget && targetAge > 0 ? freedomAge <= targetAge : true;
  const yearGap = isTarget && targetAge > 0 ? freedomAge - targetAge : 0;

  return (
    <div
      className="rounded-3xl p-6 border"
      style={{
        backgroundColor: onTrack ? 'var(--seafoam-50)' : 'var(--warm-gray-100)',
        borderColor: onTrack ? 'var(--seafoam-200)' : 'var(--warm-gray-300)',
      }}
    >
      {isTarget && targetAge > 0 && (
        <span
          className="inline-block text-xs px-2.5 py-1 rounded-full mb-4"
          style={{
            backgroundColor: onTrack ? 'var(--seafoam-100)' : 'var(--warm-gray-200)',
            color: onTrack ? 'var(--seafoam-700)' : 'var(--warm-gray-700)',
            fontWeight: 500,
          }}
        >
          {onTrack
            ? '✓ On track'
            : `${yearGap} year${Math.abs(yearGap) !== 1 ? 's' : ''} to close`}
        </span>
      )}
      <p
        className="text-sm mb-1"
        style={{ color: onTrack ? 'var(--seafoam-600)' : 'var(--warm-gray-500)' }}
      >
        Work becomes optional at
      </p>
      <div className="flex items-baseline gap-3">
        <span
          className="text-7xl"
          style={{ color: 'var(--ink)', fontWeight: 700, lineHeight: 1 }}
        >
          {freedomAge}
        </span>
        <span
          className="text-lg"
          style={{ color: 'var(--warm-gray-400)' }}
        >
          in {yearsAway} yr{yearsAway !== 1 ? 's' : ''}
        </span>
      </div>
      {!isTarget && (
        <p className="text-xs mt-3" style={{ color: 'var(--seafoam-600)', lineHeight: 1.6 }}>
          Based on your current pace — 5% real return assumed.
        </p>
      )}
      {isTarget && !onTrack && targetAge > 0 && (
        <p className="text-xs mt-3" style={{ color: 'var(--warm-gray-500)', lineHeight: 1.6 }}>
          Target: age {targetAge}. Close the gap by saving more or trimming spending.
        </p>
      )}
    </div>
  );
}

// ─── Spending buckets ─────────────────────────────────────────────────────────

function SpendingBuckets({ dataForm }: { dataForm: DataForm }) {
  const essentials = parseFloat(dataForm.monthlyEssentials) || 0;
  const joy = parseFloat(dataForm.monthlyJoy) || 0;
  const savings = parseFloat(dataForm.monthlySavings) || 0;

  const buckets = [
    {
      label: 'Essentials',
      value: formatCurrency(essentials),
      sub: '/mo',
      bg: 'var(--warm-gray-100)',
      border: 'var(--warm-gray-200)',
      dot: 'var(--warm-gray-400)',
      text: 'var(--warm-gray-800)',
      sub2: 'The floor',
    },
    {
      label: 'Joy',
      value: formatCurrency(joy),
      sub: '/mo',
      bg: 'var(--sand-50)',
      border: 'var(--sand-200)',
      dot: 'var(--sand-500)',
      text: 'var(--sand-800)',
      sub2: 'Intentional',
    },
    {
      label: 'Freedom',
      value: formatCurrency(savings),
      sub: '/mo',
      bg: 'var(--seafoam-50)',
      border: 'var(--seafoam-200)',
      dot: 'var(--seafoam-500)',
      text: 'var(--seafoam-800)',
      sub2: 'Building',
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <SectionLabel>Where your money goes</SectionLabel>
      <div className="grid grid-cols-3 gap-2">
        {buckets.map((b) => (
          <div
            key={b.label}
            className="rounded-2xl p-4 border flex flex-col gap-2"
            style={{ backgroundColor: b.bg, borderColor: b.border }}
          >
            <div className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: b.dot }}
              />
              <span className="text-xs" style={{ color: b.text, opacity: 0.7 }}>
                {b.label}
              </span>
            </div>
            <div>
              <span className="text-base" style={{ color: b.text, fontWeight: 700 }}>
                {b.value}
              </span>
              <span className="text-xs" style={{ color: b.text, opacity: 0.5 }}>
                {b.sub}
              </span>
            </div>
            <span className="text-xs" style={{ color: b.text, opacity: 0.5 }}>
              {b.sub2}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Freedom Timeline ─────────────────────────────────────────────────────────

function FreedomTimeline({
  currentAge,
  essentialsCoveredAge,
  fullFreedomAge,
}: {
  currentAge: number;
  essentialsCoveredAge: number;
  fullFreedomAge: number;
}) {
  const toEssentials = Math.max(0, essentialsCoveredAge - currentAge);
  const toFull = Math.max(0, fullFreedomAge - currentAge);

  return (
    <div className="flex flex-col gap-3">
      <SectionLabel>Freedom timeline</SectionLabel>
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ backgroundColor: 'var(--paper)', borderColor: 'var(--warm-gray-200)' }}
      >
        {/* Current */}
        <div
          className="px-5 py-4 flex items-center gap-4"
          style={{ borderBottom: '1px solid var(--warm-gray-100)' }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: 'var(--warm-gray-900)' }}
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--paper)' }} />
          </div>
          <div>
            <div className="text-sm" style={{ color: 'var(--warm-gray-400)', fontWeight: 400 }}>
              Today
            </div>
            <div className="text-base" style={{ color: 'var(--ink)', fontWeight: 600 }}>
              Age {currentAge}
            </div>
          </div>
        </div>

        {/* Essentials Covered */}
        <div
          className="px-5 py-4 flex items-center gap-4"
          style={{
            borderBottom: '1px solid var(--warm-gray-100)',
            backgroundColor: 'var(--seafoam-50)',
          }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: 'var(--seafoam-500)' }}
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--seafoam-50)' }} />
          </div>
          <div className="flex-1">
            <div className="text-xs" style={{ color: 'var(--seafoam-600)', fontWeight: 500 }}>
              Essentials covered · {toEssentials} yr{toEssentials !== 1 ? 's' : ''}
            </div>
            <div className="text-base" style={{ color: 'var(--ink)', fontWeight: 600 }}>
              Age {essentialsCoveredAge}
            </div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--warm-gray-500)' }}>
              Work only for joy
            </div>
          </div>
        </div>

        {/* Full Freedom */}
        <div
          className="px-5 py-4 flex items-center gap-4"
          style={{ backgroundColor: 'var(--sand-50)' }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 ring-4"
            style={{
              backgroundColor: 'var(--sand-500)',
              ringColor: 'var(--sand-200)',
              boxShadow: '0 0 0 4px var(--sand-200)',
            }}
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--sand-50)' }} />
          </div>
          <div className="flex-1">
            <div className="text-xs" style={{ color: 'var(--sand-600)', fontWeight: 500 }}>
              Full freedom · {toFull} yr{toFull !== 1 ? 's' : ''}
            </div>
            <div className="text-base" style={{ color: 'var(--ink)', fontWeight: 600 }}>
              Age {fullFreedomAge}
            </div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--warm-gray-500)' }}>
              Work becomes optional
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Freedom Number progress ──────────────────────────────────────────────────

function FreedomProgress({
  currentSavings,
  freedomNumber,
}: {
  currentSavings: number;
  freedomNumber: number;
}) {
  const pct = freedomNumber > 0 ? Math.min(Math.round((currentSavings / freedomNumber) * 100), 100) : 0;

  return (
    <div className="flex flex-col gap-3">
      <SectionLabel>Freedom number</SectionLabel>
      <div
        className="rounded-2xl p-5 border flex flex-col gap-4"
        style={{ backgroundColor: 'var(--paper)', borderColor: 'var(--warm-gray-200)' }}
      >
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-2xl" style={{ color: 'var(--ink)', fontWeight: 700 }}>
              {pct}%
            </span>
            <span className="text-sm ml-2" style={{ color: 'var(--warm-gray-400)' }}>
              funded
            </span>
          </div>
          <span className="text-sm" style={{ color: 'var(--warm-gray-500)' }}>
            {formatCurrency(currentSavings)} of {formatCurrency(freedomNumber)}
          </span>
        </div>
        <div
          className="h-3 rounded-full overflow-hidden"
          style={{ backgroundColor: 'var(--warm-gray-100)' }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${Math.max(pct, 2)}%`, backgroundColor: 'var(--seafoam-500)' }}
          />
        </div>
        {/* Learn This */}
        <div
          className="rounded-xl p-3.5 border"
          style={{ backgroundColor: 'var(--deep-teal-50)', borderColor: 'var(--deep-teal-200)' }}
        >
          <span
            className="text-xs uppercase tracking-widest"
            style={{ color: 'var(--deep-teal-500)', fontWeight: 600 }}
          >
            Learn This
          </span>
          <p className="text-xs mt-1" style={{ color: 'var(--deep-teal-800)', lineHeight: 1.6 }}>
            Your Freedom Number is 25× your annual spending — the point where your money works
            instead of you. At a 5% real return, that covers you indefinitely.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Time Banked ──────────────────────────────────────────────────────────────

function TimeBanked({
  currentSavings,
  bridgeBalance,
  retirementBalance,
  annualSpending,
  freedomAge,
}: {
  currentSavings: number;
  bridgeBalance: number;
  retirementBalance: number;
  annualSpending: number;
  freedomAge: number;
}) {
  const totalBanked = calcYearsBanked(currentSavings, annualSpending);
  const bridgeSpan = Math.max(0, 59 - freedomAge);
  const bridgeNotNeeded = bridgeSpan === 0;
  const bridgePct = !bridgeNotNeeded
    ? Math.min(Math.round((calcYearsBanked(bridgeBalance, annualSpending) / bridgeSpan) * 100), 100)
    : 100;
  const retirementNeeded = 33; // 59.5 to 92
  const retirementPct = Math.min(
    Math.round((calcYearsBanked(retirementBalance, annualSpending) / retirementNeeded) * 100),
    100
  );

  function Ring({
    pct,
    color,
    label,
    sub,
    complete,
  }: {
    pct: number;
    color: string;
    label: string;
    sub: string;
    complete?: boolean;
  }) {
    const r = 44;
    const circ = 2 * Math.PI * r;
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="relative flex items-center justify-center">
          <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r={r} fill="none" stroke="var(--warm-gray-100)" strokeWidth="9" />
            <circle
              cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={`${circ * (Math.min(pct, 100) / 100)} ${circ}`}
            />
          </svg>
          <div className="absolute text-center">
            {complete ? (
              <div className="text-base" style={{ color, fontWeight: 700 }}>✓</div>
            ) : (
              <div className="text-lg" style={{ color, fontWeight: 700 }}>{pct}%</div>
            )}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm" style={{ color: 'var(--ink)', fontWeight: 600 }}>{label}</div>
          <div className="text-xs mt-0.5" style={{ color: 'var(--warm-gray-400)' }}>{sub}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <SectionLabel>Time banked</SectionLabel>
      <div
        className="rounded-2xl p-5 border flex flex-col gap-5"
        style={{ backgroundColor: 'var(--paper)', borderColor: 'var(--warm-gray-200)' }}
      >
        <div className="text-center">
          <div className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--warm-gray-400)' }}>
            Years of freedom already secured
          </div>
          <div className="text-5xl" style={{ color: 'var(--sand-600)', fontWeight: 700, lineHeight: 1.1 }}>
            {totalBanked}
          </div>
          <div className="text-sm mt-1" style={{ color: 'var(--warm-gray-500)' }}>
            years banked — even if you stop saving today
          </div>
        </div>
        <div
          className="pt-4 border-t grid grid-cols-2 gap-4"
          style={{ borderColor: 'var(--warm-gray-100)' }}
        >
          <Ring
            pct={bridgePct}
            color="var(--seafoam-500)"
            label="Bridge"
            sub="Now → 59½"
            complete={bridgeNotNeeded}
          />
          <Ring
            pct={retirementPct}
            color="var(--warm-gray-600)"
            label="Retirement"
            sub="59½ → 92"
          />
        </div>
        <p className="text-xs text-center" style={{ color: 'var(--warm-gray-400)', lineHeight: 1.6 }}>
          Bridge uses your taxable accounts. Retirement uses your 401k / IRA. MoneyBeh tracks both separately.
        </p>
      </div>
    </div>
  );
}

// ─── Reflection teaser ────────────────────────────────────────────────────────

function ReflectionTeaser() {
  return (
    <div className="flex flex-col gap-3">
      <SectionLabel>Reflection moments</SectionLabel>
      <div
        className="rounded-2xl p-5 border flex items-center gap-4"
        style={{ backgroundColor: 'var(--sand-50)', borderColor: 'var(--sand-200)' }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: 'var(--sand-200)' }}
        >
          <Repeat2 size={18} style={{ color: 'var(--sand-700)' }} />
        </div>
        <div className="flex-1">
          <div className="text-sm" style={{ color: 'var(--sand-800)', fontWeight: 600 }}>
            Was this worth it?
          </div>
          <div className="text-xs mt-0.5" style={{ color: 'var(--sand-600)', lineHeight: 1.5 }}>
            Weekly check-ins — coming soon.
          </div>
        </div>
        <ChevronRight size={16} style={{ color: 'var(--sand-400)' }} />
      </div>
    </div>
  );
}

// ─── No data fallback ─────────────────────────────────────────────────────────

function NoData() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6 px-5"
      style={{ backgroundColor: 'var(--paper)' }}
    >
      <p className="text-base text-center" style={{ color: 'var(--warm-gray-600)', lineHeight: 1.7 }}>
        Your dashboard will appear here after you complete the setup.
      </p>
      <RouterLink
        to="/start"
        className="flex items-center gap-2 px-8 py-4 rounded-2xl text-sm"
        style={{ backgroundColor: 'var(--seafoam-500)', color: 'white', fontWeight: 500 }}
      >
        Get started <ArrowRight size={16} />
      </RouterLink>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export function Dashboard() {
  const [onboarding, setOnboarding] = useState<OnboardingData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('moneybeh_onboarding');
    if (stored) {
      try {
        setOnboarding(JSON.parse(stored));
      } catch {
        // ignore
      }
    }
  }, []);

  if (!onboarding) return <NoData />;

  const { path, dataForm } = onboarding;
  const currentAge = parseInt(dataForm.currentAge) || 35;
  const targetAge = parseInt(dataForm.targetAge) || 0;
  const essentials = parseFloat(dataForm.monthlyEssentials) || 0;
  const joy = parseFloat(dataForm.monthlyJoy) || 0;
  const annualSpending = (essentials + joy) * 12;
  const essentialsCoveredAge = calcFreedomAgeFor(essentials * 12, dataForm);
  const fullFreedomAge = calcFreedomAgeFor(annualSpending, dataForm);
  const freedomNumber = annualSpending * 25;
  const currentSavings =
    (parseFloat(dataForm.retirementBalance) || 0) + (parseFloat(dataForm.bridgeBalance) || 0);
  const bridgeBalance = parseFloat(dataForm.bridgeBalance) || 0;
  const retirementBalance = parseFloat(dataForm.retirementBalance) || 0;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--warm-gray-50)' }}
    >
      <AppBar />

      <main
        className="max-w-lg mx-auto px-4 flex flex-col gap-5"
        style={{ paddingTop: '72px', paddingBottom: '80px' }}
      >
        {/* Freedom Age */}
        <FreedomAgeCard
          freedomAge={fullFreedomAge}
          currentAge={currentAge}
          isTarget={path === 'target'}
          targetAge={targetAge}
        />

        {/* Spending buckets */}
        <SpendingBuckets dataForm={dataForm} />

        {/* Freedom Timeline */}
        <FreedomTimeline
          currentAge={currentAge}
          essentialsCoveredAge={essentialsCoveredAge}
          fullFreedomAge={fullFreedomAge}
        />

        {/* Freedom Number progress */}
        {freedomNumber > 0 && (
          <FreedomProgress currentSavings={currentSavings} freedomNumber={freedomNumber} />
        )}

        {/* Time Banked */}
        {currentSavings > 0 && annualSpending > 0 && (
          <TimeBanked
            currentSavings={currentSavings}
            bridgeBalance={bridgeBalance}
            retirementBalance={retirementBalance}
            annualSpending={annualSpending}
            freedomAge={fullFreedomAge}
          />
        )}

        {/* Reflection teaser */}
        <ReflectionTeaser />
      </main>

      <BottomNav />
    </div>
  );
}