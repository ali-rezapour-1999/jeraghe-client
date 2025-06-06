"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed, RefreshCw } from "lucide-react";
import { Heading } from "@/components/ui/text";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useAuthStore } from "@/store/authState";
import { toast } from "sonner";
import Spinner from "@/components/shared/spinner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("ایمیل معتبر نیست").min(1, "ایمیل وارد نکردی"),
  password: z.string().min(1, "رمز عبور وارد نکردی"),
});

type FormData = z.infer<typeof formSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { login, isLoading, setLoading } = useAuthStore();
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmitLogin = async (data: FormData) => {
    setLoading(true);
    try {
      const result = await login(data.email, data.password);
      if (result.success) {
        toast.success(result.message);
        router.push("/dashboard");
        onSuccess?.();
      } else {
        toast.error(result.message);
      }
    } catch (err: any) {
      if (err.response && err.response.data) {
        const errors = err.response.data;
        if (errors.email) {
          form.setError("email", { message: errors.email[0] });
        }
        if (errors.password) {
          form.setError("password", { message: errors.password[0] });
        }
        toast.error(errors.message || "ورود با خطا مواجه شد");
      } else {
        toast.error("خطا در ارتباط با سرور");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitLogin)}
        className="flex flex-col space-y-5 px-3"
        dir="rtl"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>ایمیل</FormLabel>
              <FormControl>
                <Input
                  placeholder="ایمیل خود را وارد کنید"
                  type="email"
                  className={
                    fieldState.error
                      ? "border-red-500 dark:border-red-400"
                      : ""
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>رمز عبور</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    autoComplete="off"
                    placeholder="رمز عبور خود را وارد کنید"
                    type={isVisible ? "text" : "password"}
                    className={
                      fieldState.error
                        ? "border-red-500 dark:border-red-400"
                        : ""
                    }
                    {...field}
                  />
                  <Button
                    aria-label="toggle password visibility"
                    className="absolute inset-y-0 left-1 top-1 flex items-center pr-3 bg-transparent min-w-0 hover:bg-transparent"
                    type="button"
                    onClick={toggleVisibility}
                    variant="ghost"
                  >
                    {isVisible ? (
                      <Eye className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeClosed className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />

        <div className="flex flex-col justify-between items-start gap-3">
          <Link
            href="/reset-password"
            className="text-md text-accent dark:text-accent flex items-center justify-center gap-1"
          >
            <RefreshCw size={15} />
            بازیابی رمز عبور ؟؟
          </Link>
          <div className="flex items-center gap-1">
            ✅
            <Heading
              as="h2"
              className="text-sm text-gray-700 dark:text-gray-300"
            >
              ورود شما به منزله پذیرش{" "}
              <Link
                href="/ruls"
                className="text-blue-600 dark:text-blue-400 underline mx-2"
              >
                قوانین و مقررات
              </Link>{" "}
              میباشد
            </Heading>
          </div>
        </div>

        <div className="flex flex-col w-full mt-4 space-y-2">
          <Button
            type="submit"
            disabled={isLoading}
            variant="gradient"
          >
            {isLoading ? <Spinner variant="secondary" /> : "ورود"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
