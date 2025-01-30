"use client";
import { Form, Input, Button } from "@heroui/react";
import { motion } from "framer-motion";
import React, { useState } from "react";

const Register: React.FC = () => {
  const [formErrors, setFormErrors] = useState({
    email: "",
    username: "",
    password: "",
    repassword: "",
  });

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    repassword: "",
  });

  const validateForm = (form: HTMLFormElement) => {
    const email = form.email.value;
    const username = form.username.value;
    const password = form.password.value;
    const repassword = form.repassword.value;

    const errors = {
      email: "",
      username: "",
      password: "",
      repassword: "",
    };

    if (!email) errors.email = "ایمیل خود را وارد کنید";

    if (!username || username.length < 4) {
      errors.username = "نام و نام خانوادگی خود را وارد کنید (حداقل ۴ کاراکتر)";
    }

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!password) {
      errors.password = "رمز عبور خود را وارد کنید";
    } else if (!strongPasswordRegex.test(password)) {
      errors.password =
        "رمز عبور باید حداقل ۶ کاراکتر و شامل حرف بزرگ، حرف کوچک و عدد باشد";
    }

    if (!repassword) {
      errors.repassword = "تکرار رمز عبور الزامیس";
    } else if (password !== repassword) {
      errors.repassword = "رمز عبور با تکرارش برابر نیست";
    }

    return errors;
  };

  const inputChangeHandler = (input: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [input.target.name]: input.target.value });
  };

  const onSubmitRegisterd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const errors = validateForm(form);

    if (Object.values(errors).some((error) => error !== "")) {
      setFormErrors(errors);
    } else {
      console.log(formData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col px-10 items-center justify-center"
    >
      <h1 className="text-2xl font-bold mb-8 border-b-1">ثبت نام در جرقه</h1>
      <Form
        onSubmit={onSubmitRegisterd}
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
          label="نام و نام خانوادگی (فارسی)"
          labelPlacement="outside"
          name="username"
          placeholder="نام و نام خانوادگی خود را وارد کنید"
          type="text"
          size="lg"
          validate={() => formErrors.username || ""}
          value={formData.username}
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
        <Input
          isRequired
          label="رمز عبور تکرار"
          labelPlacement="outside"
          name="repassword"
          placeholder="رمز عبور خود را تکرار کنید"
          type="password"
          size="lg"
          validate={() => formErrors.repassword || ""}
          value={formData.repassword}
          onChange={inputChangeHandler}
        />
        <Button color="primary" type="submit" className="px-10">
          ثبت نام
        </Button>
      </Form>
    </motion.div>
  );
};

export default Register;
