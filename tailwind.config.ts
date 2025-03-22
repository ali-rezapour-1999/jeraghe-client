import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#201D47",
          light: "#37346F",
          dark: "#0f0f0f",
          gray: "#27272A",
        },
        secondary: {
          DEFAULT: "#37346F",
          light: "#D5F7E8",
          dark: "#201D47",
        },
        accent: {
          DEFAULT: "#E3507A",
          light: "#F28A9D",
          dark: "#B12A55",
        },
        green: {
          DEFAULT: "#D5F7E8",
          light: "#86EFAC",
          dark: "#22C55E",
        },
        dark: {
          DEFAULT: "#131313",
          light: "#1E1E1E",
          gray: "#27272A",
        },
        light: {
          DEFAULT: "#F1F1F1",
          light: "#FFFFFF",
          dark: "#CED4DA",
        },
      },
    },
  },
  plugins: [heroui()],
} satisfies Config;
