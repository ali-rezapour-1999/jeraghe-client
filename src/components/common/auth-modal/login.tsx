import { Button, addToast, Input, Form, Link, Spinner } from "@heroui/react";
import { useAuthStore } from "@/state/authState";
import React, { useState } from "react";
import { Eye, EyeClosed, RefreshCw } from "lucide-react";
import Btn from "@/components/ui/btn";

const Login = ({ changePage }: { changePage: any }) => {
  const { login, isLoading, setLoading } = useAuthStore();

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
    input: React.ChangeEvent<HTMLInputElement>,
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
    <div>
      <Form onSubmit={onSubmitLogin} className="flex flex-col space-y-1 px-3">
        <div className="flex flex-col items-center w-full justify-center gap-4">
          <Input
            variant="underlined"
            isRequired
            label="ایمیل"
            labelPlacement="outside"
            name="email"
            placeholder="ایمیل خود را وارد کنید"
            type="email"
            classNames={{ label: "text-[12px]" }}
            size="md"
            validate={() => formErrors.email || ""}
            value={formData.email}
            onChange={inputChangeHandler}
          />

          <div className="relative w-full">
            <Input
              variant="underlined"
              isRequired
              label="رمز عبور"
              labelPlacement="outside"
              name="password"
              placeholder="رمز عبور خود را وارد کنید"
              type={isVisible ? "text" : "password"}
              classNames={{ label: "text-[12px]" }}
              size="md"
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
        <div className="flex flex-col justify-between items-start gap-3">
          <Link
            href="/reset-password"
            className="text-md text-accent dark:text-accent flex items-center justify-center gap-1"
          >
            <RefreshCw size={15} />
            بازیابی رمز عبور ؟؟
          </Link>
          <div className="flex items-center gap-1">
            {" "}
            ✅
            <h2 className="text-sm text-gray-700 dark:text-gray-300">
              ورود شما به منزله پذیرش{" "}
              <Link
                href="/ruls"
                className="text-blue-600 dark:text-blue-400 underline mx-2"
              >
                قوانین و مقررات
              </Link>{" "}
              میباشد{" "}
            </h2>
          </div>
        </div>

        <div className="flex flex-col w-full mt-4 space-y-2">
          <Btn
            type="submit"
            className="dark:bg-green-900 bg-green-dark text-white dark:text-light w-full rounded-md py-2"
          >
            {isLoading ? <Spinner color={"success"} /> : "ورود"}
          </Btn>
          <Btn
            onClick={changePage}
            className="bg-transparent dark:text-white text-primary w-full rounded-md py-2"
          >
            حساب کاربری نداری چرا نداری بیا با هم بسازیم!!!
          </Btn>
        </div>
      </Form>
      <div className="flex items-center mt-3">
        <hr className="flex-grow border-t border-gray-300 dark:border-gray-600" />
        <span className="mx-3 text-gray-500 dark:text-gray-400">یا</span>
        <hr className="flex-grow border-t border-gray-300 dark:border-gray-600" />
      </div>
    </div>
  );
};

export default Login;
