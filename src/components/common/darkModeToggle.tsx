import Btn from "../ui/btn";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function DarkModeToggle() {
  const { setTheme, theme } = useTheme();
  return (
    <Btn
      className="bg-transparent min-w-0 p-3"
      onClick={() => setTheme(theme == "light" ? "dark" : "light")}
    >
      {theme == "light" ? <Moon size={30} /> : <Sun size={30} />}
    </Btn>
  );
}
