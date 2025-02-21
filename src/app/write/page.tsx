"use client";
import React, { useState } from "react";
import "../../style/editor.css";
import WriteOptionDrawer from "@/components/drawer/writeOptionDrawer";
import WriteNav from "./writeNav";
import Editor from "./_editor/editor";
import { useAuthStore } from "@/state/authState";
import AuthRequired from "@/components/authRequired";

const Writing: React.FC = () => {
  const [contentLength, setContentLength] = useState(0);
  const [content, setContent] = useState("");
  const { isAuthenticated } = useAuthStore();
  const [title, setTitle] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showMyDetail, setShowMyDetail] = useState<boolean>(false);
  const [isSave, setIsSave] = useState<boolean>(false);

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
    return selectedImage && content;
  };

  if (!isAuthenticated) {
    return <AuthRequired />;
  }

  return (
    <main>
      <WriteNav isSave={isSave} contentLength={contentLength} />
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
        <article className="py-10 min-h-[300px]">
          <Editor
            setContentLength={setContentLength}
            setIsSave={setIsSave}
            setContent={setContent}
          />
        </article>
      </form>
    </main>
  );
};

export default Writing;
