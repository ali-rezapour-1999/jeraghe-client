"use client";
import FormIdeaCreate from "@/components/shared/forms/formIdea";
import Navbar from "@/components/shared/navbar/navbar";
import React from "react";

const CrateIdea = () => {
  return (
    <div>
      <Navbar />
      <main className="flex flex-col-reverse items-start gap-10 lg:gap-0 lg:flex-row mt-10 px-5 lg:px-12">
        <FormIdeaCreate />
      </main>
    </div>
  );
};

export default CrateIdea;
