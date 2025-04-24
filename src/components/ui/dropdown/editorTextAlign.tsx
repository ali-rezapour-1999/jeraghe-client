import {
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
} from "@heroui/react";
import React, { useMemo } from "react";
import {
  PiTextAlignLeftBold,
  PiTextAlignRightBold,
  PiTextAlignJustifyDuotone,
  PiTextAlignCenterBold,
} from "react-icons/pi";
import { Editor } from "@tiptap/react";
import Btn from "../button";

interface EditorTextAlignProps {
  editor: Editor;
}

const EditorTextAlign = ({ editor }: EditorTextAlignProps) => {
  const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(
    new Set(["right"])
  );

  const selectedValue = useMemo(
    () => Array.from(selectedKeys)[0] || "right",
    [selectedKeys]
  );

  const ShowIconTextAlign = () => {
    switch (selectedValue) {
      case "left":
        return <PiTextAlignLeftBold />;
      case "right":
        return <PiTextAlignRightBold />;
      case "center":
        return <PiTextAlignCenterBold />;
      case "justify":
        return <PiTextAlignJustifyDuotone />;
      default:
        return <PiTextAlignRightBold />;
    }
  };

  const alignOptions = [
    {
      key: "right",
      icon: <PiTextAlignRightBold className="size-6" />,
      label: "راست چین",
    },
    {
      key: "left",
      icon: <PiTextAlignLeftBold className="size-6" />,
      label: "چپ چین",
    },
    {
      key: "center",
      icon: <PiTextAlignCenterBold className="size-6" />,
      label: "وسط چین",
    },
    {
      key: "justify",
      icon: <PiTextAlignJustifyDuotone className="size-6" />,
      label: "منظم کردن چین",
    },
  ];

  const handleSelectionChange = (keys: any) => {
    const newKeys = keys instanceof Set ? keys : new Set([String(keys)]);
    setSelectedKeys(newKeys);
    const selectedKey = Array.from(newKeys)[0];
    editor.chain().focus().setTextAlign(selectedKey).run();
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Btn className="rounded cursor-pointer min-w-0 bg-transparent text-md md:text-xl px-2">
          <ShowIconTextAlign />
        </Btn>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Text alignment selection"
        selectedKeys={selectedKeys}
        selectionMode="single"
        variant="flat"
        onSelectionChange={handleSelectionChange}
      >
        {alignOptions.map((option) => (
          <DropdownItem
            key={option.key}
            endContent={option.label}
            className={
              editor.isActive({ textAlign: option.key }) ? "is-active" : ""
            }
          >
            {option.icon}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default EditorTextAlign;
