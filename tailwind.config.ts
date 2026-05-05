import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#ede0d4",
        "cream-dark": "#dfd0c2",
        periwinkle: "#8ea7e8",
        "periwinkle-light": "#9fadf3",
        "periwinkle-dark": "#5a7acf",
        "text-primary": "#1a1a1a",
        "text-secondary": "#5c5c5c",
      },
      fontFamily: {
        display: ["gunter", "Cinzel", "Georgia", "serif"],
        ui: ["lucida-sans", "var(--font-ui)", "sans-serif"],
      },
      borderRadius: {
        card: "1rem",
      },
      boxShadow: {
        card: "0 2px 20px 0 rgba(26, 26, 26, 0.06)",
        "card-hover": "0 8px 32px 0 rgba(26, 26, 26, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
