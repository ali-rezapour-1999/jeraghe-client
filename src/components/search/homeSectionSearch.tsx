"use client";
import { Button } from "@heroui/react";
import { Search } from "lucide-react";
import React from "react";

const HomeSectionSearch: React.FC = () => {
  return (
    <div className="flex w-full text-xl h-14 bg-greylight drop-shadow py-2 pr-6 pl-2 justify-center items-center rounded-2xl ">
      <input
        type="text"
        className="w-full h-full border-none focus:outline-none focus:ring-0 active:outline-none active:ring-0 bg-transparent text-[.9em]"
        placeholder="جوستجو برای ..."
      />
      <Button className="rounded-2xl px-0 min-w-12 h-11 bg-primary text-light">
        <Search />
      </Button>
    </div>
  );
};

export default HomeSectionSearch;
