import { useState } from "react";
import { ChevronDown, ChevronUp, Mic } from "lucide-react";

interface Episode {
  number: string;
  title: string;
  part: number;
  partLabel: string;
  script: string;
}

const episodes: Episode[] = [
  {
    number: "0",
    title: "Welcome to MoneyBeh: Your FI Roadmap!",
    part: 1,
    partLabel: "The Foundations of Financial Independence",
    script: `Hey everyone, and welcome! You've found the MoneyBeh Podcast, your guide to building financial independence and a life you absolutely love.

Before we dive into our first full episode, I want to set the stage and give you a quick overview of what you can expect.

This podcast is designed to be your complete roadmap to Financial Independence, broken down into clear, achievable steps. Our mission at MoneyBeh is to cut through the jargon, simplify complex concepts, and help you use your money to amplify your joy and build a life of choices — not obligations. We believe financial freedom isn't just for the privileged few; it's an achievable goal for anyone willing to learn and take consistent action.

To make this journey as straightforward as possible, we've structured the podcast into four distinct parts, building your knowledge and skills step by step:

Part One: The Foundations of Financial Independence. In these first episodes, we'll lay down the essential groundwork. We'll explore what FI truly means, how to get a clear picture of your current money situation, tackle debt, build a crucial emergency fund, and understand your overall financial score and superpower.

Part Two: Powering Up Your Journey: Investing & Optimizing. Once your foundation is solid, we'll dive into how to make your money work harder for you. We'll demystify investing, explore the magic of compounding, discuss smart investment strategies, and look at how to protect and grow your wealth through various accounts and against challenges like inflation.

Part Three: Navigating the Journey (Mindset & Challenges). Financial independence isn't just about numbers; it's about behavior. In this section, we'll explore why your feelings about money matter, how to stay motivated for the long haul, navigate market ups and downs, define what "enough" truly means for you, and even touch on teaching the next generation about money.

Part Four: Nearing & Reaching Financial Independence. Finally, we'll look at what it means to approach and actually live in financial independence. We'll cover stress-testing your plan, accessing your money strategically for early FI, and most importantly, how to manage your time and your money to live a truly fulfilling life once you've reached your goals.

Throughout this series, remember: you don't need to know everything right now. Each episode builds on the last, and we'll break down even the most complex ideas into simple, actionable steps. The goal is progress, not perfection.

Your roadmap starts now.`,
  },
  {
    number: "1",
    title: "What is FI, Anyway?",
    part: 1,
    partLabel: "The Foundations of Financial Independence",
    script: `Hey everyone, and welcome to the very first episode of the MoneyBeh Podcast! You've found your guide to building financial independence and a life you absolutely love.

If you've ever felt your money could do more for you, or you're just trying to get ahead and build a life with choices, you're in the right place.

So, let's dive into our first big question: What is FI, Anyway?

You might have heard "FI," or even "FIRE" — Financial Independence, Retire Early. And when you hear that, maybe you picture someone at thirty, sipping a fancy drink on a beach, never checking an email again. Sure, for some, early retirement is part of their FI dream. But that picture? That's just one version.

Our approach is bigger, and frankly, more about having a life you love right now and in the future.

So what does it mean to be financially independent? Simply put: it means you have enough money invested that the income from your investments covers your living expenses.

Let me put it differently: Your investments make enough money to pay for your life.

It's not about a specific fixed amount you have to hit. It's about the relationship between how much money your investments bring in and how much you need to live. When the first number is bigger, you're financially independent.

Okay, but why does this matter? Why would you want this?

This is the best part: FI isn't just about the money itself. It's about what that financial security gives you.

Think about what it means to work because you want to — not because you have to. To say yes to the project that excites you, even if it pays less. To take that trip without guilt. To spend Tuesday afternoon with someone you love. To make decisions from a place of abundance, not anxiety.

That's the life MoneyBeh is built to help you design. And it starts here.`,
  },
];

