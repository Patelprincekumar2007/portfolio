import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0d0d12",
        ink2: "#14141c",
        paper: "#f3ede3",
        cream: "#e8e0d2",
        accent: "#ff5a1f",
        amber: "#ffb347",
        muted: "#8a8578",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-space)", "sans-serif"],
        mono: ["var(--font-jbmono)", "monospace"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.25" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        pulseDot: "pulseDot 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
