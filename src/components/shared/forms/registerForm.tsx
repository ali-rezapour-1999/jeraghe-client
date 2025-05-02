import { useAuthStore } from "@/store/authState";
import React, { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { Heading } from "@/components/ui/text";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Spinner from "../spinner";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z
  .object({
    email: z
      .string()
      .email("ایمیل معتبر نیست")
      .min(1, "ایمیل خود را وارد کنید"),
    username: z
      .string()
      .min(1, "نام و نام خانوادگی خود را وارد کنید")
      .min(4, "نام و نام خانوادگی باید حداقل ۴ کاراکتر باشد"),
    password: z
      .string()
      .min(1, "رمز عبور خود را وارد کنید")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
        "رمز عبور باید حداقل ۶ کاراکتر و شامل حرف بزرگ، حرف کوچک و عدد باشد"
      ),
    repassword: z.string().min(1, "تکرار رمز عبور الزامیست"),
  })
  .refine((data) => data.password === data.repassword, {
    message: "رمز عبور با تکرارش برابر نیست",
    path: ["repassword"],
  });

type FormData = z.infer<typeof formSchema>;

interface RegisterFormProps {
  onSuccess?: () => void;
}

const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { isLoading, register, setLoading } = useAuthStore();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      repassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const result = await register(data.email, data.password, data.username);
      if (result.success) {
        toast.success(result.message);
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
        if (errors.username) {
          form.setError("username", { message: errors.username[0] });
        }
        if (errors.password) {
          form.setError("password", { message: errors.password[0] });
        }
        toast.error(errors.message || "ثبت‌نام با خطا مواجه شد");
      } else {
        toast.error("خطا در ارتباط با سرور");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-w-[300px] rounded-xl px-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4 "
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
            name="username"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>نام و نام خانوادگی</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="name webauthn"
                    placeholder="نام و نام خانوادگی خود را وارد کنید"
                    type="text"
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
                      autoComplete="new-password"
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
                      className="absolute inset-y-0 left-1 top-2 flex items-center pr-3 bg-transparent min-w-0 hover:bg-transparent"
                      type="button"
                      onClick={toggleVisibility}
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

          <FormField
            control={form.control}
            name="repassword"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>تکرار رمز عبور</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      autoComplete="new-password"
                      placeholder="رمز عبور خود را تکرار کنید"
                      type={isVisible ? "text" : "password"}
                      className={
                        fieldState.error
                          ? "border-red-500 dark:border-red-400"
                          : ""
                      }
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-1">
            ✅
            <Heading
              as="h2"
              dir="rtl"
              className="text-sm text-gray-700 dark:text-gray-300"
            >
              ثبت‌نام شما به منزله پذیرش{" "}
              <Link
                href="/ruls"
                className="text-blue-600 dark:text-blue-400 underline mx-2"
              >
                قوانین و مقررات
              </Link>{" "}
              میباشد
            </Heading>
          </div>

          <Button
            type="submit"
            className="dark:bg-accent-900 bg-accent-dark text-white dark:text-light w-full rounded-md"
            disabled={isLoading}
          >
            {isLoading ? <Spinner variant="secondary" /> : "ثبت نام"}
          </Button>
        </form>
      </Form>

      <div className="flex items-center mt-3">
        <hr className="flex-grow border-t border-gray-300 dark:border-gray-600" />
        <span className="mx-3 text-gray-500 dark:text-gray-400">یا</span>
        <hr className="flex-grow border-t border-gray-300 dark:border-gray-600" />
      </div>
    </div>
  );
};

export default RegisterForm;
