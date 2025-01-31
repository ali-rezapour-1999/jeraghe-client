"use client";
import { Button } from "@heroui/react";
import React from "react";
import Link from "next/link";

interface BtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  link?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

const Btn: React.FC<BtnProps> = ({
  children,
  onClick,
  className,
  link,
  type,
}) => {
  return link ? (
    <Link href={link} legacyBehavior passHref>
      <Button
        className={`rounded-2xl min-w-0 text-primary dark:text-light dark:bg-darkPrimary ${className}`}
      >
        {children}
      </Button>
    </Link>
  ) : (
    <Button
      type={type}
      onPress={onClick}
      className={`rounded-2xl min-w-0 text-primary dark:text-light dark:bg-darkPrimary ${className}`}
    >
      {children}
    </Button>
  );
};

export default Btn;
