"use client";
import ProfileSectionContainer from "@/components/container/profileContainer";
import React from "react";

interface PropsItemSection {
  title: string;
  count: number;
  className?: string;
}

const ItemSection: React.FC<PropsItemSection> = ({ title, count }) => {
  return (
    <div
      className={`w-full flex justify-between px-10 py-2 items-center bg-light-light text-darkPrimary dark:text-light dark:bg-light-dark rounded-2xl h-full`}
    >
      <span>{title}</span>
      <span className="pt-1 text-xl">{count}</span>
    </div>
  );
};

const ProfileViewSection: React.FC = () => {
  return (
    <ProfileSectionContainer delay={0.3}>
      <ItemSection title="درخواست های من" count={10} />
      <ItemSection title="مشارکت" count={10} />
      <ItemSection title="تکمیلی" count={10} />
    </ProfileSectionContainer>
  );
};

export default ProfileViewSection;
