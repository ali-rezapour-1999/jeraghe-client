import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useBackToLastPath = () => {
  const router = useRouter();

  const navigateBack = useCallback(() => {
    const returnUrl = localStorage.getItem("returnUrl") || "/";
    localStorage.removeItem("returnUrl");
    router.push(returnUrl);
  }, [router]);

  return navigateBack;
};