function EpisodeCard({ ep }: { ep: Episode }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{
        backgroundColor: "var(--paper)",
        borderColor: "var(--warm-gray-200)",
        boxShadow: "0 1px 2px rgba(26,26,27,0.05)",
      }}
    >
      {/* Header */}
      <button
        className="w-full flex items-start gap-4 p-5 text-left transition-colors"
        style={{
          backgroundColor: open ? "var(--warm-gray-50)" : "var(--paper)",
        }}
        onClick={() => setOpen(!open)}
      >
        {/* Episode number */}
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{
            backgroundColor: "var(--seafoam-50)",
            border: "1px solid var(--seafoam-200)",
          }}
        >
          <span
            className="text-xs"
            style={{ color: "var(--seafoam-700)", fontWeight: 700 }}
          >
            {ep.number}
          </span>
        </div>

        {/* Title */}
        <div className="flex-1 min-w-0">
          <p
            className="text-sm mb-0.5"
            style={{ color: "var(--ink)", fontWeight: 600 }}
          >
            {ep.title}
          </p>
          <p
            className="text-xs"
            style={{ color: "var(--warm-gray-400)" }}
          >
            Part {ep.part} — {ep.partLabel}
          </p>
        </div>

        {/* Toggle */}
        <div style={{ color: "var(--warm-gray-400)", flexShrink: 0 }}>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {/* Script */}
      {open && (
        <div
          className="px-5 pb-6 border-t"
          style={{ borderColor: "var(--warm-gray-100)" }}
        >
          <div className="pt-5">
            {ep.script.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="text-sm leading-relaxed mb-4 last:mb-0"
                style={{ color: "var(--warm-gray-700)" }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const parts = [
  { number: 1, label: "The Foundations of Financial Independence" },
  { number: 2, label: "Powering Up Your Journey: Investing & Optimizing" },
  { number: 3, label: "Navigating the Journey (Mindset & Challenges)" },
  { number: 4, label: "Nearing & Reaching Financial Independence" },
];

export function IntranetPodcastScripts() {
  const [activePart, setActivePart] = useState(1);

  const partEpisodes = episodes.filter((ep) => ep.part === activePart);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <div
          className="text-xs tracking-widest uppercase mb-3"
          style={{ color: "var(--warm-gray-400)", fontWeight: 500 }}
        >
          MoneyBeh Internal · Podcast Scripts
        </div>
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{
              backgroundColor: "var(--warm-gray-100)",
              border: "1px solid var(--warm-gray-200)",
            }}
          >
            <Mic size={18} style={{ color: "var(--warm-gray-500)" }} />
          </div>
          <div>
            <h1
              className="text-3xl"
              style={{ color: "var(--ink)", fontWeight: 600, lineHeight: 1.3 }}
            >
              Podcast Scripts
            </h1>
            <p
              className="text-sm mt-1"
              style={{ color: "var(--warm-gray-600)" }}
            >
              The MoneyBeh Podcast — complete series.
            </p>
          </div>
        </div>
      </div>

      {/* Part tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {parts.map((part) => (
          <button
            key={part.number}
            onClick={() => setActivePart(part.number)}
            className="px-4 py-2 rounded-xl text-sm border transition-colors text-left"
            style={{
              backgroundColor:
                activePart === part.number
                  ? "var(--seafoam-500)"
                  : "var(--paper)",
              color:
                activePart === part.number ? "white" : "var(--warm-gray-600)",
              borderColor:
                activePart === part.number
                  ? "var(--seafoam-500)"
                  : "var(--warm-gray-200)",
              fontWeight: activePart === part.number ? 600 : 400,
            }}
          >
            Part {part.number}
          </button>
        ))}
      </div>

      {/* Part title */}
      <div
        className="rounded-xl px-4 py-3 mb-6 border"
        style={{
          backgroundColor: "var(--seafoam-50)",
          borderColor: "var(--seafoam-200)",
        }}
      >
        <p
          className="text-sm"
          style={{ color: "var(--seafoam-700)", fontWeight: 500 }}
        >
          Part {activePart} — {parts[activePart - 1].label}
        </p>
      </div>

      {/* Episodes */}
      <div className="flex flex-col gap-3">
        {partEpisodes.length === 0 ? (
          <div
            className="rounded-2xl p-8 border text-center"
            style={{
              borderColor: "var(--warm-gray-200)",
              borderStyle: "dashed",
            }}
          >
            <p
              className="text-sm"
              style={{ color: "var(--warm-gray-400)" }}
            >
              Scripts for Part {activePart} are not yet written.
            </p>
          </div>
        ) : (
          partEpisodes.map((ep) => <EpisodeCard key={ep.number} ep={ep} />)
        )}
      </div>

      {/* Footer */}
      <div
        className="mt-10 pt-6 border-t"
        style={{ borderColor: "var(--warm-gray-200)" }}
      >
        <p className="text-xs" style={{ color: "var(--warm-gray-400)" }}>
          Source: /src/imports/moneybeh-podcast-scripts.md
        </p>
      </div>
    </div>
  );
}
