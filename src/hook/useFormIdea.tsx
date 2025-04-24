import { FormState } from "@/utils/type/ideaStateType";
import { useCallback, useState } from "react";

export const useForm = (initialState: FormState) => {
  const [formState, setFormState] = useState<FormState>(initialState);

  const updateForm = useCallback((fieldName: keyof FormState, value: any) => {
    setFormState((prev) => ({ ...prev, [fieldName]: value }));
  }, []);

  const updateMultipleFields = useCallback((updates: Partial<FormState>) => {
    setFormState((prev) => ({ ...prev, ...updates }));
  }, []);

  return { formState, updateForm, updateMultipleFields };
};
