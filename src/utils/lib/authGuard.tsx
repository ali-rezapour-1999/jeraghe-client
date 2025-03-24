"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useBaseState from "@/state/baseState";
import RedirectAuthModal from "@/components/common/redirectAuthModal";
import { useAuthStore } from "@/state/authState";
import { isAuthCheckAction } from "../actions/authActions";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { setOpenAuthRequireModel } = useBaseState();
  const [loading, setLoading] = useState(true);
  const { restoreAuthState } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await isAuthCheckAction();
      try {
        const response = await fetch(pathname, { method: "HEAD" });
        if (response.headers.get("x-require-login") === "true") {
          setOpenAuthRequireModel(true);
        }
      } catch {
        setLoading(false);
      } finally {
        setLoading(false);
      }
      restoreAuthState(res.success);
    };

    checkAuth();
  }, [pathname, setOpenAuthRequireModel, restoreAuthState]);

  if (loading) return null;

  return (
    <>
      <RedirectAuthModal />
      {children}
    </>
  );
}
