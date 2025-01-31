"use client";

import { useEffect, useState } from "react";
import Btn from "./button/btn";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;

    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    document.body.classList.add("transition-colors", "duration-300");
    document.body.classList.toggle("bg-white", theme === "light");
    document.body.classList.toggle("bg-[#121212]", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");

    // تغییر پس‌زمینه هنگام تغییر تم
    document.body.classList.toggle("bg-white", newTheme === "light");
    document.body.classList.toggle("bg-[#121212]", newTheme === "dark");
  };

  return (
    <Btn onClick={toggleTheme} className="">
      {theme === "light" ? <Moon /> : <Sun />}
    </Btn>
  );
}
