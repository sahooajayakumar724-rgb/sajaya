import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { chapters, type Mcq } from "@/data/notes";
import { useBookmarks } from "@/hooks/use-bookmarks";

export const Route = createFileRoute("/notes/$chapterId")({
  loader: ({ params }) => {
    const c = chapters.find((x) => x.id === params.chapterId);
    if (!c) throw notFound();
    return c;
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.title} — Notes | S.ajaya` : "Notes | S.ajaya";
    const d = loaderData ? `${loaderData.subject} notes: ${loaderData.title}. Explanations, key points and practice MCQs.` : "Study notes";
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }, { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-4 py-10"><p>Chapter not found.</p><Link to="/notes" className="text-primary underline">Back to Notes</Link></main>
  ),
  component: ChapterPage,
});

function ChapterPage() {
  const c = Route.useLoaderData();
  const bm = useBookmarks();
  const H = ({ children }: { children: string }) => <h2 className="mt-8 font-display text-xl font-semibold text-primary">{children}</h2>;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 leading-relaxed">
      <Link to="/notes" className="text-sm text-primary underline">← Notes Library</Link>
      <p className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">{c.exam} · {c.subject} · {c.topic}</p>
      <h1 className="mt-1 font-display text-3xl font-bold">{c.title}</h1>
      <div className="mt-3 flex flex-wrap gap-2">
        <button onClick={() => bm.toggle(c.id)} className="min-h-11 rounded-lg border px-4 text-sm font-medium">{bm.has(c.id) ? "★ Saved" : "☆ Save note"}</button>
        {c.pdfUrl && <a href={c.pdfUrl} download className="inline-flex min-h-11 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground">Download PDF</a>}
      </div>
      {c.extraPractice && <p className="mt-4 rounded-lg bg-accent p-3 text-sm text-accent-foreground">Extra practice topic — not part of the official syllabus.</p>}

      {c.status === "needs-content" ? (
        <p className="mt-8 rounded-xl border border-dashed p-6 text-center text-muted-foreground">This chapter needs more content. Notes are coming soon.</p>
      ) : (
        <>
          {c.explanation && <><H>Simple explanation</H>{c.explanation.map((p, i) => <p key={i} className="mt-3">{p}</p>)}</>}
          {c.definitions && <><H>Important definitions</H><dl className="mt-3 space-y-2">{c.definitions.map((d) => <div key={d.term} className="rounded-lg bg-secondary p-3"><dt className="font-semibold">{d.term}</dt><dd className="text-sm">{d.meaning}</dd></div>)}</dl></>}
          {c.examples && <><H>Examples</H><ul className="mt-3 list-disc space-y-1 pl-5">{c.examples.map((e) => <li key={e}>{e}</li>)}</ul></>}
          {c.keyPoints && <><H>Key points for revision</H><ul className="mt-3 list-disc space-y-1 pl-5">{c.keyPoints.map((e) => <li key={e}>{e}</li>)}</ul></>}
          {c.mcqs && <><H>Practice MCQs</H><p className="text-xs text-muted-foreground">Practice questions — not official exam questions.</p>{c.mcqs.map((m, i) => <McqCard key={i} n={i + 1} m={m} />)}</>}
          {c.summary && <><H>Quick revision summary</H><p className="mt-3 rounded-xl bg-primary p-4 text-primary-foreground">{c.summary}</p></>}
        </>
      )}
    </main>
  );
}

function McqCard({ n, m }: { n: number; m: Mcq }) {
  const [pick, setPick] = useState<number | null>(null);
  return (
    <div className="mt-4 rounded-xl border bg-card p-4 shadow-soft">
      <p className="font-medium">{n}. {m.q}</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {m.options.map((o, j) => {
          let cls = "hover:bg-muted";
          if (pick !== null) cls = j === m.answer ? "border-2 border-success bg-success/25 font-semibold" : j === pick ? "border-2 border-destructive bg-destructive/20" : "opacity-60";
          return <button key={j} disabled={pick !== null} onClick={() => setPick(j)} className={`min-h-11 rounded-lg border px-3 py-2 text-left text-sm ${cls}`}>{String.fromCharCode(65 + j)}. {o}</button>;
        })}
      </div>
      {pick !== null && (
        <p className="mt-3 rounded-lg bg-muted p-3 text-sm"><strong>{pick === m.answer ? "Correct. " : "Incorrect. "}</strong>Answer: {m.options[m.answer]}. {m.explanation}
          <button onClick={() => setPick(null)} className="ml-2 text-primary underline">Try again</button></p>
      )}
    </div>
  );
}
