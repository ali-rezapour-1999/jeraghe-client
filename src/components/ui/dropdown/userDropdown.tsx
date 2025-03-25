import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  Image,
} from "@heroui/react";
import { useTheme } from "next-themes";
import { Bell, MoonIcon, SettingsIcon, SunIcon, UserRound } from "lucide-react";
import { ImExit } from "react-icons/im";
import userImage from "../../../../public/man.png";
import NextImage from "next/image";
import { useRouter } from "next/navigation";

export const UserDropdownMenu = ({
  username,
  email,
  image,
}: {
  username: string;
  email: string;
  image: string;
}) => {
  const { setTheme, theme } = useTheme();
  const router = useRouter();

  return (
    <Dropdown
      showArrow
      size="lg"
      backdrop="blur"
      classNames={{
        base: "before:bg-default-400",
        content:
          "py-1 px-1 bg-gradient-to-br from-default-300 to-default-60 dark:from-[#00171E] dark:to-[#004551] w-[300px]",
      }}
      radius="lg"
    >
      <DropdownTrigger>
        <Button
          disableRipple
          className="h-8 md:h-10 flex  bg-transparent rounded-lg px-3 border-none"
        >
          <p>{username}</p>
          <UserRound size={20} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Custom item styles"
        className="p-3"
        disabledKeys={["profile"]}
        itemClasses={{
          base: [
            "rounded-md",
            "text-primary",
            "dark:text-light",
            "transition-opacity",
            "data-[hover=true]:text-primary",
            "data-[hover=true]:bg-primary/20",
            "dark:data-[hover=true]:bg-black/30",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-primary-500",
          ],
        }}
      >
        <DropdownSection showDivider aria-label="Profile Image">
          <DropdownItem
            key="profile"
            isReadOnly
            className="h-14 gap-2 opacity-100"
            startContent={
              <Image
                as={NextImage}
                width={50}
                height={50}
                fallbackSrc={userImage.src}
                src={image || userImage.src}
                isBlurred
                className="w-12 h-8 object-contain"
                alt={username}
                priority
              />
            }
          >
            <p>{username}</p>
            <p>{email}</p>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection
          showDivider
          aria-label="Profile page aciton"
          title="مدیرت داشبورد"
        >
          <DropdownItem
            key="dashboard"
            onPress={() => router.push("/dashboard")}
          >
            <p className="text-lg ">داشبورد</p>
          </DropdownItem>
          <DropdownItem
            key="message"
            className="my-2"
            endContent={<Bell className="text-large" />}
            onPress={() => router.push("/dashboard/message")}
          >
            <p className="text-lg">پیام های</p>
          </DropdownItem>
          <DropdownItem
            key="settings"
            onPress={() => router.push("/dashboard/setting")}
          >
            <p className="text-lg">تنظیمات</p>
          </DropdownItem>
        </DropdownSection>

        <DropdownSection title="ظاهر جرقه" classNames={{ base: "gap-2" }}>
          <DropdownItem
            key="light-mode"
            onPress={() => setTheme("light")}
            className={`w-full justify-between ${theme === "light" ? "bg-primary/20 dark:bg-light/30" : "bg-transparent"}`}
            endContent={<SunIcon />}
          >
            <p>روشن</p>
          </DropdownItem>
          <DropdownItem
            key="dark-mode"
            onPress={() => setTheme("dark")}
            className={`w-full justify-between my-2  ${theme === "dark" ? "bg-primary/20 dark:bg-light/30" : "bg-transparent"}`}
            endContent={<MoonIcon />}
          >
            <p>تاریک</p>
          </DropdownItem>

          <DropdownItem
            key="system-mode"
            onPress={() => setTheme("system")}
            className={`w-full justify-between  ${theme === "system" ? "bg-primary/20 dark:bg-light/30" : "bg-transparent"}`}
            endContent={<SettingsIcon />}
          >
            <p>سیستم</p>
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Help & Feedback">
          <DropdownItem key="logout" className="text-light bg-accent-dark">
            <div className="flex items-center justify-center gap-3 ">
              <ImExit /> خروج از حساب کاربری
            </div>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
