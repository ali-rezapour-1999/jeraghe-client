import Btn from "@/components/ui/btn";
import React, { useState } from "react";
import { Form, Input } from "@heroui/react";
import { Toaster } from "react-hot-toast";

interface passInputType {
  password: string;
  newPassword: string;
  reNewPassword: string;
}

const ResetPassword = () => {
  const [pass, setPass] = useState<passInputType>({
    password: "",
    newPassword: "",
    reNewPassword: "",
  });

  const passInputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setPass((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitChangePasswordHandler = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
  };
  return (
    <Form
      className="flex relative flex-col gap-7 items-center justify-center"
      onSubmit={submitChangePasswordHandler}
    >
      <Input
        label="رمز فعلی"
        labelPlacement="outside"
        placeholder="رمز فعلی خود را وارد کنید"
        name="password"
        type="password"
        size="lg"
        value={pass?.password || ""}
        onChange={passInputChangeHandler}
      />
      <Input
        label="رمز عبور جدید"
        labelPlacement="outside"
        placeholder="رمز عبور جدید خود را وارد کنید"
        name="newPassword"
        type="password"
        size="lg"
        value={pass?.newPassword || ""}
        onChange={passInputChangeHandler}
      />
      <Input
        label="تکرار رمز عبور جدید"
        labelPlacement="outside"
        placeholder="رمز عبور جدید خود را تکرار کنید"
        name="reNewPassword"
        type="password"
        size="lg"
        value={pass?.reNewPassword || ""}
        onChange={passInputChangeHandler}
      />
      <Btn className="bg-orange-400 dark:bg-orange-400 w-full" type="submit">
        تغییر رمز عبور
      </Btn>
      <Toaster position="top-right" />
    </Form>
  );
};

export default ResetPassword;
