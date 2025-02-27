"use client";
import Image from "next/image";
import React from "react";
import logo from "../../../../public/logo.png";
import { Hourglass } from "lucide-react";
import { motion } from "framer-motion";
import { useThemeState } from "@/state/themeState";

interface CartItemProps {
  onOpen: () => void;
}

const JobCart: React.FC<CartItemProps> = ({ onOpen }) => {
  const { isDark } = useThemeState();
  return (
    <motion.div
      whileHover={{
        backgroundColor:
          isDark == "dark" ? "rgb(39, 39, 42 , .3)" : "rgb(255, 255, 255 , .2)",
      }}
      transition={{ duration: 0.2 }}
      onClick={onOpen}
      className="bg-transparent border border-gray-300 dark:border-primary-gray p-5 rounded-2xl cursor-pointer h-[300px] flex flex-col justify-between shadow-sm"
    >
      <div className="flex items-center gap-3 pb-3 mb-3">
        <Image
          src={logo}
          alt="logo"
          width={200}
          height={200}
          className="w-[70] h-[70] object-contain"
        />
        <div className="flex flex-col text-primary dark:text-light">
          <h1 className="font-bold">ساخت سایت سلام بر جرقه</h1>
          <h4 className="text-sm">برنامه نویسی</h4>
        </div>
      </div>
      <div>
        <h4 className="dark:bg-light bg-darkPrimary dark:text-darkPrimary text-light w-max px-5 py-1 rounded-2xl text-xs">
          برنامه نویسی
        </h4>
      </div>

      <div className="mt-5">
        <p className="text-primary dark:text-primary-light text-ellipsis line-clamp-2">
          میخوام فقط جداول ( محصولات - کردن لینک های محصول به db میخوام فقط
          جداول ( محصولات - کردن لینک های محصول به db جداول ( محصولات - کردن
          لینک های محصول به db
        </p>
      </div>
      <div className="mt-3 pt-5 flex justify-between">
        <h1 className="text-gray-500 text-sm">حداقل زمان برای مشارکت</h1>
        <div className="text-gray-500 flex items-center justify-center gap-1 text-sm">
          <Hourglass size="14" />
          <span className="mt-1">1 ساعت</span>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCart;
