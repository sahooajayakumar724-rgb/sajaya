import { describe, expect, it } from "vitest";
import { bankCategories, dailySet, filterBank, gkBank, scoreBank } from "@/data/gk-bank";

describe("GK question bank", () => {
  it("has 500 questions across all 12 categories", () => {
    expect(gkBank).toHaveLength(500);
    bankCategories.forEach((c) => expect(gkBank.some((q) => q.category === c)).toBe(true));
  });
  it("every question has 4 distinct options, a valid answer and an explanation", () => {
    gkBank.forEach((q) => {
      expect(new Set(q.options).size, q.question).toBe(4);
      expect([0, 1, 2, 3]).toContain(q.answer);
      expect(q.explanation.length).toBeGreaterThan(3);
    });
  });
  it("has no duplicate questions", () => {
    const texts = gkBank.map((q) => q.question.toLowerCase().trim());
    expect(new Set(texts).size).toBe(texts.length);
  });
  it("scores correct picks only", () => {
    const list = gkBank.slice(0, 5);
    const picks: Record<string, number> = {};
    list.forEach((q, i) => (picks[q.id] = i < 3 ? q.answer : (q.answer + 1) % 4));
    expect(scoreBank(list, picks)).toBe(3);
  });
  it("filters by category and search", () => {
    expect(filterBank(gkBank, "Sports", "").every((q) => q.category === "Sports")).toBe(true);
    expect(filterBank(gkBank, "All", "Plassey").length).toBeGreaterThan(0);
  });
  it("daily set is 10 questions and stable for a date", () => {
    expect(dailySet("2026-10-12")).toHaveLength(10);
    expect(dailySet("2026-10-12").map((q) => q.id)).toEqual(dailySet("2026-10-12").map((q) => q.id));
  });
});
