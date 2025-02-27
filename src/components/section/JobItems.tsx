"use client";
import React from "react";
import JobCart from "@/components/ui/cart/jobCart";
import JobDetailDrawer from "../ui/drawer/jobDetailDrawer";
import CartContainer from "../container/cartContainer";
import { useDisclosure } from "@heroui/react";

const HomeShowJobItems = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <CartContainer delay={0.5}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <JobDetailDrawer onClose={onClose} isOpen={isOpen} />
        <JobCart onOpen={onOpen} />
        <JobCart onOpen={onOpen} />
      </div>
    </CartContainer>
  );
};

export default HomeShowJobItems;
