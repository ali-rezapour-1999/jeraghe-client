"use client";
import MainNavBar from "@/components/common/navbar";
import React from "react";
import FormIdeaCreate from "@/components/ui/forms/formIdea";

const CrateIdea = () => {
  return (
    <div>
      <MainNavBar />
      <main className="flex flex-col-reverse items-start gap-10 lg:gap-0 lg:flex-row mt-10 px-5 lg:px-12">
        <FormIdeaCreate />
      </main>
    </div>
  );
};

export default CrateIdea;
