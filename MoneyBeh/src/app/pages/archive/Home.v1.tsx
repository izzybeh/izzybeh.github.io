// ARCHIVE — Homepage v1
// Archived before content update on 2026-03-01
// Reason: Full copy refresh per content guide audit
// To restore: copy contents back to /src/app/pages/Home.tsx

import {
  Sparkles,
  Clock,
  Zap,
  Heart,
  TrendingUp,
  BookOpen,
  Mic,
  Users,
  Shield,
} from "lucide-react";
import { useEffect } from "react";
import { Link as RouterLink } from "react-router";
import {
  updateSEO,
  addStructuredData,
  organizationSchema,
  websiteSchema,
  mobileAppSchema,
} from "../../utils/seo";

export function HomeV1() {
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

    // Add structured data for home page
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
      {/* Hero Section - Transformation */}
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
              The only financial tool that shows you when you can work just for joy—and when work is optional.
            </p>
          </div>

          <div className="pt-6 sm:pt-8">
            <button className="bg-seafoam-500 hover:bg-seafoam-600 active:bg-seafoam-700 text-paper px-10 py-4 rounded-[1.5rem] transition-all duration-300 ease-out text-base sm:text-lg">
              See Your Freedom Timeline
            </button>
          </div>
        </div>
      </section>

      {/* Problem Section - Empathy */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-warm-gray-50">
        <div className="max-w-3xl mx-auto space-y-10 sm:space-y-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-warm-gray-900 text-center leading-tight">
            Financial tools are broken
          </h2>
          
          <ul className="space-y-3 list-disc pl-6 sm:pl-8 max-w-xl mx-auto marker:text-warm-gray-400">
            <li className="text-lg sm:text-xl text-warm-gray-700 leading-relaxed">
              Budgeting apps make you feel bad about spending
            </li>
            
            <li className="text-lg sm:text-xl text-warm-gray-700 leading-relaxed">
              Investment apps feel disconnected from daily life
            </li>
            
            <li className="text-lg sm:text-xl text-warm-gray-700 leading-relaxed">
              FIRE calculators are overwhelming spreadsheets
            </li>
            
            <li className="text-lg sm:text-xl text-warm-gray-700 leading-relaxed">
              Red arrows create shame, not clarity
            </li>
          </ul>

          <div className="pt-8 sm:pt-10 max-w-xl mx-auto text-center">
            <p className="text-xl sm:text-2xl lg:text-3xl text-warm-gray-900 leading-relaxed">
              You're not bad with money.<br />
              The tools just weren't built for humans.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section - 2-Step Framework */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-10 sm:space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-warm-gray-900">
              The MoneyBeh way
            </h2>
            <p className="text-lg sm:text-xl text-warm-gray-600 max-w-2xl mx-auto">
              Two steps to freedom
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
                  Build a sustainable life. Focus on what matters. Think in time, not money.
                </p>
              </div>
              
              <ul className="space-y-3 text-sm sm:text-base text-warm-gray-600 leading-relaxed list-disc pl-6 sm:pl-8 marker:text-warm-gray-400">
                <li>Split your money: Essentials + Joy + Savings</li>
                <li>Reduce wasted spending without deprivation</li>
                <li>Create a lifestyle you can afford forever</li>
                <li>Zero-based budget done with calm</li>
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
                  See your clear path. Set it on auto-pilot. Watch compounding work.
                </p>
              </div>
              
              <ul className="space-y-3 text-sm sm:text-base text-warm-gray-600 leading-relaxed list-disc pl-6 sm:pl-8 marker:text-warm-gray-400">
                <li>See when work becomes optional</li>
                <li>Know when you can work just for joy</li>
                <li>Clear monthly savings targets (bridge + retirement)</li>
                <li>Let compounding do the magic</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Insights Section - 4 Features */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-warm-gray-50">
        <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-warm-gray-900">
              Here's what you can't get anywhere else
            </h2>
          </div>

          <div className="space-y-16 sm:space-y-20 lg:space-y-24">
            {/* Feature 1: Fund Your Joy */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="order-last lg:order-last">
                {/* App Mockup - Money Allocation */}
                <div className="bg-warm-gray-100 rounded-[2rem] p-6 sm:p-8 shadow-md">
                  <div className="bg-paper rounded-[1.5rem] p-6 space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-warm-gray-200">
                      <h4 className="text-lg text-warm-gray-900">
                        This Month's Money
                      </h4>
                      <div className="text-xs text-warm-gray-500 bg-warm-gray-50 px-3 py-1.5 rounded-full">
                        $4,200 income
                      </div>
                    </div>

                    {/* The Three Buckets */}
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
                            50% of income
                          </div>
                        </div>
                      </div>

                      {/* Joy */}
                      <div className="bg-gradient-to-br from-sand-50 to-sand-50/30 rounded-xl p-5 border border-sand-200 space-y-3">
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
                          Meals that matter, experiences, learning
                        </div>
                        <div className="pt-2 border-t border-sand-200">
                          <div className="text-xs text-sand-700">
                            30% of income
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
                          Bridge fund + retirement investments
                        </div>
                        <div className="pt-2 border-t border-deep-teal-200">
                          <div className="text-xs text-deep-teal-700">
                            20% of income
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="pt-4 border-t border-warm-gray-200">
                      <div className="bg-warm-gray-50 rounded-lg p-4 text-center space-y-2">
                        <div className="text-sm text-warm-gray-900 font-medium">
                          Every dollar knows its purpose
                        </div>
                        <div className="text-xs text-warm-gray-600 leading-relaxed">
                          Sustainable today. Building freedom for tomorrow.
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
                    Wealth isn't your balance. It's the moments you fund.
                  </p>
                </div>
                <div className="text-base sm:text-lg text-warm-gray-700 leading-relaxed space-y-4">
                  <p>
                    Split your income into three buckets: Essentials, Joy, and Savings. You decide the percentages based on what matters to you.
                  </p>
                  <p>
                    This isn't a restriction—it's permission. Permission to spend on joy without guilt, knowing your essentials are covered and your freedom is building.
                  </p>
                  <p>
                    A sustainable split you can maintain forever. Fund the life you want today while building the freedom you want tomorrow.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2: Reflection Moments */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="order-last lg:order-first">
                {/* App Mockup - Yes/No Reflection Swipe */}
                <div className="bg-warm-gray-100 rounded-[2rem] p-6 sm:p-8 shadow-md">
                  <div className="bg-paper rounded-[1.5rem] p-6 space-y-6">
                    {/* Header */}
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
                      {/* Card Stack Effect - Background Cards */}
                      <div className="absolute inset-0 bg-warm-gray-100 rounded-xl transform translate-y-2 scale-95 opacity-30"></div>
                      <div className="absolute inset-0 bg-warm-gray-100 rounded-xl transform translate-y-1 scale-[0.97] opacity-50"></div>
                      
                      {/* Active Card */}
                      <div className="relative bg-gradient-to-br from-sand-50 to-sand-50/30 rounded-xl p-6 border-2 border-sand-200 shadow-lg space-y-6">
                        {/* Transaction Details */}
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
                          
                          {/* Context Note */}
                          <div className="bg-warm-gray-50 rounded-lg p-4 text-sm text-warm-gray-700 leading-relaxed">
                            "Celebrated Sarah's promotion with the crew. Laughed for hours."
                          </div>
                        </div>

                        {/* The Essential Question */}
                        <div className="pt-4 border-t border-sand-200 space-y-4">
                          <p className="text-center text-base text-warm-gray-900 font-medium">
                            Was this worth it?
                          </p>
                          
                          {/* Swipe Indicators */}
                          <div className="flex items-center justify-center gap-16">
                            <div className="flex flex-col items-center gap-2 opacity-60">
                              <div className="w-16 h-16 rounded-full bg-warm-gray-200 flex items-center justify-center">
                                <svg className="w-8 h-8 text-warm-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </div>
                              <div className="text-xs text-warm-gray-600 font-medium">
                                No
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-center gap-2">
                              <div className="w-16 h-16 rounded-full bg-seafoam-500 shadow-lg shadow-seafoam-200 flex items-center justify-center animate-pulse">
                                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
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

                    {/* After Reflection - Insights */}
                    <div className="pt-6 border-t border-warm-gray-200 space-y-4">
                      <p className="text-xs uppercase tracking-wide text-warm-gray-500 font-medium">
                        After this week's reflection
                      </p>
                      
                      <div className="space-y-3">
                        {/* Definite Yes Category */}
                        <div className="bg-gradient-to-br from-seafoam-50 to-seafoam-50/30 rounded-lg p-4 border border-seafoam-200 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-warm-gray-900 font-medium">
                              Definite Yes
                            </div>
                            <div className="text-sm text-seafoam-700 font-medium">
                              8 of 12
                            </div>
                          </div>
                          <div className="text-xs text-warm-gray-600 leading-relaxed">
                            Deep conversations, family time, learning moments
                          </div>
                        </div>
                        
                        {/* Not Worth It Category */}
                        <div className="bg-warm-gray-100 rounded-lg p-4 border border-warm-gray-300 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-warm-gray-900 font-medium">
                              Not Worth It
                            </div>
                            <div className="text-sm text-warm-gray-600 font-medium">
                              4 of 12
                            </div>
                          </div>
                          <div className="text-xs text-warm-gray-600 leading-relaxed">
                            Rushed takeout, impulse buys, autopilot spending
                          </div>
                        </div>
                      </div>

                      <div className="pt-4">
                        <p className="text-sm text-warm-gray-700 text-center leading-relaxed">
                          No guilt. Just clarity on what brings you joy.
                        </p>
                      </div>
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
                    Clarity without guilt. Learn what truly matters.
                  </p>
                </div>
                <div className="text-base sm:text-lg text-warm-gray-700 leading-relaxed space-y-4">
                  <p>
                    Every week, reflect on your spending with one simple question: "Was this worth it?"
                  </p>
                  <p>
                    If it's not a definite yes, it's a no. This essentialist practice reveals what brings you real joy—and what's just noise.
                  </p>
                  <p>
                    Over time, you'll naturally spend more on definite yeses and less on everything else. No restriction. No shame. Just clarity that shapes your future choices.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3: Freedom Timeline */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="order-last lg:order-last">
                {/* App Mockup */}
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

                    {/* Timeline */}
                    <div className="relative space-y-0 py-2">
                      <div className="absolute left-[15px] top-[28px] h-[26.67%] w-1 bg-gradient-to-b from-warm-gray-400 to-deep-teal-500"></div>
                      <div className="absolute left-[15px] top-[26.67%] h-[20%] w-1 bg-gradient-to-b from-deep-teal-500 to-seafoam-500"></div>
                      <div className="absolute left-[15px] top-[46.67%] bottom-[28px] w-1 bg-gradient-to-b from-seafoam-500 to-sand-500"></div>

                      {/* Current Position */}
                      <div className="relative flex items-start gap-5" style={{ paddingBottom: "3.5rem" }}>
                        <div className="flex flex-col items-center pt-1 z-10">
                          <div className="w-8 h-8 rounded-full bg-warm-gray-900 shadow-lg flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-paper"></div>
                          </div>
                        </div>
                        <div className="flex-1 pt-1">
                          <div className="text-xs uppercase tracking-wide text-warm-gray-500 mb-1">Current</div>
                          <div className="text-lg text-warm-gray-900 font-medium">You are here</div>
                        </div>
                      </div>

                      {/* Coast Mode */}
                      <div className="relative flex items-start gap-5" style={{ paddingBottom: "4rem" }}>
                        <div className="flex flex-col items-center pt-2 z-10">
                          <div className="w-8 h-8 rounded-full bg-deep-teal-600 shadow-lg shadow-deep-teal-200 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-deep-teal-50"></div>
                          </div>
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="inline-block px-2.5 py-1 bg-deep-teal-100 text-deep-teal-800 text-xs font-medium rounded-full">4 years</div>
                          <div className="bg-gradient-to-br from-deep-teal-50 to-deep-teal-50/50 rounded-xl p-5 border border-deep-teal-200/50 shadow-sm space-y-2">
                            <div className="text-base text-warm-gray-900 font-medium">Coast Mode</div>
                            <div className="text-2xl text-deep-teal-700 font-light tracking-tight">Age 34</div>
                            <div className="pt-2 border-t border-deep-teal-200/60">
                              <div className="text-xs text-warm-gray-600 leading-relaxed">Stop saving for retirement. Just fund your life.</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Essentials Covered */}
                      <div className="relative flex items-start gap-5" style={{ paddingBottom: "4rem" }}>
                        <div className="flex flex-col items-center pt-2 z-10">
                          <div className="w-8 h-8 rounded-full bg-seafoam-600 shadow-lg shadow-seafoam-200 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-seafoam-50"></div>
                          </div>
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="inline-block px-2.5 py-1 bg-seafoam-100 text-seafoam-800 text-xs font-medium rounded-full">3 more years</div>
                          <div className="bg-gradient-to-br from-seafoam-50 to-seafoam-50/50 rounded-xl p-5 border border-seafoam-200/50 shadow-sm space-y-2">
                            <div className="text-base text-warm-gray-900 font-medium">Essentials Covered</div>
                            <div className="text-2xl text-seafoam-700 font-light tracking-tight">Age 37</div>
                            <div className="pt-2 border-t border-seafoam-200/60">
                              <div className="text-xs text-warm-gray-600 leading-relaxed">Work only to fund your joy</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Full Freedom */}
                      <div className="relative flex items-start gap-5">
                        <div className="flex flex-col items-center pt-2 z-10">
                          <div className="w-8 h-8 rounded-full bg-sand-500 shadow-lg shadow-sand-300 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-sand-50"></div>
                          </div>
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="inline-block px-2.5 py-1 bg-sand-200 text-sand-900 text-xs font-medium rounded-full">8 more years</div>
                          <div className="bg-gradient-to-br from-sand-100 to-sand-50 rounded-xl p-5 border border-sand-300 shadow-sm space-y-2">
                            <div className="text-base text-warm-gray-900 font-medium">Full Freedom</div>
                            <div className="text-2xl text-sand-700 font-light tracking-tight">Age 45</div>
                            <div className="pt-2 border-t border-sand-300">
                              <div className="text-xs text-warm-gray-600 leading-relaxed">Work becomes optional</div>
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
                    Know when you can work just for joy—and when work is optional.
                  </p>
                </div>
                <div className="text-base sm:text-lg text-warm-gray-700 leading-relaxed space-y-4">
                  <p>
                    Two ages that change everything: When you can work for joy. When work is optional.
                  </p>
                  <p>
                    This clarity makes your plan real and motivating. Adjust your savings rate and watch these milestones transform.
                  </p>
                  <p>
                    No abstract dollar amounts. Just clear targets measured in time.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 4: Time Banked */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="order-last lg:order-first">
                {/* App Mockup - Time Banked */}
                <div className="bg-warm-gray-100 rounded-[2rem] p-6 sm:p-8 shadow-md">
                  <div className="bg-paper rounded-[1.5rem] p-6 sm:p-8 lg:p-10 space-y-8">
                    <div className="flex items-center justify-between pb-6 border-b border-warm-gray-200">
                      <h4 className="text-xl text-warm-gray-900">Time Banked</h4>
                      <div className="text-sm text-warm-gray-500 bg-warm-gray-50 px-3 py-1.5 rounded-full">Right now</div>
                    </div>

                    {/* The Big Reveal */}
                    <div className="text-center space-y-6 py-4">
                      <div className="space-y-3">
                        <div className="text-sm uppercase tracking-wide text-warm-gray-500">
                          Years of freedom already secured
                        </div>
                        <div className="space-y-2">
                          <div className="text-6xl sm:text-7xl text-sand-600 font-light tracking-tight">23</div>
                          <div className="text-lg text-warm-gray-700">years already banked</div>
                        </div>
                      </div>
                    </div>

                    {/* Progress Rings */}
                    <div className="space-y-6">
                      <div className="text-xs uppercase tracking-wide text-warm-gray-500 text-center">How it breaks down</div>
                      <div className="grid grid-cols-2 gap-6">
                        {/* Bridge Ring */}
                        <div className="space-y-4">
                          <div className="relative flex items-center justify-center">
                            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                              <circle cx="60" cy="60" r="52" fill="none" stroke="#E5E7EB" strokeWidth="10" />
                              <circle cx="60" cy="60" r="52" fill="none" stroke="#4ECDC4" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 52 * 0.63} ${2 * Math.PI * 52}`} />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-3xl font-light text-seafoam-700">63%</div>
                              </div>
                            </div>
                          </div>
                          <div className="text-center space-y-2">
                            <div className="text-sm text-warm-gray-900 font-medium">Bridge</div>
                            <div className="text-xs text-warm-gray-600">9.2 / 14.5 years</div>
                            <div className="text-xs text-warm-gray-600 leading-relaxed pt-2 border-t border-warm-gray-200">Age 45 until 59.5</div>
                          </div>
                        </div>

                        {/* Retirement Ring */}
                        <div className="space-y-4">
                          <div className="relative flex items-center justify-center">
                            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                              <circle cx="60" cy="60" r="52" fill="none" stroke="#E5E7EB" strokeWidth="10" />
                              <circle cx="60" cy="60" r="52" fill="none" stroke="#2C7A7B" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 52 * 0.45} ${2 * Math.PI * 52}`} />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-3xl font-light text-deep-teal-700">45%</div>
                              </div>
                            </div>
                          </div>
                          <div className="text-center space-y-2">
                            <div className="text-sm text-warm-gray-900 font-medium">Retirement</div>
                            <div className="text-xs text-warm-gray-600">13.8 / 30.5 years</div>
                            <div className="text-xs text-warm-gray-600 leading-relaxed pt-2 border-t border-warm-gray-200">Age 59.5 until 90</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* What This Means */}
                    <div className="bg-sand-50 rounded-xl p-5 border border-sand-200">
                      <div className="space-y-3">
                        <div className="text-sm font-medium text-warm-gray-900 text-center">
                          Even if you never save another dollar
                        </div>
                        <div className="text-xs text-warm-gray-600 text-center leading-relaxed">
                          Your current investments will compound to cover 23 years of your plan. That's real progress worth celebrating.
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-warm-gray-200">
                      <p className="text-sm text-warm-gray-600 text-center leading-relaxed">
                        Keep saving and watch these rings fill up. Every contribution adds more freedom.
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
                    See how many years of freedom you've already secured.
                  </p>
                </div>
                <div className="text-base sm:text-lg text-warm-gray-700 leading-relaxed space-y-4">
                  <p>
                    Your current savings will compound to cover specific years of your life—even if you never save again.
                  </p>
                  <p>
                    We show you exactly how many years you've banked in each phase: the bridge to retirement and retirement itself.
                  </p>
                  <p>
                    This is your safety net made visible. Progress measured in time, not dollars.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outcome Section - CTA */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-10">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-warm-gray-900">
              Clear decisions. Less stress. More freedom.
            </h2>
            <p className="text-lg sm:text-xl text-warm-gray-600 max-w-2xl mx-auto leading-relaxed">
              Join thousands choosing freedom over anxiety
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button className="bg-seafoam-500 hover:bg-seafoam-600 active:bg-seafoam-700 text-paper px-10 py-4 rounded-[1.5rem] transition-all duration-300 ease-out text-base sm:text-lg w-full sm:w-auto">
              Download the App
            </button>
            <RouterLink to="/podcast" className="w-full sm:w-auto">
              <button className="bg-paper hover:bg-warm-gray-50 active:bg-warm-gray-100 border-2 border-warm-gray-300 text-warm-gray-900 px-10 py-4 rounded-[1.5rem] transition-all duration-300 ease-out text-base sm:text-lg w-full">
                Explore the Podcast
              </button>
            </RouterLink>
          </div>
        </div>
      </section>

      {/* Quick Links - Mobile First */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-warm-gray-50">
        <div className="max-w-5xl mx-auto">
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
                  Learn the roadmap to financial wellness
                  through clear, jargon-free articles
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
                  Listen to stories and insights on building
                  sustainable financial freedom
                </p>
              </div>
            </RouterLink>

            <RouterLink to="/about" className="group block h-full sm:col-span-2 lg:col-span-1">
              <div className="bg-paper border border-warm-gray-200 rounded-[1.5rem] p-6 sm:p-8 hover:border-sand-500 active:border-sand-600 transition-all duration-300 ease-out h-full flex flex-col">
                <div className="w-12 h-12 bg-sand-50 rounded-lg flex items-center justify-center mb-4 flex-shrink-0">
                  <Users className="w-6 h-6 text-sand-500" />
                </div>
                <h3 className="text-xl sm:text-2xl text-warm-gray-900 mb-2 sm:mb-3">
                  About Us
                </h3>
                <p className="text-warm-gray-700 text-sm sm:text-base leading-relaxed">
                  Discover our founding story and why we're
                  building MoneyBeh
                </p>
              </div>
            </RouterLink>
          </div>
        </div>
      </section>
    </div>
  );
}
