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
      <NavbarBrand>
        <Link href="/">
          <Image src={logo} width={80} height={80} alt="website logo" />
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end" className="gap-2">
        <NavbarItem>
          <Btn
            link={router === "/" ? "/explorer" : "/"}
            className="text-sm md:text-lg w-14 bg-primary-dark text-light-light dark:bg-light dark:text-primary"
          >
            {router === "/" ? <Telescope /> : <Home />}
          </Btn>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Btn className="text-sm w-14 md:text-lg">
            <Bell />
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
            className="w-14 text-sm md:text-lg"
          >
            <UserRound />
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
