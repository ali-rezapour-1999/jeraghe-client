import Btn from "@/components/ui/btn";
import { MediaItems } from "@/state/socialMediaItems";
import { useSocialMediaState } from "@/state/userInformationStore";
import { Trash } from "lucide-react";
import Image from "next/image";
import React from "react";

const SocialMediaContent = () => {
  const { socialMediaDelete, socialMediaRequest, socialMediaData } =
    useSocialMediaState();
  const mediaIconsFuntion = (title: string) => {
    return MediaItems.find((i) => i.title === title)?.icons;
  };
  const removeItem = async (slug: string) => {
    await socialMediaDelete(slug).then(() => socialMediaRequest());
  };
  return (
    <div className="w-full  flex flex-col gap-2">
      {socialMediaData?.map((item: any, index: any) => (
        <div
          key={index}
          className="dark:bg-darkPrimary bg-light text-darkPrimary dark:text-light w-full p-2 rounded-lg flex items-center justify-between"
        >
          <div className="w-2/12 flex gap-2">
            {item.title}
            <Image
              src={mediaIconsFuntion(item.title as string)}
              alt="icons image"
              height={30}
              width={30}
            />
          </div>
          <a href={item.address} className="text-start w-9/12" target="_blank">{item.address}</a>
          <Btn
            onClick={() => {
              removeItem(item.slug_id as string);
            }}
            className="m-0 p-0 bg-transparent dark:bg-transparent  text-red-500 dark:text-red-500"
          >
            <Trash />
          </Btn>
        </div>
      ))}
    </div>
  );
};

export default SocialMediaContent;
