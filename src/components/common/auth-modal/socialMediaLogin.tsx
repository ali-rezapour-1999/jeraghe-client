import { Button } from "@heroui/react";
import React from "react";
import { TfiGithub } from "react-icons/tfi";
import { FcGoogle } from "react-icons/fc";

const SocialMediaLogin = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full gap-2 ">
      <Button
        className="text-dark dark:text-light px-0 py-5 dark:bg-black/20 bg-gray-200/20 gap-3 font-bold text-md w-full flex items-center justify-center"
        size="md"
      >
        حساب گیت هاب
        <TfiGithub size={25} />
      </Button>
      <Button
        className="text-dark dark:text-light px-0 py-5 dark:bg-black/20 bg-gray-200/20 gap-3 font-bold text-md w-full flex items-center justify-center"
        size="md"
      >
        حساب گوگل
        <FcGoogle size={25} />
      </Button>
    </div>
  );
};

export default SocialMediaLogin;
