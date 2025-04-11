import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

export default {
  darkMode: "class",
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
        "2xl": "1736px",
      },
      colors: {
        code: {
          DEFAULT: "#0D1117",
        },
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
        "primary-gray": "var(--primary-gray)",
        background: "var(--background)",
      },
      fontFamily: {
        dana: ["Dana", "sans-serif"],
      },
      lineHeight: {
        normal: "1.75",
      },
      backgroundImage: {
        "light-gradient":
          "linear-gradient(to bottom, rgb(226, 255, 243) 20%, rgb(255, 255, 255) 70%, rgb(255, 255, 255) 100%)",
        "dark-gradient":
          "linear-gradient(180deg, oklab(16.8% -0.024 -0.017), oklab(22.4% -0.032 -0.023), oklab(27.7% -0.041 -0.026), oklab(32.7% -0.049 -0.029), oklab(37.2% -0.055 -0.034))",
      },
    },
  },
  plugins: [heroui()],
} satisfies Config;
