import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link as RouterLink, useNavigate } from 'react-router';
import { ArrowRight, Target, Compass, ChevronLeft } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Path = 'target' | 'calculate' | null;
type Step = 1 | 2 | 3 | 4;

type DataForm = {
  targetAge: string;
  currentAge: string;
  monthlyEssentials: string;
  monthlyJoy: string;
  retirementBalance: string;
  bridgeBalance: string;
  monthlySavings: string;
};

// ─── Calculations ─────────────────────────────────────────────────────────────

function calcFreedomAge(data: DataForm): number {
  const age = parseInt(data.currentAge) || 35;
  const essentials = parseFloat(data.monthlyEssentials) || 0;
  const joy = parseFloat(data.monthlyJoy) || 0;
  const monthly = essentials + joy;
  const annual = monthly * 12;
  const freedomNumber = annual * 25;
  const currentSavings =
    (parseFloat(data.retirementBalance) || 0) +
    (parseFloat(data.bridgeBalance) || 0);
  const monthlySavings = parseFloat(data.monthlySavings) || 0;
  const annualSavings = monthlySavings * 12;

  if (monthly === 0) return age + 25;
  if (monthlySavings <= 0 && currentSavings <= 0) return age + 40;

  let years = 0;
  let balance = currentSavings;
  while (balance < freedomNumber && years < 60) {
    balance = balance * 1.05 + annualSavings;
    years++;
  }
  return age + years;
}

function calcFreedomNumber(data: DataForm): number {
  const essentials = parseFloat(data.monthlyEssentials) || 0;
  const joy = parseFloat(data.monthlyJoy) || 0;
  return (essentials + joy) * 12 * 25;
}

function calcCurrentSavings(data: DataForm): number {
  return (parseFloat(data.retirementBalance) || 0) + (parseFloat(data.bridgeBalance) || 0);
}

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}k`;
  return `$${Math.round(n)}`;
}

// ─── Shared motion config ─────────────────────────────────────────────────────

const fade = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: 'easeIn' } },
};

// ─── Progress dots ────────────────────────────────────────────────────────────

function ProgressDots({ step }: { step: Step }) {
  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4].map((s) => (
        <div
          key={s}
          className="rounded-full transition-all duration-500"
          style={{
            width: s === step ? '20px' : '6px',
            height: '6px',
            backgroundColor:
              s < step
                ? 'var(--seafoam-400)'
                : s === step
                ? 'var(--ink)'
                : 'var(--warm-gray-200)',
          }}
        />
      ))}
    </div>
  );
}

// ─── Back link ────────────────────────────────────────────────────────────────

function Back({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 text-sm transition-colors mt-5"
      style={{ color: 'var(--warm-gray-400)' }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--warm-gray-600)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--warm-gray-400)')}
    >
      <ChevronLeft size={14} />
      Back
    </button>
  );
}

// ─── Primary button ───────────────────────────────────────────────────────────

function PrimaryButton({
  children,
  onClick,
  type = 'button',
  fullWidth = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  fullWidth?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl transition-all duration-200 text-sm group ${fullWidth ? 'w-full' : ''}`}
      style={{
        backgroundColor: 'var(--seafoam-500)',
        color: 'white',
        fontWeight: 500,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--seafoam-600)')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--seafoam-500)')}
    >
      {children}
    </button>
  );
}

// ─── Input field ──────────────────────────────────────────────────────────────

