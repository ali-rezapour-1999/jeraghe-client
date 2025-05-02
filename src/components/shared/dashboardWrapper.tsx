"use client";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const DashboardWrapper: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <main className="flex items-center justify-center h-full w-full mx-auto overflow-y-auto">
        <div className="w-full px-8 md:px-14 lg:px-20 py-10 rounded-b-2xl">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardWrapper;
