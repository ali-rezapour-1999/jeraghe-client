"use client";

import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/react";
import { useAuthStore } from "@/state/authState";
import useDrawerState from "@/state/drawerState";
import Btn from "../button/btn";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = () => {
  const { logout } = useAuthStore();
  const { isOpenProfileDrawer, setProfileDrawer } = useDrawerState();
  return (
    <>
      <Drawer
        placement="left"
        isOpen={isOpenProfileDrawer}
        size="5xl"
        backdrop="blur"
        onClose={() => setProfileDrawer(false)}
      >
        <DrawerContent>
          <DrawerHeader className="flex flex-col gap-1">
            Drawer Title
          </DrawerHeader>
          <DrawerBody>
            <Btn onClick={logout} className="dark:bg-red-500 text-light">
              خروج از حساب کاربری
            </Btn>
          </DrawerBody>
          <DrawerFooter>
            <Btn onClick={() => setProfileDrawer(false)}>بستن</Btn>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ProfileDrawer;
