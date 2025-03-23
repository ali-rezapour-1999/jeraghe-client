"use client";
import { addToast, Button, Form, Input, Spinner } from "@heroui/react";
import { motion } from "framer-motion";
import React, { useState, useCallback } from "react";
import { useAuthStore } from "@/state/authState";
import SocialMediaLogin from "../socialMediaLogin";
import Link from "next/link";
import { useBackToLastPath } from "@/lib/savePath";
import Btn from "@/components/ui/btn";
import { Eye, EyeClosed } from "lucide-react";

const Register = () => {
  const { isLoading, register, setLoading } = useAuthStore();
  const navigateBack = useBackToLastPath();
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

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

          const easyPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
          if (!easyPasswordRegex.test(value)) {
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

    setLoading(true);

    try {
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
    } catch (err: any) {
      if (err.response && err.response.data) {
        const errors = err.response.data;

        if (errors.email) {
          setFormErrors((prev) => ({ ...prev, email: errors.email[0] }));
        }
        if (errors.username) {
          setFormErrors((prev) => ({ ...prev, username: errors.username[0] }));
        }
        if (errors.password) {
          setFormErrors((prev) => ({ ...prev, password: errors.password[0] }));
        }

        addToast({
          title: errors.message || "ثبت‌نام با خطا مواجه شد",
          color: "danger",
        });
      } else {
        addToast({
          title: "خطا در ارتباط با سرور",
          color: "danger",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center h-screen w-screen px-4"
    >
      <div className="w-full max-w-[750px] bg-white dark:bg-primary-dark/30 shadow-lg rounded-xl overflow-hidden p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-primary dark:text-light mb-4">
          ثبت نام در جرقه 🚀
        </h1>

        <Form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col w-full justify-center gap-4">
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
              type={isVisible ? "text" : "password"}
              size="lg"
              validate={() => formErrors.password}
              value={formData.password}
              onChange={handleInputChange}
              errorMessage={formErrors.password}
              endContent={
                <Button
                  aria-label="toggle password visibility"
                  className="focus:outline-none bg-transparent min-w-0"
                  type="button"
                  onPress={toggleVisibility}
                >
                  {isVisible ? (
                    <Eye className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeClosed className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </Button>
              }
            />

            <Input
              isRequired
              label="تکرار رمز عبور"
              labelPlacement="outside"
              name="repassword"
              placeholder="رمز عبور خود را تکرار کنید"
              type={isVisible ? "text" : "password"}
              size="lg"
              validate={() => formErrors.repassword}
              value={formData.repassword}
              onChange={handleInputChange}
              errorMessage={formErrors.repassword}
              endContent={
                <Button
                  aria-label="toggle password visibility"
                  className="focus:outline-none bg-transparent min-w-0"
                  type="button"
                  onPress={toggleVisibility}
                >
                  {isVisible ? (
                    <Eye className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeClosed className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </Button>
              }
            />

            <div>
              {" "}
              <h2 className="text-sm text-gray-700 dark:text-gray-300">
                ورود شما به منزله پذیرش{" "}
                <Link
                  href="/ruls"
                  className="text-blue-600 dark:text-blue-400 underline"
                >
                  قوانین و مقررات
                </Link>{" "}
                میباشد{" "}
              </h2>
            </div>
          </div>

          <Button
            type="submit"
            className="dark:bg-green-900 bg-green-dark text-white dark:text-light w-full py-2 rounded-md mt-4"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "ثبت نام"}
          </Button>
        </Form>

        <div className="text-center mt-4">
          <Btn
            link="/login"
            className="w-full bg-transparent text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md py-2"
          >
            حساب داری؟ بیا بریم ورود
          </Btn>
        </div>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-t border-gray-300 dark:border-gray-600" />
          <span className="mx-3 text-gray-500 dark:text-gray-400">یا</span>
          <hr className="flex-grow border-t border-gray-300 dark:border-gray-600" />
        </div>

        <div className="w-full">
          <SocialMediaLogin />
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
