"use client";

import { Button } from "@heroui/react";
import React, { forwardRef } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react"; // یا آیکون دلخواه برای حالت لودینگ

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  link?: string;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
  isDisabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Btn = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      onClick,
      className = "",
      link,
      type = "button",
      style,
      isDisabled = false,
      isLoading = false,
      loadingText = "Loading...",
      iconLeft,
      iconRight,
    },
    ref
  ) => {
    const content = (
      <Button
        ref={ref}
        type={type}
        onPress={onClick}
        isDisabled={isDisabled || isLoading}
        className={`focus:outline-none rounded-md min-w-0 flex items-center gap-2 ${className}`}
        style={style}
      >
        {isLoading && <Loader2 className="animate-spin w-4 h-4 text-white" />}
        {!isLoading && iconLeft}
        {isLoading ? loadingText : children}
        {!isLoading && iconRight}
      </Button>
    );

    return link ? (
      <Link href={link} passHref legacyBehavior>
        {content}
      </Link>
    ) : (
      content
    );
  }
);

Btn.displayName = "Btn";
export default Btn;
