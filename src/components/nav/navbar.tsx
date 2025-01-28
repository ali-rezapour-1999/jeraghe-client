"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import React from "react";
import logo from "../../../public/logo.png";
import "../../style/nav-css.css";
import Link from "next/link";
import { Bell, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import ProfileDrawer from "../sidebar/profileDrawer";

const MotionNav = motion.create(Navbar);

const MainNavBar: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const text = "سلام به جرقه خوش آومدی";
  const words = text.split(" ");
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
          <Image src={logo} width={60} height={60} alt="website logo" />
        </Link>
        <div className="sm:text-lg md:text-xl mr-4 font-bold text-primary flex space-x-1 rtl:space-x-reverse">
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.3 }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      </NavbarBrand>
      <NavbarContent justify="end" className="gap-2">
        <NavbarItem className="hidden md:flex">
          <Button className="text-primary rounded-2xl min-w-0 px-3 text-sm md:text-lg">
            <Bell />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            onPress={onOpen}
            className="bg-primary rounded-2xl text-light min-w-0 px-3 text-sm md:text-lg"
          >
            <UserRound />
          </Button>
        </NavbarItem>
      </NavbarContent>
      <ProfileDrawer onClose={onClose} isOpen={isOpen} />
    </MotionNav>
  );
};

export default MainNavBar;
