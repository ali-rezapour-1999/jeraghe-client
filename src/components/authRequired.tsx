import Btn from "@/components/btn";
import MainNavBar from "@/components/navbar";
import useDrawerState from "@/state/drawerState";
import React from "react";

const AuthRequired = () => {
  const { isOpenUserDrawer, setUserDrawer } = useDrawerState();
  return (
    <div>
      <MainNavBar />
      <div className="w-full mt-10 flex flex-col gap-5 justify-center items-center">
        <h1 className="text-xl md:text-4xl">
          برای دسترسی به این بخش، لطفاً ابتدا وارد حساب کاربری خود شوید
        </h1>
        <Btn
          onClick={() => setUserDrawer(!isOpenUserDrawer)}
          className="text-lg md:text-2xl"
        >
          ورود / ثبت نام
        </Btn>
      </div>
    </div>
  );
};

export default AuthRequired;
