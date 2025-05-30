import Image from "next/image";
import Link from "next/link";
import React from "react";
import logoImage from "../../../public/logo.png";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={`w-[60px] 2xl:w-[70px] h-[70px] ${className}`}>
      <Image
        src={logoImage}
        width={70}
        height={70}
        alt="website logo"
        className="w-full h-full object-contain"
      />
    </Link>
  );
};

export default Logo;
