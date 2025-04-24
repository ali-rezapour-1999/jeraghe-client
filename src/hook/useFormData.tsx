import { useCallback, useState } from "react";

export const useForm = <T extends Record<string, any>>(initialState: T) => {
  const [formState, setFormState] = useState<T>(initialState);

  const updateForm = useCallback(
    <K extends keyof T>(fieldName: K, value: T[K]) => {
      setFormState((prev) => ({ ...prev, [fieldName]: value }));
    },
    []
  );

  const updateMultipleFields = useCallback((updates: Partial<T>) => {
    setFormState((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetForm = useCallback(() => {
    setFormState(initialState);
  }, [initialState]);

  const resetFields = useCallback(
    (fields: Array<keyof T>) => {
      const resetValues = fields.reduce(
        (acc, field) => ({
          ...acc,
          [field]: initialState[field],
        }),
        {} as Partial<T>
      );

      setFormState((prev) => ({ ...prev, ...resetValues }));
    },
    [initialState]
  );

  return {
    formState,
    updateForm,
    updateMultipleFields,
    resetForm,
    resetFields,
  };
};