function InputField({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helper,
  prefix,
  autoFocus,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  helper?: string;
  prefix?: string;
  autoFocus?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm"
        style={{ color: 'var(--warm-gray-700)', fontWeight: 500 }}
      >
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span
            className="absolute left-4 top-1/2 -translate-y-1/2 text-sm pointer-events-none"
            style={{ color: 'var(--warm-gray-400)' }}
          >
            {prefix}
          </span>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          autoFocus={autoFocus}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full rounded-xl text-sm outline-none transition-all"
          style={{
            padding: prefix ? '12px 16px 12px 28px' : '12px 16px',
            backgroundColor: error ? 'var(--critical-subtle)' : 'var(--warm-gray-50)',
            border: error
              ? '1.5px solid var(--critical)'
              : focused
              ? '1.5px solid var(--seafoam-400)'
              : '1.5px solid var(--warm-gray-200)',
            color: 'var(--ink)',
            boxShadow: focused && !error ? '0 0 0 3px rgba(95,166,150,0.10)' : 'none',
          }}
        />
      </div>
      {error && (
        <p className="text-xs" style={{ color: 'var(--critical)' }}>
          {error}
        </p>
      )}
      {helper && !error && (
        <p className="text-xs" style={{ color: 'var(--warm-gray-400)', lineHeight: 1.6 }}>
          {helper}
        </p>
      )}
    </div>
  );
}

// ─── Joy Fund bucket visual ───────────────────────────────────────────────────

