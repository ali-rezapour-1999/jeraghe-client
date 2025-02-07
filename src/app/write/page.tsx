"use client";
import MainNavBar from "@/components/navbar";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "../../style/editor.css";
import { Input, Textarea } from "@heroui/react";
import Image from "next/image";
import Btn from "@/components/btn";
import { Plus, X } from "lucide-react";
import { Accordion, AccordionItem } from "@heroui/react";

const FroalaEditor = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
});

const Writing: React.FC = () => {
  const [editorContent, setEditorContent] = useState("");
  const [title, setTitle] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleModelChange = (model: any) => {
    setEditorContent(model);
  };

  const addTag = () => {
    if (tagInput.trim() !== "" && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file)); // نمایش پیش‌نمایش
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    return selectedImage;
  };

  return (
    <main>
      <MainNavBar />
      <form
        onSubmit={handleSubmit}
        className="max-w-[1600px] w-full mx-auto mt-10 px-3 md:px-20 text-2xl"
      >
        <Accordion selectionMode="multiple" variant="splitted">
          <AccordionItem key="1" aria-label="setting" title="تنظیمات پست">
            <div className="flex h-max lg:h-[350px] items-center justify-center w-full">
              <div className="w-1/2 h-full flex flex-col items-start justify-start gap-5 md:py-5">
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

                  <div className="flex flex-wrap gap-2 mt-3 w-full items-center mr-10">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 rounded-full flex items-center gap-2 cursor-pointer text-[.7em] bg-darkPrimary dark:bg-light text-light dark:text-primary"
                      >
                        {tag}
                        <X
                          size={18}
                          className="text-red-500 hover:text-red-700"
                          onClick={() => removeTag(tag)}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-1/2 h-full flex flex-col items-center justify-center p-5">
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
                      width={200}
                      height={200}
                    />
                  ) : (
                    <p className="text-md text-center w-full bg-primary-dark h-full flex justify-center items-center rounded-2xl text-primary-light">
                      میتونی از این بخش تصویر اضافه کنی برای پستت
                    </p>
                  )}
                </label>
              </div>
            </div>
          </AccordionItem>
        </Accordion>

        <article className="mt-1 py-10">
          <FroalaEditor
            model={editorContent}
            onModelChange={handleModelChange}
            config={{
              placeholderText: " محتوای خود را وارد کنید...",
              toolbarInline: true,
              charCounterCount: false,
              toolbarVisibleWithoutSelection: true,
              direction: "rtl",
              language: "fa",
            }}
          />
        </article>

        <div className="mt-20 flex justify-end">
          <Btn
            className="bg-primary text-white px-10 py-5 rounded-md text-lg font-bold"
            type="submit"
          >
            ثبت پست
          </Btn>
        </div>
      </form>
    </main>
  );
};

export default Writing;
