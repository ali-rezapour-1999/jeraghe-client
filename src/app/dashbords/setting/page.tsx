"use client";
import { Tab, Tabs } from "@heroui/react";
import ResetPassword from "./resetPassword";
import UpdateUserDetail from "./userUpdate";

const SettingSection: React.FC = () => {
  return (
    <Tabs
      aria-label="Options"
      classNames={{
        tab: "text-xl h-10 w-full",
        tabContent: "px-20 w-full",
        tabList: "w-full",
        base: "w-full",
      }}
      className="mb-10"
    >
      <Tab key="update-user" title="اطلاعات کاربری">
        <UpdateUserDetail />
      </Tab>
      <Tab key="reset-password" title="تغییر ررمز عبور">
        <ResetPassword />
      </Tab>
    </Tabs>
  );
};

export default SettingSection;
