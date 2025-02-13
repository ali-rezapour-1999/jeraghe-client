"use client";
import React from "react";
import JobCart from "../cart/jobCart";
import JobDetailDrawer from "../drawer/jobDetailDrawer";
import { useDisclosure } from "@heroui/react";
import CartContainer from "../container/cartContainer";

const HomeShowJobItems: React.FC = () => {
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
