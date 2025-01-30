"use client";
import { Form, Input, Button } from "@heroui/react";
import { motion } from "framer-motion";
import React from "react";

const Register: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col px-10 items-center justify-center"
    >
      <h1 className="text-2xl font-bold mb-8 border-b-1">ثبت نام در جرقه</h1>
      <Form className="w-full items-center justify-center flex flex-col gap-8">
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
        <Input
          isRequired
          errorMessage="Please enter a valid username"
          label="رمز عبور تکرار"
          labelPlacement="outside"
          name="رمز عبور"
          placeholder="رمز عبور خود را تکرار کنید"
          type="password"
          size="lg"
        />
        <Button color="primary" type="submit" className="px-10">
          ثبت نام
        </Button>
      </Form>
    </motion.div>
  );
};

export default Register;
