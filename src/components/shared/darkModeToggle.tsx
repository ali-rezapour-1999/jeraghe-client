import { useTheme } from "next-themes";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";
import { Button } from "../ui/button";

export default function DarkModeToggle() {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      className="min-w-0 h-10 w-10 p-0 bg-primary-dark dark:text-light dark:bg-light rounded-xl"
      onClick={() => setTheme(theme == "light" ? "dark" : "light")}
    >
      {theme == "light" ? (
        <BsMoonStarsFill className="text-light size-4 lg:size-5" />
      ) : (
        <BsSunFill className="text-primary size-4 lg:size-5" />
      )}
    </Button>
  );
}
