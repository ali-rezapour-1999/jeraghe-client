"use client";

import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerBody,
  Button,
  DrawerFooter,
} from "@heroui/react";
import Login from "../section/authSection/login";
import Register from "../section/authSection/register";

interface AuthDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthDrawer: React.FC<AuthDrawerProps> = ({ isOpen, onClose }) => {
  const [isLogin, setAuthSection] = useState<boolean>(true);
  return (
    <>
      <Drawer
        placement="left"
        isOpen={isOpen}
        size="xl"
        backdrop="blur"
        onClose={onClose}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerBody className="h-full flex justify-center items-center">
                {isLogin ? <Login /> : <Register />}

                {isLogin ? (
                  <h3
                    className="hover:cursor-pointer mt-3 text-gray-700"
                    onClick={() => setAuthSection(false)}
                  >
                    هنوز حساب کاربری ندارم!
                  </h3>
                ) : (
                  <h3
                    className="hover:cursor-pointer mt-3 text-gray-700"
                    onClick={() => setAuthSection(true)}
                  >
                    حساب کاربری دارم!
                  </h3>
                )}
              </DrawerBody>
              <DrawerFooter>
                <Button
                  className="w-full bg-red-400 text-light"
                  onPress={onClose}
                >
                  بستن
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AuthDrawer;
