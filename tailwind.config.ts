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
          DEFAULT: "#171717",
          light: "#ffffff",
          dark: "#0f0f0f",
          gray: "#27272A",
        },
        darkPrimary: {
          DEFAULT: "#1E1E1E",
          light: "#F8F9FA",
          dark: "#131313",
        },
        light: {
          DEFAULT: "#F1F1F1",
          light: "#ffffff",
          dark: "#222831",
        },
        greylight: {
          DEFAULT: "#121212",
        },
      },
    },
  },
  plugins: [heroui()],
} satisfies Config;
