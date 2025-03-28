import { Button } from "@heroui/react";
import { BubbleMenu, Editor } from "@tiptap/react";
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaListUl,
  FaListOl,
  FaCode,
} from "react-icons/fa";
import { ReactNode } from "react";
import { LuHeading1, LuHeading2, LuHeading3 } from "react-icons/lu";

interface EditorBubbleModuleProps {
  editor: Editor;
}

type BubbleButton = {
  content: ReactNode;
  action: () => void;
  isActive: () => boolean;
};

const EditorBubbleModule = ({ editor }: EditorBubbleModuleProps) => {
  const getButtonClass = (isActive: boolean) =>
    `px-2 rounded cursor-pointer min-w-0 text-md md:text-lg ${
      isActive
        ? "bg-primary/30 dark:bg-light/30"
        : "bg-transparent text-primary dark:text-light"
    }`;

  const buttons: BubbleButton[] = [
    {
      content: <LuHeading1 className="text-2xl" />,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
    },
    {
      content: <LuHeading2 className="text-2xl" />,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
    },
    {
      content: <LuHeading3 className="text-2xl" />,
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive("heading", { level: 3 }),
    },
    {
      content: <FaBold />,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive("bold"),
    },
    {
      content: <FaItalic />,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive("italic"),
    },
    {
      content: <FaStrikethrough />,
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive("strike"),
    },
    {
      content: <FaListUl />,
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
    },
    {
      content: <FaListOl />,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList"),
    },
    {
      content: <FaCode className="size-5 md:size-6" />,
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive("codeBlock"),
    },
  ];

  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <div className="mb-1 flex justify-between gap-2 border-b-1 py-2 px-3 rounded-2xl shadow-2xl bg-dark w-max">
        {buttons.map((btn, index) => (
          <Button
            key={index}
            onPress={btn.action}
            className={getButtonClass(btn.isActive())}
          >
            {btn.content}
          </Button>
        ))}
      </div>
    </BubbleMenu>
  );
};

export default EditorBubbleModule;
