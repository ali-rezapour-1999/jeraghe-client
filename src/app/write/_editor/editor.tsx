"use client";
import "../../../style/editor.css";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";
import EditorMenu from "./editMenu";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Placeholder from "@tiptap/extension-placeholder";
import { Spinner } from "@heroui/react";

const LOCAL_STORAGE_KEY = "editor_content";
const EXPIRATION_TIME = 24 * 60 * 60 * 1000;
const SAVE_THRESHOLD = 30;

interface editorProps {
  setContentLength: (num: number) => void;
  setIsSave: (isSave: boolean) => void;
  setContent: (tag: any) => void;
}

const Editor: React.FC<editorProps> = ({
  setContentLength,
  setIsSave,
  setContent,
}) => {
  const loadContent = () => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      const { content, timestamp } = JSON.parse(storedData);
      const now = Date.now();

      if (now - timestamp < EXPIRATION_TIME) {
        return content;
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
    return "";
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "محتوای پست خود را وارد کنید",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-3",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-3",
        },
      }),
      Highlight,
    ],
    content: loadContent(),
    onUpdate: ({ editor }) => {
      const content = editor.getText();
      setContent(editor.getHTML());
      setContentLength(content.length);

      if (content.length % SAVE_THRESHOLD === 0) {
        setIsSave(true);
        localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify({
            content: editor.getHTML(),
            timestamp: Date.now(),
          }),
        );
        setIsSave(true);
        setTimeout(() => {
          setIsSave(false);
        }, 400);
      }
    },
  });
  useEffect(() => {
    if (editor) {
      editor.commands.focus();
    }
  }, [editor]);

  if (!editor) return <Spinner color="success" />;

  return (
    <>
      <EditorMenu editor={editor} />
      <EditorContent
        editor={editor}
        className="text-darkPrimary dark:text-light border-none outline-none"
      />
    </>
  );
};

export default Editor;
