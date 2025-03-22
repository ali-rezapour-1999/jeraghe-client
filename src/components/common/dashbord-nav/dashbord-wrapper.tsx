"use client";
import React from "react";
import DashbordNavbar from "./navbar";
import DashbordSidebar from "./sidebar";

interface Props {
  children: React.ReactNode;
}

const DashbordWrapper: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <DashbordNavbar />
      <div className="flex gap-3">
        <DashbordSidebar />
        <main className="flex px-20 items-center h-full w-full rounded-tr-[50px] mx-auto overflow-y-auto">
          <div className="max-w-[1100px] w-full">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashbordWrapper;
