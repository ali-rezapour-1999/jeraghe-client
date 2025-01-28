"use client";
import { Button, useDisclosure } from "@heroui/react";
import { Search, SlidersHorizontal } from "lucide-react";
import React from "react";
import HomeSectionContainer from "../container/homeContainer";
import FilterDrawer from "../sidebar/filterDrawer";

const HomeSectionSearch: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <HomeSectionContainer delay={0.2}>
      <div className="flex w-full text-xl pr-6 pl-2 justify-center items-center rounded-2xl ">
        <Search className="text-gray-400 ml-4" />
        <input
          type="text"
          className="w-full h-full border-none focus:outline-none focus:ring-0 active:outline-none active:ring-0 bg-transparent text-[.9em]"
          placeholder="جوستجو برای ..."
        />
        <Button
          className="rounded-2xl px-0 min-w-12 h-12 text-light bg-primary"
          onPress={onOpen}
        >
          <SlidersHorizontal />
        </Button>
      </div>
      <FilterDrawer isOpen={isOpen} onClose={onClose} />
    </HomeSectionContainer>
  );
};

export default HomeSectionSearch;
