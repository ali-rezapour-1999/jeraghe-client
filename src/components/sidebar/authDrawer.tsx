"use client";

import React, { useState } from "react";
import { Drawer, DrawerContent, DrawerBody, DrawerFooter } from "@heroui/react";
import Login from "../section/authSection/login";
import Register from "../section/authSection/register";
import Btn from "../button/btn";

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
                    className="hover:cursor-pointer mt-3 text-gray-700 dark:text-gray-200"
                    onClick={() => setAuthSection(false)}
                  >
                    هنوز حساب کاربری ندارم!
                  </h3>
                ) : (
                  <h3
                    className="hover:cursor-pointer mt-3 text-gray-700 dark:text-gray-200"
                    onClick={() => setAuthSection(true)}
                  >
                    حساب کاربری دارم!
                  </h3>
                )}
              </DrawerBody>
              <DrawerFooter>
                <Btn
                  className="w-full dark:bg-red-500 text-light"
                  onClick={onClose}
                >
                  بستن
                </Btn>

                <Btn type="submit" className="w-full dark:bg-light-dark">
                  ورود از طریق حساب گوگل
                </Btn>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AuthDrawer;
