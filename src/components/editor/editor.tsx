import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { createLowlight } from "lowlight";
import Heading from "@tiptap/extension-heading";
import EditorHeaderModule from "./editorModule";
import TextStyle from "@tiptap/extension-text-style";
import EditorBubbleModule from "./editorBubbleModule";
import TextAlign from "@tiptap/extension-text-align";
import "../../style/editor.css";

const lowlight = createLowlight();

interface EditorType {
  content: any;
  onChange: (content: string) => void;
  bubbleMode?: boolean;
  headerMode?: boolean;
}

const Editor = ({
  content,
  onChange,
  bubbleMode = false,
  headerMode = true,
}: EditorType) => {
  const editor = useEditor({
    extensions: [
      TextStyle,
      StarterKit.configure(),
      Document,
      Paragraph,
      Text,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Markdown,
      Link.configure({
        openOnClick: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    autofocus: true,
    editable: true,
    injectCSS: false,
    parseOptions: {
      preserveWhitespace: "full",
    },
    content: content,
    onUpdate: ({ editor }) => {
      const markdownContent = editor.storage.markdown.getMarkdown();
      onChange(markdownContent);
    },
  });

  if (!editor) return null;

  return (
    <div className="p-4">
      {bubbleMode ? <EditorBubbleModule editor={editor} /> : null}
      {headerMode ? <EditorHeaderModule editor={editor} /> : null}
      <EditorContent editor={editor} className="prose p-4 text-xl" />
    </div>
  );
};

export default Editor;
