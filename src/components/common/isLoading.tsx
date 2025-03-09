import { Spinner } from "@heroui/react";
import React from "react";

export const IsLoading = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-darkPrimary dark:text-light">در حال بارگذاری اطلاعات...</h1>
      <Spinner color="success" />
    </div>
  );
};
