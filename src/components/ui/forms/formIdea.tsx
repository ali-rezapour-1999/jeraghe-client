import { Form } from "@heroui/react";
import React, { useState } from "react";
import PageStep from "./formPageStep";
import BreadcrumbsIdea from "../breadcrumbs/breadcrumbsIdea";

const FormIdeaCreate = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="w-full  flex flex-col gap-10">
      <BreadcrumbsIdea step={step} />
      <Form className="w-full t-10">
        <PageStep step={step} setStep={setStep} />
      </Form>
    </div>
  );
};
export default FormIdeaCreate;
