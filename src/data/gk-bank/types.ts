// Row format: [question, optionA, optionB, optionC, optionD, correctIndex (0=A..3=D), explanation]
export type Row = [string, string, string, string, string, 0 | 1 | 2 | 3, string];
