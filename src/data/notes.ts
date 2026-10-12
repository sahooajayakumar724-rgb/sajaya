// STUDY NOTES LIBRARY — edit this file to add or change notes.
// status: "complete" = full notes ready; "needs-content" = heading only, shown as "Content coming soon".
// extraPractice: true = NOT part of the official NCET ITEP syllabus, extra practice only.
// pdfUrl: optional link to a PDF (put the file in the /public/pdfs folder and write "/pdfs/name.pdf").

export type Mcq = { q: string; options: [string, string, string, string]; answer: 0 | 1 | 2 | 3; explanation: string };

export type Chapter = {
  id: string; // unique, lowercase-with-dashes, used in the page address
  title: string;
  exam: "NCET ITEP" | "General Studies";
  subject: string;
  topic: string;
  keywords: string[];
  status: "complete" | "needs-content";
  extraPractice?: boolean;
  pdfUrl?: string;
  explanation?: string[];
  definitions?: { term: string; meaning: string }[];
  examples?: string[];
  keyPoints?: string[];
  mcqs?: Mcq[];
  summary?: string;
};

export type Subject = { name: string; exam: Chapter["exam"]; description: string; officialNote?: string };

export const syllabusSource = {
  label: "NTA NCET 2025 Information Bulletin (Scheme of Examination)",
  url: "https://www.nta.ac.in/Download/Notice/Notice_20250220192110.pdf",
  note: "Section list based on the NCET 2025 bulletin. Check the latest NTA bulletin each year — the pattern can change.",
};

export const subjects: Subject[] = [
  { name: "Languages", exam: "NCET ITEP", description: "Section 1 — candidates choose two languages. English is covered here.", officialNote: "Official section" },
  { name: "Domain Subjects", exam: "NCET ITEP", description: "Section 2 — candidates choose three domain subjects (e.g. History, Geography, Physics, Mathematics).", officialNote: "Official section" },
  { name: "General Test", exam: "NCET ITEP", description: "Section 3 — General Knowledge & Current Affairs, Mental Ability, Numerical Ability, Logical & Analytical Reasoning.", officialNote: "Official section" },
  { name: "Teaching Aptitude", exam: "NCET ITEP", description: "Section 4 — aptitude and attitude for teaching.", officialNote: "Official section" },
  { name: "Indian History", exam: "General Studies", description: "Ancient, medieval and modern India." },
  { name: "Geography", exam: "General Studies", description: "Physical and Indian geography." },
  { name: "Polity", exam: "General Studies", description: "Constitution and governance." },
  { name: "Science", exam: "General Studies", description: "Everyday physics, chemistry and biology." },
  { name: "English Grammar", exam: "General Studies", description: "Basic grammar for all exams." },
];

