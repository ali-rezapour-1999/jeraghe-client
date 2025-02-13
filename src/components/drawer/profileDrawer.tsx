"use client";

import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Tabs,
  Tab,
} from "@heroui/react";
import { useAuthStore } from "@/state/authState";
import useDrawerState from "@/state/drawerState";
import Btn from "../btn";
import ProfileUpdateSection from "../../app/_profile/profileUpdate";
import Image from "next/image";
import DarkModeToggle from "../darkModeToggle";
import PostSection from "../../app/_profile/postSection";
import ReqeuestSection from "../../app/_profile/requestSection";
import MassageSection from "../../app/_profile/massageSection";
import SettingSection from "../../app/_profile/settingSection";
import man from "../../../public/man.jpg";
import woman from "../../../public/woman.jpg";
import { useProfileState } from "@/state/profileState";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = () => {
  const { logout, user } = useAuthStore();
  const { personalData } = useProfileState();
  const { isOpenProfileDrawer, setProfileDrawer } = useDrawerState();
  const [isWoman, setIsWoman] = useState<any>(man);
  useEffect(() => {
    const changeGender = async () => {
      if (personalData?.gender == "مرد") {
        setIsWoman(man);
      } else setIsWoman(woman);
    };
    changeGender();
  }, [personalData]);
  return (
    <Drawer
      placement="left"
      isOpen={isOpenProfileDrawer}
      size="5xl"
      backdrop="blur"
      onClose={() => setProfileDrawer(false)}
      hideCloseButton
    >
      <DrawerContent>
        <DrawerHeader className="flex  items-center justify-between">
          <div className="flex items-center w-[50px] h-[50px] md:w-[100px] md:h-[100px] gap-5">
            <Image
              src={user?.profile_image || isWoman}
              alt={user?.email || "user image"}
              width={100}
              height={100}
              className="rounded-2xl w-full h-full object-cover"
              objectFit="cover"
            />
            <div>
              <h3 className="text-primary dark:text-light font-thin text-sm md:text-[1.2em]">
                {user?.email}
              </h3>
              <h6 className="text-primary dark:text-light font-thin text-sm md:text-md mt-2">
                {user?.username}
              </h6>
              <h6 className="text-primary dark:text-light font-thin text-sm md:text-md mt-2">
                {user?.phone_number}
              </h6>
            </div>
          </div>
          <DarkModeToggle className="h-12 w-12" />
        </DrawerHeader>
        <DrawerBody>
          <div className="flex flex-wrap gap-4">
            <Tabs
              className="w-full max-w-full drawer-profile-content-select mt-2"
              aria-label="drawer-job-content-select"
              radius="lg"
            >
              <Tab key="profile" title="اطلاعات شخصی" className="w-full">
                <ProfileUpdateSection />
              </Tab>
              <Tab key="post" title="پست ها" className="w-full">
                <PostSection />
              </Tab>
              <Tab key="request" title="درخواست ها" className="w-full">
                <ReqeuestSection />
              </Tab>
              <Tab key="massage" title="پیام ها" className="w-full">
                <MassageSection />
              </Tab>
              <Tab key="setting" title="تنظیمات" className="w-full">
                <SettingSection />
              </Tab>
            </Tabs>
          </div>
        </DrawerBody>
        <DrawerFooter className="w-full">
          <Btn
            onClick={() => setProfileDrawer(false)}
            className="w-1/4 dark:bg-red-400 bg-red-400"
          >
            بستن
          </Btn>
          <Btn
            onClick={logout}
            className="bg-darkPrimary dark:bg-primary-gray w-3/4 text-light"
          >
            خروج از حساب کاربری
          </Btn>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ProfileDrawer;
