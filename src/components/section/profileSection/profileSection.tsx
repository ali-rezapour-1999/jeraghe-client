import Image from "next/image";
import React from "react";
import imageplaceholder from "../../../../public/userplaceholder.png";
import instagramIcons from "../../../../public/icons/icons8-instagram-logo.svg";
import telgeramIcons from "../../../../public/icons/icons8-telegram.svg";
import gitlabIcons from "../../../../public/icons/icons8-gitlab.svg";
import linkedinIcons from "../../../../public/icons/icons8-linkedin.svg";
import githubIcons from "../../../../public/icons/icons8-github.svg";
import ProfileSectionContainer from "@/components/container/prfileContainer";
import useDrawerState from "@/state/drawerState";
import Btn from "@/components/button/btn";
import { useAuthStore } from "@/state/authState";
import { useProfileState } from "@/state/profileState";

const iconsSocialMedia = [
  { id: 1, icons: instagramIcons },
  { id: 2, icons: telgeramIcons },
  { id: 3, icons: githubIcons },
  { id: 4, icons: gitlabIcons },
  { id: 5, icons: linkedinIcons },
];

const ProfileSection = () => {
  const { setProfileDrawer } = useDrawerState();
  const { user } = useAuthStore();
  const { personalData } = useProfileState();
  return (
    <ProfileSectionContainer delay={0.2}>
      <Image
        src={imageplaceholder}
        alt="image place holder"
        width={100}
        height={100}
        className="rounded-xl mb-3"
      />
      <h3 className="font-bold text-darkPrimary dark:text-light text-[1.1em] mb-2">
        {user?.first_last_name}
      </h3>
      <h4 className="text-[.9em] text-primary dark:text-light">
        {personalData?.my_skill && personalData.my_skill.length > 0
          ? personalData.my_skill.map((skill, index) => (
              <span key={skill.id}>
                {skill.name}
                {index < personalData.my_skill!.length - 1 && " , "}
              </span>
            ))
          : "هنوز علایقت و ثبت نکردی"}
      </h4>
      <div className="flex gap-3 my-2">
        {iconsSocialMedia.map((i) => (
          <Image
            src={i.icons}
            alt="icons image"
            width={30}
            height={30}
            key={i.id}
          />
        ))}
      </div>

      <Btn
        className="drop-shadow mt-5 w-32 dark:bg-primary-light bg-darkPrimary text-light dark:text-primary"
        onClick={() => setProfileDrawer(true)}
      >
        ویرایش
      </Btn>
    </ProfileSectionContainer>
  );
};

export default ProfileSection;