export const chapters: Chapter[] = [
  {
    id: "teaching-learning-basics",
    title: "Teaching and Learning: Basic Concepts",
    exam: "NCET ITEP",
    subject: "Teaching Aptitude",
    topic: "Nature of Teaching",
    keywords: ["teaching", "learning", "learner", "maxims", "pedagogy"],
    status: "complete",
    explanation: [
      "Teaching is a planned activity in which a teacher helps learners gain knowledge, skills and values. Good teaching is not just talking — it creates conditions in which students learn.",
      "Learning is a relatively lasting change in behaviour or understanding that comes from experience or practice. Teaching is the means; learning is the goal.",
      "Modern classrooms are learner-centred: the teacher guides, asks questions and encourages students to discover ideas instead of only memorising.",
    ],
    definitions: [
      { term: "Pedagogy", meaning: "The method and practice of teaching." },
      { term: "Learner-centred teaching", meaning: "Teaching where the needs, interests and active participation of students come first." },
      { term: "Maxims of teaching", meaning: "Guiding rules such as 'known to unknown', 'simple to complex' and 'concrete to abstract'." },
      { term: "Feedback", meaning: "Information given to learners about their performance so they can improve." },
    ],
    examples: [
      "Known to unknown: before teaching fractions, a teacher cuts a roti into equal parts — something students already know.",
      "Concrete to abstract: using real coins before teaching addition of money on paper.",
      "Learner-centred: students measure their classroom themselves to learn about area.",
    ],
    keyPoints: [
      "Teaching is a means; learning is the end.",
      "Teaching has three phases: pre-active (planning), interactive (classroom), post-active (evaluation).",
      "Maxims: known → unknown, simple → complex, concrete → abstract, particular → general.",
      "Timely, specific feedback improves learning.",
      "A good teacher respects individual differences among learners.",
    ],
    mcqs: [
      { q: "Which phase of teaching involves planning the lesson?", options: ["Interactive", "Pre-active", "Post-active", "Evaluative"], answer: 1, explanation: "Planning before entering the class is the pre-active phase." },
      { q: "Starting a lesson with something students already know follows which maxim?", options: ["Known to unknown", "Abstract to concrete", "Whole to part", "Complex to simple"], answer: 0, explanation: "Building on prior knowledge is 'known to unknown'." },
      { q: "In a learner-centred classroom, the teacher mainly acts as a:", options: ["Dictator", "Lecturer only", "Facilitator", "Examiner only"], answer: 2, explanation: "The teacher guides and facilitates students' own learning." },
      { q: "Learning is best described as:", options: ["Memorising answers", "A lasting change in behaviour from experience", "Attending classes", "Getting high marks"], answer: 1, explanation: "Learning means a relatively permanent change caused by experience or practice." },
    ],
    summary: "Teaching is a planned process to help learners; learning is a lasting change from experience. Follow maxims like known→unknown, plan in the pre-active phase, teach in the interactive phase, and evaluate in the post-active phase. Act as a facilitator and give useful feedback.",
  },
  {
    id: "number-series",
    title: "Number Series",
    exam: "NCET ITEP",
    subject: "General Test",
    topic: "Logical & Analytical Reasoning",
    keywords: ["reasoning", "series", "pattern", "numbers", "missing term"],
    status: "complete",
    explanation: [
      "A number series is a list of numbers that follows a rule. Your task is to find the rule and then the missing or next number.",
      "Step 1: find the difference between neighbouring numbers. Step 2: if differences are not constant, check their differences, or try multiplication, squares, cubes or alternating patterns.",
    ],
    definitions: [
      { term: "Arithmetic series", meaning: "Each term increases or decreases by the same amount (e.g. +3 each time)." },
      { term: "Geometric series", meaning: "Each term is multiplied by the same number (e.g. ×2 each time)." },
      { term: "Alternate series", meaning: "Two separate patterns mixed together in odd and even positions." },
    ],
    examples: [
      "2, 5, 8, 11, ? → difference +3 → answer 14.",
      "3, 6, 12, 24, ? → ×2 → answer 48.",
      "1, 4, 9, 16, ? → squares of 1, 2, 3, 4 → answer 25.",
      "2, 3, 5, 8, 12, ? → differences 1, 2, 3, 4 → next +5 → answer 17.",
    ],
    keyPoints: [
      "Always check differences first.",
      "If numbers grow very fast, try multiplication, squares or cubes.",
      "Learn squares up to 30 and cubes up to 15.",
      "If the pattern looks odd, check alternate positions separately.",
    ],
    mcqs: [
      { q: "Find the next term: 7, 12, 17, 22, ?", options: ["25", "26", "27", "28"], answer: 2, explanation: "Each term increases by 5: 22 + 5 = 27." },
      { q: "Find the next term: 5, 10, 20, 40, ?", options: ["60", "70", "80", "90"], answer: 2, explanation: "Each term is multiplied by 2: 40 × 2 = 80." },
      { q: "Find the next term: 1, 8, 27, 64, ?", options: ["100", "125", "121", "81"], answer: 1, explanation: "These are cubes 1³, 2³, 3³, 4³ — next is 5³ = 125." },
      { q: "Find the next term: 1, 2, 4, 7, 11, ?", options: ["14", "15", "16", "17"], answer: 2, explanation: "Differences are 1, 2, 3, 4 — next is +5: 11 + 5 = 16." },
    ],
    summary: "Find the rule: check differences, then multiplication, squares/cubes and alternate patterns. Memorise squares and cubes to solve faster.",
  },
  {
    id: "subject-verb-agreement",
    title: "Subject–Verb Agreement",
    exam: "NCET ITEP",
    subject: "Languages",
    topic: "English Grammar",
    keywords: ["english", "grammar", "verb", "subject", "singular", "plural"],
    status: "complete",
    explanation: [
      "The verb in a sentence must match its subject in number. A singular subject takes a singular verb; a plural subject takes a plural verb.",
      "In the present tense, singular verbs usually end in -s (he runs), while plural verbs do not (they run).",
    ],
    definitions: [
      { term: "Subject", meaning: "The person or thing that does the action in a sentence." },
      { term: "Verb", meaning: "A word that shows an action or state (run, is, have)." },
      { term: "Collective noun", meaning: "A word for a group treated as one unit (team, family, jury)." },
    ],
    examples: [
      "The boy plays cricket. (singular) / The boys play cricket. (plural)",
      "Each of the students has a book. ('each' is singular)",
      "Ram and Shyam are friends. (two subjects joined by 'and' = plural)",
      "Neither the teacher nor the students were late. (verb agrees with the nearer subject)",
    ],
    keyPoints: [
      "Each, every, either, neither, everyone → singular verb.",
      "Two subjects joined by 'and' → plural verb.",
      "With 'or / nor', the verb agrees with the nearer subject.",
      "Words between subject and verb (like 'along with', 'as well as') do not change the subject.",
      "Collective nouns usually take a singular verb when acting as one unit.",
    ],
    mcqs: [
      { q: "Choose the correct option: Every student ___ a uniform.", options: ["wear", "wears", "are wearing", "have worn"], answer: 1, explanation: "'Every' takes a singular verb: wears." },
      { q: "Choose the correct option: The teacher, along with her students, ___ going on a trip.", options: ["are", "were", "is", "have"], answer: 2, explanation: "'Along with' does not change the subject; 'teacher' is singular → is." },
      { q: "Choose the correct option: Neither Rita nor her brothers ___ at home.", options: ["is", "was", "are", "has"], answer: 2, explanation: "With 'nor', the verb agrees with the nearer subject 'brothers' → are." },
      { q: "Choose the correct option: Bread and butter ___ my favourite breakfast.", options: ["is", "are", "were", "have"], answer: 0, explanation: "Treated as one dish, 'bread and butter' takes a singular verb." },
    ],
    summary: "Singular subject → singular verb; plural subject → plural verb. Watch for each/every (singular), and (plural), or/nor (nearer subject) and phrases like 'along with' that do not change the subject.",
  },
  // ---- Chapters below need content ----
  { id: "gk-static-india", title: "Static GK: India at a Glance", exam: "NCET ITEP", subject: "General Test", topic: "General Knowledge & Current Affairs", keywords: ["gk", "static", "india"], status: "needs-content" },
  { id: "numerical-percentages", title: "Percentages", exam: "NCET ITEP", subject: "General Test", topic: "Numerical Ability", keywords: ["maths", "percentage"], status: "needs-content" },
  { id: "mental-ability-analogy", title: "Analogy", exam: "NCET ITEP", subject: "General Test", topic: "Mental Ability", keywords: ["analogy", "reasoning"], status: "needs-content" },
  { id: "english-reading-comprehension", title: "Reading Comprehension", exam: "NCET ITEP", subject: "Languages", topic: "English Comprehension", keywords: ["english", "passage"], status: "needs-content" },
  { id: "teaching-evaluation", title: "Evaluation in Teaching", exam: "NCET ITEP", subject: "Teaching Aptitude", topic: "Evaluation", keywords: ["evaluation", "assessment"], status: "needs-content" },
  { id: "domain-overview", title: "How to Choose Your Domain Subjects", exam: "NCET ITEP", subject: "Domain Subjects", topic: "Overview", keywords: ["domain", "subjects"], status: "needs-content" },
  { id: "history-indus-valley", title: "Indus Valley Civilisation", exam: "General Studies", subject: "Indian History", topic: "Ancient India", keywords: ["harappa", "history"], status: "needs-content" },
  { id: "history-freedom-struggle", title: "Indian Freedom Struggle (1857–1947)", exam: "General Studies", subject: "Indian History", topic: "Modern India", keywords: ["freedom", "gandhi"], status: "needs-content" },
  { id: "geo-rivers-india", title: "Rivers of India", exam: "General Studies", subject: "Geography", topic: "Indian Geography", keywords: ["rivers", "ganga"], status: "needs-content" },
  { id: "polity-preamble", title: "Preamble and Fundamental Rights", exam: "General Studies", subject: "Polity", topic: "Constitution", keywords: ["constitution", "rights"], status: "needs-content" },
  { id: "science-human-body", title: "Human Body Systems", exam: "General Studies", subject: "Science", topic: "Biology", keywords: ["biology", "body"], status: "needs-content" },
  { id: "grammar-tenses", title: "Tenses", exam: "General Studies", subject: "English Grammar", topic: "Verbs", keywords: ["tense", "grammar"], status: "needs-content" },
  { id: "practice-puzzles", title: "Mixed Puzzles (Extra Practice)", exam: "NCET ITEP", subject: "General Test", topic: "Logical & Analytical Reasoning", keywords: ["puzzle"], status: "needs-content", extraPractice: true },
];

export function searchChapters(list: Chapter[], query: string, f: { exam?: string; subject?: string; topic?: string }) {
  const q = query.trim().toLowerCase();
  return list.filter((c) => {
    if (f.exam && c.exam !== f.exam) return false;
    if (f.subject && c.subject !== f.subject) return false;
    if (f.topic && c.topic !== f.topic) return false;
    if (!q) return true;
    return [c.title, c.subject, c.topic, ...c.keywords].join(" ").toLowerCase().includes(q);
  });
}
