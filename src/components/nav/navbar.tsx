"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@heroui/react";
import Image from "next/image";
import React from "react";
import logo from "../../../public/logo.png";
import "../../style/nav-css.css";
import Link from "next/link";
import { Bell, Home, Telescope, UserRound } from "lucide-react";
import { motion } from "framer-motion";
// import ProfileDrawer from "../sidebar/profileDrawer";
import AuthDrawer from "../sidebar/authDrawer";
import { usePathname } from "next/navigation";
import useDrawerState from "@/state/drawerState";

const MotionNav = motion.create(Navbar);

const MainNavBar: React.FC = () => {
  const router = usePathname();
  const { isOpenUserDrawer, setUserDrawer } = useDrawerState();
  return (
    <MotionNav
      shouldHideOnScroll
      className="w-full px-1 drop-shadow md:px-10 py-1 main-nav-bar "
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavbarBrand>
        <Link href="/">
          <Image src={logo} width={80} height={80} alt="website logo" />
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end" className="gap-2">
        <NavbarItem>
          <Button
            as={Link}
            href={router == "/" ? "/explorer" : "/"}
            className="rounded-2xl bg-primary text-light min-w-0 px-3 text-sm md:text-lg"
          >
            {router == "/" ? <Telescope /> : <Home />}
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button className="text-primary rounded-2xl min-w-0 px-3 text-sm md:text-lg">
            <Bell />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            onPress={() => setUserDrawer(true)}
            className="rounded-2xl text-primary min-w-0 px-3 text-sm md:text-lg"
          >
            <p>ورود یا ثبت نام</p>
            <UserRound />
          </Button>
        </NavbarItem>
      </NavbarContent>
      <AuthDrawer
        onClose={() => setUserDrawer(false)}
        isOpen={isOpenUserDrawer}
      />
    </MotionNav>
  );
};

// <ProfileDrawer onClose={onClose} isOpen={isOpen} />

export default MainNavBar;
