import { Button } from "@heroui/react";
import { Editor } from "@tiptap/react";
import { ReactNode } from "react";

export type CommandType =
  | "bold"
  | "italic"
  | "strike"
  | "codeBlock"
  | "bulletList"
  | "orderedList"
  | "highlight"
  | "heading1"
  | "heading2"
  | "heading3"
  | "alignLeft"
  | "alignCenter"
  | "alignRight";

interface MenuBtnProps {
  editor: Editor;
  command: CommandType;
  icons: ReactNode;
}

const MenuBtn: React.FC<MenuBtnProps> = ({ editor, command, icons }) => {
  if (!editor) return null;

  const handleCommand = () => {
    switch (command) {
      case "bold":
        editor.chain().focus().toggleBold().run();
        break;
      case "italic":
        editor.chain().focus().toggleItalic().run();
        break;
      case "strike":
        editor.chain().focus().toggleStrike().run();
        break;
      case "codeBlock":
        editor.chain().focus().toggleCodeBlock().run();
        break;
      case "bulletList":
        editor.chain().focus().toggleBulletList().run();
        break;
      case "orderedList":
        editor.chain().focus().toggleOrderedList().run();
        break;
      case "highlight":
        editor.chain().focus().toggleMark("highlight").run();
        break;
      case "heading1":
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        break;
      case "heading2":
        editor.chain().focus().toggleHeading({ level: 2 }).run();
      case "heading3":
        editor.chain().focus().toggleHeading({ level: 3 }).run();
        break;
      case "alignLeft":
        editor.chain().focus().setTextAlign("left").run();
        break;
      case "alignCenter":
        editor.chain().focus().setTextAlign("center").run();
        break;
      case "alignRight":
        editor.chain().focus().setTextAlign("right").run();
        break;
      default:
        return `Command "${command}" not recognized.`;
    }
  };

  const isActive = (() => {
    switch (command) {
      case "bold":
        return editor.isActive("bold");
      case "italic":
        return editor.isActive("italic");
      case "strike":
        return editor.isActive("strike");
      case "codeBlock":
        return editor.isActive("codeBlock");
      case "bulletList":
        return editor.isActive("bulletList");
      case "orderedList":
        return editor.isActive("orderedList");
      case "highlight":
        return editor.isActive("highlight");
      case "heading1":
        return editor.isActive("heading", { level: 1 });
      case "heading2":
        return editor.isActive("heading", { level: 2 });
      case "heading3":
        return editor.isActive("heading", { level: 3 });
      case "alignRight":
        return editor.isActive("right");
      case "alignCenter":
        return editor.isActive("center");
      case "alignLeft":
        return editor.isActive("Left");
      default:
        return false;
    }
  })();

  return (
    <Button
      onPress={handleCommand}
      className={`${isActive ? "dark:bg-primary-dark bg-light" : ""} bg-transparent dark:bg-transparent text-light dark:text-primary md:min-w-10 min-w-4 text-sm md:text-lg px-0`}
    >
      {icons}
    </Button>
  );
};

export default MenuBtn;
