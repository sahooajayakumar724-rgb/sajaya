import { describe, expect, it } from "vitest";
import { chapters, searchChapters } from "@/data/notes";

describe("Notes library", () => {
  it("has at least 3 complete chapters, each with MCQs and a summary", () => {
    const done = chapters.filter((c) => c.status === "complete");
    expect(done.length).toBeGreaterThanOrEqual(3);
    done.forEach((c) => { expect(c.mcqs?.length).toBeGreaterThan(0); expect(c.summary).toBeTruthy(); });
  });
  it("chapter ids are unique", () => {
    expect(new Set(chapters.map((c) => c.id)).size).toBe(chapters.length);
  });
  it("search matches keywords and respects filters", () => {
    expect(searchChapters(chapters, "series", {}).map((c) => c.id)).toContain("number-series");
    expect(searchChapters(chapters, "series", { subject: "Languages" })).toHaveLength(0);
  });
});
