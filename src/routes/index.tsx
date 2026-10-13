import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { gkQuestions, scoreQuiz } from "@/data/gk-questions";
import { articles, categories, lastUpdated } from "@/data/current-affairs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sajaya — Daily GK Quiz & Current Affairs" },
      { name: "description", content: "Sajaya's free daily GK practice quiz and verified current affairs for Indian students." },
      { property: "og:title", content: "Sajaya — Daily GK & Current Affairs" },
      { property: "og:description", content: "Sajaya's free daily GK practice quiz and verified current affairs for Indian students." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <section className="bg-hero text-primary-foreground">
        <div className="mx-auto max-w-3xl px-4 py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-80">Sajaya</p>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Daily GK & Current Affairs</h1>
          <nav className="mt-6 flex gap-3 text-sm">
            <a href="#quiz" className="rounded-full bg-primary-foreground/15 px-4 py-2">GK Quiz</a>
            <a href="#news" className="rounded-full bg-primary-foreground/15 px-4 py-2">Current Affairs</a>
            <Link to="/notes" className="rounded-full bg-primary-foreground px-4 py-2 font-semibold text-primary">Notes Library</Link>
          </nav>
        </div>
      </section>
      <main className="mx-auto max-w-3xl space-y-12 px-4 py-10">
        <Quiz />
        <CurrentAffairs />
      </main>
    </div>
  );
}

function Quiz() {
  const [picks, setPicks] = useState<(number | null)[]>(() => gkQuestions.map(() => null));
  const [submitted, setSubmitted] = useState(false);
  const score = scoreQuiz(gkQuestions, picks);
  const answered = picks.filter((p) => p !== null).length;

  const restart = () => {
    setPicks(gkQuestions.map(() => null));
    setSubmitted(false);
    document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="quiz" className="scroll-mt-4">
      <h2 className="font-display text-2xl font-bold">Daily GK Quiz</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Practice questions only — not official exam questions. 10 questions, 1 mark each.
      </p>

      {submitted && (
        <div className="mt-4 rounded-xl bg-primary p-5 text-primary-foreground" data-testid="score">
          <p className="text-sm opacity-80">Your score</p>
          <p className="font-display text-4xl font-bold">{score} / 10</p>
        </div>
      )}

      <ol className="mt-6 space-y-4">
        {gkQuestions.map((q, i) => (
          <li key={i} className="rounded-xl border bg-card p-4 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent-foreground">{q.topic}</p>
            <p className="mt-1 font-medium">{i + 1}. {q.question}</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {q.options.map((opt, j) => {
                const chosen = picks[i] === j;
                let cls = chosen ? "border-primary bg-secondary" : "hover:bg-muted";
                if (submitted) {
                  if (j === q.answer) cls = "border-2 border-success bg-success/25 font-semibold";
                  else if (chosen) cls = "border-2 border-destructive bg-destructive/20";
                  else cls = "opacity-60";
                }
                return (
                  <button
                    key={j}
                    type="button"
                    disabled={submitted}
                    aria-pressed={chosen}
                    onClick={() => setPicks((p) => p.map((v, k) => (k === i ? j : v)))}
                    className={`min-h-11 rounded-lg border px-3 py-2 text-left text-sm transition ${cls}`}
                  >
                    {String.fromCharCode(65 + j)}. {opt}
                  </button>
                );
              })}
            </div>
            {submitted && (
              <p className="mt-3 rounded-lg bg-muted p-3 text-sm">
                <strong>{picks[i] === q.answer ? "Correct. " : picks[i] === null ? "Not answered. " : "Incorrect. "}</strong>
                Answer: {q.options[q.answer]}. {q.explanation}
              </p>
            )}
          </li>
        ))}
      </ol>

      <div className="sticky bottom-0 mt-6 flex items-center justify-between gap-3 border-t bg-background/95 py-3 backdrop-blur">
        <span className="text-sm text-muted-foreground">{answered}/10 answered</span>
        {submitted ? (
          <button onClick={restart} className="rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground">Restart quiz</button>
        ) : (
          <button onClick={() => { setSubmitted(true); window.scrollTo({ top: document.getElementById("quiz")!.offsetTop, behavior: "smooth" }); }} className="rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground">Submit quiz</button>
        )}
      </div>
    </section>
  );
}

function CurrentAffairs() {
  return (
    <section id="news" className="scroll-mt-4">
      <h2 className="font-display text-2xl font-bold">Current Affairs</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Last updated: <strong>{lastUpdated || "Not yet updated"}</strong> · Verified items with original sources only.
      </p>
      <div className="mt-6 space-y-6">
        {categories.map((cat) => {
          const list = articles.filter((a) => a.category === cat);
          return (
            <div key={cat}>
              <h3 className="font-display text-lg font-semibold">{cat}</h3>
              {list.length === 0 ? (
                <p className="mt-2 rounded-lg border border-dashed p-4 text-sm text-muted-foreground">Content needs updating</p>
              ) : (
                <ul className="mt-2 space-y-3">
                  {list.map((a, i) => (
                    <li key={i} className="rounded-xl border bg-card p-4 shadow-soft">
                      <p className="text-xs text-muted-foreground">{a.date} · {a.category}</p>
                      <p className="mt-1 font-semibold">{a.headline}</p>
                      <p className="mt-1 text-sm">{a.summary}</p>
                      <a href={a.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-medium text-primary underline">
                        Source: {a.sourceName}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
