"use client";
import React from "react";
import CartItem from "../cart/cartItem";
import JobDetailDrawer from "../sidebar/jobDetailDrawer";
import { useDisclosure } from "@heroui/react";
import CartItemsContainer from "../container/cartItemsContainer";

const HomeShowJobItems: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <CartItemsContainer delay={0.5}>
      <div className="flex flex-col gap-10">
        <JobDetailDrawer onClose={onClose} isOpen={isOpen} />
        <CartItem onOpen={onOpen} />
        <CartItem onOpen={onOpen} />
        <CartItem onOpen={onOpen} />
        <CartItem onOpen={onOpen} />
        <CartItem onOpen={onOpen} />
        <CartItem onOpen={onOpen} />
        <CartItem onOpen={onOpen} />
        <CartItem onOpen={onOpen} />
        <CartItem onOpen={onOpen} />
        <CartItem onOpen={onOpen} />
        <CartItem onOpen={onOpen} />
        <CartItem onOpen={onOpen} />
        <CartItem onOpen={onOpen} />
        <CartItem onOpen={onOpen} />
        <CartItem onOpen={onOpen} />
        <CartItem onOpen={onOpen} />
      </div>
    </CartItemsContainer>
  );
};

export default HomeShowJobItems;
