"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useBaseState from "@/store/baseState";
import { IsLoading } from "@/components/shared/isLoading";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { setOpenAuthRequireModel } = useBaseState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const checkAuth = async () => {
      try {
        const response = await fetch(pathname, { method: "HEAD" });
        if (isMounted && response.headers.get("x-require-login") === "true") {
          setOpenAuthRequireModel(true);
        }
      } catch {
        if (isMounted) setLoading(false);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [pathname, setOpenAuthRequireModel]);

  if (loading) return <IsLoading />;
  return (
    <main>
      {children}
    </main>
  );
}
