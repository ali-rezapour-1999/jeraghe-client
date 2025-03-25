"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Spinner,
} from "@heroui/react";
import React from "react";
import "@/style/nav-css.css";
import { UserRound } from "lucide-react";
import { motion } from "framer-motion";
import { useAuthStore } from "@/state/authState";
import Btn from "@/components/ui/btn";
import Logo from "./logo";
import { CustomDropdownMenu } from "../ui/dropdown";
import { useRouter } from "next/navigation";
import useBaseState from "@/state/baseState";

const MotionNav = motion.create(Navbar);

const MainNavBar: React.FC = () => {
  const { isAuthenticated, user, isLoading } = useAuthStore();
  const { setOpenAuthRequireModel } = useBaseState();
  const router = useRouter();
  const userStatusHanlder = async () => {
    if (isAuthenticated) router.push("/dashboard");
    else setOpenAuthRequireModel(true);
  };
  return (
    <MotionNav
      shouldHideOnScroll
      className="w-full px-0 md:px-10 py-1 main-nav-bar bg-transparent dark:bg-transparent"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavbarBrand className="flex gap-3">
        <Logo />
        <p className="hidden sm:flex text-primary dark:text-light font-bold">
          سلام به جرقه خوش آومدی👋
        </p>
      </NavbarBrand>
      <NavbarContent justify="end" className="gap-2">
        <NavbarItem className="border-l-1">
          <CustomDropdownMenu />
        </NavbarItem>

        <NavbarItem>
          <Btn
            className="h-8 md:h-10 flex  bg-transparent rounded-lg px-3"
            onClick={userStatusHanlder}
          >
            {isAuthenticated ? (
              <p className="hidden md:block">
                {isLoading ? <Spinner /> : user?.username}
              </p>
            ) : (
              <p className="hidden md:block">ورود / ثبت نام</p>
            )}
            <UserRound size={20} />
          </Btn>
        </NavbarItem>
      </NavbarContent>
    </MotionNav>
  );
};

export default MainNavBar;
