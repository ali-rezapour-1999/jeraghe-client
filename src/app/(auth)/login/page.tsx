"use client";

import React, { useState } from "react";
import { addToast, Button, Form, Input, Spinner } from "@heroui/react";
import { motion } from "framer-motion";
import { useAuthStore } from "@/state/authState";
import Btn from "@/components/ui/btn";
import SocialMediaLogin from "../socialMediaLogin";
import Link from "next/link";
import { useBackToLastPath } from "@/hook/savePath";
import { Eye, EyeClosed } from "lucide-react";

const Login: React.FC = () => {
  const { login, isLoading, setLoading } = useAuthStore();
  const navigateBack = useBackToLastPath();

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

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
    input: React.ChangeEvent<HTMLInputElement>
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
          if (errors.password) {
            setFormErrors((prev) => ({
              ...prev,
              password: errors.password[0],
            }));
          }

          addToast({
            title: errors.message || "ورود با خطا مواجه شد",
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
          اوه اوه ببین کی برگشته! 👋
        </h1>

        <Form onSubmit={onSubmitLogin} className="flex flex-col space-y-4">
          <div className="flex flex-col items-center w-full justify-center gap-4">
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

            <div className="relative w-full">
              <Input
                isRequired
                label="رمز عبور"
                labelPlacement="outside"
                name="password"
                placeholder="رمز عبور خود را وارد کنید"
                type={isVisible ? "text" : "password"}
                size="lg"
                validate={() => formErrors.password || ""}
                value={formData.password}
                onChange={inputChangeHandler}
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
            </div>
          </div>

          <div className="flex justify-between items-center mt-2">
            <Link
              href="/reset-password"
              className="text-sm text-blue-600 dark:text-blue-400"
            >
              فراموشی رمز ؟؟
            </Link>
          </div>

          <div className="flex flex-col w-full mt-4 space-y-2">
            <Btn
              type="submit"
              className="dark:bg-green-900 bg-green-dark text-white dark:text-light w-full rounded-md py-2"
            >
              {isLoading ? <Spinner /> : "ورود"}
            </Btn>

            <Btn
              link="/register"
              className="w-full bg-transparent text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md py-2"
            >
              حساب نداری؟ چرا نداری بزن بسازیم!!!
            </Btn>
          </div>
        </Form>

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

export default Login;
