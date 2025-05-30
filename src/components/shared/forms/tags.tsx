import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

type TagsProps = {
  onChange: (tags: string[]) => void;
  value?: string[];
};

const Tags = ({ onChange, value = [] }: TagsProps) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim() !== "") {
      e.preventDefault();
      if (!value.includes(input.trim())) {
        const newTags = [...value, input.trim()];
        onChange(newTags);
      }
      setInput("");
    }
  };

  const handleRemove = (tagToRemove: string) => {
    const newTags = value.filter((tag) => tag !== tagToRemove);
    onChange(newTags);
  };

  return (
    <div >
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="تگ را وارد کرده و Enter بزنید"
      />
      <div className="flex flex-wrap gap-2 mt-1">
        {value.map((tag) => (
          <span
            key={tag}
            className="flex justify-center items-center gap-1 px-3 py-1 rounded-3xl text-sm dark:bg-primary/60 dark:text-black "
          >
            {tag}
            <X
              className="w-4 h-4 cursor-pointer"
              onClick={() => handleRemove(tag)}
            />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Tags;
