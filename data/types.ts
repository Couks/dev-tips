export type Tip = {
  id: string;
  title: string;
  language: string;
  content: string;
  // outros campos necessários
};

export type Challenge = {
  id: string;
  title: string;
  language: string;
  difficulty: "easy" | "medium" | "hard";
  // outros campos necessários
}; 