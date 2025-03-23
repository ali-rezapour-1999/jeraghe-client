"use client";
import { addToast, Button, Form, Input, Spinner } from "@heroui/react";
import { motion } from "framer-motion";
import React, { useState, useCallback } from "react";
import { useAuthStore } from "@/state/authState";
import SocialMediaLogin from "../socialMediaLogin";
import Link from "next/link";
import { useBackToLastPath } from "@/lib/savePath";

const Register = () => {
  const { isLoading, register, setLoading } = useAuthStore();
  const navigateBack = useBackToLastPath();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    repassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    username: "",
    password: "",
    repassword: "",
  });

  const validateField = useCallback(
    (name: string, value: string, allValues = formData) => {
      switch (name) {
        case "email":
          if (!value) return "ایمیل خود را وارد کنید";
          if (!/^\S+@\S+\.\S+$/.test(value)) return "ایمیل معتبر نیست";
          return "";

        case "username":
          if (!value) return "نام و نام خانوادگی خود را وارد کنید";
          if (value.length < 4)
            return "نام و نام خانوادگی باید حداقل ۴ کاراکتر باشد";
          return "";

        case "password":
          if (!value) return "رمز عبور خود را وارد کنید";

          const strongPasswordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
          if (!strongPasswordRegex.test(value)) {
            return "رمز عبور باید حداقل ۶ کاراکتر و شامل حرف بزرگ، حرف کوچک و عدد باشد";
          }
          return "";

        case "repassword":
          if (!value) return "تکرار رمز عبور الزامیست";
          if (value !== allValues.password)
            return "رمز عبور با تکرارش برابر نیست";
          return "";

        default:
          return "";
      }
    },
    [formData]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setFormData((prev) => {
        const newData = { ...prev, [name]: value };
        const error = validateField(name, value, newData);
        setFormErrors((prevErrors) => ({ ...prevErrors, [name]: error }));

        return newData;
      });
    },
    [validateField]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      email: validateField("email", formData.email),
      username: validateField("username", formData.username),
      password: validateField("password", formData.password),
      repassword: validateField("repassword", formData.repassword),
    };

    setFormErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    try {
      setLoading(true);
      const result = await register(
        formData.email,
        formData.password,
        formData.username
      );

      if (result.success) {
        addToast({
          title: result.message,
          color: "success",
        });
        navigateBack();
      } else {
        addToast({
          title: result.message,
          color: "danger",
        });
      }
    } catch {
      addToast({
        title: "خطا در ارتباط با سرور",
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-screen flex px-3 md:px-10 items-center justify-center max-w-[800px] mx-auto h-screen"
    >
      <div className="w-full h-max flex flex-col items-center justify-center dark:bg-primary-dark/20 p-10 rounded-xl">
        <h1 className="text-2xl font-bold mb-8 border-b-1 dark:text-light text-primary">
          ثبت نام در جرقه
        </h1>

        <Form
          onSubmit={handleSubmit}
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
            validate={() => formErrors.email}
            value={formData.email}
            onChange={handleInputChange}
            errorMessage={formErrors.email}
          />

          <Input
            isRequired
            label="نام و نام خانوادگی (فارسی)"
            labelPlacement="outside"
            name="username"
            placeholder="نام و نام خانوادگی خود را وارد کنید"
            type="text"
            size="lg"
            validate={() => formErrors.username}
            value={formData.username}
            onChange={handleInputChange}
            errorMessage={formErrors.username}
          />

          <Input
            isRequired
            label="رمز عبور"
            labelPlacement="outside"
            name="password"
            placeholder="رمز عبور خود را وارد کنید"
            type="password"
            size="lg"
            validate={() => formErrors.password}
            value={formData.password}
            onChange={handleInputChange}
            errorMessage={formErrors.password}
          />

          <Input
            isRequired
            label="تکرار رمز عبور"
            labelPlacement="outside"
            name="repassword"
            placeholder="رمز عبور خود را تکرار کنید"
            type="password"
            size="lg"
            validate={() => formErrors.repassword}
            value={formData.repassword}
            onChange={handleInputChange}
            errorMessage={formErrors.repassword}
          />

          <Link
            href="/login"
            className="w-full text-blue-600 dark:text-blue-400 hover:underline"
          >
            حساب داری؟ برای ورود کلیک کنید
          </Link>

          <Button
            type="submit"
            className="dark:bg-green-900 bg-green-dark text-white dark:text-light w-full"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "ثبت نام"}
          </Button>
        </Form>

        <SocialMediaLogin />
      </div>
    </motion.div>
  );
};

export default Register;
