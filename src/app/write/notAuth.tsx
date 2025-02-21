import Btn from "@/components/btn";
import MainNavBar from "@/components/navbar";
import useDrawerState from "@/state/drawerState";
import React from "react";

const NotAuth = () => {
  const { isOpenUserDrawer, setUserDrawer } = useDrawerState();
  return (
    <div>
      <MainNavBar />
      <div className="w-full mt-10 flex flex-col gap-5 justify-center items-center">
        <h1 className="text-xl md:text-4xl">
          برای استفاده از این بخش باید اول ورود کنید
        </h1>
        <Btn onClick={() => setUserDrawer(!isOpenUserDrawer)}>
          ورود / ثبت نام
        </Btn>
      </div>
    </div>
  );
};

export default NotAuth;
