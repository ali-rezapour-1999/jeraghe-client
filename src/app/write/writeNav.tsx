import Btn from "@/components/ui/btn";
import DarkModeToggle from "@/components/common/darkModeToggle";
import Logo from "@/components/common/logo";
import { Navbar, NavbarBrand, NavbarContent, Spinner } from "@heroui/react";
import { motion } from "framer-motion";
import React from "react";
import useDrawerState from "@/state/drawerState";

const MotionNav = motion.create(Navbar);

const WriteNav = ({
  isSave,
  contentLength,
}: {
  isSave: boolean;
  contentLength: number;
}) => {
  const { setWriteOptionDrawer, isOpenWriteDrawer } = useDrawerState();
  return (
    <MotionNav
      shouldHideOnScroll
      classNames={{
        base: "dark:bg-transparent bg-transparent pt-7 pb-4",
        wrapper: "max-w-[1400px] w-full ",
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      maxWidth="2xl"
    >
      <NavbarBrand>
        <Logo />
      </NavbarBrand>
      <NavbarContent
        justify="end"
        className="gap-5 flex items-center justify-center"
      >
        {isSave ? (
          <div className="text-xl w-26 px-3 bg-transparent dark:bg-transparent text-green-dark dark:text-green-dark flex gap-1">
            <Spinner size="md" color="success" />
            <p className="text-xl">ذخیره {contentLength} کاراکتر</p>
          </div>
        ) : (
          <Btn
            className="h-10 text-xl w-26 md:h-12 px-3 bg-transparent dark:bg-transparent text-primary dark:text-light"
            onClick={() => setWriteOptionDrawer(!isOpenWriteDrawer)}
          >
            ثبت پست
          </Btn>
        )}
        <DarkModeToggle />
      </NavbarContent>
    </MotionNav>
  );
};

export default WriteNav;
