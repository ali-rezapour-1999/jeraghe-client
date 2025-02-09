"use client";

import React, { useState } from "react";
import { Drawer, DrawerContent, DrawerBody, DrawerFooter } from "@heroui/react";
import Login from "@/app/_auth/login";
import Register from "@/app/_auth/register";
import Btn from "../btn";
import google from "../../../public/icons/google.svg";
import github from "../../../public/icons/icons8-github.svg";
import Image from "next/image";

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
              <DrawerFooter className="flex flex-col px-10">
                <Btn
                  type="submit"
                  className="relative w-full font-bold overflow-hidden bg-light dark:bg-primary-light text-primary dark:text-primary"
                >
                  ورود از طریق حساب گیت هاب
                  <Image src={github} alt="google" width={25} height={25} />
                </Btn>
                <Btn
                  type="submit"
                  className="relative w-full text-white font-bold overflow-hidden"
                >
                  <span
                    className="absolute inset-0 bg-gradient-to-r"
                    style={{
                      background:
                        "linear-gradient(90deg, #2C5DA8 25%, #20632E 50%, #B88A03 75%, #A82D24 100%)",
                    }}
                  ></span>
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    ورود از طریق حساب گوگل
                    <Image src={google} alt="google" width={25} height={25} />
                  </div>
                </Btn>
                <Btn
                  className="w-full bg-red-400 dark:bg-red-400 text-light"
                  onClick={onClose}
                >
                  بستن
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
