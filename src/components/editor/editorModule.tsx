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

const EditorHeaderModule = ({ editor }: { editor: any }) => {
  return (
    <div className="mb-4 flex justify-between gap-2 border-b-1 p-5 w-full bg-light/20 rounded-t-2xl shadow-2xl dark:bg-primary/20">
      <div>
        <Button
          onPress={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 rounded cursor-pointer min-w-0 w-[50px] text-md md:text-lg  ${editor.isActive("bold") ? "bg-primary/30 dark:bg-light/30" : "bg-transparent text-primary dark:text-light"}`}
        >
          <FaBold />
        </Button>
        <Button
          onPress={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 rounded cursor-pointer min-w-0 w-[50px] text-md md:text-lg  ${editor.isActive("italic") ? "bg-primary/30 dark:bg-light/30" : "bg-transparent text-primary dark:text-light"}`}
        >
          <FaItalic />
        </Button>
        <Button
          onPress={() => editor.chain().focus().toggleStrike().run()}
          className={`px-2 rounded cursor-pointer min-w-0 w-[50px] text-md md:text-lg  ${editor.isActive("strike") ? "bg-primary/30 dark:bg-light/30" : "bg-transparent text-primary dark:text-light"}`}
        >
          <FaStrikethrough />
        </Button>
        <Button
          onPress={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`px-2 text-xl rounded cursor-pointer min-w-0 w-[50px] ${editor.isActive("heading", { level: 1 }) ? "bg-primary/30 dark:bg-light/30" : "bg-transparent text-primary dark:text-light"}`}
        >
          H1
        </Button>
        <Button
          onPress={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`px-2 text-xl rounded cursor-pointer min-w-0 w-[50px] ${editor.isActive("heading", { level: 2 }) ? "bg-primary/30 dark:bg-light/30" : "bg-transparent text-primary dark:text-light"}`}
        >
          H2
        </Button>
        <Button
          onPress={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`px-2 text-xl rounded cursor-pointer min-w-0 w-[50px] ${editor.isActive("heading", { level: 3 }) ? "bg-primary/30 dark:bg-light/30" : "bg-transparent text-primary dark:text-light"}`}
        >
          H3
        </Button>
        <Button
          onPress={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 rounded cursor-pointer min-w-0 w-[50px] text-md md:text-lg  ${editor.isActive("bulletList") ? "bg-primary/30 dark:bg-light/30" : "bg-transparent text-primary dark:text-light"}`}
        >
          <FaListUl />
        </Button>
        <Button
          onPress={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-2 rounded cursor-pointer min-w-0 w-[50px] text-md md:text-lg  ${editor.isActive("orderedList") ? "bg-primary/30 dark:bg-light/30" : "bg-transparent text-primary dark:text-light"}`}
        >
          <FaListOl />
        </Button>
        <Button
          onPress={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-2 rounded cursor-pointer min-w-0 w-[50px] text-md md:text-lg  ${editor.isActive("codeBlock") ? "bg-primary/30 dark:bg-light/30" : "bg-transparent text-primary dark:text-light"}`}
        >
          <FaCode />
        </Button>
      </div>
      <div>
        <Button
          onPress={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
          className="bg-transparent min-w-0 w-[50px] text-primary dark:text-light rounded"
        >
          <FaTable />
        </Button>
        <Button
          onPress={() =>
            editor.chain().focus().setLink({ href: "https://xai.ai" }).run()
          }
          className="bg-transparent min-w-0 w-[50px] text-primary dark:text-light rounded"
        >
          <FaLink />
        </Button>
        <Button
          onPress={() => editor.chain().focus().toggleBlockquote().run()}
          className={`rounded cursor-pointer min-w-0 w-[50px] text-md md:text-lg  ${editor.isActive("blockquote") ? "bg-primary/30 dark:bg-light/30" : "bg-transparent text-primary dark:text-light"}`}
        >
          <FaQuoteLeft />
        </Button>
        <Button
          onPress={() => editor.chain().focus().undo().run()}
          className="bg-transparent min-w-0 w-[50px] text-primary dark:text-light rounded"
          disabled={!editor.can().undo()}
        >
          <FaUndo />
        </Button>
        <Button
          onPress={() => editor.chain().focus().redo().run()}
          className="bg-transparent min-w-0 w-[50px] text-primary dark:text-light rounded"
          disabled={!editor.can().redo()}
        >
          <FaRedo />
        </Button>
      </div>
    </div>
  );
};
export default EditorHeaderModule;
