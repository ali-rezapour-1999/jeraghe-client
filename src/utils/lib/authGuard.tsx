"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useBaseState from "@/state/baseState";
import Loading from "@/app/loading";
import AuthenticatedModal from "@/components/common/auth-modal/AuthenticatedModal";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { setOpenAuthRequireModel } = useBaseState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
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
    };

    checkAuth();
  }, [pathname, setOpenAuthRequireModel]);

  if (loading) return <Loading />;
  return (
    <main>
      <AuthenticatedModal />
      {children}
    </main>
  );
}
