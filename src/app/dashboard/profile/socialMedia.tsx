"use client";
import { Form, Input, Select, SelectItem } from "@heroui/react";
import React, { useState } from "react";
import Image from "next/image";
import Btn from "@/components/ui/button";
import { MediaItems } from "@/utils/static/socialMediaItems";
import SocialMediaContent from "./socialMediaContent";
import { IsLoading } from "@/components/common/isLoading";
import { useSocialMediaState } from "@/state/userInformationStore";
import { Paragraph } from "@/components/ui/text";

const SocialMedia = () => {
  const { socialMedia, socialMediaData, isLoading } = useSocialMediaState();

  const [links, setLink] = useState("");
  const [inputValue, setInputValue] = useState("");
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
      (item) => item.title === updateData.title
    );

    if (!selectedItem) return;

    const startLink = selectedItem.startLink;

    const newAddress = idValue.startsWith(startLink)
      ? idValue
      : startLink + idValue;

    setInputValue(idValue);
    setUpdateData((prev) => ({
      ...prev,
      address: newAddress,
    }));
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await socialMedia(updateData);
  };

  return (
    <div className="flex relative flex-col gap-7 items-center justify-center">
      <Form className="w-full" onSubmit={onSubmitHandler}>
        <div className="w-full h-max md:h-[100px] flex gap-8 flex-col-reverse md:flex-row justify-start items-start">
          <Input
            isRequired
            isDisabled={!updateData.title}
            label="آیدی"
            labelPlacement="outside"
            className="w-full md:w-3/4"
            placeholder="لینک مربوطه را وارد نمایید"
            name="address"
            type="text"
            size="lg"
            value={inputValue}
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
                  <Paragraph>{items.title}</Paragraph>
                </div>
              </SelectItem>
            ))}
          </Select>
        </div>
        {updateData.address && (
          <Paragraph className="text-sm text-gray-500 mt-2" dir="lrt">
            🔗 لینک نهایی: {links}
          </Paragraph>
        )}
        <Btn
          isDisabled={
            updateData.address != "" && updateData.title != "" ? false : true
          }
          type="submit"
          className="w-full text-lg mt-3"
        >
          دنبال کنی
        </Btn>
      </Form>
      {!socialMediaData || isLoading ? <IsLoading /> : <SocialMediaContent />}
    </div>
  );
};

export default SocialMedia;
