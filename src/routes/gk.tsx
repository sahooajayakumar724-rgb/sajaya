import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { bankCategories, dailySet, filterBank, gkBank, scoreBank, type BankCategory, type BankQuestion } from "@/data/gk-bank";
import { articles, lastUpdated } from "@/data/current-affairs";

export const Route = createFileRoute("/gk")({
  head: () => ({
    meta: [
      { title: "GK Question Bank — 500 Practice MCQs | S.ajaya" },
      { name: "description", content: "500 GK practice MCQs in 12 categories with answers, explanations, quiz scoring and a daily set — on S.ajaya." },
      { property: "og:title", content: "GK Question Bank — 500 Practice MCQs | S.ajaya" },
      { property: "og:description", content: "Practice GK MCQs by category with search, scoring and explanations on S.ajaya." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GkPage,
});

function GkPage() {
  const [mode, setMode] = useState<"bank" | "daily">("bank");
  const [category, setCategory] = useState<BankCategory | "All">("All");
  const [search, setSearch] = useState("");
  const [today, setToday] = useState("");
  useEffect(() => setToday(new Date().toISOString().slice(0, 10)), []);

  const list = useMemo<BankQuestion[]>(
    () => (mode === "daily" ? (today ? dailySet(today) : []) : filterBank(gkBank, category, search)),
    [mode, category, search, today],
  );

  return (
    <div className="min-h-screen">
      <section className="bg-hero text-primary-foreground">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <h1 className="font-display text-3xl font-bold">GK Question Bank</h1>
          <p className="mt-2 text-sm opacity-90">{gkBank.length} practice MCQs in 12 categories · Not official exam questions</p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <button onClick={() => setMode("bank")} className={`rounded-full px-4 py-2 ${mode === "bank" ? "bg-primary-foreground font-semibold text-primary" : "bg-primary-foreground/15"}`}>All questions</button>
            <button onClick={() => setMode("daily")} className={`rounded-full px-4 py-2 ${mode === "daily" ? "bg-primary-foreground font-semibold text-primary" : "bg-primary-foreground/15"}`}>Daily GK (10)</button>
            <a href="#current-affairs" className="rounded-full bg-primary-foreground/15 px-4 py-2">Current Affairs</a>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-3xl space-y-10 px-4 py-6">
        {mode === "bank" ? (
          <div className="space-y-3">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions, e.g. Constitution, Nobel…"
              className="min-h-11 w-full rounded-lg border bg-card px-3 text-base"
              aria-label="Search questions"
            />
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
              {(["All", ...bankCategories] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`shrink-0 rounded-full border px-3 py-2 text-sm ${category === c ? "border-primary bg-primary text-primary-foreground" : "bg-card"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <p className="rounded-lg bg-secondary p-3 text-sm">
            Daily GK for <strong>{today || "…"}</strong>: 10 questions picked automatically from the bank each day. The questions are from the same bank — they are not newly written every day.
          </p>
        )}

        <QuizRunner key={`${mode}|${category}|${search}|${today}`} list={list} />
        <CurrentAffairsBox />
      </main>
    </div>
  );
}

function QuizRunner({ list }: { list: BankQuestion[] }) {
  const [idx, setIdx] = useState(0);
  const [picks, setPicks] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  if (list.length === 0) return <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">No questions match. Try another search or category.</p>;

  const q = list[Math.min(idx, list.length - 1)]!;
  const answered = list.filter((x) => picks[x.id] !== undefined).length;
  const score = scoreBank(list, picks);
  const pick = picks[q.id];

  return (
    <section aria-label="Quiz">
      {submitted && (
        <div className="mb-4 rounded-xl bg-primary p-5 text-primary-foreground" data-testid="bank-score">
          <p className="text-sm opacity-80">Your score</p>
          <p className="font-display text-4xl font-bold">{score} / {list.length}</p>
          <p className="mt-1 text-sm opacity-90">{answered} answered. Use Previous / Next to review the correct answers.</p>
        </div>
      )}

      <div className="rounded-xl border bg-card p-4 shadow-soft">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold uppercase tracking-wide text-accent-foreground">{q.category}</span>
          <span className="text-muted-foreground">Question {idx + 1} of {list.length}</span>
        </div>
        <p className="mt-2 text-base font-medium">{q.question}</p>
        <div className="mt-3 grid gap-2">
          {q.options.map((opt, j) => {
            let cls = pick === j ? "border-primary bg-secondary" : "";
            if (submitted) {
              if (j === q.answer) cls = "border-2 border-success bg-success/25 font-semibold";
              else if (pick === j) cls = "border-2 border-destructive bg-destructive/20";
              else cls = "opacity-60";
            }
            return (
              <button
                key={j}
                type="button"
                disabled={submitted}
                aria-pressed={pick === j}
                onClick={() => setPicks((p) => ({ ...p, [q.id]: j }))}
                className={`min-h-12 rounded-lg border px-3 py-2 text-left text-sm transition ${cls}`}
              >
                {String.fromCharCode(65 + j)}. {opt}
              </button>
            );
          })}
        </div>
        {submitted && (
          <p className="mt-3 rounded-lg bg-muted p-3 text-sm">
            <strong>{pick === q.answer ? "Correct. " : pick === undefined ? "Not answered. " : "Incorrect. "}</strong>
            Answer: {String.fromCharCode(65 + q.answer)}. {q.options[q.answer]}. {q.explanation}
          </p>
        )}
      </div>

      <div className="sticky bottom-0 mt-4 space-y-2 border-t bg-background/95 py-3 backdrop-blur">
        <div className="flex gap-2">
          <button disabled={idx === 0} onClick={() => setIdx(idx - 1)} className="min-h-11 flex-1 rounded-lg border bg-card font-medium disabled:opacity-40">← Previous</button>
          <button disabled={idx >= list.length - 1} onClick={() => setIdx(idx + 1)} className="min-h-11 flex-1 rounded-lg border bg-card font-medium disabled:opacity-40">Next →</button>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-muted-foreground">{answered}/{list.length} answered</span>
          {submitted ? (
            <button onClick={() => { setPicks({}); setSubmitted(false); setIdx(0); }} className="rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground">Restart quiz</button>
          ) : (
            <button onClick={() => setSubmitted(true)} className="rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground">Submit quiz</button>
          )}
        </div>
      </div>
    </section>
  );
}

function CurrentAffairsBox() {
  const latest = [...articles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
  return (
    <section id="current-affairs" className="scroll-mt-4">
      <h2 className="font-display text-2xl font-bold">Current Affairs</h2>
      <p className="mt-1 text-sm text-muted-foreground">Last updated: <strong>{lastUpdated || "Not yet updated"}</strong> · Verified items with sources only.</p>
      {latest.length === 0 ? (
        <p className="mt-3 rounded-lg border border-dashed p-4 text-sm text-muted-foreground">Content needs updating. No news has been added yet.</p>
      ) : (
        <ul className="mt-3 space-y-3">
          {latest.map((a, i) => (
            <li key={i} className="rounded-xl border bg-card p-4 shadow-soft">
              <p className="text-xs text-muted-foreground">{a.date} · {a.category}</p>
              <p className="mt-1 font-semibold">{a.headline}</p>
              <a href={a.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-sm text-primary underline">Source: {a.sourceName}</a>
            </li>
          ))}
        </ul>
      )}
      <Link to="/" hash="news" className="mt-3 inline-block text-sm font-medium text-primary underline">See all current affairs by category</Link>
    </section>
  );
}
