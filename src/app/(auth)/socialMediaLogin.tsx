import { Button } from "@heroui/react";
import React from "react";
import { TfiGithub } from "react-icons/tfi";
import { FcGoogle } from "react-icons/fc";

const SocialMediaLogin = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full gap-1 py-4">
      <Button
        className="text-dark bg-transparent px-0 gap-0 text-lg flex items-center justify-center w-full"
        size="md"
      >
        <p className="w-[80%] bg-light h-full rounded-r-md flex items-center justify-center">
          ورود با حساب گیت هاب
        </p>
        <div className="w-[20%] bg-black h-full items-center flex justify-center rounded-l-md">
          <TfiGithub size={25} color="white" />
        </div>
      </Button>
      <Button
        className="text-dark dark:text-light px-0 bg-transparent gap-0 text-lg w-full flex items-center justify-center"
        size="md"
      >
        <p className="w-[80%] bg-[#F54235] h-full rounded-r-md flex items-center justify-center">
          ورود با حساب گوگل
        </p>
        <div className="w-[20%] bg-[#C62F25] h-full items-center flex justify-center rounded-l-md">
          <FcGoogle size={25} />
        </div>
      </Button>
    </div>
  );
};

export default SocialMediaLogin;
