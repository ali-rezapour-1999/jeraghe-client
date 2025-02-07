"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Spinner,
} from "@heroui/react";
import Image from "next/image";
import React from "react";
import logo from "../../public/logo.png";
import "@/style/nav-css.css";
import Link from "next/link";
import { Bell, Home, Telescope, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import ProfileDrawer from "@/components/drawer/profileDrawer";
import AuthDrawer from "@/components/drawer/authDrawer";
import { usePathname } from "next/navigation";
import useDrawerState from "@/state/drawerState";
import { useAuthStore } from "@/state/authState";
import DarkModeToggle from "./darkModeToggle";
import Btn from "@/components/btn";

const MotionNav = motion.create(Navbar);

interface navLintType {
  id: number;
  href: string;
  label: string;
}

const navLinkList: navLintType[] = [
  { id: 1, href: "/write", label: "نوشتن" },
  { id: 2, href: "/partner", label: "همکاری" },
  { id: 3, href: "/rule", label: "قوانین" },
  { id: 4, href: "/about-us", label: "چرا ؟؟" },
];

const MainNavBar: React.FC = () => {
  const router = usePathname();
  const {
    isOpenUserDrawer,
    setUserDrawer,
    isOpenProfileDrawer,
    setProfileDrawer,
  } = useDrawerState();
  const { isAuthenticated, isLoading } = useAuthStore();

  return (
    <MotionNav
      shouldHideOnScroll
      className="w-full px-1 md:px-10 py-1 main-nav-bar bg-light dark:bg-darkPrimary"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      isBordered
    >
      <NavbarBrand className="flex gap-7">
        <Link href="/" className="w-[70px] h-[70px]">
          <Image
            src={logo}
            width={70}
            height={70}
            alt="website logo"
            className="w-full h-full object-contain"
          />
        </Link>
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
        <NavbarItem>
          <Btn
            link={router === "/" ? "/explorer" : "/"}
            className="w-10 h-10 px-0 bg-green-dark text-light-light dark:bg-green-dark dark:text-light"
          >
            {router === "/" ? <Telescope size={20} /> : <Home size={20} />}
          </Btn>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Btn className=" w-10 h-10 px-0 dark:bg-primary-dark bg-primary-light text-primary">
            <Bell size={20} />
          </Btn>
        </NavbarItem>

        <NavbarItem className="hidden">
          <DarkModeToggle />
        </NavbarItem>
        <NavbarItem>
          <Btn
            onClick={() =>
              isAuthenticated ? setProfileDrawer(true) : setUserDrawer(true)
            }
            className="w-10 h-10 px-0 dark:bg-primary-dark bg-primary-light text-primary"
          >
            <UserRound size={20} />
          </Btn>
        </NavbarItem>
      </NavbarContent>
      {isLoading ? (
        <Spinner />
      ) : isAuthenticated ? (
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
