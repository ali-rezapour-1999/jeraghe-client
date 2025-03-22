import Btn from "@/components/ui/btn";
import MainNavBar from "@/components/common/navbar";
import React from "react";

const AuthRequired = () => {
  return (
    <div>
      <MainNavBar />
      <div className="w-full mt-10 flex flex-col gap-5 justify-center items-center">
        <h1 className="text-xl md:text-4xl">
          برای دسترسی به این بخش، لطفاً ابتدا وارد حساب کاربری خود شوید
        </h1>
        <Btn link="/login" className="text-lg md:text-2xl">
          ورود / ثبت نام
        </Btn>
      </div>
    </div>
  );
};

export default AuthRequired;
