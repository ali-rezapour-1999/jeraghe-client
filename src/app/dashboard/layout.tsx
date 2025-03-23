import DashboardWrapper from "@/components/common/dashboard-nav/dashboard-wrapper";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <DashboardWrapper>{children}</DashboardWrapper>;
};

export default Layout;
