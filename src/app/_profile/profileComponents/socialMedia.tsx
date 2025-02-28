import { Form, Input, Select, SelectItem } from "@heroui/react";
import React, { useState } from "react";
import Image from "next/image";
import Btn from "@/components/ui/btn";
import { MediaItems } from "@/state/socialMediaItems";
import { useProfileState } from "@/state/profileState";
import toast from "react-hot-toast";
import SocialMediaContent from "./socialMediaContent";
import { IsLoading } from "@/components/common/isLoading";

const SocialMedia = () => {
  const { socialMedia, socialMediaData, isLoading, socialMediaRequest } =
    useProfileState();

  const [links, setLink] = useState("");
  const [updateData, setUpdateData] = useState({
    title: "",
    address: "",
  });

  const selectChangeHandler = (value: string) => {
    const selectedItem = MediaItems.find((item) => item.title === value);
    setUpdateData({
      ...updateData,
      title: value,
      address: selectedItem ? selectedItem.startLink : "",
    });
    setLink(selectedItem ? selectedItem.startLink : "");
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idValue = e.target.value.trim();
    const selectedItem = MediaItems.find(
      (item) => item.title === updateData.title,
    );
    if (!selectedItem) return;
    const startLink = selectedItem.startLink;
    const newAddress = idValue.startsWith(startLink)
      ? idValue
      : startLink + idValue;

    setUpdateData((prev) => ({
      ...prev,
      address: newAddress,
    }));
    setLink(idValue);
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await socialMedia(updateData).then((response) => {
      socialMediaRequest();
      if (response.success) {
        if (response.success) {
          toast.success(response.message as string);
        }
      }
    });
  };

  return (
    <div className="py-10 mt-16 border-t-1 flex relative flex-col gap-7 items-center justify-center">
      <h1 className="w-max absolute top-[-12] px-10 rounded-2xl text-center bg-darkPrimary dark:bg-light text-light dark:text-primary mb-10">
        منو میتونی در
      </h1>

      <Form className="w-full" onSubmit={onSubmitHandler}>
        <div className="w-full h-max md:h-[100px] flex gap-8 flex-col-reverse md:flex-row justify-start items-start">
          <Input
            isRequired
            isDisabled={!updateData.title}
            label="آیدی"
            labelPlacement="outside"
            className="w-full md:w-3/4"
            placeholder="فقط آیدی خود را وارد کنید"
            name="address"
            type="text"
            size="lg"
            value={links.slice(
              MediaItems.find((item) => item.title === updateData.title)
                ?.startLink.length || 0,
            )}
            onChange={onInputChange}
          />
          <Select
            labelPlacement="outside"
            className="dark:text-light text-primary w-full md:w-1/4"
            label={"فضای مجازی"}
            size="lg"
            placeholder="انتخاب کنید"
            name="social-media"
            selectedKeys={updateData.title ? [updateData.title] : []}
            onChange={(e) => selectChangeHandler(e.target.value)}
          >
            {MediaItems.map((items) => (
              <SelectItem key={items.title} textValue={items.title}>
                <div className="dark:text-light text-primary flex flex-row items-center justify-start gap-2">
                  <Image
                    src={items.icons}
                    alt={items.title}
                    width={30}
                    height={30}
                  />
                  <p>{items.title}</p>
                </div>
              </SelectItem>
            ))}
          </Select>
        </div>
        {updateData.address && (
          <p className="text-sm text-gray-500 mt-2" dir="lrt">
            🔗 لینک نهایی: {links}
          </p>
        )}
        <Btn type="submit" className="w-full text-lg mt-3">
          دنبال کنی
        </Btn>
      </Form>
      {!socialMediaData || isLoading ? <IsLoading /> : <SocialMediaContent />}
    </div>
  );
};

export default SocialMedia;
