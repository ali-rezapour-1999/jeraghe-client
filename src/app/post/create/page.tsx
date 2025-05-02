"use client";
import Editor from "@/components/shared/editor/editor";
import React, { useState } from "react";

const CreatePost = () => {
  const [content, setContent] = useState<string>();
  return (
    <div className="w-[1200px] mx-auto pt-10">
      <Editor content={content} onChange={setContent} bubbleMode={true} />
    </div>
  );
};

export default CreatePost;
