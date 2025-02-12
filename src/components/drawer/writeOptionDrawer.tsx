"use client";

import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerBody,
  DrawerFooter,
  Textarea,
  Input,
  Switch,
} from "@heroui/react";
import Btn from "../btn";
import useDrawerState from "@/state/drawerState";
import Image from "next/image";
import { Plus, X } from "lucide-react";

interface WriteOptionDrawerProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  selectedImage: File | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>;
  previewImage: string | null;
  setPreviewImage: React.Dispatch<React.SetStateAction<string | null>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  showMyDetail: boolean;
  setShowMyDetail: React.Dispatch<React.SetStateAction<boolean>>;
  removeTag: (tag: string) => void;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const WriteOptionDrawer: React.FC<WriteOptionDrawerProps> = ({
  tags,
  previewImage,
  setTags,
  title,
  setTitle,
  showMyDetail,
  setShowMyDetail,
  removeTag,
  handleImageChange,
}) => {
  const { isOpenWriteDrawer, setWriteOptionDrawer } = useDrawerState();
  const [tagInput, setTagInput] = useState("");
  const addTag = () => {
    if (tagInput.trim() !== "" && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  return (
    <Drawer
      placement="right"
      isOpen={isOpenWriteDrawer}
      size="5xl"
      backdrop="blur"
      onClose={() => setWriteOptionDrawer(!isOpenWriteDrawer)}
    >
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerBody>
              <div className="flex h-max flex-col-reverse items-center justify-center w-full">
                <div className="w-full h-full flex flex-col items-start justify-evenly ">
                  <Textarea
                    label="عنوان"
                    labelPlacement="outside"
                    name="title"
                    placeholder={"عنوان محتوای خود را وارد کنید"}
                    type="text"
                    size="lg"
                    variant="faded"
                    classNames={{
                      input: "text-xl",
                      inputWrapper: "py-2",
                      mainWrapper: "py-4",
                    }}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <div className="flex flex-col items-center justify-center w-full">
                    <Input
                      placeholder="تگ‌های مربوط به پست"
                      labelPlacement="outside"
                      name="tag"
                      label="تگ"
                      type="text"
                      size="lg"
                      variant="faded"
                      classNames={{
                        base: "w-full",
                        input: "text-sm text-primary dark:text-light",
                        inputWrapper: "py-2 pl-1 pr-3 rounded-2xl",
                        mainWrapper: "py-4",
                      }}
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      endContent={
                        <Btn
                          className="bg-transparent dark:bg-transparent"
                          onClick={addTag}
                        >
                          <Plus
                            className="text-primary dark:text-light"
                            size={24}
                          />
                        </Btn>
                      }
                    />

                    <div className="flex flex-wrap gap-2 h-[50px] w-full items-center mr-10">
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 rounded-full flex items-center gap-2 cursor-pointer text-md bg-green-dark dark:bg-green-dark text-light dark:text-light"
                        >
                          {tag}
                          <X
                            size={18}
                            className="text-red-300 hover:text-red-700"
                            onClick={() => removeTag(tag)}
                          />
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full px-3 text-darkPrimary dark:text-light">
                    <p className="text-md">
                      آیا مایلید (اطلاعات تماس شماره تماس , ایمیل .....) در پست
                      نمایش داده شود
                    </p>
                    <Switch
                      onChange={() => setShowMyDetail(!showMyDetail)}
                      color="success"
                    />
                  </div>
                </div>

                <div className="w-full h-[350px] md:h-[450px] flex flex-col items-center justify-center md:p-5">
                  <label className="cursor-pointer w-full h-full flex items-center justify-center">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    {previewImage ? (
                      <Image
                        src={previewImage}
                        alt="post image"
                        className="w-full h-full object-contain rounded-2xl"
                        width={400}
                        height={400}
                      />
                    ) : (
                      <p className="text-md text-center w-full bg-primary-dark h-full flex justify-center items-center rounded-2xl text-primary-light px-5">
                        میتونی از این بخش تصویر اضافه کنی برای پستت
                      </p>
                    )}
                  </label>
                </div>
              </div>
            </DrawerBody>
            <DrawerFooter>
              <Btn
                className=" w-full text-white px-10 py-5 rounded-2xl text-lg font-bold"
                type="submit"
              >
                ثبت پست
              </Btn>
              <Btn className="bg-red-400 dark:bg-red-400" onClick={onClose}>
                بستن
              </Btn>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default WriteOptionDrawer;
