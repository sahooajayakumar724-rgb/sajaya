import { useMemo, useState } from "react";
import { filterHome, getPage, homeCategories, homeQuestions, pageCount, PAGE_SIZE, scorePage, type HomeCategory } from "@/data/home-gk";

export function HomeGkQuiz() {
  const [category, setCategory] = useState<HomeCategory | "All">("All");
  const [page, setPage] = useState(0);
  const [picks, setPicks] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});

  const list = useMemo(() => filterHome(homeQuestions, category), [category]);
  const pages = pageCount(list.length);
  const qs = getPage(list, page);
  const done = !!submitted[page];
  const start = page * PAGE_SIZE + 1;
  const end = page * PAGE_SIZE + qs.length;
  const answered = qs.filter((q) => picks[q.id] !== undefined).length;
  const score = scorePage(qs, picks);

  const go = (p: number) => {
    setPage(Math.max(0, Math.min(pages - 1, p)));
    document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" });
  };
  const pickCategory = (c: HomeCategory | "All") => { setCategory(c); setPage(0); setSubmitted({}); };
  const retry = () => {
    setPicks((p) => { const n = { ...p }; qs.forEach((q) => delete n[q.id]); return n; });
    setSubmitted((s) => ({ ...s, [page]: false }));
  };

  const nums = Array.from(new Set([0, page - 2, page - 1, page, page + 1, page + 2, pages - 1]))
    .filter((n) => n >= 0 && n < pages).sort((a, b) => a - b);

  return (
    <section id="quiz" className="scroll-mt-4">
      <h2 className="font-display text-2xl font-bold">GK Questions & Answers</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Practice questions only — not official exam questions. {homeQuestions.length} questions, 10 per page.
      </p>

      <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {(["All", ...homeCategories] as const).map((c) => (
          <button key={c} onClick={() => pickCategory(c)}
            className={`shrink-0 rounded-full border px-3 py-2 text-sm ${category === c ? "border-primary bg-primary text-primary-foreground" : "bg-card"}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <p className="text-sm font-semibold" data-testid="progress">Questions {start}–{end} of {list.length}</p>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-primary transition-all" style={{ width: `${(end / list.length) * 100}%` }} />
        </div>
      </div>

      {done && (
        <div className="mt-4 rounded-xl bg-primary p-5 text-primary-foreground" data-testid="score">
          <p className="text-sm opacity-80">Your score for this page</p>
          <p className="font-display text-4xl font-bold">{score} / {qs.length}</p>
          <p className="mt-1 text-sm opacity-90">Review the correct answers and explanations below.</p>
        </div>
      )}

      <ol className="mt-4 space-y-4">
        {qs.map((q, i) => {
          const pick = picks[q.id];
          return (
            <li key={q.id} className="rounded-xl border bg-card p-4 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent-foreground">{q.category}</p>
              <p className="mt-1 font-medium">{start + i}. {q.question}</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {q.options.map((opt, j) => {
                  let cls = pick === j ? "border-primary bg-secondary" : "";
                  if (done) {
                    if (j === q.answer) cls = "border-2 border-success bg-success/25 font-semibold";
                    else if (pick === j) cls = "border-2 border-destructive bg-destructive/20";
                    else cls = "opacity-60";
                  }
                  return (
                    <button key={j} type="button" disabled={done} aria-pressed={pick === j}
                      onClick={() => setPicks((p) => ({ ...p, [q.id]: j }))}
                      className={`min-h-11 rounded-lg border px-3 py-2 text-left text-sm transition ${cls}`}>
                      {String.fromCharCode(65 + j)}. {opt}
                    </button>
                  );
                })}
              </div>
              {done && (
                <p className="mt-3 rounded-lg bg-muted p-3 text-sm">
                  <strong>{pick === q.answer ? "Correct. " : pick === undefined ? "Not answered. " : "Incorrect. "}</strong>
                  Answer: {String.fromCharCode(65 + q.answer)}. {q.options[q.answer]}. {q.explanation}
                </p>
              )}
            </li>
          );
        })}
      </ol>

      <div className="sticky bottom-0 mt-6 space-y-3 border-t bg-background/95 py-3 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-muted-foreground">{answered}/{qs.length} answered</span>
          {done ? (
            page < pages - 1 ? (
              <button onClick={() => go(page + 1)} className="rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground">Next 10 Questions</button>
            ) : (
              <button onClick={retry} className="rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground">Try this page again</button>
            )
          ) : (
            <button onClick={() => { setSubmitted((s) => ({ ...s, [page]: true })); document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" }); }}
              className="rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground">Submit Answers</button>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button disabled={page === 0} onClick={() => go(page - 1)} className="min-h-10 rounded-lg border bg-card px-3 text-sm disabled:opacity-40">← Previous</button>
          <div className="flex flex-1 justify-center gap-1 overflow-x-auto">
            {nums.map((n, k) => (
              <span key={n} className="flex items-center gap-1">
                {k > 0 && n - nums[k - 1]! > 1 && <span className="text-muted-foreground">…</span>}
                <button onClick={() => go(n)} aria-current={n === page ? "page" : undefined}
                  className={`min-h-10 min-w-9 rounded-lg border text-sm ${n === page ? "border-primary bg-primary text-primary-foreground" : "bg-card"}`}>{n + 1}</button>
              </span>
            ))}
          </div>
          <button disabled={page >= pages - 1} onClick={() => go(page + 1)} className="min-h-10 rounded-lg border bg-card px-3 text-sm disabled:opacity-40">Next →</button>
        </div>
      </div>
    </section>
  );
}
