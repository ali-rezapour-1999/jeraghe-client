import React, { useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  PiTextAlignLeftBold,
  PiTextAlignRightBold,
  PiTextAlignJustifyDuotone,
  PiTextAlignCenterBold,
} from "react-icons/pi";
import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";

interface EditorTextAlignProps {
  editor: Editor;
}

const EditorTextAlign = ({ editor }: EditorTextAlignProps) => {
  const [selectedAlign, setSelectedAlign] = useState<string>("right");

  const alignOptions = [
    {
      key: "right",
      icon: <PiTextAlignRightBold className="size-5" />,
      label: "راست‌چین",
    },
    {
      key: "left",
      icon: <PiTextAlignLeftBold className="size-5" />,
      label: "چپ‌چین",
    },
    {
      key: "center",
      icon: <PiTextAlignCenterBold className="size-5" />,
      label: "وسط‌چین",
    },
    {
      key: "justify",
      icon: <PiTextAlignJustifyDuotone className="size-5" />,
      label: "منظم‌چین",
    },
  ];

  const currentIcon = useMemo(() => {
    const option = alignOptions.find((opt) => opt.key === selectedAlign);
    return option ? option.icon : <PiTextAlignRightBold className="size-5" />;
  }, [selectedAlign]);

  const handleAlignChange = (align: string) => {
    setSelectedAlign(align);
    editor.chain().focus().setTextAlign(align).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="p-2 text-md md:text-xl bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="انتخاب تراز متن"
        >
          {currentIcon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="start">
        {alignOptions.map((option) => (
          <DropdownMenuItem
            key={option.key}
            onSelect={() => handleAlignChange(option.key)}
            className={`flex items-center gap-2 ${editor.isActive({ textAlign: option.key })
              ? "bg-accent text-accent-foreground"
              : ""
              }`}
          >
            {option.icon}
            <span>{option.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EditorTextAlign;
