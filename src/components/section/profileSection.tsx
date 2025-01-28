import Image from "next/image";
import React from "react";
import imageplaceholder from "../../../public/userplaceholder.png";
import { Button } from "@heroui/react";
import instagramIcons from "../../../public/icons/icons8-instagram-logo.svg";
import telgeramIcons from "../../../public/icons/icons8-telegram.svg";
import gitlabIcons from "../../../public/icons/icons8-gitlab.svg";
import linkedinIcons from "../../../public/icons/icons8-linkedin.svg";
import githubIcons from "../../../public/icons/icons8-github.svg";

const iconsSocialMedia = [
  { id: 1, icons: instagramIcons },
  { id: 2, icons: telgeramIcons },
  { id: 3, icons: githubIcons },
  { id: 4, icons: gitlabIcons },
  { id: 5, icons: linkedinIcons },
];

const ProfileSection = () => {
  return (
    <section className="w-full p-2">
      <div className="bg-greylight rounded-3xl drop-shadow-md flex items-center justify-center flex-col py-7">
        <Image
          src={imageplaceholder}
          alt="image place holder"
          width={100}
          height={100}
          className="rounded-xl mb-3"
        />
        <h3 className="font-bold text-green text-[1.1em] mb-2">
          علی رضاپور گتابی
        </h3>
        <h4 className="text-[.8em]">برنامه نویس , موسیقی دان , عکاس ...</h4>
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

        <Button className="shadow-md mt-5 px-14 bg-primary text-light">
          ویرایش
        </Button>
      </div>
    </section>
  );
};

export default ProfileSection;
