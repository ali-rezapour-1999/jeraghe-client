import Btn from "../ui/btn";
import { useTheme } from "next-themes";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";

export default function DarkModeToggle() {
  const { setTheme, theme } = useTheme();
  return (
    <Btn
      className="bg-transparent min-w-0 p-3"
      onClick={() => setTheme(theme == "light" ? "dark" : "light")}
    >
      {theme == "light" ? (
        <BsMoonStarsFill size={28} className="text-primary-light" />
      ) : (
        <BsSunFill size={30} className="text-warning-400" />
      )}
    </Btn>
  );
}
