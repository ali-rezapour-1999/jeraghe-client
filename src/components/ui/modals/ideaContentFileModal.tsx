import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import remarkEmoji from "remark-emoji";
import rehypeRaw from "rehype-raw";
import { Button } from "../button";

interface Props {
  content: string;
  isOpen: boolean;
  setOpen: () => void;
}

const IdeaContentFileModal: React.FC<Props> = ({
  content,
  isOpen,
  setOpen,
}) => {
  const [markdown, setMarkdown] = useState<string>("");

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        if (content.endsWith(".md")) {
          const response = await fetch(content);
          if (!response.ok) throw new Error("Failed to fetch README");
          const text = await response.text();
          setMarkdown(text);
        } else {
          setMarkdown(content);
        }
      } catch {
        setMarkdown("Failed to load README content.");
      }
    };

    if (isOpen) {
      loadMarkdown();
    }
  }, [content, isOpen]);

  return (
    <Dialog
      onOpenChange={setOpen}
    >
      <DialogContent className="bg-gradient-to-br from-default-300 to-default-60 dark:from-[#00171E] dark:to-[#004551]">
        <div className="p-10">
          <div className="markdown-body">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkEmoji]}
              rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        </div>
        <DialogFooter className="w-full flex flex-col justify-center items-center">
          <Button className="w-full" onClick={setOpen}>
            بستن
          </Button>
        </DialogFooter>
      </DialogContent >
    </Dialog >
  );
};

export default IdeaContentFileModal;
