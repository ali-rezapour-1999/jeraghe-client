import { Button } from "@heroui/react";
import { BubbleMenu } from "@tiptap/react";
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaListUl,
  FaListOl,
  FaCode,
} from "react-icons/fa";

const EditorBubbleModule = ({ editor }: { editor: any }) => {
  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <div className="mb-1 flex justify-between gap-2 border-b-1 py-2 px-3 rounded-2xl shadow-2xl bg-dark w-max">
        <Button
          onPress={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`px-2 text-xl md:text-2xl mt-1 font-bold rounded cursor-pointer min-w-0 w-[50px] ${editor.isActive("heading", { level: 1 }) ? "bg-primary/30 dark:bg-light/30" : "bg-transparent text-primary dark:text-light"}`}
        >
          H1
        </Button>
        <Button
          onPress={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`px-2 text-xl md:text-2xl mt-1 font-bold rounded cursor-pointer min-w-0 w-[50px] ${editor.isActive("heading", { level: 2 }) ? "bg-primary/30 dark:bg-light/30" : "bg-transparent text-primary dark:text-light"}`}
        >
          H2
        </Button>
        <Button
          onPress={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`px-2 text-xl md:text-2xl mt-1 font-bold rounded cursor-pointer min-w-0 w-[50px] ${editor.isActive("heading", { level: 3 }) ? "bg-primary/30 dark:bg-light/30" : "bg-transparent text-primary dark:text-light"}`}
        >
          H3
        </Button>
        <Button
          onPress={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 rounded cursor-pointer min-w-0 w-[50px] text-md md:text-lg  ${editor.isActive("bold") ? "bg-primary/30 dark:bg-light/30" : "bg-transparent text-primary dark:text-light"}`}
        >
          <FaBold className="size-5 md:size-6" />
        </Button>
        <Button
          onPress={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 rounded cursor-pointer min-w-0 w-[50px] text-md md:text-lg  ${editor.isActive("italic") ? "bg-primary/30 dark:bg-light/30" : "bg-transparent text-primary dark:text-light"}`}
        >
          <FaItalic className="size-5 md:size-6" />
        </Button>
        <Button
          onPress={() => editor.chain().focus().toggleStrike().run()}
          className={`px-2 rounded cursor-pointer min-w-0 w-[50px] text-md md:text-lg  ${editor.isActive("strike") ? "bg-primary/30 dark:bg-light/30" : "bg-transparent text-primary dark:text-light"}`}
        >
          <FaStrikethrough className="size-5 md:size-6" />
        </Button>
        <Button
          onPress={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 rounded cursor-pointer min-w-0 w-[50px] text-md md:text-lg  ${editor.isActive("bulletList") ? "bg-primary/30 dark:bg-light/30" : "bg-transparent text-primary dark:text-light"}`}
        >
          <FaListUl className="size-5 md:size-6" />
        </Button>
        <Button
          onPress={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-2 rounded cursor-pointer min-w-0 w-[50px] text-md md:text-lg  ${editor.isActive("orderedList") ? "bg-primary/30 dark:bg-light/30" : "bg-transparent text-primary dark:text-light"}`}
        >
          <FaListOl className="size-5 md:size-6" />
        </Button>
        <Button
          onPress={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-2 rounded cursor-pointer min-w-0 w-[50px] text-md md:text-lg  ${editor.isActive("codeBlock") ? "bg-primary/30 dark:bg-light/30" : "bg-transparent text-primary dark:text-light"}`}
        >
          <FaCode className="size-5 md:size-6" />
        </Button>
      </div>
    </BubbleMenu>
  );
};
export default EditorBubbleModule;
