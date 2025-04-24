import ProfileSectionContainer from "@/components/container/profileContainer";
import { Heading, Paragraph } from "@/components/ui/text";
import { useProfileState } from "@/state/userInformationStore";
import React from "react";

const ProfileAboutMeSection: React.FC = () => {
  const { profileData } = useProfileState();
  return (
    <ProfileSectionContainer delay={0.4}>
      <Heading
        as="h4"
        className="border-b-1 w-full py-2 text-center text-darkPrimary dark:text-light text-lg font-bold"
      >
        درباره من
      </Heading>
      <Paragraph className="dark:bg-darkPrimary text-darkPrimary dark:text-light bg-light rounded-3xl p-5 text-justify">
        {profileData?.description || "میتونی از بخش ویرایش این بخش و پر کنی"}
      </Paragraph>
    </ProfileSectionContainer>
  );
};

export default ProfileAboutMeSection;
