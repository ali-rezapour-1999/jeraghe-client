"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import React, { useState } from "react";
import "@/style/nav-css.css";
import Link from "next/link";
import { Bell, Menu, Pencil, Telescope, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import ProfileDrawer from "@/components/ui/drawer/profileDrawer";
import AuthDrawer from "@/components/ui/drawer/authDrawer";
import { usePathname } from "next/navigation";
import useDrawerState from "@/state/drawerState";
import { useAuthStore } from "@/state/authState";
import DarkModeToggle from "./darkModeToggle";
import Btn from "@/components/ui/btn";
import Logo from "./logo";

const MotionNav = motion.create(Navbar);

type navLintType =  {
  id: number;
  href: string;
  label: string;
}

const navLinkList: navLintType[] = [
  { id: 1, href: "/explorer", label: "مجموعه" },
  { id: 2, href: "/partner", label: "همکاری" },
  { id: 3, href: "/rule", label: "قوانین" },
  { id: 4, href: "/about-us", label: "چرا ؟؟" },
];

const MainNavBar: React.FC = () => {
  const router = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const {
    isOpenUserDrawer,
    setUserDrawer,
    isOpenProfileDrawer,
    setProfileDrawer,
  } = useDrawerState();
  const { isAuthenticated } = useAuthStore();

  return (
    <MotionNav
      shouldHideOnScroll
      className="w-full px-1 md:px-10 py-1 main-nav-bar bg-light dark:bg-darkPrimary"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarBrand className="flex gap-7">
        <Logo />
        {navLinkList.map((item) => (
          <Link
            className="dark:text-light text-primary font-bold hidden lg:flex"
            href={item.href}
            key={item.id}
          >
            {item.label}
          </Link>
        ))}
      </NavbarBrand>
      <NavbarContent justify="end" className="gap-2">
        <NavbarMenu className="py-10 flex flex-col gap-5 justify-start items-center w-full">
          {navLinkList.map((item, index) => (
            <NavbarMenuItem
              key={`${item.id}-${index}`}
              className="w-full text-2xl text-center"
            >
              <Link
                color={
                  index === 2
                    ? "warning"
                    : index === navLinkList.length - 1
                      ? "danger"
                      : "foreground"
                }
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
        <NavbarItem>
          <Btn
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 md:hidden flex px-0 dark:bg-primary-dark bg-primary-light text-primary"
          >
            <Menu />
          </Btn>
        </NavbarItem>
        <NavbarItem>
          <Btn
            link={
              router === "/explorer" || router === "/" ? "/write" : "/explorer"
            }
            className="w-max h-10 md:flex hidden px-5 bg-green-dark text-light-light dark:bg-green-dark dark:text-light"
          >
            {router === "/explorer" || router === "/" ? (
              <div className="flex items-center justify-center gap-2">
                <p className="text-[1.2em]">نوشتن</p>
                <Pencil size={22} />
              </div>
            ) : (
              <Telescope size={20} />
            )}
          </Btn>
        </NavbarItem>
        {isAuthenticated ? (
          <NavbarItem className="hidden md:flex">
            <Btn className=" w-10 h-10 px-0 dark:bg-primary-dark bg-primary-light text-primary">
              <Bell size={20} />
            </Btn>
          </NavbarItem>
        ) : null}

        <NavbarItem className="hidden">
          <DarkModeToggle />
        </NavbarItem>
        <NavbarItem>
          <Btn
            onClick={() =>
              isAuthenticated ? setProfileDrawer(true) : setUserDrawer(true)
            }
            className="w-10 h-10 px-0 flex dark:bg-primary-dark bg-primary-light text-primary"
          >
            <UserRound size={20} />
          </Btn>
        </NavbarItem>
      </NavbarContent>
      {isAuthenticated ? (
        <ProfileDrawer
          onClose={() => setProfileDrawer(false)}
          isOpen={isOpenProfileDrawer}
        />
      ) : (
        <AuthDrawer
          isOpen={isOpenUserDrawer}
          onClose={() => setUserDrawer(false)}
        />
      )}
    </MotionNav>
  );
};

export default MainNavBar;
