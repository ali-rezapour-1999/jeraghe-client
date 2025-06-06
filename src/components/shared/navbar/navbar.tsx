"use client";

import React from "react";
import { UserRound } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Logo from "../logo";
import { useAuthStore } from "@/store/authState";
import useBaseState from "@/store/baseState";
import { PageDropdownMenu } from "@/components/ui/dropdown/pageDropdown";
import Spinner from "../spinner";
import UserDropdownMenu from "@/components/ui/dropdown/userDropdown";
import { Paragraph } from "@/components/ui/text";
import Link from "next/link";
import { FaExclamationCircle } from "react-icons/fa";

export type navLintType = {
  id: number;
  href: string;
  label: string;
  description: string;
};

const navLinkList: navLintType[] = [
  {
    id: 1,
    href: "/explorer",
    label: "🌐 مجموعه‌ها",
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
];

const MotionNav = motion.create("nav");

const Navbar: React.FC = () => {
  const { isAuthenticated, user, isLoading } = useAuthStore();
  return (
    <MotionNav
      className="w-full px-4 md:px-10 py-1 main-nav-bar bg-transparent dark:bg-transparent flex justify-between items-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Logo />
      <div className="hidden md:flex items-center gap-4">
        {navLinkList.map((item) => (
          <Link
            key={item.id}
            className="flex px-2 rounded-xl"
            href={item.href}
          >
            <Paragraph variant="default" className="text-md">
              {item.label}
            </Paragraph>
          </Link>
        ))}
      </div>
      <div className="gap-2 flex">
        <div className="block md:hidden">
          <PageDropdownMenu navLinkList={navLinkList} />
        </div>

        <div className="flex items-center gap-2">
          <FaExclamationCircle className="size-5" />
          {isAuthenticated && user?.username ? (isLoading ? (<Spinner variant="primary" />) : (<UserDropdownMenu />))
            : (
              <Button className="px-3 rounded-xl" variant="gradient">
                <Link href="/auth" className="flex gap-2">
                  <Paragraph>ورود / ثبت نام</Paragraph>
                  <UserRound size={20} />
                </Link>
              </Button>
            )}
        </div>
      </div>
    </MotionNav>
  );
};

export default Navbar;
