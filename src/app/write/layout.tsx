import React from "react";
import LayoutWrapper from "./layoutWrapper";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <LayoutWrapper>{children}</LayoutWrapper>;
};

export default Layout;
