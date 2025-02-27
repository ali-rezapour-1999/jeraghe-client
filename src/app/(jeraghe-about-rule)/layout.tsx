import MainNavBar from "@/components/common/navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <article>
      <MainNavBar />
      {children}
    </article>
  );
};
export default Layout;
