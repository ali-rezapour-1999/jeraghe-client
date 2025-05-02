import React from "react";
import { TfiGithub } from "react-icons/tfi";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

const SocialMediaLogin = () => {
  return (
    <div className="flex flex-col  items-center justify-center w-full gap-2 ">
      <Button className="text-dark dark:text-light px-0 py-3 dark:bg-black/20 bg-gray-200/20 gap-3 font-bold text-md w-full flex items-center justify-center">
        حساب گیت هاب
        <TfiGithub size={20} />
      </Button>
      <Button className="text-dark dark:text-light px-0 py-5 dark:bg-black/20 bg-gray-200/20 gap-3 font-bold text-md w-full flex items-center justify-center">
        حساب گوگل
        <FcGoogle size={20} />
      </Button>
    </div>
  );
};

export default SocialMediaLogin;
