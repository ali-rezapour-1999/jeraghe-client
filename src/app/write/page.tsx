"use client";
import React, { useState } from "react";
import "../../style/editor.css";
import Btn from "@/components/btn";
import WriteOptionDrawer from "@/components/drawer/writeOptionDrawer";
import WriteNav from "./writeNav";

const Writing: React.FC = () => {
  // const [editorContent, setEditorContent] = useState("");
  const [title, setTitle] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showMyDetail, setShowMyDetail] = useState<boolean>(false);
  const [isSave, setIsSave] = useState<boolean>(false);

  // const handleModelChange = (model: any) => {
  //   setEditorContent(model);
  // };

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
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    return selectedImage;
    setIsSave(true);
  };

  return (
    <main>
      <WriteNav isSave={isSave} />
      <form
        onSubmit={handleSubmit}
        className="max-w-[1600px] w-full mx-auto px-2 md:px-20 text-2xl"
      >
        <WriteOptionDrawer
          tags={tags}
          setTags={setTags}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
          title={title}
          setTitle={setTitle}
          showMyDetail={showMyDetail}
          setShowMyDetail={setShowMyDetail}
          addTag={addTag}
          removeTag={removeTag}
          handleImageChange={handleImageChange}
        />
        <article className="py-10 min-h-[500px]"></article>

        <div className="mt-20 w-full md:w-max flex justify-end">
          <Btn
            className="bg-primary w-full text-white px-10 py-5 rounded-md text-lg font-bold"
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
