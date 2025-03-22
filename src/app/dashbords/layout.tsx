import DashbordWrapper from "@/components/common/dashbord-nav/dashbord-wrapper";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <DashbordWrapper>{children}</DashbordWrapper>;
};

export default Layout;
