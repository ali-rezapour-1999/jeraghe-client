"use client";

import React, { useState } from "react";
import { Form, Input, Spinner } from "@heroui/react";
import { motion } from "framer-motion";
import { useAuthStore } from "@/state/authState";
import Btn from "@/components/ui/btn";
import SocialMediaLogin from "../socialMediaLogin";
import Link from "next/link";

const Login: React.FC = () => {
  const { login, isLoading, setLoading } = useAuthStore();
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validateForm = (form: HTMLFormElement) => {
    const email = form.email.value;
    const password = form.password.value;

    const errors = {
      email: "",
      password: "",
    };

    if (!email) {
      errors.email = "ایمیل وارد نکردی";
    }
    if (!password) {
      errors.password = "رمز عبور وارد نکردی";
    }
    return errors;
  };

  const inputChangeHandler = async (
    input: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormData({ ...formData, [input.target.name]: input.target.value });
  };
  const onSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const errors = validateForm(form);

    if (Object.values(errors).some((error) => error !== "")) {
      setFormErrors(errors);
    } else {
      setLoading(true);
      const result = await login(formData.email, formData.password);
      try {
        if (result.success) {
        } else {
        }
      } catch {
        return setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-screen flex px-3 md:px-10 items-center justify-center  max-w-[800px] mx-auto h-screen"
    >
      <div className="w-full h-max flex flex-col items-center justify-center dark:bg-primary-dark/20 p-10 rounded-xl">
        <h1 className="text-2xl font-bold mb-8 border-b-1 dark:text-light text-primary">
          اوه اوه ببین کی برگشته
        </h1>
        <Form
          onSubmit={onSubmitLogin}
          className="w-full items-center justify-center flex flex-col gap-8"
        >
          <Input
            isRequired
            label="ایمیل"
            labelPlacement="outside"
            name="email"
            placeholder="ایمیل خود را وارد کنید"
            type="email"
            size="lg"
            validate={() => formErrors.email || ""}
            value={formData.email}
            onChange={inputChangeHandler}
          />
          <Input
            isRequired
            label="رمز عبور"
            labelPlacement="outside"
            name="password"
            placeholder="رمز عبور خود را وارد کنید"
            type="password"
            size="lg"
            validate={() => formErrors.password || ""}
            value={formData.password}
            onChange={inputChangeHandler}
          />
          <Link href="/reset-passowrd" className="w-full">
            فراموشی رمز ؟؟؟
          </Link>

          <Link href="/register" className="w-full">
            حساب نداری؟ چرا نداری بزن بسازیم!!!
          </Link>
          <Btn
            type="submit"
            className="dark:bg-green-900 bg-green-dark text-white dark:text-light w-full"
          >
            {isLoading ? <Spinner /> : " ورود "}
          </Btn>
        </Form>

        <SocialMediaLogin />
      </div>
    </motion.div>
  );
};

export default Login;
