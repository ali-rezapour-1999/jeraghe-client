import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
} from "@heroui/react";
import { MoonIcon, SettingsIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

type navLintType = {
  id: number;
  href: string;
  label: string;
  description: string;
};

const navLinkList: navLintType[] = [
  {
    id: 1,
    href: "/explorer",
    label: "🚀 مجموعه‌ها",
    description: "دنیایی از مجموعه‌ها و موضوعات جذاب رو کشف کن!",
  },
  {
    id: 2,
    href: "/ideas",
    label: "💡 ایده‌ها",
    description: "همه ایده‌های ناب و خلاقانه رو اینجا ببین!",
  },
  {
    id: 3,
    href: "/posts",
    label: "📖 تجربیات",
    description: "خوندن تجربه‌ها و نکات مفید کاربران درباره ایده‌ها!",
  },
  {
    id: 4,
    href: "/rule",
    label: "📜 قوانین",
    description: "قبل از هرچیز، قانون‌ها رو بخون که رفیق بمونیم!",
  },
  {
    id: 5,
    href: "/about-us",
    label: "🤔 چرا ما؟",
    description: "ببین چطوری دنیای ما شکل گرفته و بهت کمک می‌کنه!",
  },
];

export const CustomDropdownMenu = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Dropdown
      backdrop="blur"
      size="lg"
      showArrow
      classNames={{
        base: "before:bg-default-400 w-[300px]",
        content:
          "py-1 px-1 bg-gradient-to-br from-default-300 to-default-60 dark:from-[#00171E] dark:to-[#004551] w-[350px]",
      }}
    >
      <DropdownTrigger>
        <Button className="w-max h-8 px-4 md:h-10 min-w-0 flex bg-transparent rounded-lg">
          <span className="text-[16px]"> کشف محتواها 📜</span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dropdown menu with description" variant="faded">
        <DropdownSection showDivider title="🌐 صفحات اصلی">
          {navLinkList.map((item) => (
            <DropdownItem
              key={item.id}
              description={item.description}
              className="text-primary dark:text-light"
            >
              <Link href={item.href} passHref>
                <p className="text-lg">{item.label}</p>
              </Link>
            </DropdownItem>
          ))}
        </DropdownSection>

        <DropdownSection title="🔥 صفحات ویژه" showDivider>
          <DropdownItem
            key="write"
            className="text-danger"
            description="یه داستان یا تجربه هیجان‌انگیز رو با ما به اشتراک بذار!"
          >
            <Link href={"/write"}>
              <p className="text-lg">✍️ اشتراک‌گذاری تجربیات</p>
            </Link>
          </DropdownItem>
          <DropdownItem
            key="post"
            className="text-green-dark"
            description="یه ایده ناب داری؟ بگو تا بترکونیم!"
          >
            <Link href={"/post/create"}>
              <p className="text-lg"> 💡 اشتراک‌گذاری ایده</p>
            </Link>
          </DropdownItem>
        </DropdownSection>

        <DropdownSection title="ظاهر جرقه">
          <DropdownItem key="light-mode">
            <Button
              onPress={() => setTheme("light")}
              className={`w-full justify-between  ${theme === "light" ? "bg-primary/20 dark:bg-light/30" : "bg-transparent"}`}
            >
              <p>روشن</p>
              <SunIcon />
            </Button>
          </DropdownItem>

          <DropdownItem key="dark-mode">
            <Button
              onPress={() => setTheme("dark")}
              className={`w-full justify-between  ${theme === "dark" ? "bg-primary/20 dark:bg-light/30" : "bg-transparent"}`}
            >
              <p>تاریک</p>
              <MoonIcon />
            </Button>
          </DropdownItem>

          <DropdownItem key="system-mode">
            <Button
              onPress={() => setTheme("system")}
              className={`w-full justify-between  ${theme === "system" ? "bg-primary/20 dark:bg-light/30" : "bg-transparent"}`}
            >
              <p>سیستم</p>
              <SettingsIcon />
            </Button>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
