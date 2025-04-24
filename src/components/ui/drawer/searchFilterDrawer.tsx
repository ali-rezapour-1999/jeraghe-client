"use client";

import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/react";
import Btn from "@/components/ui/button";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterDrawer: React.FC<ProfileDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer
      placement="right"
      isOpen={isOpen}
      size="5xl"
      backdrop="blur"
      onClose={onClose}
    >
      <DrawerContent>
        {(onClose) => (
          <div>
            <DrawerHeader className="flex flex-col gap-1">
              فیلتر کردن موارد
            </DrawerHeader>
            <DrawerBody></DrawerBody>
            <DrawerFooter>
              <Btn onClick={onClose}>بستن</Btn>
            </DrawerFooter>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default FilterDrawer;
