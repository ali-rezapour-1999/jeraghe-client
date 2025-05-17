import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Paragraph } from "@/components/ui/text";
import { useAuthStore } from "@/store/authState";
import { Bell, MoonIcon, SettingsIcon, SunIcon, UserRound } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

const UserDropdownMenu = () => {
  const { setTheme, theme } = useTheme();
  const { user } = useAuthStore();
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 md:h-9 flex rounded-full px-3" variant="main">
          <Paragraph>{user.username}</Paragraph>
          <UserRound size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-50">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/dashboard")}>
            <Paragraph className="text-lg ">داشبورد</Paragraph>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex w-full justify-between" onClick={() => router.push("/dashboard/message")}>
            <Paragraph className="text-lg">پیام های</Paragraph>
            <Bell className="text-large" />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/dashboard/setting")}>
            <Paragraph className="text-lg">تنظیمات</Paragraph>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => setTheme("light")}
            className={`w-full justify-between ${theme === "light"
              ? "bg-primary/20 dark:bg-light/30"
              : "bg-transparent"
              }`}
          >
            <Paragraph>روشن</Paragraph>
            <SunIcon />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={`w-full justify-between my-2  ${theme === "dark"
            ? "bg-primary/20 dark:bg-light/30"
            : "bg-transparent"
            }`}
        >
          <Paragraph>تاریک</Paragraph>
          <MoonIcon />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={`w-full justify-between  ${theme === "system"
            ? "bg-primary/20 dark:bg-light/30"
            : "bg-transparent"
            }`}
        >
          <Paragraph>سیستم</Paragraph>
          <SettingsIcon />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserDropdownMenu;
