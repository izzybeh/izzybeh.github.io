import { Link } from 'react-router';
import { Calculator, TrendingUp, Target, FileText } from 'lucide-react';

export function Tools() {
  const tools = [
    {
      id: 'freedom-calculator',
      title: 'Freedom Calculator',
      description: 'Build your two-leg plan - bridge to 59½, retirement to 92. See exactly what you need to save.',
      icon: Calculator,
      path: '/tools/freedom-calculator',
      status: 'live',
      bg: 'var(--seafoam-50)',
      border: 'var(--seafoam-200)',
      iconColor: 'var(--seafoam-600)',
    },
    {
      id: 'purchase-reviewer',
      title: 'Purchase Reviewer',
      description: 'Upload your order history and categorize each purchase. See where your money actually went.',
      icon: FileText,
      path: '/tools/purchase-reviewer',
      status: 'live',
      bg: 'var(--deep-teal-50)',
      border: 'var(--deep-teal-200)',
      iconColor: 'var(--deep-teal-600)',
    },
    {
      id: 'spending-clarity',
      title: 'Spending Clarity Tool',
      description: 'Break down your monthly spending into Essentials, Joy, and Freedom. Find what you can trim without sacrifice.',
      icon: TrendingUp,
      path: '/tools/spending-clarity',
      status: 'coming',
      bg: 'var(--warm-gray-50)',
      border: 'var(--warm-gray-200)',
      iconColor: 'var(--warm-gray-400)',
    },
    {
      id: 'target-checker',
      title: 'Target vs. Reality',
      description: 'Set your Freedom Age goal - see if you are on track or how big the gap is.',
      icon: Target,
      path: '/tools/target-checker',
      status: 'coming',
      bg: 'var(--warm-gray-50)',
      border: 'var(--warm-gray-200)',
      iconColor: 'var(--warm-gray-400)',
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--warm-gray-50)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Header */}
        <div className="mb-12">
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: 'var(--seafoam-600)', fontWeight: 500 }}
          >
            Free tools
          </p>
          <h1
            className="text-4xl sm:text-5xl mb-4"
            style={{ color: 'var(--ink)', fontWeight: 700, lineHeight: 1.1 }}
          >
            Build clarity. Make decisions.
          </h1>
          <p
            className="text-lg sm:text-xl max-w-2xl"
            style={{ color: 'var(--warm-gray-600)', lineHeight: 1.6 }}
          >
            No jargon. No signup required. Just honest calculators that show you exactly where you stand.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const isComingSoon = tool.status === 'coming';

            return (
              <div key={tool.id}>
                {isComingSoon ? (
                  <div
                    className="rounded-2xl p-6 border h-full flex flex-col opacity-60"
                    style={{ backgroundColor: tool.bg, borderColor: tool.border }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: tool.border }}
                    >
                      <Icon size={24} style={{ color: tool.iconColor }} />
                    </div>
                    <h3 className="text-xl mb-2" style={{ color: 'var(--ink)', fontWeight: 600 }}>
                      {tool.title}
                    </h3>
                    <p className="text-sm mb-4 flex-1" style={{ color: 'var(--warm-gray-600)', lineHeight: 1.6 }}>
                      {tool.description}
                    </p>
                    <span
                      className="text-xs uppercase tracking-widest"
                      style={{ color: 'var(--warm-gray-400)', fontWeight: 500 }}
                    >
                      Coming soon
                    </span>
                  </div>
                ) : (
                  <Link
                    to={tool.path}
                    className="rounded-2xl p-6 border h-full flex flex-col transition-all hover:shadow-lg group"
                    style={{ backgroundColor: tool.bg, borderColor: tool.border }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: tool.border }}
                    >
                      <Icon size={24} style={{ color: tool.iconColor }} />
                    </div>
                    <h3
                      className="text-xl mb-2 group-hover:text-seafoam-700 transition-colors"
                      style={{ color: 'var(--ink)', fontWeight: 600 }}
                    >
                      {tool.title}
                    </h3>
                    <p className="text-sm mb-4 flex-1" style={{ color: 'var(--warm-gray-600)', lineHeight: 1.6 }}>
                      {tool.description}
                    </p>
                    <span
                      className="text-xs uppercase tracking-widest"
                      style={{ color: tool.iconColor, fontWeight: 500 }}
                    >
                      Use now →
                    </span>
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Learn This moment */}
        <div
          className="rounded-2xl p-6 border mt-12"
          style={{ backgroundColor: 'var(--deep-teal-50)', borderColor: 'var(--deep-teal-200)' }}
        >
          <span
            className="text-xs uppercase tracking-widest"
            style={{ color: 'var(--deep-teal-500)', fontWeight: 600 }}
          >
            Learn This
          </span>
          <p className="text-sm mt-2" style={{ color: 'var(--deep-teal-800)', lineHeight: 1.7 }}>
            These tools use the same math the MoneyBeh app runs behind the scenes. No account needed —
            we just want you to see your picture clearly, whether you use our app or not.
          </p>
        </div>
      </div>
    </div>
  );
}