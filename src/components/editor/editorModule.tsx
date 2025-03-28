import { Button } from "@heroui/react";
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaListUl,
  FaListOl,
  FaCode,
  FaLink,
  FaQuoteLeft,
  FaUndo,
  FaRedo,
  FaTable,
} from "react-icons/fa";
import { LuHeading1, LuHeading2, LuHeading3 } from "react-icons/lu";
import EditorTextAlign from "../ui/dropdown/editorTextAlign";
import { Editor } from "@tiptap/react";
import { ReactNode } from "react";

interface EditorHeaderModuleProps {
  editor: Editor;
}

type EditorButton = {
  icon: ReactNode;
  action: () => void;
  isActive?: () => boolean;
  disabled?: () => boolean;
};

const EditorHeaderModule = ({ editor }: EditorHeaderModuleProps) => {
  const getButtonClass = (isActive: boolean = false) =>
    `px-2 rounded cursor-pointer min-w-0 text-md md:text-lg ${
      isActive
        ? "bg-primary/30 dark:bg-light/30"
        : "bg-transparent text-primary dark:text-light"
    }`;

  const leftButtons: EditorButton[] = [
    {
      icon: <FaBold />,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive("bold"),
    },
    {
      icon: <FaItalic />,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive("italic"),
    },
    {
      icon: <FaStrikethrough />,
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive("strike"),
    },
    {
      icon: <LuHeading1 />,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <LuHeading2 />,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <LuHeading3 />,
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <FaListUl />,
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
    },
    {
      icon: <FaListOl />,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList"),
    },
    {
      icon: <FaCode />,
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive("codeBlock"),
    },
  ];

  const rightButtons: EditorButton[] = [
    {
      icon: <FaTable />,
      action: () =>
        editor
          .chain()
          .focus()
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run(),
    },
    {
      icon: <FaLink />,
      action: () =>
        editor.chain().focus().setLink({ href: "https://xai.ai" }).run(),
    },
    {
      icon: <FaQuoteLeft />,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive("blockquote"),
    },
    {
      icon: <FaUndo />,
      action: () => editor.chain().focus().undo().run(),
      disabled: () => !editor.can().undo(),
    },
    {
      icon: <FaRedo />,
      action: () => editor.chain().focus().redo().run(),
      disabled: () => !editor.can().redo(),
    },
  ];

  return (
    <div className="mb-4 flex justify-between items-center gap-2 border-b-1 p-2 w-full bg-light/20 rounded-t-2xl shadow-2xl dark:bg-primary/20">
      <div className="flex justify-center items-center gap-1">
        {leftButtons.map((btn, index) => (
          <Button
            key={index}
            onPress={btn.action}
            className={getButtonClass(btn.isActive?.())}
          >
            {btn.icon}
          </Button>
        ))}
        <EditorTextAlign editor={editor} />
      </div>
      <div className="flex justify-center items-center gap-1">
        {rightButtons.map((btn, index) => (
          <Button
            key={index}
            onPress={btn.action}
            className={getButtonClass(btn.isActive?.())}
            isDisabled={btn.disabled?.()}
          >
            {btn.icon}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default EditorHeaderModule;
