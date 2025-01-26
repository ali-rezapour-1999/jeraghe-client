"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  extendVariants,
} from "@heroui/react";
import Image from "next/image";
import React from "react";
import logo from "../../../public/logo.png";
import "../../style/nav-css.css";
import Link from "next/link";
import { Bell, UserRound } from "lucide-react";

export const MyButton = extendVariants(Navbar, {
  variants: {},
});

const MainNavBar: React.FC = () => {
  return (
    <Navbar
      shouldHideOnScroll
      className="w-full px-1 md:px-5 py-1 main-nav-bar shadow-md"
      isBordered
    >
      <NavbarBrand>
        <Link href="/">
          <Image src={logo} width={80} height={80} alt="website logo" />
        </Link>
      </NavbarBrand>
      <NavbarContent
        className="hidden sm:flex gap-4"
        justify="center"
      ></NavbarContent>
      <NavbarContent justify="end" className="gap-2">
        <NavbarItem className="hidden md:flex">
          <Button className="text-green min-w-0 px-3 text-sm md:text-lg">
            <Bell />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            href="/"
            className="bg-green text-light sm md:text-lg"
          >
            ورود یا ثبت نام
            <UserRound />
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default MainNavBar;
