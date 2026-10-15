import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { chapters, searchChapters, subjects, syllabusSource } from "@/data/notes";
import { useBookmarks } from "@/hooks/use-bookmarks";

export const Route = createFileRoute("/notes/")({
  head: () => ({
    meta: [
      { title: "Notes Library — S.ajaya" },
      { name: "description", content: "Free chapter-wise notes for NCET ITEP, GK, history, geography, polity, science and English grammar on S.ajaya." },
      { property: "og:title", content: "Notes Library — S.ajaya" },
      { property: "og:description", content: "Free chapter-wise study notes with practice MCQs for NCET ITEP and general studies on S.ajaya." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NotesLibrary,
});

const sel = "min-h-11 w-full rounded-lg border bg-card px-3 text-sm";

function NotesLibrary() {
  const [q, setQ] = useState("");
  const [exam, setExam] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [savedOnly, setSavedOnly] = useState(false);
  const bm = useBookmarks();

  const subjectOpts = subjects.filter((s) => !exam || s.exam === exam).map((s) => s.name);
  const topicOpts = [...new Set(chapters.filter((c) => (!exam || c.exam === exam) && (!subject || c.subject === subject)).map((c) => c.topic))];
  const results = useMemo(() => {
    const r = searchChapters(chapters, q, { exam, subject, topic });
    return savedOnly ? r.filter((c) => bm.ids.includes(c.id)) : r;
  }, [q, exam, subject, topic, savedOnly, bm.ids]);
  const filtering = q || exam || subject || topic || savedOnly;
  const done = chapters.filter((c) => c.status === "complete").length;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="font-display text-3xl font-bold">Notes Library</h1>
      <p className="mt-1 text-sm text-muted-foreground">{done} of {chapters.length} chapters complete. More are being added.</p>

      <div className="mt-6 space-y-3 rounded-xl border bg-card p-4 shadow-soft">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by title, subject, chapter or keyword…" aria-label="Search notes" className={sel} />
        <div className="grid gap-3 sm:grid-cols-3">
          <select aria-label="Exam" value={exam} onChange={(e) => { setExam(e.target.value); setSubject(""); setTopic(""); }} className={sel}>
            <option value="">All exams</option><option>NCET ITEP</option><option>General Studies</option>
          </select>
          <select aria-label="Subject" value={subject} onChange={(e) => { setSubject(e.target.value); setTopic(""); }} className={sel}>
            <option value="">All subjects</option>{subjectOpts.map((s) => <option key={s}>{s}</option>)}
          </select>
          <select aria-label="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} className={sel}>
            <option value="">All topics</option>{topicOpts.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={savedOnly} onChange={(e) => setSavedOnly(e.target.checked)} className="size-4" /> Show saved notes only ({bm.ids.length})
        </label>
      </div>

      {filtering ? (
        <section className="mt-8">
          <h2 className="font-display text-xl font-semibold">{results.length} result{results.length === 1 ? "" : "s"}</h2>
          <ChapterList list={results} bm={bm} />
        </section>
      ) : (
        ["NCET ITEP", "General Studies"].map((ex) => (
          <section key={ex} className="mt-10">
            <h2 className="font-display text-2xl font-bold">{ex === "NCET ITEP" ? "NCET ITEP Notes" : "General Studies Notes"}</h2>
            {ex === "NCET ITEP" && (
              <p className="mt-1 text-xs text-muted-foreground">
                Sections from the <a className="text-primary underline" href={syllabusSource.url} target="_blank" rel="noopener noreferrer">{syllabusSource.label}</a>. {syllabusSource.note}
              </p>
            )}
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {subjects.filter((s) => s.exam === ex).map((s) => (
                <div key={s.name} className="rounded-xl border bg-card p-4 shadow-soft">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold">{s.name}</h3>
                    {s.officialNote && <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-primary">{s.officialNote}</span>}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
                  <ChapterList list={chapters.filter((c) => c.subject === s.name && c.exam === ex)} bm={bm} />
                </div>
              ))}
            </div>
          </section>
        ))
      )}

      <section className="mt-10 rounded-xl border bg-secondary p-4">
        <h2 className="font-display text-lg font-semibold">Current Affairs</h2>
        <p className="mt-1 text-sm">Dated news with original source links is on the home page.</p>
        <Link to="/" hash="news" className="mt-2 inline-block text-sm font-medium text-primary underline">Open Current Affairs</Link>
      </section>
    </main>
  );
}

function ChapterList({ list, bm }: { list: typeof chapters; bm: ReturnType<typeof useBookmarks> }) {
  if (list.length === 0) return <p className="mt-3 text-sm text-muted-foreground">No chapters found.</p>;
  return (
    <ul className="mt-3 divide-y">
      {list.map((c) => (
        <li key={c.id} className="flex items-center gap-2 py-2">
          <Link to="/notes/$chapterId" params={{ chapterId: c.id }} className="min-w-0 flex-1">
            <span className="block text-sm font-medium">{c.title}</span>
            <span className="text-xs text-muted-foreground">{c.subject} · {c.topic}</span>
            <span className="mt-1 flex flex-wrap gap-1">
              <StatusBadge status={c.status} />
              {c.extraPractice && <span className="rounded bg-accent px-1.5 py-0.5 text-[11px] text-accent-foreground">Extra practice — not official syllabus</span>}
            </span>
          </Link>
          <button onClick={() => bm.toggle(c.id)} aria-label={bm.has(c.id) ? `Remove ${c.title} from saved` : `Save ${c.title}`} className="min-h-11 min-w-11 rounded-lg text-xl text-primary">
            {bm.has(c.id) ? "★" : "☆"}
          </button>
        </li>
      ))}
    </ul>
  );
}

export function StatusBadge({ status }: { status: "complete" | "needs-content" }) {
  return status === "complete"
    ? <span className="rounded bg-success/20 px-1.5 py-0.5 text-[11px] font-medium">Complete</span>
    : <span className="rounded bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground">Needs more content</span>;
}
