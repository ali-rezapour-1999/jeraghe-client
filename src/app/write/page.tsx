"use client";
import React, { useRef, useState } from "react";
import "../../style/editor.css";
import WriteOptionDrawer from "@/components/ui/drawer/writeOptionDrawer";
import WriteNav from "./writeNav";
import Editor from "./_editor/editor";
import { useAuthStore } from "@/state/authState";
import AuthRequired from "@/components/common/authRequired";

const Writing: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const { isAuthenticated } = useAuthStore();

  const [contentLength, setContentLength] = useState(0);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<string | null>(null);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedImage) {
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("status", "draft");
    formData.append("views", "0");
    formData.append("showDetail", "true");
    formData.append("is_approve", "false");

    tags.forEach((tag, index) => {
      formData.append(`tags[${index}][title]`, tag);
    });

    if (category) formData.append("categories", category.toString());

    formData.append("image", selectedImage);
  };

  return (
    <main>
      <WriteNav isSave={isSave} contentLength={contentLength} />
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="max-w-[1600px] w-full mx-auto px-2 md:px-20 text-2xl"
      >
        <WriteOptionDrawer
          category={category}
          setCategory={setCategory}
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
          formRef={formRef}
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
