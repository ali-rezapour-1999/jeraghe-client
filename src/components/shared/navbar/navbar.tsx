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

const MotionNav = motion.create("nav");

const Navbar: React.FC = () => {
  const { isAuthenticated, user, isLoading } = useAuthStore();
  const { setOpenAuthRequireModel, setOpenUserProfile } = useBaseState();
  const userStatusHanlder = async () => {
    if (isAuthenticated) setOpenUserProfile(true);
    else setOpenAuthRequireModel(true);
  };
  return (
    <MotionNav
      className="w-full px-0 md:px-10 py-1 main-nav-bar bg-transparent dark:bg-transparent flex justify-between items-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Logo />
      <div className="gap-2 flex">
        <div>
          <PageDropdownMenu />
        </div>

        <div>
          {isAuthenticated && user?.username ? (
            isLoading ? (
              <Spinner color="success" />
            ) : (
              <UserDropdownMenu />
            )
          ) : (
            <Button
              className="h-8 md:h-10 flex px-3 text-primary-dark dark-primary-light"
              onClick={userStatusHanlder}
            >
              <Paragraph className="hidden md:block">ورود / ثبت نام</Paragraph>
              <UserRound size={20} />
            </Button>
          )}
        </div>
      </div>
    </MotionNav>
  );
};

export default Navbar;
