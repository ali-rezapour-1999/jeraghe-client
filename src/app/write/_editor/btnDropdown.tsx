import React, { ReactNode } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import MenuBtn, { CommandType } from "./menuBtn";
import { Editor } from "@tiptap/react";

interface BtnDrapDownProps {
  editor: Editor;
  items: { command: CommandType; icon: ReactNode }[];
  iconBtn: any;
}

const BtnDrapDown: React.FC<BtnDrapDownProps> = ({
  editor,
  items,
  iconBtn,
}) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="min-w-0 w-10 px-2">{iconBtn}</Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="for heading and align"
        classNames={{ base: "min-w-0 bg-primary dark:bg-light rounded-md" }}
      >
        {items.map((item, index) => (
          <DropdownItem key={index} className="min-w-0 px-0">
            <MenuBtn editor={editor} command={item.command} icons={item.icon} />
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default BtnDrapDown;
