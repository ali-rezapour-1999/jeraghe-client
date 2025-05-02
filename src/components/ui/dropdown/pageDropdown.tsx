import React from "react";
import { useRouter } from "next/navigation";
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

export const PageDropdownMenu = () => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-max h-8 px-4 md:h-10 min-w-0 flex rounded-lg" variant='ghost'>
          <span className="text-[16px]"> کشف محتواها 📜</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup title="🌐 صفحات اصلی">
          {navLinkList.map((item) => (
            <DropdownMenuItem
              key={item.id}
              onClick={() => router.push(item.href)}
            >
              <Paragraph variant="default" className="text-lg">{item.label}</Paragraph>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuGroup title="🔥 صفحات ویژه">
          <DropdownMenuSeparator />
          <DropdownMenuItem
            key="post"
            className="text-danger"
            onClick={() => router.push("/post/create")}
          >
            <Paragraph className="text-lg">
              ✍️ اشتراک‌گذاری تجربیات
            </Paragraph>
          </DropdownMenuItem>
          <DropdownMenuItem
            key="idea"
            className=""
            onClick={() => router.push("/ideas/create")}
          >
            <Paragraph className="text-lg"> 💡 اشتراک‌گذاری ایده</Paragraph>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
