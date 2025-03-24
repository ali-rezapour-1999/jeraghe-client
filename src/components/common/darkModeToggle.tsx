import Btn from "../ui/btn";
import { useTheme } from "next-themes";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";

export default function DarkModeToggle() {
  const { setTheme, theme } = useTheme();
  return (
    <Btn
      className="bg-transparent min-w-0 p-1 md:p-3"
      onClick={() => setTheme(theme == "light" ? "dark" : "light")}
    >
      {theme == "light" ? (
        <BsMoonStarsFill className="text-gray-700 size-5 lg:size-8" />
      ) : (
        <BsSunFill className="text-warning-400 size-6 lg:size-8 " />
      )}
    </Btn>
  );
}
