import React from "react";
import Link from "next/link";
import { Home } from "lucide-react";
import notFontImage from "../../public/main-image/404.png";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center flex-col gap-7">
      <div className="flex items-center justify-center gap-4 text-4xl md:text-7xl font-bold text-darkPrimary dark:text-light">
        <Image
          src={notFontImage.src}
          alt="404 image"
          width={500}
          height={500}
          layout="full"
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <p className="text-lg md:text-2xl font-bold text-darkPrimary dark:text-light">
          اوه اوه اشتباه اومدی احتمالا آدرس اشتباه زدی یا این صفحه منقضی شده.
        </p>
        <Link
          href={"/"}
          className="flex items-center justify-center gap-2  px-7 py-3 text-lg rounded-2xl mt-1"
        >
          <span>صفحه اصلی</span>
          <Home />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
