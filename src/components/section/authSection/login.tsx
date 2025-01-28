"use client";
import { Form, Input, Button } from "@heroui/react";
import React from "react";

const Login: React.FC = () => {
  return (
    <div className="w-full flex flex-col px-10 items-center justify-center">
      <h1 className="text-2xl font-bold">ورود به جرقه</h1>
      <Form className="w-full items-center justify-center flex flex-col gap-4">
        <Input
          isRequired
          errorMessage="ایمیل خود را به درستی وارد کنید"
          label="ایمیل"
          labelPlacement="outside"
          name="email"
          placeholder="ایمیل خود را وارد کنید"
          type="email"
          size="lg"
        />
        <Input
          isRequired
          errorMessage="Please enter a valid username"
          label="رمز عبور"
          labelPlacement="outside"
          name="رمز عبور"
          placeholder="رمز عبور خود را وارد کنید"
          type="password"
          size="lg"
        />
        <div className="flex flex-col w-full gap-2">
          <Button color="primary" type="submit" className="w-full">
            ورود
          </Button>
          <Button color="primary" type="submit" className="w-full">
            ورود از طریق حساب گوگل
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
