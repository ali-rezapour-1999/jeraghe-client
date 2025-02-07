"use client";
import React from "react";
import { motion } from "framer-motion";

const HomeContainer = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className="w-full p-2"
    >
      <div className="bg-light dark:bg-darkPrimary rounded-2xl drop-shadow flex items-center justify-center flex-col p-3 gap-3">
        {children}
      </div>
    </motion.section>
  );
};

export default HomeContainer;
