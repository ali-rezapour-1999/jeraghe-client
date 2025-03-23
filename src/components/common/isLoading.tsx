import { Spinner } from "@heroui/react";
import React from "react";

export const IsLoading = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-primary-dark dark:text-light">
        در حال بارگذاری اطلاعات...
      </h1>
      <Spinner color="success" />
    </div>
  );
};

export const AuthIsLoading = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-darkPrimary dark:text-light">
        برای ورود به این بخش باید حساب کاربری داشته باشی یه لحظه داریم بررسی
        میکنم حساب داری یا نه واسا یه لحظه ....
      </h1>
      <Spinner color="success" />
    </div>
  );
};
