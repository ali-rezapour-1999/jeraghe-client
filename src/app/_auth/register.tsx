"use client";
import { Form, Input, Spinner } from "@heroui/react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useAuthStore } from "@/state/authState";
import toast, { Toaster } from "react-hot-toast";
import Btn from "@/components/btn";

const Register: React.FC = () => {
  const { isLoading, register, setLoading } = useAuthStore();
  const [formErrors, setFormErrors] = useState({
    email: "",
    first_last_name: "",
    password: "",
    repassword: "",
  });

  const [formData, setFormData] = useState({
    email: "",
    first_last_name: "",
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
      case "first_last_name":
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
      first_last_name: validateField(
        "first_last_name",
        form.first_last_name.value,
      ),
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
        formData.first_last_name,
      );
      try {
        if (result.success) {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (err) {
        toast.error(err);
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
          name="first_last_name"
          placeholder="نام و نام خانوادگی خود را وارد کنید"
          type="text"
          size="lg"
          validate={() => formErrors.first_last_name || ""}
          value={formData.first_last_name}
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
        <Btn
          type="submit"
          className="w-40 dark:bg-primary-light dark:text-primary-dark"
        >
          {isLoading ? <Spinner /> : "ثبت نام"}
        </Btn>
      </Form>
      <Toaster position="top-center" />
    </motion.div>
  );
};

export default Register;