function JoyFundBuckets() {
  const buckets = [
    {
      label: 'Essentials',
      sub: 'The non-negotiable floor. Rent, groceries, utilities, insurance.',
      bg: 'var(--warm-gray-100)',
      border: 'var(--warm-gray-200)',
      dot: 'var(--warm-gray-400)',
      text: 'var(--warm-gray-700)',
    },
    {
      label: 'Joy',
      sub: 'Deliberately funded. The things that make life worth living — always in the plan.',
      bg: 'var(--sand-50)',
      border: 'var(--sand-200)',
      dot: 'var(--sand-500)',
      text: 'var(--sand-800)',
    },
    {
      label: 'Freedom',
      sub: 'Every dollar here buys back time. Bridge fund + retirement leg working together.',
      bg: 'var(--seafoam-50)',
      border: 'var(--seafoam-200)',
      dot: 'var(--seafoam-500)',
      text: 'var(--seafoam-800)',
    },
  ];

  return (
    <div className="flex flex-col gap-2.5">
      {buckets.map((b) => (
        <div
          key={b.label}
          className="rounded-2xl border px-4 py-3.5 flex items-start gap-3"
          style={{ backgroundColor: b.bg, borderColor: b.border }}
        >
          <div
            className="w-2 h-2 rounded-full shrink-0 mt-1.5"
            style={{ backgroundColor: b.dot }}
          />
          <div>
            <div className="text-sm mb-0.5" style={{ color: b.text, fontWeight: 600 }}>
              {b.label}
            </div>
            <div className="text-sm" style={{ color: b.text, opacity: 0.75, lineHeight: 1.5 }}>
              {b.sub}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Step 1: Path selection ───────────────────────────────────────────────────

function PathSelect({ onSelect }: { onSelect: (p: Path) => void }) {
  const paths = [
    {
      id: 'target' as Path,
      icon: <Target size={20} />,
      headline: 'I have a target freedom age.',
      sub: 'Tell me what it takes to get there — and guide me on the way.',
      color: 'var(--seafoam-500)',
      hoverBg: 'var(--seafoam-50)',
      hoverBorder: 'var(--seafoam-300)',
    },
    {
      id: 'calculate' as Path,
      icon: <Compass size={20} />,
      headline: 'Show me where I stand.',
      sub: "I'll tell you what I'm doing, and you tell me when I'll be free.",
      color: 'var(--deep-teal-500)',
      hoverBg: 'var(--deep-teal-50)',
      hoverBorder: 'var(--deep-teal-300)',
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p
          className="text-xs uppercase tracking-widest"
          style={{ color: 'var(--warm-gray-400)', fontWeight: 500 }}
        >
          The MoneyBeh Way
        </p>
        <h1
          className="text-3xl sm:text-4xl"
          style={{ color: 'var(--ink)', fontWeight: 600, lineHeight: 1.25 }}
        >
          Where would you like to start?
        </h1>
        <p className="text-base" style={{ color: 'var(--warm-gray-500)', lineHeight: 1.7 }}>
          No wrong answer. This just helps us know how to meet you.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {paths.map((p) => (
          <PathCard key={p.id as string} path={p} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}

function PathCard({
  path,
  onSelect,
}: {
  path: {
    id: Path;
    icon: React.ReactNode;
    headline: string;
    sub: string;
    color: string;
    hoverBg: string;
    hoverBorder: string;
  };
  onSelect: (p: Path) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={() => onSelect(path.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full text-left rounded-2xl border-2 p-5 transition-all duration-300 flex items-start gap-4"
      style={{
        backgroundColor: hovered ? path.hoverBg : 'var(--paper)',
        borderColor: hovered ? path.hoverBorder : 'var(--warm-gray-200)',
        boxShadow: hovered ? '0 4px 16px rgba(26,26,27,0.08)' : 'none',
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300"
        style={{
          backgroundColor: hovered ? path.color : 'var(--warm-gray-100)',
          color: hovered ? 'white' : 'var(--warm-gray-500)',
        }}
      >
        {path.icon}
      </div>
      <div className="flex-1 pt-1">
        <div
          className="text-base mb-1"
          style={{ color: 'var(--ink)', fontWeight: 600, lineHeight: 1.4 }}
        >
          {path.headline}
        </div>
        <div className="text-sm" style={{ color: 'var(--warm-gray-500)', lineHeight: 1.6 }}>
          {path.sub}
        </div>
      </div>
      <ArrowRight
        size={16}
        className="shrink-0 mt-1.5"
        style={{
          color: hovered ? path.color : 'var(--warm-gray-300)',
          transition: 'transform 0.3s, color 0.3s',
          transform: hovered ? 'translateX(3px)' : 'none',
        }}
      />
    </button>
  );
}

// ─── Step 2: Mirror ───────────────────────────────────────────────────────────

const mirrorContent: Record<
  'target' | 'calculate',
  { label: string; title: string; body: string; cta: string }
> = {
  target: {
    label: 'Great starting point',
    title: 'A target age changes everything.',
    body: "Most people drift. You've already decided you won't. Having a specific age in mind — even a rough one — turns financial planning from reactive to intentional. We'll work backwards from your target, and keep you moving forward with a plan that's clear enough to actually follow.",
    cta: 'Show me how it works',
  },
  calculate: {
    label: 'Smart first move',
    title: "Most people skip this step. You're not going to.",
    body: "Before you can plan toward freedom, you need to see where you actually stand. Most tools ask you to connect every account and categorize every transaction. MoneyBeh asks for three numbers — and shows you the full picture from there.",
    cta: 'Show me my picture',
  },
};

function Mirror({
  path,
  onNext,
  onBack,
}: {
  path: 'target' | 'calculate';
  onNext: () => void;
  onBack: () => void;
}) {
  const m = mirrorContent[path];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <p
          className="text-xs uppercase tracking-widest"
          style={{ color: 'var(--seafoam-500)', fontWeight: 500 }}
        >
          {m.label}
        </p>
        <h1
          className="text-3xl sm:text-4xl"
          style={{ color: 'var(--ink)', fontWeight: 600, lineHeight: 1.25 }}
        >
          {m.title}
        </h1>
        <p className="text-base" style={{ color: 'var(--warm-gray-600)', lineHeight: 1.75 }}>
          {m.body}
        </p>
      </div>

      <div
        className="rounded-2xl p-5 border"
        style={{ backgroundColor: 'var(--warm-gray-50)', borderColor: 'var(--warm-gray-200)' }}
      >
        <p
          className="text-xs uppercase tracking-widest mb-4"
          style={{ color: 'var(--warm-gray-400)', fontWeight: 500 }}
        >
          The MoneyBeh Way — Joy Fund Mentality
        </p>
        <p className="text-sm mb-4" style={{ color: 'var(--warm-gray-600)', lineHeight: 1.7 }}>
          We don't track every transaction. We think about money in three buckets — and we never
          ask you to cut joy. We ask you to fund it <em>intentionally</em>.
        </p>
        <JoyFundBuckets />
      </div>

      <div className="flex flex-col gap-3">
        <PrimaryButton onClick={onNext}>
          {m.cta}
          <ArrowRight size={16} />
        </PrimaryButton>
        <Back onClick={onBack} />
      </div>
    </div>
  );
}

// ─── Step 3: Data inputs ──────────────────────────────────────────────────────

function SubProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-400"
          style={{
            width: i + 1 === current ? '16px' : '5px',
            height: '5px',
            backgroundColor:
              i + 1 < current
                ? 'var(--seafoam-400)'
                : i + 1 === current
                ? 'var(--warm-gray-600)'
                : 'var(--warm-gray-200)',
          }}
        />
      ))}
      <span
        className="ml-1 text-xs"
        style={{ color: 'var(--warm-gray-400)' }}
      >
        {current} of {total}
      </span>
    </div>
  );
}

function DataInputs({
  path,
  dataForm,
  setDataForm,
  onNext,
  onBack,
}: {
  path: 'target' | 'calculate';
  dataForm: DataForm;
  setDataForm: React.Dispatch<React.SetStateAction<DataForm>>;
  onNext: () => void;
  onBack: () => void;
}) {
  const [subStep, setSubStep] = useState<1 | 2 | 3>(1);
  const set = (field: keyof DataForm) => (v: string) =>
    setDataForm((f) => ({ ...f, [field]: v }));

  const isTarget = path === 'target';

  const subStepContent = [
    // ── Sub-step 1: You ───────────────────────────────────────
    {
      label: isTarget ? 'Your starting point' : 'Let\'s start with you',
      title: isTarget ? 'When do you want to be free?' : 'How old are you?',
      sub: isTarget
        ? 'Two ages — where you are now, and where you want to land. We\'ll do the math in between.'
        : 'Just your age. We\'ll calculate your Freedom Age from everything else you tell us.',
      content: (
        <div className={`grid gap-4 ${isTarget ? 'grid-cols-2' : 'grid-cols-1'}`}>
          <InputField
            id="currentAge"
            label="Your current age"
            type="number"
            placeholder="e.g. 34"
            value={dataForm.currentAge}
            onChange={set('currentAge')}
            autoFocus
          />
          {isTarget && (
            <InputField
              id="targetAge"
              label="Target freedom age"
              type="number"
              placeholder="e.g. 50"
              value={dataForm.targetAge}
              onChange={set('targetAge')}
              helper="The age when work becomes optional."
            />
          )}
        </div>
      ),
    },
    // ── Sub-step 2: Spending ──────────────────────────────────
    {
      label: 'Your spending plan',
      title: 'What does your life cost?',
      sub: 'Two numbers cover it. No transaction history, no account connections — just the shape of your spending.',
      content: (
        <div className="flex flex-col gap-4">
          <InputField
            id="essentials"
            label="Monthly essentials"
            type="number"
            placeholder="0"
            prefix="$"
            value={dataForm.monthlyEssentials}
            onChange={set('monthlyEssentials')}
            helper="Rent, groceries, utilities, transport, insurance — the non-negotiable floor."
            autoFocus
          />
          <InputField
            id="joy"
            label="Monthly joy"
            type="number"
            placeholder="0"
            prefix="$"
            value={dataForm.monthlyJoy}
            onChange={set('monthlyJoy')}
            helper="Dining, travel, hobbies — not a luxury, a line item."
          />
          {(parseFloat(dataForm.monthlyEssentials) > 0 || parseFloat(dataForm.monthlyJoy) > 0) && (
            <SpendingSummary
              essentials={parseFloat(dataForm.monthlyEssentials) || 0}
              joy={parseFloat(dataForm.monthlyJoy) || 0}
            />
          )}
        </div>
      ),
    },
    // ── Sub-step 3: Savings ────────────��──────────────────────
    {
      label: 'What you\'ve built',
      title: 'What are you building with?',
      sub: 'What you\'ve already saved, and what you\'re adding each month. This is where compounding does the work.',
      content: (
        <div className="flex flex-col gap-4">
          <InputField
            id="retirement"
            label="Freedom fund total"
            type="number"
            placeholder="0"
            prefix="$"
            value={dataForm.retirementBalance}
            onChange={set('retirementBalance')}
            helper="All 401k, IRA, and pension balances combined — funds life from 59½ onward."
            autoFocus
          />
          <InputField
            id="bridge"
            label="Bridge fund total"
            type="number"
            placeholder="0"
            prefix="$"
            value={dataForm.bridgeBalance}
            onChange={set('bridgeBalance')}
            helper="Taxable investment and brokerage accounts — bridges the gap before 59½."
          />
          <InputField
            id="savings"
            label="Monthly toward freedom"
            type="number"
            placeholder="0"
            prefix="$"
            value={dataForm.monthlySavings}
            onChange={set('monthlySavings')}
            helper="Everything you save each month — 401k contributions, investment transfers, all of it."
          />
        </div>
      ),
    },
  ];

  const current = subStepContent[subStep - 1];

  function handleContinue() {
    if (subStep < 3) {
      setSubStep((s) => (s + 1) as 1 | 2 | 3);
    } else {
      onNext();
    }
  }

  function handleBack() {
    if (subStep > 1) {
      setSubStep((s) => (s - 1) as 1 | 2 | 3);
    } else {
      onBack();
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Sub-progress */}
      <SubProgress current={subStep} total={3} />

      <AnimatePresence mode="wait">
        <motion.div
          key={subStep}
          variants={fade}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex flex-col gap-8"
        >
          {/* Heading */}
          <div className="flex flex-col gap-2">
            <p
              className="text-xs uppercase tracking-widest"
              style={{ color: 'var(--warm-gray-400)', fontWeight: 500 }}
            >
              {current.label}
            </p>
            <h1
              className="text-3xl sm:text-4xl"
              style={{ color: 'var(--ink)', fontWeight: 600, lineHeight: 1.25 }}
            >
              {current.title}
            </h1>
            <p
              className="text-base"
              style={{ color: 'var(--warm-gray-500)', lineHeight: 1.7 }}
            >
              {current.sub}
            </p>
          </div>

          {/* Fields */}
          {current.content}

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <PrimaryButton onClick={handleContinue} fullWidth>
              {subStep < 3 ? 'Continue' : isTarget ? 'Show me my plan' : 'Calculate my Freedom Age'}
              <ArrowRight size={16} />
            </PrimaryButton>
            <Back onClick={handleBack} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function FormSection({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p
          className="text-xs uppercase tracking-widest mb-1"
          style={{ color: 'var(--warm-gray-400)', fontWeight: 500 }}
        >
          {label}
        </p>
        {description && (
          <p className="text-sm" style={{ color: 'var(--warm-gray-500)', lineHeight: 1.6 }}>
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

function SpendingSummary({ essentials, joy }: { essentials: number; joy: number }) {
  const total = essentials + joy;
  const freedomNumber = total * 12 * 25;
  const essentialsPct = total > 0 ? Math.round((essentials / total) * 100) : 50;
  const joyPct = 100 - essentialsPct;

  return (
    <div
      className="rounded-2xl p-4 border"
      style={{ backgroundColor: 'var(--seafoam-50)', borderColor: 'var(--seafoam-200)' }}
    >
      <div className="flex justify-between mb-2">
        <span className="text-xs" style={{ color: 'var(--seafoam-600)', fontWeight: 500 }}>
          Monthly spending plan
        </span>
        <span className="text-xs" style={{ color: 'var(--seafoam-700)', fontWeight: 600 }}>
          {formatCurrency(total)}/mo
        </span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden flex mb-2"
        style={{ backgroundColor: 'var(--seafoam-100)' }}
      >
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${essentialsPct}%`, backgroundColor: 'var(--warm-gray-400)' }}
        />
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${joyPct}%`, backgroundColor: 'var(--sand-400)' }}
        />
      </div>
      <div className="flex gap-3 text-xs" style={{ color: 'var(--seafoam-700)' }}>
        <span>
          <span style={{ color: 'var(--warm-gray-500)' }}>●</span> Essentials{' '}
          {formatCurrency(essentials)}
        </span>
        <span>
          <span style={{ color: 'var(--sand-400)' }}>●</span> Joy {formatCurrency(joy)}
        </span>
      </div>
      <div
        className="mt-3 pt-3 border-t text-xs"
        style={{ borderColor: 'var(--seafoam-200)', color: 'var(--seafoam-700)' }}
      >
        Freedom Number ≈ <strong>{formatCurrency(freedomNumber)}</strong>
        <span className="ml-1" style={{ color: 'var(--seafoam-500)', fontWeight: 400 }}>
          ({formatCurrency(total * 12)}/yr × 25)
        </span>
      </div>
    </div>
  );
}

// ─── Step 4: Your picture ─────────────────────────────────────────────────────

function YourPicture({
  path,
  dataForm,
  onComplete,
}: {
  path: 'target' | 'calculate';
  dataForm: DataForm;
  onComplete: () => void;
}) {
  const freedomAge = calcFreedomAge(dataForm);
  const freedomNumber = calcFreedomNumber(dataForm);
  const currentSavings = calcCurrentSavings(dataForm);
  const progressPct =
    freedomNumber > 0 ? Math.min(Math.round((currentSavings / freedomNumber) * 100), 100) : 0;
  const currentAge = parseInt(dataForm.currentAge) || 35;
  const yearsAway = Math.max(0, freedomAge - currentAge);
  const isTarget = path === 'target';
  const targetAge = parseInt(dataForm.targetAge) || 0;
  const onTrack = isTarget && targetAge > 0 ? freedomAge <= targetAge : true;
  const yearGap = isTarget && targetAge > 0 ? freedomAge - targetAge : 0;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p
          className="text-xs uppercase tracking-widest"
          style={{ color: 'var(--sand-500)', fontWeight: 500 }}
        >
          Your picture
        </p>
        <h1
          className="text-3xl sm:text-4xl"
          style={{ color: 'var(--ink)', fontWeight: 600, lineHeight: 1.25 }}
        >
          {isTarget
            ? onTrack
              ? "You're on track."
              : "Here's your gap."
            : "Here's when you'll be free."}
        </h1>
      </div>

      {/* Freedom Age — hero number */}
      <div
        className="rounded-2xl p-7 border"
        style={{
          backgroundColor: onTrack || !isTarget ? 'var(--seafoam-50)' : 'var(--warm-gray-100)',
          borderColor: onTrack || !isTarget ? 'var(--seafoam-200)' : 'var(--warm-gray-300)',
        }}
      >
        {isTarget && targetAge > 0 && (
          <div className="mb-4">
            <span
              className="text-xs uppercase tracking-widest px-3 py-1 rounded-full border"
              style={{
                backgroundColor: onTrack ? 'var(--seafoam-100)' : 'var(--warm-gray-200)',
                borderColor: onTrack ? 'var(--seafoam-300)' : 'var(--warm-gray-400)',
                color: onTrack ? 'var(--seafoam-700)' : 'var(--warm-gray-700)',
                fontWeight: 500,
              }}
            >
              {onTrack
                ? '✓ On track'
                : `${yearGap} year${Math.abs(yearGap) !== 1 ? 's' : ''} to close`}
            </span>
          </div>
        )}

        <p
          className="text-sm mb-1"
          style={{ color: onTrack || !isTarget ? 'var(--seafoam-600)' : 'var(--warm-gray-500)' }}
        >
          {isTarget ? 'Your calculated Freedom Age' : 'Work becomes optional at'}
        </p>
        <div className="flex items-baseline gap-3 mb-2">
          <span
            className="text-6xl sm:text-7xl"
            style={{ color: 'var(--ink)', fontWeight: 700, lineHeight: 1 }}
          >
            {freedomAge}
          </span>
          <span className="text-xl" style={{ color: 'var(--warm-gray-400)' }}>
            in {yearsAway} year{yearsAway !== 1 ? 's' : ''}
          </span>
        </div>

        {isTarget && targetAge > 0 && !onTrack && (
          <p className="text-sm mt-3" style={{ color: 'var(--warm-gray-600)', lineHeight: 1.6 }}>
            Your target is age {targetAge}. At your current pace, you'll get there at {freedomAge}.
            Your dashboard will show you exactly what to adjust to close that gap.
          </p>
        )}
        {(!isTarget || !targetAge) && (
          <p className="text-sm mt-2" style={{ color: 'var(--seafoam-700)', lineHeight: 1.6 }}>
            Based on your spending plan, existing savings, and{' '}
            {formatCurrency(parseFloat(dataForm.monthlySavings) || 0)}/mo in contributions —
            assuming 5% real return.
          </p>
        )}
      </div>

      {/* Three-bucket summary */}
      {(parseFloat(dataForm.monthlyEssentials) > 0 || parseFloat(dataForm.monthlyJoy) > 0) && (
        <div className="flex flex-col gap-3">
          <p
            className="text-xs uppercase tracking-widest"
            style={{ color: 'var(--warm-gray-400)', fontWeight: 500 }}
          >
            Where your money goes
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[
              {
                label: 'Essentials',
                value: formatCurrency(parseFloat(dataForm.monthlyEssentials) || 0),
                bg: 'var(--warm-gray-100)',
                border: 'var(--warm-gray-200)',
                color: 'var(--warm-gray-700)',
              },
              {
                label: 'Joy',
                value: formatCurrency(parseFloat(dataForm.monthlyJoy) || 0),
                bg: 'var(--sand-50)',
                border: 'var(--sand-200)',
                color: 'var(--sand-700)',
              },
              {
                label: 'Freedom',
                value: formatCurrency(parseFloat(dataForm.monthlySavings) || 0) + '/mo',
                bg: 'var(--seafoam-50)',
                border: 'var(--seafoam-200)',
                color: 'var(--seafoam-700)',
              },
            ].map((b) => (
              <div
                key={b.label}
                className="rounded-2xl p-3.5 border text-center"
                style={{ backgroundColor: b.bg, borderColor: b.border }}
              >
                <div className="text-xs mb-1" style={{ color: b.color, opacity: 0.7 }}>
                  {b.label}
                </div>
                <div className="text-sm" style={{ color: b.color, fontWeight: 600 }}>
                  {b.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress toward Freedom Number */}
      {freedomNumber > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex justify-between text-xs" style={{ color: 'var(--warm-gray-600)' }}>
            <span>Progress toward Freedom Number ({formatCurrency(freedomNumber)})</span>
            <span style={{ fontWeight: 600 }}>{progressPct}%</span>
          </div>
          <div
            className="h-2.5 rounded-full overflow-hidden"
            style={{ backgroundColor: 'var(--warm-gray-200)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${progressPct}%`, backgroundColor: 'var(--seafoam-500)' }}
            />
          </div>
          <div className="flex justify-between text-xs" style={{ color: 'var(--warm-gray-400)' }}>
            <span>Current: {formatCurrency(currentSavings)}</span>
            <span>Goal: {formatCurrency(freedomNumber)}</span>
          </div>
        </div>
      )}

      {/* Learn This moment */}
      <div
        className="rounded-2xl p-5 border"
        style={{ backgroundColor: 'var(--deep-teal-50)', borderColor: 'var(--deep-teal-200)' }}
      >
        <span
          className="text-xs uppercase tracking-widest"
          style={{ color: 'var(--deep-teal-500)', fontWeight: 600 }}
        >
          Learn This
        </span>
        <p className="text-sm mt-2" style={{ color: 'var(--deep-teal-800)', lineHeight: 1.7 }}>
          The bridge leg covers you from today to 59½ using taxable accounts. The retirement leg
          takes over from 59½ to 92. MoneyBeh tracks both separately — so you always know which
          leg needs attention.
        </p>
      </div>

      {/* Reflection moment teaser */}
      <div
        className="rounded-2xl p-5 border"
        style={{ backgroundColor: 'var(--sand-50)', borderColor: 'var(--sand-200)' }}
      >
        <p className="text-sm" style={{ color: 'var(--sand-800)', fontWeight: 600 }}>
          Your plan isn't static.
        </p>
        <p className="text-sm mt-1" style={{ color: 'var(--sand-700)', lineHeight: 1.6 }}>
          MoneyBeh will check in with you weekly — one question, one minute, one nudge toward a
          clearer decision. That's coming next.
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3">
        <PrimaryButton onClick={onComplete} fullWidth>
          Go to my dashboard
          <ArrowRight size={16} />
        </PrimaryButton>
        <RouterLink
          to="/"
          className="block text-center text-sm py-2 transition-colors"
          style={{ color: 'var(--warm-gray-400)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--warm-gray-600)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--warm-gray-400)')}
        >
          Back to the website
        </RouterLink>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function StartHere() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [path, setPath] = useState<Path>(null);
  const [dataForm, setDataForm] = useState<DataForm>({
    targetAge: '',
    currentAge: '',
    monthlyEssentials: '',
    monthlyJoy: '',
    retirementBalance: '',
    bridgeBalance: '',
    monthlySavings: '',
  });

  function handlePathSelect(p: Path) {
    setPath(p);
    setTimeout(() => setStep(2), 150);
  }

  function handleComplete() {
    localStorage.setItem(
      'moneybeh_onboarding',
      JSON.stringify({ path, dataForm })
    );
    navigate('/dashboard');
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--paper)' }}>
      {/* Minimal header */}
      <header className="px-6 pt-6 pb-4 flex items-center justify-between max-w-lg mx-auto w-full">
        <RouterLink
          to="/"
          className="text-sm transition-colors"
          style={{ color: 'var(--warm-gray-400)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--warm-gray-600)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--warm-gray-400)')}
        >
          ← MoneyBeh
        </RouterLink>
        {step < 4 && <ProgressDots step={step} />}
      </header>

      {/* Content */}
      <main className="flex-1 flex items-start justify-center px-5 pt-6 pb-20 sm:pt-12">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">

            {step === 1 && (
              <motion.div key="step-1" variants={fade} initial="initial" animate="animate" exit="exit">
                <PathSelect onSelect={handlePathSelect} />
              </motion.div>
            )}

            {step === 2 && path && (
              <motion.div key="step-2" variants={fade} initial="initial" animate="animate" exit="exit">
                <Mirror
                  path={path}
                  onNext={() => setStep(3)}
                  onBack={() => { setStep(1); setPath(null); }}
                />
              </motion.div>
            )}

            {step === 3 && path && (
              <motion.div key="step-3" variants={fade} initial="initial" animate="animate" exit="exit">
                <DataInputs
                  path={path}
                  dataForm={dataForm}
                  setDataForm={setDataForm}
                  onNext={() => setStep(4)}
                  onBack={() => setStep(2)}
                />
              </motion.div>
            )}

            {step === 4 && path && (
              <motion.div key="step-4" variants={fade} initial="initial" animate="animate" exit="exit">
                <YourPicture path={path} dataForm={dataForm} onComplete={handleComplete} />
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}