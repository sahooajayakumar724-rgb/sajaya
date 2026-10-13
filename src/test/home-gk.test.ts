import { describe, expect, it } from "vitest";
import { extraQuestions, extraSources, getPage, homeCategories, homeQuestions, pageCount, scorePage, filterHome } from "@/data/home-gk";

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

describe("homepage GK", () => {
  it("adds at least 500 new questions on top of the existing 510", () => {
    expect(extraQuestions.length).toBeGreaterThanOrEqual(500);
    expect(homeQuestions.length).toBeGreaterThanOrEqual(1010);
  });
  it("covers all 12 categories", () => {
    homeCategories.forEach((c) => expect(homeQuestions.some((q) => q.category === c)).toBe(true));
    expect(extraSources).toHaveLength(12);
  });
  it("new questions are valid and not duplicates of anything", () => {
    const keys = homeQuestions.map((q) => norm(q.question));
    expect(new Set(keys).size).toBe(keys.length);
    const extraKeys = extraQuestions.map((q) => norm(q.question));
    expect(new Set(extraKeys).size).toBe(extraKeys.length);
    expect(homeQuestions.filter((q) => q.id.startsWith("x")).length).toBe(extraQuestions.length);
    extraQuestions.forEach((q) => {
      expect(new Set(q.options).size, q.question).toBe(4);
      expect([0, 1, 2, 3]).toContain(q.answer);
      expect(q.explanation.length).toBeGreaterThan(3);
    });
  });
  it("pages hold 10 different questions and go back correctly", () => {
    const p1 = getPage(homeQuestions, 0), p2 = getPage(homeQuestions, 1);
    expect(p1).toHaveLength(10);
    expect(p2).toHaveLength(10);
    expect(p1.some((q) => p2.includes(q))).toBe(false);
    expect(getPage(homeQuestions, 0)).toEqual(p1);
    expect(pageCount(homeQuestions.length)).toBe(Math.ceil(homeQuestions.length / 10));
    expect(getPage(filterHome(homeQuestions, "Environment"), 0).every((q) => q.category === "Environment")).toBe(true);
  });
  it("scores a page out of 10", () => {
    const p = getPage(homeQuestions, 3);
    const picks: Record<string, number> = {};
    p.forEach((q, i) => (picks[q.id] = i < 7 ? q.answer : (q.answer + 1) % 4));
    expect(scorePage(p, picks)).toBe(7);
  });
});
