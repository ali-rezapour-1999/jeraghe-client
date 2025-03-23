"use client";
import { Form, Input, Spinner } from "@heroui/react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useAuthStore } from "@/state/authState";
import Btn from "@/components/ui/btn";
import SocialMediaLogin from "../socialMediaLogin";
import Link from "next/link";

const Register: React.FC = () => {
  const { isLoading, register, setLoading } = useAuthStore();
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

  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "email":
        if (!value) {
          error = "ایمیل خود را وارد کنید";
        }
        break;
      case "username":
        if (!value || value.length < 4) {
          error = "نام و نام خانوادگی خود را وارد کنید (حداقل ۴ کاراکتر)";
        }
        break;
      case "password":
        const strongPasswordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!value) {
          error = "رمز عبور خود را وارد کنید";
        } else if (!strongPasswordRegex.test(value)) {
          error =
            "رمز عبور باید حداقل ۶ کاراکتر و شامل حرف بزرگ، حرف کوچک و عدد باشد";
        }
        break;
      case "repassword":
        if (!value) {
          error = "تکرار رمز عبور الزامیس";
        } else if (value !== formData.password) {
          error = "رمز عبور با تکرارش برابر نیست";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const inputChangeHandler = (input: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = input.target;

    setFormData({ ...formData, [name]: value });

    const error = validateField(name, value);
    setFormErrors({ ...formErrors, [name]: error });
  };

  const onSubmitRegisterd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const errors = {
      email: validateField("email", form.email.value),
      username: validateField("username", form.username.value),
      password: validateField("password", form.password.value),
      repassword: validateField("repassword", form.repassword.value),
    };

    if (Object.values(errors).some((error) => error !== "")) {
      setFormErrors(errors);
    } else {
      setLoading(true);
      const result = await register(
        formData.email,
        formData.password,
        formData.username,
      );
      try {
        if (result.success) {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        } else {
        }
      } catch (err) {
        return err;
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
          ثبت نام در جرقه
        </h1>
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
          <Link href="/login" className="w-full">
            حساب داری اینجا چیکار میکنی بیا بریم ورود!!!
          </Link>
          <Btn
            type="submit"
            className="dark:bg-green-900 bg-green-dark text-white dark:text-light w-full"
          >
            {isLoading ? <Spinner /> : "ثبت نام"}
          </Btn>
        </Form>
        <SocialMediaLogin />
      </div>
    </motion.div>
  );
};

export default Register;
