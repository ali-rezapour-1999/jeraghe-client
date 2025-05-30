import React from "react";
import { Heading } from "../ui/text";
import Spinner from "./spinner";

export const IsLoading = () => {
  return (
    <div className="w-full flex gap-2 py-3 items-center justify-center">
      <Spinner variant="primary" />
      <Heading as="h1" className="text-primary-dark dark:text-light">
        در حال بارگذاری اطلاعات...
      </Heading>
    </div>
  );
};

export const AuthIsLoading = () => {
  return (
    <div className="flex flex-col items-center">
      <Heading as="h1" className="text-darkPrimary dark:text-light">
        برای ورود به این بخش باید حساب کاربری داشته باشی یه لحظه داریم بررسی
        میکنم حساب داری یا نه واسا یه لحظه ....
      </Heading>
      <Spinner variant="primary" />
    </div>
  );
};
