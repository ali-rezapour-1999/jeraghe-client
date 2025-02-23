import { Spinner } from "@heroui/react";
import React from "react";

export const IsLoading = () => {
  return (
    <div className="flex flex-col items-center">
      <h1>در حال بارگذاری اطلاعات...</h1>
      <Spinner color="success" />
    </div>
  );
};
