export interface NoteType {
  id?: string;
  usermail: string;
  date: Date;
  title: string;
  mood: string;
  text: string;
}

export type Mood = {
  emoji: string;
  label: string;
  color: string;
};

export const MOODS: Mood[] = [
  { emoji: "🥰", label: "Amazing", color: "#2ECC71" },     // Emerald green
  { emoji: "😊", label: "Happy", color: "#82E0AA" },       // Light green
  { emoji: "😐", label: "Neutral", color: "#A8E6CF" },     // Mint green
  { emoji: "😫", label: "Tired", color: "#E67E22" },       // Burnt orange
  { emoji: "😠", label: "Angry", color: "#E74C3C" },       // Bright red
  { emoji: "😰", label: "Anxious", color: "#BB8FCE" },     // Light purple
  { emoji: "😢", label: "Sad", color: "#9B59B6" },         // Amethyst purple
];
