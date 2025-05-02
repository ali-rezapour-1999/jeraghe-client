import Navbar from "@/components/shared/navbar/navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <article>
      <Navbar />
      {children}
    </article>
  );
};
export default Layout;
