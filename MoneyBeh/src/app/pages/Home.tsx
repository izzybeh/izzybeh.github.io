import {
  Sparkles,
  Clock,
  Heart,
  TrendingUp,
  BookOpen,
  Mic,
  Users,
} from "lucide-react";
import { useEffect } from "react";
import { Link as RouterLink } from "react-router";
import {
  updateSEO,
  addStructuredData,
  organizationSchema,
  websiteSchema,
  mobileAppSchema,
} from "../utils/seo";

export function Home() {
  useEffect(() => {
    updateSEO({
      title: "MoneyBeh - Joy Today. Freedom Tomorrow.",
      description:
        "Financial wellness without the stress. Make intentional money choices aligned with your values. See your future in years, not dollars. Clear decisions. Less stress. More freedom.",
      keywords:
        "financial wellness, financial freedom, intentional spending, values alignment, joy fund, financial independence, FIRE",
      url: "https://moneybeh.com",
      type: "website",
    });

    const schemas = {
      "@context": "https://schema.org",
      "@graph": [
        organizationSchema,
        websiteSchema,
        mobileAppSchema,
      ],
    };
    addStructuredData(schemas);
  }, []);

  return (
    <div>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 sm:px-6 sm:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-tight text-warm-gray-900">
              MoneyBeh
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-warm-gray-700 max-w-2xl mx-auto leading-relaxed">
              Joy today. Freedom tomorrow.
            </p>
            <p className="text-base sm:text-lg text-warm-gray-600 max-w-xl mx-auto leading-relaxed">
              Most tools show you today or tomorrow. MoneyBeh connects them — and tells you exactly when you'll be free.
            </p>
          </div>

          <div className="pt-6 sm:pt-8">
            <RouterLink
              to="/start"
              className="inline-block bg-seafoam-500 hover:bg-seafoam-600 active:bg-seafoam-700 text-paper px-10 py-4 rounded-[1.5rem] transition-all duration-300 ease-out text-base sm:text-lg"
            >
              Find your starting point
            </RouterLink>
          </div>
        </div>
      </section>

      {/* ─── Problem ──────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-warm-gray-50">
        <div className="max-w-3xl mx-auto space-y-10 sm:space-y-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-warm-gray-900 text-center leading-tight">
            Most tools only show you half
          </h2>

          <p className="text-lg sm:text-xl text-warm-gray-700 leading-relaxed max-w-xl mx-auto text-center">
            Budgeting apps tell you whether this month is working.
            Wealth trackers show you where you stand.
            But almost none of them connect the two — so you can do everything right and still have no idea when you'll actually be free.
          </p>

          <div className="max-w-xl mx-auto text-center space-y-4">
            <p className="text-xl sm:text-2xl lg:text-3xl text-warm-gray-900 leading-relaxed">
              You're not behind.
              <br />
              You just can't see the full picture yet.
            </p>
            <p className="text-base sm:text-lg text-warm-gray-600 leading-relaxed">
              MoneyBeh gives you both halves — your life today, and the timeline to your freedom.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Solution ─────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-10 sm:space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-warm-gray-900">
              The MoneyBeh Way
            </h2>
            <p className="text-lg sm:text-xl text-warm-gray-600 max-w-2xl mx-auto">
              A simple path. A clear destination.
            </p>
            <p className="text-base sm:text-lg text-warm-gray-600 max-w-2xl mx-auto leading-relaxed">
              You don't need to overhaul your life. You need two
              things: a spending plan that includes joy, and a
              timeline that shows you exactly when freedom
              arrives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Step 1 */}
            <div className="bg-gradient-to-br from-seafoam-50 to-seafoam-50/30 rounded-[2rem] p-8 lg:p-10 border border-seafoam-200 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-seafoam-500 text-paper flex items-center justify-center text-xl font-light">
                    1
                  </div>
                  <h3 className="text-2xl sm:text-3xl text-warm-gray-900">
                    Choose Your Joy
                  </h3>
                </div>
                <p className="text-lg sm:text-xl text-warm-gray-700 leading-tight">
                  Build a sustainable life. Focus on what
                  matters. Think in time, not money.
                </p>
              </div>

              <ul className="space-y-3 text-sm sm:text-base text-warm-gray-600 leading-relaxed list-disc pl-6 sm:pl-8 marker:text-warm-gray-400">
                <li>
                  Split your money: Essentials + Joy + Savings
                </li>
                <li>
                  Reduce wasted spending without deprivation
                </li>
                <li>
                  Create a lifestyle you can afford forever
                </li>
                <li>
                  A spending plan that accounts for everything —
                  including joy
                </li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="bg-gradient-to-br from-deep-teal-50 to-deep-teal-50/30 rounded-[2rem] p-8 lg:p-10 border border-deep-teal-200 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-deep-teal-600 text-paper flex items-center justify-center text-xl font-light">
                    2
                  </div>
                  <h3 className="text-2xl sm:text-3xl text-warm-gray-900">
                    Choose Your Time
                  </h3>
                </div>
                <p className="text-lg sm:text-xl text-warm-gray-700 leading-tight">
                  See your clear path. Set it on auto-pilot.
                  Watch compounding work.
                </p>
              </div>

              <ul className="space-y-3 text-sm sm:text-base text-warm-gray-600 leading-relaxed list-disc pl-6 sm:pl-8 marker:text-warm-gray-400">
                <li>See when work becomes optional</li>
                <li>Know when you can work just for joy</li>
                <li>Clear monthly savings targets</li>
                <li>Let compounding do the magic</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Insights ─────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-warm-gray-50">
        <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-warm-gray-900">
              The tools your money deserves
            </h2>
          </div>

          <div className="space-y-16 sm:space-y-20 lg:space-y-24">

            {/* ── Feature 1: Fund Your Joy ── */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="order-last lg:order-last">
                <div className="bg-warm-gray-100 rounded-[2rem] p-6 sm:p-8 shadow-md">
                  <div className="bg-paper rounded-[1.5rem] p-6 space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-warm-gray-200">
                      <h4 className="text-lg text-warm-gray-900">
                        This Month's Money
                      </h4>
                      <div className="text-xs text-warm-gray-500 bg-warm-gray-50 px-3 py-1.5 rounded-full">
                        $4,200 income
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Essentials */}
                      <div className="bg-gradient-to-br from-seafoam-50 to-seafoam-50/30 rounded-xl p-5 border border-seafoam-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-seafoam-500 rounded-full"></div>
                            <div className="text-base text-warm-gray-900 font-medium">
                              Essentials
                            </div>
                          </div>
                          <div className="text-xl text-warm-gray-900">
                            $2,100
                          </div>
                        </div>
                        <div className="text-xs text-warm-gray-600 leading-relaxed">
                          Rent, groceries, utilities, insurance
                        </div>
                        <div className="pt-2 border-t border-seafoam-200">
                          <div className="text-xs text-seafoam-700">
                            The non-negotiable floor
                          </div>
                        </div>
                      </div>

                      {/* Joy — visually elevated */}
                      <div className="bg-gradient-to-br from-sand-50 to-sand-50/30 rounded-xl p-5 border-2 border-sand-300 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-sand-500 rounded-full"></div>
                            <div className="text-base text-warm-gray-900 font-medium">
                              Joy
                            </div>
                          </div>
                          <div className="text-xl text-warm-gray-900">
                            $1,260
                          </div>
                        </div>
                        <div className="text-xs text-warm-gray-600 leading-relaxed">
                          Meals that matter, experiences,
                          learning
                        </div>
                        <div className="pt-2 border-t border-sand-300 flex items-center">
                          <div className="text-xs text-sand-600 bg-sand-100 px-2 py-0.5 rounded-full">
                            Adjust →
                          </div>
                        </div>
                      </div>

                      {/* Savings */}
                      <div className="bg-gradient-to-br from-deep-teal-50 to-deep-teal-50/30 rounded-xl p-5 border border-deep-teal-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-deep-teal-500 rounded-full"></div>
                            <div className="text-base text-warm-gray-900 font-medium">
                              Savings
                            </div>
                          </div>
                          <div className="text-xl text-warm-gray-900">
                            $840
                          </div>
                        </div>
                        <div className="text-xs text-warm-gray-600 leading-relaxed">
                          Freedom fund + retirement investments
                        </div>
                        <div className="pt-2 border-t border-deep-teal-200">
                          <div className="text-xs text-deep-teal-700">
                            Building freedom
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-warm-gray-200">
                      <div className="bg-warm-gray-50 rounded-lg p-4 text-center space-y-2">
                        <div className="text-sm text-warm-gray-900 font-medium">
                          Every dollar knows its purpose
                        </div>
                        <div className="text-xs text-warm-gray-600 leading-relaxed">
                          Sustainable today. Building freedom
                          for tomorrow.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-8 h-8 text-sand-600" />
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl text-warm-gray-900">
                      Fund Your Joy
                    </h3>
                  </div>
                  <p className="text-xl sm:text-2xl text-warm-gray-900 leading-tight">
                    Wealth isn't your balance. It's the moments
                    you fund.
                  </p>
                </div>
                <div className="text-base sm:text-lg text-warm-gray-700 leading-relaxed space-y-4">
                  <p>
                    Split your money into three intentional
                    buckets: Essentials, Joy, and Freedom
                    savings. Size each one to fit your actual
                    life — not a generic ratio.
                  </p>
                  <p>
                    This isn't a restriction — it's permission.
                    Permission to spend on joy without guilt,
                    knowing your essentials are covered and your
                    freedom is building.
                  </p>
                  <p>
                    A sustainable split you can maintain
                    forever. Fund the life you want today while
                    building the freedom you want tomorrow.
                  </p>
                </div>
              </div>
            </div>

            {/* ── Feature 2: Reflection Moments ── */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="order-last lg:order-first">
                <div className="bg-warm-gray-100 rounded-[2rem] p-6 sm:p-8 shadow-md">
                  <div className="bg-paper rounded-[1.5rem] p-6 space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-warm-gray-200">
                      <h4 className="text-lg text-warm-gray-900">
                        Weekly Reflection
                      </h4>
                      <div className="text-xs text-warm-gray-500 bg-warm-gray-50 px-3 py-1.5 rounded-full">
                        3 of 12 reviewed
                      </div>
                    </div>

                    {/* Swipe Card */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-warm-gray-100 rounded-xl transform translate-y-2 scale-95 opacity-30"></div>
                      <div className="absolute inset-0 bg-warm-gray-100 rounded-xl transform translate-y-1 scale-[0.97] opacity-50"></div>

                      <div className="relative bg-gradient-to-br from-sand-50 to-sand-50/30 rounded-xl p-6 border-2 border-sand-200 shadow-lg space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1 flex-1">
                              <div className="text-xl text-warm-gray-900 font-medium">
                                Dinner at Nopa
                              </div>
                              <div className="text-xs text-warm-gray-500">
                                Saturday, 7:30 PM
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                <div className="w-2 h-2 bg-sand-500 rounded-full"></div>
                                <div className="text-xs text-warm-gray-600">
                                  Meals That Matter
                                </div>
                              </div>
                            </div>
                            <div className="text-3xl text-warm-gray-900 font-light">
                              $124
                            </div>
                          </div>

                          <div className="bg-warm-gray-50 rounded-lg p-4 text-sm text-warm-gray-700 leading-relaxed">
                            "Celebrated Sarah's promotion with
                            the crew. Laughed for hours."
                          </div>
                        </div>

                        <div className="pt-4 border-t border-sand-200 space-y-4">
                          <p className="text-center text-base text-warm-gray-900 font-medium">
                            Was this worth it?
                          </p>

                          <div className="flex items-center justify-center gap-16">
                            <div className="flex flex-col items-center gap-2 opacity-60">
                              <div className="w-16 h-16 rounded-full bg-warm-gray-200 flex items-center justify-center">
                                <svg
                                  className="w-8 h-8 text-warm-gray-500"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </div>
                              <div className="text-xs text-warm-gray-600 font-medium">
                                No
                              </div>
                            </div>

                            <div className="flex flex-col items-center gap-2">
                              <div className="w-16 h-16 rounded-full bg-seafoam-500 shadow-lg shadow-seafoam-200 flex items-center justify-center animate-pulse">
                                <svg
                                  className="w-8 h-8 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                              <div className="text-xs text-seafoam-700 font-medium">
                                Definite Yes
                              </div>
                            </div>
                          </div>

                          <p className="text-xs text-center text-warm-gray-500 italic">
                            Swipe left or right
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* After Reflection — elevated */}
                    <div className="pt-2 border-t border-warm-gray-200 space-y-4">
                      <p className="text-xs uppercase tracking-wide text-warm-gray-500 font-medium">
                        After this week's reflection
                      </p>

                      <div className="space-y-3">
                        <div className="bg-gradient-to-br from-seafoam-50 to-seafoam-50/30 rounded-lg p-5 border border-seafoam-200 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-warm-gray-900 font-medium">
                              Definite Yes
                            </div>
                            <div className="text-sm text-seafoam-700 font-medium">
                              8 of 12
                            </div>
                          </div>
                          <div className="text-xs text-warm-gray-600 leading-relaxed">
                            Deep conversations, family time,
                            learning moments
                          </div>
                        </div>

                        <div className="bg-warm-gray-100 rounded-lg p-5 border border-warm-gray-300 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-warm-gray-900 font-medium">
                              Not Worth It
                            </div>
                            <div className="text-sm text-warm-gray-600 font-medium">
                              4 of 12
                            </div>
                          </div>
                          <div className="text-xs text-warm-gray-600 leading-relaxed">
                            Rushed takeout, impulse buys,
                            autopilot spending
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-warm-gray-700 text-center leading-relaxed pt-2">
                        No guilt. Just clarity on what brings
                        you joy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Heart className="w-8 h-8 text-sand-600" />
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl text-warm-gray-900">
                      Reflection Moments
                    </h3>
                  </div>
                  <p className="text-xl sm:text-2xl text-warm-gray-900 leading-tight">
                    Your spending already knows what brings you
                    joy. This just helps you listen.
                  </p>
                </div>
                <div className="text-base sm:text-lg text-warm-gray-700 leading-relaxed space-y-4">
                  <p>
                    Every week, reflect on your spending with
                    one simple question: "Was this worth it?"
                  </p>
                  <p>
                    If it's not a definite yes, it's a no. This
                    essentialist practice reveals what brings
                    you real joy — and what's just noise.
                  </p>
                  <p>
                    What if you already knew what mattered — and
                    just needed a moment each week to confirm
                    it? No restriction. No shame. Just clarity
                    that quietly shapes everything that follows.
                  </p>
                </div>
              </div>
            </div>

            {/* ── Feature 3: Freedom Timeline ── */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="order-last lg:order-last">
                <div className="bg-warm-gray-100 rounded-[2rem] p-6 sm:p-8 shadow-md">
                  <div className="bg-paper rounded-[1.5rem] p-6 sm:p-8 lg:p-10 space-y-10">
                    <div className="flex items-center justify-between pb-6 border-b border-warm-gray-200">
                      <h4 className="text-xl text-warm-gray-900">
                        Freedom Timeline
                      </h4>
                      <div className="text-sm text-warm-gray-500 bg-warm-gray-50 px-3 py-1.5 rounded-full">
                        Age 30
                      </div>
                    </div>

                    <div className="relative space-y-0 py-2">
                      <div className="absolute left-[15px] top-[28px] h-[42%] w-1 bg-gradient-to-b from-warm-gray-400 to-seafoam-500"></div>
                      <div className="absolute left-[15px] top-[42%] bottom-[28px] w-1 bg-gradient-to-b from-seafoam-500 to-sand-500"></div>

                      {/* Current */}
                      <div
                        className="relative flex items-start gap-5"
                        style={{ paddingBottom: "3.5rem" }}
                      >
                        <div className="flex flex-col items-center pt-1 z-10">
                          <div className="w-8 h-8 rounded-full bg-warm-gray-900 shadow-lg flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-paper"></div>
                          </div>
                        </div>
                        <div className="flex-1 pt-1">
                          <div className="text-xs uppercase tracking-wide text-warm-gray-500 mb-1">
                            Current
                          </div>
                          <div className="text-lg text-warm-gray-900 font-medium">
                            You are here
                          </div>
                        </div>
                      </div>

                      {/* Essentials Covered */}
                      <div
                        className="relative flex items-start gap-5"
                        style={{ paddingBottom: "4rem" }}
                      >
                        <div className="flex flex-col items-center pt-2 z-10">
                          <div className="w-8 h-8 rounded-full bg-seafoam-600 shadow-lg shadow-seafoam-200 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-seafoam-50"></div>
                          </div>
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="inline-block px-2.5 py-1 bg-seafoam-100 text-seafoam-800 text-xs font-medium rounded-full">
                            7 years
                          </div>
                          <div className="bg-gradient-to-br from-seafoam-50 to-seafoam-50/50 rounded-xl p-5 border border-seafoam-200/50 shadow-sm space-y-2">
                            <div className="text-base text-warm-gray-900 font-medium">
                              Essentials Covered
                            </div>
                            <div className="text-2xl text-seafoam-700 font-light tracking-tight">
                              Age 37
                            </div>
                            <div className="pt-2 border-t border-seafoam-200/60">
                              <div className="text-xs text-warm-gray-600 leading-relaxed">
                                Work only to fund your joy
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Full Freedom — arrival treatment */}
                      <div className="relative flex items-start gap-5">
                        <div className="flex flex-col items-center pt-2 z-10">
                          <div className="w-9 h-9 rounded-full bg-sand-500 shadow-lg shadow-sand-300 flex items-center justify-center ring-4 ring-sand-200">
                            <div className="w-2.5 h-2.5 rounded-full bg-sand-50"></div>
                          </div>
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="inline-block px-2.5 py-1 bg-sand-200 text-sand-900 text-xs font-medium rounded-full">
                            8 more years
                          </div>
                          <div className="bg-gradient-to-br from-sand-100 to-sand-50 rounded-xl p-5 border-2 border-sand-300 shadow-md space-y-2">
                            <div className="text-base text-warm-gray-900 font-medium">
                              Full Freedom
                            </div>
                            <div className="text-3xl text-sand-700 font-light tracking-tight">
                              Age 45
                            </div>
                            <div className="pt-2 border-t border-sand-300">
                              <div className="text-sm text-warm-gray-700 leading-relaxed">
                                Work becomes optional
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Clock className="w-8 h-8 text-deep-teal-600" />
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl text-warm-gray-900">
                      Freedom Timeline
                    </h3>
                  </div>
                  <p className="text-xl sm:text-2xl text-warm-gray-900 leading-tight">
                    Two ages that will change how you think
                    about Monday morning.
                  </p>
                </div>
                <div className="text-base sm:text-lg text-warm-gray-700 leading-relaxed space-y-4">
                  <p>
                    Most financial plans give you a number: save
                    $X by age Y. MoneyBeh gives you something
                    more useful — two specific ages. The age
                    when your essentials are fully covered by
                    your savings. And the age when work becomes
                    completely optional.
                  </p>
                  <p>
                    The first milestone — Essentials Covered —
                    is when your investments can pay for your
                    core life, so you only need to work for the
                    things that bring you joy. Full Freedom is
                    when even that becomes optional.
                  </p>
                  <p>
                    No abstract dollar amounts. Just clear
                    milestones measured in time. Adjust your
                    savings and watch them move closer.
                  </p>
                </div>
              </div>
            </div>

            {/* ── Feature 4: Time Banked ── */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="order-last lg:order-first">
                <div className="bg-warm-gray-100 rounded-[2rem] p-6 sm:p-8 shadow-md">
                  <div className="bg-paper rounded-[1.5rem] p-6 sm:p-8 lg:p-10 space-y-8">
                    <div className="flex items-center justify-between pb-6 border-b border-warm-gray-200">
                      <h4 className="text-xl text-warm-gray-900">
                        Time Banked
                      </h4>
                      <div className="text-sm text-warm-gray-500 bg-warm-gray-50 px-3 py-1.5 rounded-full">
                        Right now
                      </div>
                    </div>

                    {/* Reframe first */}
                    <div className="bg-sand-50 rounded-xl p-5 border border-sand-200 space-y-2">
                      <div className="text-base text-warm-gray-900 font-medium text-center">
                        Even if you never save another dollar
                      </div>
                      <div className="text-xs text-warm-gray-600 text-center leading-relaxed">
                        Your current investments will compound
                        to cover 23 years of your plan. That's
                        real progress worth celebrating.
                      </div>
                    </div>

                    {/* The Big Reveal */}
                    <div className="text-center space-y-4 py-2">
                      <div className="text-sm uppercase tracking-wide text-warm-gray-500">
                        Years of freedom already secured
                      </div>
                      <div className="text-6xl sm:text-7xl text-sand-600 font-light tracking-tight">
                        23
                      </div>
                      <div className="text-lg text-warm-gray-700">
                        years already banked
                      </div>
                    </div>

                    {/* Progress Rings */}
                    <div className="space-y-6">
                      <div className="text-xs uppercase tracking-wide text-warm-gray-500 text-center">
                        How it breaks down
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        {/* Bridge Ring */}
                        <div className="space-y-4">
                          <div className="relative flex items-center justify-center">
                            <svg
                              className="w-32 h-32 transform -rotate-90"
                              viewBox="0 0 120 120"
                            >
                              <circle
                                cx="60"
                                cy="60"
                                r="52"
                                fill="none"
                                stroke="#E5E7EB"
                                strokeWidth="10"
                              />
                              <circle
                                cx="60"
                                cy="60"
                                r="52"
                                fill="none"
                                stroke="#4ECDC4"
                                strokeWidth="10"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 52 * 0.63} ${2 * Math.PI * 52}`}
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-3xl font-light text-seafoam-700">
                                63%
                              </div>
                            </div>
                          </div>
                          <div className="text-center space-y-2">
                            <div className="text-sm text-warm-gray-900 font-medium">
                              Bridge
                            </div>
                            <div className="text-xs text-warm-gray-600">
                              9.2 / 14.5 years
                            </div>
                            <div className="text-xs text-warm-gray-500 leading-relaxed pt-2 border-t border-warm-gray-200">
                              Freedom to retirement age
                            </div>
                          </div>
                        </div>

                        {/* Retirement Ring */}
                        <div className="space-y-4">
                          <div className="relative flex items-center justify-center">
                            <svg
                              className="w-32 h-32 transform -rotate-90"
                              viewBox="0 0 120 120"
                            >
                              <circle
                                cx="60"
                                cy="60"
                                r="52"
                                fill="none"
                                stroke="#E5E7EB"
                                strokeWidth="10"
                              />
                              <circle
                                cx="60"
                                cy="60"
                                r="52"
                                fill="none"
                                stroke="#2C7A7B"
                                strokeWidth="10"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 52 * 0.45} ${2 * Math.PI * 52}`}
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-3xl font-light text-deep-teal-700">
                                45%
                              </div>
                            </div>
                          </div>
                          <div className="text-center space-y-2">
                            <div className="text-sm text-warm-gray-900 font-medium">
                              Retirement
                            </div>
                            <div className="text-xs text-warm-gray-600">
                              13.8 / 30.5 years
                            </div>
                            <div className="text-xs text-warm-gray-500 leading-relaxed pt-2 border-t border-warm-gray-200">
                              Retirement age onward
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-warm-gray-200">
                      <p className="text-sm text-warm-gray-600 text-center leading-relaxed">
                        Keep saving and watch these rings fill
                        up. Every contribution adds more
                        freedom.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-sand-600" />
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl text-warm-gray-900">
                      Time Banked
                    </h3>
                  </div>
                  <p className="text-xl sm:text-2xl text-warm-gray-900 leading-tight">
                    You've already banked more freedom than you
                    realize.
                  </p>
                </div>
                <div className="text-base sm:text-lg text-warm-gray-700 leading-relaxed space-y-4">
                  <p>
                    Your current savings will compound to cover
                    real years of your life — even if you never
                    save again.
                  </p>
                  <p>
                    We show you exactly how many years you've
                    secured in each phase: the Bridge — from
                    when work becomes optional until traditional
                    retirement accounts unlock — and Retirement,
                    everything after.
                  </p>
                  <p>
                    This is your progress made visible. Not in
                    dollars. In years of freedom already yours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Find Your Path ───────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6" style={{ backgroundColor: "var(--warm-gray-50)" }}>
        <div className="max-w-5xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          <div className="text-center" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <p className="text-xs uppercase tracking-widest" style={{ color: "var(--warm-gray-400)" }}>
              Find your path
            </p>
            <h2 className="text-3xl sm:text-4xl" style={{ color: "var(--ink)" }}>
              Every situation is different.
            </h2>
            <p className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed" style={{ color: "var(--warm-gray-600)" }}>
              Here's the version of MoneyBeh built for yours.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                badge: "The Foundation",
                hook: "You're sitting on a superpower you can't see yet.",
                desc: "Bank Time while you're young. The Multiplier Effect changes everything.",
                path: "/for/early-career",
                accent: "var(--seafoam-600)",
                bg: "var(--seafoam-50)",
                border: "1px solid var(--seafoam-200)",
                featured: false,
              },
              {
                badge: "The Trap",
                hook: "Six figures. Still checking before dinner.",
                desc: "Lifestyle Drift has a name. The Joy Fund gives you permission to stop checking.",
                path: "/for/high-earners",
                accent: "var(--deep-teal-600)",
                bg: "var(--deep-teal-50)",
                border: "1px solid var(--deep-teal-200)",
                featured: false,
              },
              {
                badge: "The Upgrade",
                hook: "Twelve tabs. Three broken formulas. Still 40 minutes every Sunday.",
                desc: "You already believe in the math. MoneyBeh handles the maintenance.",
                path: "/for/spreadsheet",
                accent: "var(--seafoam-700)",
                bg: "var(--seafoam-50)",
                border: "2px solid var(--seafoam-300)",
                featured: true,
              },
              {
                badge: "The Momentum Window",
                hook: "Your income just jumped. This window won't stay open long.",
                desc: "Capture the gap between old lifestyle and new income before drift assigns it a job.",
                path: "/for/accelerator",
                accent: "var(--seafoam-600)",
                bg: "var(--seafoam-50)",
                border: "1px solid var(--seafoam-200)",
                featured: false,
              },
              {
                badge: "The Catch-Up",
                hook: "You're not behind. You're on a different path.",
                desc: "Condensed Pathing optimizes for velocity. 20 years is still 20 years of compounding.",
                path: "/for/late-boomers",
                accent: "var(--deep-teal-600)",
                bg: "var(--deep-teal-50)",
                border: "1px solid var(--deep-teal-200)",
                featured: false,
              },
              {
                badge: "The Legacy",
                hook: "You've already built it. You just can't see permission yet.",
                desc: "The Two-Stage model proves your money outlives your needs. Mathematically.",
                path: "/for/high-wealth",
                accent: "var(--warm-gray-600)",
                bg: "var(--warm-gray-100)",
                border: "1px solid var(--warm-gray-300)",
                featured: false,
              },
            ].map((item, i) => (
              <RouterLink key={i} to={item.path} style={{ textDecoration: "none" }}>
                <div
                  className="rounded-[1.5rem] p-5 h-full transition-all duration-200"
                  style={{
                    backgroundColor: item.bg,
                    border: item.border,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.625rem",
                    boxShadow: item.featured ? "0 2px 12px 0 rgba(0,0,0,0.07)" : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: item.accent, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {item.badge}
                    </span>
                    {item.featured && (
                      <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "var(--seafoam-700)", backgroundColor: "var(--seafoam-100)", padding: "0.1875rem 0.5rem", borderRadius: "9999px" }}>
                        Most popular
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--ink)", lineHeight: 1.4 }}>{item.hook}</p>
                  <p style={{ fontSize: "0.8125rem", color: "var(--warm-gray-600)", lineHeight: 1.6, flex: 1 }}>{item.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginTop: "0.25rem" }}>
                    <span style={{ fontSize: "0.8125rem", color: item.accent, fontWeight: 500 }}>See my path →</span>
                  </div>
                </div>
              </RouterLink>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Quick Links ──────────────────────────────────────── */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
          <p className="text-xs uppercase tracking-widest text-warm-gray-400 text-center">
            Go deeper
          </p>
          <div className="grid gap-4 sm:gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <RouterLink to="/articles" className="group block h-full">
              <div className="bg-paper border border-warm-gray-200 rounded-[1.5rem] p-6 sm:p-8 hover:border-seafoam-500 active:border-seafoam-600 transition-all duration-300 ease-out h-full flex flex-col">
                <div className="w-12 h-12 bg-seafoam-50 rounded-lg flex items-center justify-center mb-4 flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-seafoam-600" />
                </div>
                <h3 className="text-xl sm:text-2xl text-warm-gray-900 mb-2 sm:mb-3">
                  Articles
                </h3>
                <p className="text-warm-gray-700 text-sm sm:text-base leading-relaxed">
                  Learn the MoneyBeh roadmap through clear,
                  jargon-free guides
                </p>
              </div>
            </RouterLink>

            <RouterLink to="/podcast" className="group block h-full">
              <div className="bg-paper border border-warm-gray-200 rounded-[1.5rem] p-6 sm:p-8 hover:border-deep-teal-500 active:border-deep-teal-600 transition-all duration-300 ease-out h-full flex flex-col">
                <div className="w-12 h-12 bg-deep-teal-50 rounded-lg flex items-center justify-center mb-4 flex-shrink-0">
                  <Mic className="w-6 h-6 text-deep-teal-600" />
                </div>
                <h3 className="text-xl sm:text-2xl text-warm-gray-900 mb-2 sm:mb-3">
                  Podcast
                </h3>
                <p className="text-warm-gray-700 text-sm sm:text-base leading-relaxed">
                  Hear from people who found their Freedom
                  Timeline — and what changed when they did
                </p>
              </div>
            </RouterLink>

            <RouterLink to="/about" className="group block h-full sm:col-span-2 lg:col-span-1">
              <div className="bg-paper border border-warm-gray-200 rounded-[1.5rem] p-6 sm:p-8 hover:border-sand-500 active:border-sand-600 transition-all duration-300 ease-out h-full flex flex-col">
                <div className="w-12 h-12 bg-sand-50 rounded-lg flex items-center justify-center mb-4 flex-shrink-0">
                  <Users className="w-6 h-6 text-sand-500" />
                </div>
                <h3 className="text-xl sm:text-2xl text-warm-gray-900 mb-2 sm:mb-3">
                  Our Story
                </h3>
                <p className="text-warm-gray-700 text-sm sm:text-base leading-relaxed">
                  Why we built MoneyBeh — and what we believe
                  about money and freedom
                </p>
              </div>
            </RouterLink>
          </div>
        </div>
      </section>

      {/* ─── Outcome ──────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 bg-gradient-to-b from-sand-50/60 to-paper">
        <div className="max-w-3xl mx-auto text-center space-y-8 sm:space-y-10">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-warm-gray-900">
              Clear decisions. Less stress. More freedom.
            </h2>
            <p className="text-base sm:text-lg text-warm-gray-700 max-w-2xl mx-auto leading-relaxed">
              You don't have to earn the right to enjoy your
              life. You don't have to wait until retirement to
              feel free. You just need to see the path clearly —
              and take one intentional step at a time. That's
              what MoneyBeh is for. Not to judge your choices.
              Not to optimize you into a spreadsheet. To show
              you that the freedom you want is closer than you
              think, and that you've already started building
              it.
            </p>
            <p className="text-base sm:text-lg text-warm-gray-500 leading-relaxed">
              Join people who decided their money should fund
              their life — not the other way around.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 pt-2">
            <RouterLink
              to="/start"
              className="inline-block bg-seafoam-500 hover:bg-seafoam-600 active:bg-seafoam-700 text-paper px-10 py-4 rounded-[1.5rem] transition-all duration-300 ease-out text-base sm:text-lg shadow-md shadow-seafoam-200 w-full sm:w-auto text-center"
            >
              Find your starting point
            </RouterLink>
            <RouterLink
              to="/podcast"
              className="text-warm-gray-500 hover:text-warm-gray-700 transition-colors duration-200 text-sm"
            >
              Or start with the podcast →
            </RouterLink>
          </div>
        </div>
      </section>
    </div>
  );
}