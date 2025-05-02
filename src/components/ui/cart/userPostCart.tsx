import { PostType } from "@/types/postStateType";
import React from "react";
import { Edit, Eye, Trash } from "lucide-react";
import { Heading, Paragraph } from "../text";
import { Button } from "../button";

const UserPostCart: React.FC<PostType> = ({
  title,
  content,
  categories,
  status,
}) => {
  return (
    <div className="dark:bg-darkPrimary max-h-[200px] flex rounded-2xl overflow-hidden">
      <div className="w-3/5 p-3 flex flex-col items-start justify-between">
        <Heading as="h1" className="text-xl border-b-1 my-2 pb-1 px-2">
          {title}
        </Heading>
        <p className="text-ellipsis line-clamp-2 text-slate-500 text-xs">
          {content}
        </p>
        <Heading as="h2">{categories}</Heading>
        <div className="flex items-center justify-between w-full">
          <Paragraph className="text-sm">
            <span>
              وضعیت پست :{" "}
              <span>
                {status == "published" ? "منتشر شده" : "در انتظار تایید"}
              </span>
            </span>
          </Paragraph>
          <div>
            <Button className="bg-transparent dark:bg-transparent text-text-accent  dark:text-accent px-2">
              <Eye />
            </Button>
            <Button className="bg-transparent dark:bg-transparent text-blue-400 dark:text-blue-400 px-2">
              <Edit />
            </Button>
            <Button className="bg-transparent dark:bg-transparent text-red-700 dark:text-red-700 px-2">
              <Trash />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserPostCart;
