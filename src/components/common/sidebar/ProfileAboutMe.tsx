import ProfileSectionContainer from "@/components/container/profileContainer";
import { useProfileState } from "@/state/userInformationStore";
import React from "react";

const ProfileAboutMeSection: React.FC = () => {
  const { profileData } = useProfileState();
  return (
    <ProfileSectionContainer delay={0.4}>
      <h4 className="border-b-1 w-full py-2 text-center text-darkPrimary dark:text-light text-lg font-bold">
        درباره من
      </h4>
      <p className="dark:bg-darkPrimary text-darkPrimary dark:text-light bg-light rounded-3xl p-5 text-justify">
        {profileData?.description_myself ||
          "میتونی از بخش ویرایش این بخش و پر کنی"}
      </p>
    </ProfileSectionContainer>
  );
};

export default ProfileAboutMeSection;
