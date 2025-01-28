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
              <Button color="danger" variant="light" onPress={onClose}>
                بستن
              </Button>
            </DrawerFooter>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default FilterDrawer;
