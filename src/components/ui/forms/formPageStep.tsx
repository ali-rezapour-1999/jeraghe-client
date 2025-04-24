import React, { useEffect, useRef } from "react";
import StepOne from "@/app/ideas/create/stepForm/stepOne";
import { FormState, PageStepProps } from "@/utils/type/ideaStateType";
import StepTwo from "@/app/ideas/create/stepForm/stepTwo";
import { useForm } from "@/hook/useFormIdea";
import StepThree from "@/app/ideas/create/stepForm/setThree";

const PageStep: React.FC<PageStepProps> = ({ step, setStep }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const initialFormState: FormState = {
    title: "",
    category: null,
    ideaStatus: null,
    neededCollaborator: null,
    content: "",
    isOpenContent: false,
    needColabration: false,
    imageLogo: null,
  };

  const { formState, updateForm } = useForm(initialFormState);

  useEffect(() => {
    if (formState.content && editorRef.current) {
      editorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [formState.content]);


  if (step === 1) {
    return (
      <StepOne
        formState={formState}
        updateForm={updateForm}
        setStep={setStep}
      />
    );
  }

  if (step === 2) {
    return (
      <StepTwo
        initialFormState={initialFormState}
        editorRef={editorRef}
        formState={formState}
        setStep={setStep}
        updateForm={updateForm}
      />
    );
  }

  if (step === 3) {
    return <StepThree initialFormState={initialFormState} updateForm={updateForm} setStep={setStep} formState={formState} />;
  }

  return null;
};

export default PageStep;
