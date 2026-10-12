// PRACTICE QUESTIONS — not official exam questions.
// To add a question: copy one block, change the text, and set `answer`
// to the position of the correct option (0 = first, 1 = second, 2 = third, 3 = fourth).
export type GkQuestion = {
  topic: "History" | "Geography" | "Polity" | "Science" | "General Knowledge";
  question: string;
  options: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
  explanation: string;
};

export const gkQuestions: GkQuestion[] = [
  {
    topic: "History",
    question: "In which year did the First War of Indian Independence (Revolt of 1857) begin?",
    options: ["1757", "1857", "1905", "1947"],
    answer: 1,
    explanation: "The revolt began at Meerut on 10 May 1857.",
  },
  {
    topic: "History",
    question: "Who founded the Maurya Empire?",
    options: ["Ashoka", "Bindusara", "Chandragupta Maurya", "Harshavardhana"],
    answer: 2,
    explanation: "Chandragupta Maurya founded the empire around 322 BCE with the guidance of Chanakya.",
  },
  {
    topic: "Geography",
    question: "Which is the longest river flowing entirely within India?",
    options: ["Godavari", "Ganga", "Narmada", "Krishna"],
    answer: 1,
    explanation: "The Ganga (about 2,525 km) is India's longest river; the Godavari is the longest in peninsular India.",
  },
  {
    topic: "Geography",
    question: "Which is the largest Indian state by area?",
    options: ["Madhya Pradesh", "Maharashtra", "Uttar Pradesh", "Rajasthan"],
    answer: 3,
    explanation: "Rajasthan covers about 3.42 lakh sq km, the largest of any Indian state.",
  },
  {
    topic: "Polity",
    question: "On which date did the Constitution of India come into force?",
    options: ["15 August 1947", "26 November 1949", "26 January 1950", "2 October 1950"],
    answer: 2,
    explanation: "It was adopted on 26 November 1949 and came into force on 26 January 1950 (Republic Day).",
  },
  {
    topic: "Polity",
    question: "Who was the Chairman of the Drafting Committee of the Indian Constitution?",
    options: ["Jawaharlal Nehru", "Dr. B. R. Ambedkar", "Dr. Rajendra Prasad", "Sardar Patel"],
    answer: 1,
    explanation: "Dr. B. R. Ambedkar chaired the Drafting Committee; Dr. Rajendra Prasad presided over the Constituent Assembly.",
  },
  {
    topic: "Science",
    question: "What is the chemical symbol of gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    answer: 2,
    explanation: "Au comes from the Latin word 'aurum'. Ag is silver.",
  },
  {
    topic: "Science",
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Jupiter", "Venus", "Mercury"],
    answer: 0,
    explanation: "Iron oxide (rust) on its surface gives Mars a reddish colour.",
  },
  {
    topic: "General Knowledge",
    question: "What is the National Animal of India?",
    options: ["Lion", "Elephant", "Bengal Tiger", "Peacock"],
    answer: 2,
    explanation: "The Bengal Tiger is the National Animal; the Peacock is the National Bird.",
  },
  {
    topic: "General Knowledge",
    question: "Who wrote India's National Anthem 'Jana Gana Mana'?",
    options: ["Bankim Chandra Chatterjee", "Rabindranath Tagore", "Sarojini Naidu", "Muhammad Iqbal"],
    answer: 1,
    explanation: "Rabindranath Tagore wrote it; 'Vande Mataram' (National Song) is by Bankim Chandra Chatterjee.",
  },
];

export function scoreQuiz(questions: GkQuestion[], picks: (number | null)[]): number {
  return questions.reduce((s, q, i) => s + (picks[i] === q.answer ? 1 : 0), 0);
}
