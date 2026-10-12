import { describe, expect, it } from "vitest";
import { gkQuestions, scoreQuiz } from "@/data/gk-questions";

describe("GK quiz", () => {
  it("has exactly 10 questions with 4 options each", () => {
    expect(gkQuestions).toHaveLength(10);
    gkQuestions.forEach((q) => expect(q.options).toHaveLength(4));
  });
  it("scores 10/10 when all correct", () => {
    expect(scoreQuiz(gkQuestions, gkQuestions.map((q) => q.answer))).toBe(10);
  });
  it("scores unanswered and wrong picks as 0", () => {
    const picks = gkQuestions.map((q, i) => (i < 3 ? q.answer : i < 6 ? (q.answer + 1) % 4 : null));
    expect(scoreQuiz(gkQuestions, picks)).toBe(3);
  });
});
