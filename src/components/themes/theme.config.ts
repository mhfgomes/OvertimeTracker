export const DEFAULT_THEME = "vercel";

export const THEMES = [
  { name: "vercel", label: "Vercel" },
  { name: "claude", label: "Claude" },
  { name: "supabase", label: "Supabase" },
  { name: "mono", label: "Mono" },
  { name: "neobrutualism", label: "Neo-Brutalism" },
  { name: "notebook", label: "Notebook" },
  { name: "candyland", label: "Candyland" },
  { name: "bubblegum", label: "Bubblegum" },
  { name: "ocean-breeze", label: "Ocean Breeze" },
  { name: "solar-dusk", label: "Solar Dusk" },
  { name: "midnight-bloom", label: "Midnight Bloom" },
] as const;

export type Theme = (typeof THEMES)[number]["name"];
