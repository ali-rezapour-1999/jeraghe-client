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
  style?: React.CSSProperties;
  isDisable?: boolean
}

const Btn: React.FC<BtnProps> = ({
  children,
  onClick,
  className,
  link,
  type,
  style,
  isDisable = false
}) => {
  return link ? (
    <Link href={link} legacyBehavior passHref>
      <Button
        isDisabled={isDisable}
        className={`focus:outline-none rounded-2xl min-w-0 dark:bg-green-dark bg-green-dark text-white dark:text-light ${className}`}
        style={style}
      >
        {children}
      </Button>
    </Link>
  ) : (
    <Button
      isDisabled={isDisable}
      type={type}
      onPress={onClick}
      className={`focus:outline-none rounded-2xl min-w-0 dark:bg-green-dark bg-green-dark text-white dark:text-light ${className}`}
    >
      {children}
    </Button>
  );
};

export default Btn;
