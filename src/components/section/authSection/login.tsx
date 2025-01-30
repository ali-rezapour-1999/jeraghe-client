"use client";

import React, { useState } from "react";
import { Form, Input, Button } from "@heroui/react";
import { motion } from "framer-motion";

const Login: React.FC = () => {
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const onSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const email = (form.email as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;

    const errors = {
      email: "",
      password: "",
    };

    if (!email) {
      errors.email = "ایمیل خود را وارد کنید";
    }
    if (!password) {
      errors.password = "رمز عبور خود را وارد کنید";
    }

    // If there are errors, update the state and don't submit
    if (errors.email || errors.password) {
      setFormErrors(errors);
      return;
    }

    // If no errors, proceed with form submission
    console.log("Form submitted successfully with:", { email, password });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col px-10 items-center justify-center"
    >
      <h1 className="text-2xl font-bold mb-8 border-b-1">ورود به جرقه</h1>
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
          validate={() => {
            if (formErrors.email) {
              return "این فیلد باید پر شده باشه";
            }
          }}
        />
        <Input
          isRequired
          label="رمز عبور"
          labelPlacement="outside"
          name="password"
          placeholder="رمز عبور خود را وارد کنید"
          type="password"
          size="lg"
          validate={() => {
            if (formErrors.password) {
              return "این فیلد باید پر شده باشه";
            }
          }}
        />
        <Button color="primary" type="submit" className="px-10">
          ورود
        </Button>
      </Form>
    </motion.div>
  );
};

export default Login;
