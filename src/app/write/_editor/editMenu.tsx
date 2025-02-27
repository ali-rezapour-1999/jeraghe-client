import { BubbleMenu, FloatingMenu, Editor } from "@tiptap/react";
import React from "react";
import {
  Heading1,
  Heading2,
  Heading3,
  Code,
  Bold,
  Italic,
  Strikethrough,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Highlighter,
  Heading,
  AlignJustifyIcon,
  List,
  ListOrdered,
} from "lucide-react";
import MenuBtn from "./menuBtn";
import BtnDrapDown from "./btnDropdown";

interface EditorMenuProps {
  editor: Editor | null;
}

const EditorMenu: React.FC<EditorMenuProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <>
      <BubbleMenu
        className="dark:bg-primary-light dark:text-primary bg-darkPrimary text-light rounded-md px-3 py-2 flex gap-2 items-center w-max"
        tippyOptions={{ duration: 100 }}
        editor={editor}
      >
        <MenuBtn editor={editor} command="bold" icons={<Bold />} />
        <MenuBtn editor={editor} command="italic" icons={<Italic />} />
        <MenuBtn editor={editor} command="strike" icons={<Strikethrough />} />
        <MenuBtn editor={editor} command="codeBlock" icons={<Code />} />
        <MenuBtn editor={editor} command="highlight" icons={<Highlighter />} />
        <MenuBtn editor={editor} command="bulletList" icons={<List />} />
        <MenuBtn
          editor={editor}
          command="orderedList"
          icons={<ListOrdered />}
        />
        <BtnDrapDown
          editor={editor}
          items={[
            { command: "heading1", icon: <Heading1 /> },
            { command: "heading2", icon: <Heading2 /> },
            { command: "heading3", icon: <Heading3 /> },
          ]}
          iconBtn={<Heading />}
        />

        <BtnDrapDown
          editor={editor}
          items={[
            { command: "alignRight", icon: <AlignRight /> },
            { command: "alignCenter", icon: <AlignCenter /> },
            { command: "alignLeft", icon: <AlignLeft /> },
          ]}
          iconBtn={<AlignJustifyIcon />}
        />
      </BubbleMenu>

      <FloatingMenu
        className="dark:bg-primary-light dark:text-primary bg-darkPrimary text-light rounded-md px-3 py-2 flex gap-2 items-center w-max"
        tippyOptions={{ duration: 100 }}
        editor={editor}
      >
        <MenuBtn editor={editor} command="bold" icons={<Bold />} />
        <MenuBtn editor={editor} command="italic" icons={<Italic />} />
        <MenuBtn editor={editor} command="strike" icons={<Strikethrough />} />
        <MenuBtn editor={editor} command="codeBlock" icons={<Code />} />
        <MenuBtn editor={editor} command="highlight" icons={<Highlighter />} />
        <MenuBtn editor={editor} command="bulletList" icons={<List />} />
        <MenuBtn
          editor={editor}
          command="orderedList"
          icons={<ListOrdered />}
        />
        <BtnDrapDown
          editor={editor}
          items={[
            { command: "heading1", icon: <Heading1 /> },
            { command: "heading2", icon: <Heading2 /> },
            { command: "heading3", icon: <Heading3 /> },
          ]}
          iconBtn={<Heading />}
        />

        <BtnDrapDown
          editor={editor}
          items={[
            { command: "alignRight", icon: <AlignRight /> },
            { command: "alignCenter", icon: <AlignCenter /> },
            { command: "alignLeft", icon: <AlignLeft /> },
          ]}
          iconBtn={<AlignJustifyIcon />}
        />
      </FloatingMenu>
    </>
  );
};

export default EditorMenu;
