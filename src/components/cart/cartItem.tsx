"use client";
import Image from "next/image";
import React from "react";
import logo from "../../../public/logo.png";
import { Hourglass } from "lucide-react";

interface CartItemProps {
  onOpen: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ onOpen }) => {
  return (
    <div
      onClick={onOpen}
      className="dark:bg-light-dark bg-light p-5 rounded-2xl  cursor-pointer"
    >
      <div className="flex items-center gap-3  pb-3 mb-3">
        <Image src={logo} alt="logo" width={90} height={90} />
        <div className="flex flex-col text-primary dark:text-light">
          <h1 className="font-bold">ساخت سایت سلام بر جرقه</h1>
          <h4 className="text-sm">برنامه نویسی</h4>
        </div>
      </div>
      <div>
        <h4 className="bg-primary w-max text-light px-5 rounded-2xl text-lg">
          alirg
        </h4>
      </div>

      <div className="mt-5">
        <p className="text-primary dark:text-primary-light">
          1. یک دیتابیس از سایت ووکامرسی دیگه هست که میخوام فقط جداول ( محصولات
          - دسته بندی - یوزرها ) و در آخر ریدایرکت کردن لینک های محصول به db
          سایت جدید که لینکشو بالا گفتم انتقال پیدا کنه .
        </p>
      </div>
      <div className="mt-3 pt-5 flex justify-between">
        <h1 className="text-gray-500">حداقل زمان برای مشارکت</h1>
        <div className="text-gray-500 flex items-center justify-center gap-1">
          <Hourglass size="16" />
          <span>1 ساعت</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
