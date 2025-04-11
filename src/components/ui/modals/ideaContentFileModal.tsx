import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  ScrollShadow,
} from "@heroui/react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import remarkEmoji from "remark-emoji";
import rehypeRaw from "rehype-raw";

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
    <Modal
      isOpen={isOpen}
      onOpenChange={setOpen}
      size="5xl"
      hideCloseButton={true}
    >
      <ModalContent>
        <ModalBody className="p-10">
          <ScrollShadow className="w-full h-[400px] md:h-[700px]" hideScrollBar>
            <div className="markdown-body">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkEmoji]}
                rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          </ScrollShadow>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="light"
            className="w-full"
            onPress={setOpen}
          >
            بستن
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default IdeaContentFileModal;
