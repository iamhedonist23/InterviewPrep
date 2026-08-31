import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--ink) / <alpha-value>)",
        paper: "rgb(var(--paper) / <alpha-value>)",
        coral: "rgb(var(--coral) / <alpha-value>)",
        mint: "rgb(var(--mint) / <alpha-value>)",
      },
      fontFamily: { display: ["var(--font-display)"], sans: ["var(--font-sans)"] },
    },
  },
  plugins: [typography],
};

export default config;
