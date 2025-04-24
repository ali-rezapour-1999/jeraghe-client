"use client";
import React from "react";
import { Heading } from "../ui/text";

const JobOwnerDetial: React.FC = () => {
  return (
    <div className="mt-7 dark:bg-light-dark rounded-2xl px-7 py-4">
      <Heading as="h1" className="text-xl p-4 font-bold border-b-1 pb-2 mb-3">
        درباره من
      </Heading>
      <p className="text-gray-300"></p>
    </div>
  );
};

export default JobOwnerDetial;
