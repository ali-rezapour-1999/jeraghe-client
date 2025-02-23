"use client";
import { useEffect, useState } from "react";
import Btn from "../ui/btn";
import { Moon, Sun } from "lucide-react";
import { useThemeState } from "@/state/themeState";

export default function DarkModeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const { setIsDark } = useThemeState();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;

    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
      setIsDark(theme);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    document.body.classList.add("transition-colors", "duration-300");
    document.body.classList.toggle("bg-white", theme === "light");
    document.body.classList.toggle("bg-[#121212]", theme === "dark");
  }, [theme, setIsDark]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");

    document.body.classList.toggle("bg-white", newTheme === "light");
    document.body.classList.toggle("bg-[#121212]", newTheme === "dark");
  };

  return (
    <Btn
      onClick={toggleTheme}
      className={`w-10 h-10 md:w-12 md:h-12 px-0 dark:bg-light bg-darkPrimary dark:text-primary text-light ${className}`}
    >
      {theme === "light" ? <Moon size={23} /> : <Sun size={23} />}
    </Btn>
  );
}
