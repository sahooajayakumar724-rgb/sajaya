import { createFileRoute, Link } from "@tanstack/react-router";
import { HomeGkQuiz } from "@/components/HomeGkQuiz";
import { articles, categories, lastUpdated } from "@/data/current-affairs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "S.ajaya — Daily GK Quiz & Current Affairs" },
      { name: "description", content: "1,000+ free GK practice MCQs, 10 per page, and verified current affairs for Indian students." },
      { property: "og:title", content: "S.ajaya — Daily GK & Current Affairs" },
      { property: "og:description", content: "1,000+ free GK practice MCQs, 10 per page, and verified current affairs for Indian students." },
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-80">S.ajaya</p>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Daily GK & Current Affairs</h1>
          <nav className="mt-6 flex gap-3 text-sm">
            <a href="#quiz" className="rounded-full bg-primary-foreground/15 px-4 py-2">GK Quiz</a>
            <a href="#news" className="rounded-full bg-primary-foreground/15 px-4 py-2">Current Affairs</a>
            <Link to="/notes" className="rounded-full bg-primary-foreground px-4 py-2 font-semibold text-primary">Notes Library</Link>
          </nav>
        </div>
      </section>
      <main className="mx-auto max-w-3xl space-y-12 px-4 py-10">
        <HomeGkQuiz />
        <CurrentAffairs />
      </main>
    </div>
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
