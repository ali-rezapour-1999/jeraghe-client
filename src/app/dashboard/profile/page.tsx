"use client";
import React from "react";
import ProfileInfo from "./profile";
import SocialMedia from "./socialMedia";
import { Tab, Tabs } from "@heroui/react";

const ProfileUpdateSection = () => {
  return (
    <Tabs
      aria-label="Options"
      classNames={{
        tab: "text-xl h-10 w-full",
        tabContent: "px-10 w-full",
        tabList: "w-full",
        base: "w-full",
      }}
      className="mb-10"
    >
      <Tab key="profile-info" title="اطلاعات عمومی">
        <ProfileInfo />
      </Tab>
      <Tab key="social-media" title="میتونیم تو رو در ؟؟؟">
        <SocialMedia />
      </Tab>
    </Tabs>
  );
};
export default ProfileUpdateSection;
