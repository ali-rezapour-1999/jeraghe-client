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
import logo from "../../../public/logo.png";
import "../../style/nav-css.css";
import Link from "next/link";
import { Bell, Home, Telescope, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import ProfileDrawer from "../sidebar/profileDrawer";
import AuthDrawer from "../sidebar/authDrawer";
import { usePathname } from "next/navigation";
import useDrawerState from "@/state/drawerState";
import { useAuthStore } from "@/state/authState";
import DarkModeToggle from "../darkModeToggle";
import Btn from "../button/btn";

const MotionNav = motion.create(Navbar);

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
        <Link href="/">
          <Image src={logo} width={70} height={70} alt="website logo" />
        </Link>
        <Link href="/">نوشتن</Link>
        <Link href="/">همکاری</Link>
      </NavbarBrand>
      <NavbarContent justify="end" className="gap-2">
        <NavbarItem>
          <Btn
            link={router === "/" ? "/explorer" : "/"}
            className="w-10 h-10 px-0 bg-primary-dark text-light-light dark:bg-light dark:text-primary"
          >
            {router === "/" ? <Telescope size={20} /> : <Home size={20} />}
          </Btn>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Btn className=" w-10 h-10 px-0">
            <Bell size={20} />
          </Btn>
        </NavbarItem>

        <NavbarItem className="hidden md:flex">
          <DarkModeToggle />
        </NavbarItem>
        <NavbarItem>
          <Btn
            onClick={() =>
              isAuthenticated ? setProfileDrawer(true) : setUserDrawer(true)
            }
            className="w-10 h-10 px-0"
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
