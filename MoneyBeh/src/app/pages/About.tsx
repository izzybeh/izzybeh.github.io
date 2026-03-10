import { useEffect } from 'react';
import { Link } from 'react-router';
import { updateSEO, addStructuredData, organizationSchema } from '../utils/seo';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Lightbulb, BookOpen, TrendingUp, Heart, Sparkles, Target } from 'lucide-react';

export function About() {
  useEffect(() => {
    updateSEO({
      title: 'About Us - Our Story & Mission',
      description: 'Discover the MoneyBeh story and why we\'re building financial wellness tools that prioritize calm over flashy, progress over perfection, and clarity over complexity.',
      keywords: 'about moneybeh, financial wellness mission, budgeting app story, personal finance philosophy',
      url: 'https://moneybeh.com/about',
      type: 'website',
    });

    addStructuredData(organizationSchema);
  }, []);

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-sand-50">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight">
            The Story of MoneyBeh
          </h1>
          <p className="text-xl sm:text-2xl text-warm-gray-700 leading-relaxed max-w-2xl mx-auto">
            The calm came before the money. Here's how that happened — and why it matters for you.
          </p>
        </div>
      </section>

      {/* Section 1: Feeling Less Than */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl text-warm-gray-900 leading-tight">
                Growing up feeling less than
              </h2>
              <div className="space-y-5 sm:space-y-6 text-warm-gray-700 text-base sm:text-lg leading-relaxed">
                <p>
                  My name is Izzy Beh. MoneyBeh is a mix of my family name and the word Behavior — because that's what this is really about.
                </p>
                <p>
                  I grew up in a family that wasn't poor, but didn't have abundance either. Most of my friends' parents had money. I felt it constantly — the gap between what they had and what I came from. I was afraid I'd never be able to provide the way the people around me could. That fear followed me into my career, into my relationships, into every financial decision I made early on.
                </p>
                <p>
                  Money wasn't just a practical problem. It was an identity problem. I felt behind, and I didn't know how to catch up.
                </p>
              </div>
            </div>
            <div className="order-first lg:order-last">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1766808982975-3406ff134f80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjB0aG91Z2h0ZnVsJTIwcmVmbGVjdGlvbiUyMGNhbG0lMjB3aW5kb3clMjBsaWdodHxlbnwxfHx8fDE3NzI1MTE1NDR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Thoughtful reflection"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: The First System */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-warm-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1628704072275-295bd6b9c8e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBwbGFubmluZyUyMGZpbmFuY2VzJTIwdG9nZXRoZXIlMjBob21lfGVufDF8fHx8MTc3MjUxMTU0NXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Couple planning together"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl text-warm-gray-900 leading-tight">
                Building a foundation before the money arrived
              </h2>
              <div className="space-y-5 sm:space-y-6 text-warm-gray-700 text-base sm:text-lg leading-relaxed">
                <p>
                  Early in my career I was earning in the bottom 15th percentile. I discovered Dave Ramsey's zero-based budgeting — the idea that every dollar should have a job before the month begins. It was the first time money felt like something I could actually control.
                </p>
                <p>
                  When my wife and I got married, we made a deliberate decision: save her entire salary and live solely on mine. We weren't flush — but we were deliberate. We pre-paid our annual expenses into separate accounts so there were no surprises. We kept a family spending fund for whatever we wanted, guilt-free.
                </p>
                <p>
                  We had designed a life with margin built in. Not because we earned a lot — but because we were intentional about what we earned.
                </p>
                <p>
                  Day to day, we felt calm. The budget worked. No surprises, no guilt, no month-end panic. But there was a question I couldn't shake: <strong>was any of this actually on track? Was I saving enough? Would retirement actually happen?</strong> That part was a black box. I felt settled in my life — but uncertain about my future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pull Quote */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-deep-teal-600">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-2xl sm:text-3xl lg:text-4xl text-paper leading-relaxed">
            "I had the day-to-day under control. What I couldn't see was whether any of it was actually leading somewhere."
          </p>
          <p className="text-deep-teal-200 text-base sm:text-lg">
            Lifestyle calm and future clarity are two different things. MoneyBeh solves both.
          </p>
        </div>
      </section>

      {/* Section 3: Investing in Himself */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl text-warm-gray-900 leading-tight">
                When the doors closed, I built a new one
              </h2>
              <div className="space-y-5 sm:space-y-6 text-warm-gray-700 text-base sm:text-lg leading-relaxed">
                <p>
                  I was getting strong feedback from my leadership but couldn't get past interviews at other companies. I kept trying. It kept not working. The career I wanted felt out of reach.
                </p>
                <p>
                  So I made a long-term bet on myself: I went back to school and got my MBA. That decision was only possible because our financial foundation was solid enough that I could afford to take a risk on the future instead of scrambling to survive the present.
                </p>
                <p>
                  After graduating, I landed a new role — and for the first time, money was no longer the constraint. But I still didn't have a clear picture of where I was headed. That's when I met with a financial advisor — and he told me something that stopped me cold:
                </p>
                <blockquote className="border-l-4 border-deep-teal-500 pl-4 sm:pl-6 py-2 italic text-lg sm:text-xl text-warm-gray-900">
                  "Izzy, you have money. But you don't have a plan."
                </blockquote>
              </div>
            </div>
            <div className="order-first lg:order-last">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1660128358414-eab8a8772b64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBzdHVkeWluZyUyME1CQSUyMGdyYWR1YXRpb24lMjBib29rc3xlbnwxfHx8fDE3NzI1MTE1NDV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Investing in education and growth"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: The Spreadsheet */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-warm-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1760278041788-8e20a64e3fdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHJlYWRzaGVldCUyMGxhcHRvcCUyMGRlc2slMjBjYWxtJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3MjUxMTU0N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Building a plan on a laptop"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl text-warm-gray-900 leading-tight">
                Clarity is what creates calm
              </h2>
              <div className="space-y-5 sm:space-y-6 text-warm-gray-700 text-base sm:text-lg leading-relaxed">
                <p>
                  I tried financial planning tools, but couldn't tell what assumptions they were making. So I did what made sense to me: I built my own spreadsheet. I could control every variable. I could see different scenarios. For the first time, I could see my financial future clearly — and when I could see it, it stopped being scary.
                </p>
                <p>
                  I came across the Mr. Money Mustache blog, which laid out the core calculations behind financial independence. Combined with the foundation my wife and I had already built — the zero-based budget, the vaults, the lifestyle design — it all clicked into place.
                </p>
                <p>
                  Friends and colleagues started asking for the spreadsheet. They found the same thing I had: when you can see clearly, the anxiety lifts. Not because the numbers are perfect — but because you're no longer guessing.
                </p>
                <p>
                  That spreadsheet became MoneyBeh.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why MoneyBeh Exists */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
          <h2 className="text-3xl sm:text-4xl text-warm-gray-900 leading-tight">
            Why MoneyBeh exists
          </h2>
          <div className="space-y-5 sm:space-y-6 text-warm-gray-700 text-base sm:text-lg leading-relaxed">
            <p>
              Most financial tools solve one half of the problem. Budgeting apps tell you whether today is working. Wealth trackers show you where you stand. But almost none of them connect the two — so you can budget carefully for years and still have no idea whether you're actually on track, or how far you are from having real options.
            </p>
            <p>
              That disconnect is what I lived. Day-to-day: calm. Future: a black box. And I didn't know what I didn't know.
            </p>
            <p>
              MoneyBeh closes that gap. It gives you a clear picture of your life today <em>and</em> where it's headed — so the calm isn't just about this month. It's about the whole thing.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-seafoam-50 border-t border-seafoam-200">
        <div className="max-w-3xl mx-auto text-center space-y-5 sm:space-y-6">
          <h2 className="text-3xl sm:text-4xl text-warm-gray-900 leading-tight">
            See where you stand. See where you're headed.
          </h2>
          <p className="text-lg sm:text-xl text-warm-gray-700 leading-relaxed max-w-xl mx-auto">
            You don't need a higher salary to feel calm about money. You need a clear plan. MoneyBeh is that plan.
          </p>
          <div className="pt-4">
            <Link
              to="/start"
              className="inline-block bg-seafoam-500 hover:bg-seafoam-600 active:bg-seafoam-700 text-paper px-8 py-4 rounded-lg transition-colors w-full sm:w-auto text-base sm:text-lg"
            >
              Find your starting point
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}