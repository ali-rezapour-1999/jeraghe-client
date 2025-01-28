"use client";
import React from "react";
import { motion } from "framer-motion";

const ProfileSectionContainer = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className="w-full p-2"
    >
      <div className="bg-greylight rounded-3xl shadow-md flex items-center justify-center flex-col p-4 gap-3">
        {children}
      </div>
    </motion.section>
  );
};

export default ProfileSectionContainer;
