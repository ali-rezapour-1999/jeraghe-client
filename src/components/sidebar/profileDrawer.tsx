"use client";

import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@heroui/react";
import { useAuthStore } from "@/state/authState";
import useDrawerState from "@/state/drawerState";

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
            <Button color="danger" variant="light" onPress={logout}>
              خروج از حساب کاربری
            </Button>
          </DrawerBody>
          <DrawerFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => setProfileDrawer(false)}
            >
              بستن
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ProfileDrawer;
