// CURRENT AFFAIRS — add only verified news with a real source link.
// Leave a category empty and the site shows "Content needs updating".
// Example item:
// {
//   headline: "Headline exactly as reported",
//   date: "2026-10-12",            // publication date (YYYY-MM-DD)
//   category: "India",             // India | World | Science & Technology | Sports | Education
//   summary: "One or two sentence summary in your own words.",
//   sourceName: "PIB",
//   sourceUrl: "https://pib.gov.in/...",
// },
export const categories = ["India", "World", "Science & Technology", "Sports", "Education"] as const;
export type Category = (typeof categories)[number];

export type Article = {
  headline: string;
  date: string;
  category: Category;
  summary: string;
  sourceName: string;
  sourceUrl: string;
};

// Date you last checked/updated this list (YYYY-MM-DD). Leave "" if never updated.
export const lastUpdated = "";

export const articles: Article[] = [];
