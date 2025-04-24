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
import Btn from "@/components/ui/button";
import Logo from "./logo";
import { PageDropdownMenu } from "../ui/dropdown/pageDropdown";
import useBaseState from "@/state/baseState";
import { UserDropdownMenu } from "../ui/dropdown/userDropdown";

const MotionNav = motion.create(Navbar);

const MainNavBar: React.FC = () => {
  const { isAuthenticated, user, isLoading } = useAuthStore();
  const { setOpenAuthRequireModel, setOpenUserProfile } = useBaseState();
  const userStatusHanlder = async () => {
    if (isAuthenticated) setOpenUserProfile(true);
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
          <PageDropdownMenu />
        </NavbarItem>

        <NavbarItem>
          {isAuthenticated && user?.username ? (
            isLoading ? (
              <Spinner />
            ) : (
              <UserDropdownMenu
                username={user.username}
                email={user.email}
                image={user.image}
              />
            )
          ) : (
            <Btn
              className="h-8 md:h-10 flex  bg-transparent rounded-lg px-3"
              onClick={userStatusHanlder}
            >
              <p className="hidden md:block">ورود / ثبت نام</p>
              <UserRound size={20} />
            </Btn>
          )}
        </NavbarItem>
      </NavbarContent>
    </MotionNav>
  );
};

export default MainNavBar;
