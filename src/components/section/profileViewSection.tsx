"use client";
import React from "react";
import ProfileSectionContainer from "../container/prfileContainer";

interface PropsItemSection {
  title: string;
  count: number;
  className?: string;
}

const ItemSection: React.FC<PropsItemSection> = ({
  title,
  count,
  className,
}) => {
  return (
    <div
      className={`flex flex-col justify-center bg-background rounded-3xl h-full p-2 pt-4 shadow-md items-center gap-1 ${className || ""}`}
    >
      <span>{title}</span>
      <span>{count}</span>
    </div>
  );
};

const ProfileViewSection: React.FC = () => {
  return (
    <ProfileSectionContainer delay={0.3}>
      <ItemSection title="درخواست های من" count={10} className="w-full" />
      <div className="flex w-full gap-2">
        <ItemSection title="مشارکت" count={10} className="w-1/2" />
        <ItemSection title="ایده های تکمیل شده" count={10} className="w-1/2" />
      </div>
    </ProfileSectionContainer>
  );
};

export default ProfileViewSection;
