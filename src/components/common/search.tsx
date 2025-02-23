"use client";
import { useDisclosure } from "@heroui/react";
import { Search, SlidersHorizontal } from "lucide-react";
import React from "react";
import HomeContainer from "../container/homeContainer";
import FilterDrawer from "../components/drawer/filterDrawer";
import Btn from "../ui/btn";

const HomeSectionSearch: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <HomeContainer delay={0.2}>
      <div className="flex w-full text-xl pr-6 pl-2 justify-center items-center rounded-2xl ">
        <Search className="text-gray-400 ml-4" />
        <input
          type="text"
          className="w-full h-full border-none focus:outline-none focus:ring-0 active:outline-none active:ring-0 bg-transparent text-[.9em]"
          placeholder="جوستجو برای ..."
        />
        <Btn
          className=" h-12 text-darkPrimary bg-light dark:bg-darkPrimary"
          onClick={onOpen}
        >
          <SlidersHorizontal />
        </Btn>
      </div>
      <FilterDrawer isOpen={isOpen} onClose={onClose} />
    </HomeContainer>
  );
};

export default HomeSectionSearch;
