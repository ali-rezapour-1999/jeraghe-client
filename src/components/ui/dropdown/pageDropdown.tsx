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
import { BsMenuDown } from "react-icons/bs";
import { navLintType } from "@/components/shared/navbar/navbar";


export const PageDropdownMenu = ({ navLinkList }: { navLinkList: navLintType[] }) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-max h-8 py-2 px-4 md:h-9 min-w-0 flex rounded-xl" variant='ghost'>
          <span className="text-[16px] hidden md:block"> کشف محتواها</span>
          <BsMenuDown className="size-6" />
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
