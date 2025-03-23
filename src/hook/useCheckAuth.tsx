import { useAuthStore } from "@/state/authState";
import { useEffect } from "react";

export const useCheckAuth = () => {
  const { restoreAuthState } = useAuthStore();

  useEffect(() => {
    restoreAuthState();
  }, [restoreAuthState]);
};
