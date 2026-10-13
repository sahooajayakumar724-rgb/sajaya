// HOMEPAGE GK — combines every question source into one list, shown 10 per page.
// Sources: the original 10 homepage questions, the 500-question GK bank,
// and 500+ additional questions in src/data/gk-bank/extra/.
// Practice questions only — not official exam questions.
// Explanations containing "(Check:" flag facts that should be re-verified.
import { gkQuestions } from "./gk-questions";
import { gkBank, type BankCategory } from "./gk-bank";
import type { Row } from "./gk-bank/types";
import history from "./gk-bank/extra/history";
import geography from "./gk-bank/extra/geography";
import polity from "./gk-bank/extra/polity";
import constitution from "./gk-bank/extra/constitution";
import science from "./gk-bank/extra/science";
import economy from "./gk-bank/extra/economy";
import environment from "./gk-bank/extra/environment";
import sports from "./gk-bank/extra/sports";
import awards from "./gk-bank/extra/awards";
import books from "./gk-bank/extra/books";
import days from "./gk-bank/extra/days";
import general from "./gk-bank/extra/general";

export const homeCategories = [
  "Indian History",
  "Geography",
  "Indian Polity",
  "Indian Constitution",
  "General Science",
  "Economy",
  "Environment",
  "Sports",
  "Awards",
  "Books and Authors",
  "Important Days",
  "General Knowledge",
] as const;
export type HomeCategory = (typeof homeCategories)[number];

export type HomeQuestion = {
  id: string;
  category: HomeCategory;
  question: string;
  options: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
  explanation: string;
};

export const PAGE_SIZE = 10;

const bankMap: Record<BankCategory, HomeCategory> = {
  "Indian History": "Indian History",
  "Indian Geography": "Geography",
  "Indian Polity and Constitution": "Indian Polity",
  "General Science": "General Science",
  "Indian Economy": "Economy",
  Sports: "Sports",
  "Awards and Honours": "Awards",
  "Important Days": "Important Days",
  "Books and Authors": "Books and Authors",
  "Famous Personalities": "General Knowledge",
  "Computer Knowledge": "General Knowledge",
  "NCET ITEP Preparation": "General Knowledge",
};

const topicMap = {
  History: "Indian History",
  Geography: "Geography",
  Polity: "Indian Polity",
  Science: "General Science",
  "General Knowledge": "General Knowledge",
} as const;

export const extraSources: [HomeCategory, string, Row[]][] = [
  ["Indian History", "xhis", history],
  ["Geography", "xgeo", geography],
  ["Indian Polity", "xpol", polity],
  ["Indian Constitution", "xcon", constitution],
  ["General Science", "xsci", science],
  ["Economy", "xeco", economy],
  ["Environment", "xenv", environment],
  ["Sports", "xspo", sports],
  ["Awards", "xawd", awards],
  ["Books and Authors", "xbok", books],
  ["Important Days", "xday", days],
  ["General Knowledge", "xgen", general],
];

export const extraQuestions: HomeQuestion[] = extraSources.flatMap(([category, prefix, rows]) =>
  rows.map(([question, a, b, c, d, answer, explanation], i) => ({
    id: `${prefix}-${i + 1}`, category, question, options: [a, b, c, d], answer, explanation,
  })),
);

const all: HomeQuestion[] = [
  ...gkQuestions.map((q, i) => ({ id: `home-${i + 1}`, category: topicMap[q.topic], question: q.question, options: q.options, answer: q.answer, explanation: q.explanation })),
  ...gkBank.map((q) => ({ ...q, category: bankMap[q.category] })),
  ...extraQuestions,
];

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const seen = new Set<string>();
export const homeQuestions: HomeQuestion[] = all.filter((q) => {
  const k = norm(q.question);
  if (seen.has(k)) return false;
  seen.add(k);
  return true;
});

export function filterHome(list: HomeQuestion[], category: HomeCategory | "All") {
  return category === "All" ? list : list.filter((q) => q.category === category);
}

export function pageCount(total: number) {
  return Math.max(1, Math.ceil(total / PAGE_SIZE));
}

export function getPage(list: HomeQuestion[], page: number) {
  return list.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
}

export function scorePage(list: HomeQuestion[], picks: Record<string, number>) {
  return list.reduce((s, q) => s + (picks[q.id] === q.answer ? 1 : 0), 0);
}
