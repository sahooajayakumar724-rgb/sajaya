// GK QUESTION BANK — practice questions, not official exam questions.
// Each category lives in its own file in this folder. To add a question,
// copy one line in that file and edit it. Format:
// ["Question?", "Option A", "Option B", "Option C", "Option D", correct (0=A,1=B,2=C,3=D), "Explanation"],
import type { Row } from "./types";
import history from "./history";
import geography from "./geography";
import polity from "./polity";
import science from "./science";
import economy from "./economy";
import sports from "./sports";
import awards from "./awards";
import days from "./days";
import books from "./books";
import personalities from "./personalities";
import computer from "./computer";
import ncet from "./ncet";

export const bankCategories = [
  "Indian History",
  "Indian Geography",
  "Indian Polity and Constitution",
  "General Science",
  "Indian Economy",
  "Sports",
  "Awards and Honours",
  "Important Days",
  "Books and Authors",
  "Famous Personalities",
  "Computer Knowledge",
  "NCET ITEP Preparation",
] as const;
export type BankCategory = (typeof bankCategories)[number];

export type BankQuestion = {
  id: string;
  category: BankCategory;
  question: string;
  options: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
  explanation: string;
};

const sources: [BankCategory, string, Row[]][] = [
  ["Indian History", "his", history],
  ["Indian Geography", "geo", geography],
  ["Indian Polity and Constitution", "pol", polity],
  ["General Science", "sci", science],
  ["Indian Economy", "eco", economy],
  ["Sports", "spo", sports],
  ["Awards and Honours", "awd", awards],
  ["Important Days", "day", days],
  ["Books and Authors", "bok", books],
  ["Famous Personalities", "per", personalities],
  ["Computer Knowledge", "com", computer],
  ["NCET ITEP Preparation", "nct", ncet],
];

export const gkBank: BankQuestion[] = sources.flatMap(([category, prefix, rows]) =>
  rows.map(([question, a, b, c, d, answer, explanation], i) => ({
    id: `${prefix}-${i + 1}`,
    category,
    question,
    options: [a, b, c, d],
    answer,
    explanation,
  })),
);

export function filterBank(list: BankQuestion[], category: BankCategory | "All", search: string) {
  const s = search.trim().toLowerCase();
  return list.filter(
    (q) =>
      (category === "All" || q.category === category) &&
      (!s || q.question.toLowerCase().includes(s) || q.options.some((o) => o.toLowerCase().includes(s)) || q.explanation.toLowerCase().includes(s)),
  );
}

export function scoreBank(list: BankQuestion[], picks: Record<string, number>) {
  return list.reduce((s, q) => s + (picks[q.id] === q.answer ? 1 : 0), 0);
}

// Daily set: 10 questions picked automatically from the bank using the date.
// The questions themselves are not new each day — the selection rotates.
export function dailySet(dateStr: string, size = 10): BankQuestion[] {
  let seed = 0;
  for (const ch of dateStr) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
  const idx = gkBank.map((_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) {
    seed = (seed * 1103515245 + 12345) >>> 0;
    const j = seed % (i + 1);
    const t = idx[i]!;
    idx[i] = idx[j]!;
    idx[j] = t;
  }
  return idx.slice(0, size).map((i) => gkBank[i]!);
}
