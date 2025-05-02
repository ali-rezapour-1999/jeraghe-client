import React, { useState } from "react";
import PageStep from "./formPageStep";
import BreadcrumbsIdea from "@/components/ui/breadcrumbs/breadcrumbsIdea";

const FormIdeaCreate = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="w-full  flex flex-col gap-10">
      <BreadcrumbsIdea step={step} />
      <div>
        <PageStep step={step} setStep={setStep} />
      </div>
    </div>
  );
};
export default FormIdeaCreate;
