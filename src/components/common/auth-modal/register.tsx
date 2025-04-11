import { Button, addToast, Input, Form, Link, Spinner } from "@heroui/react";
import { useAuthStore } from "@/state/authState";
import React, { useCallback, useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import Btn from "@/components/ui/btn";

const Register = ({ changePage }: { changePage: any }) => {
  const { isLoading, register, setLoading } = useAuthStore();
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
    [formData],
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
    [validateField],
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
        formData.username,
      );

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
    <div>
      <div className="w-full min-w-[300px] rounded-xl 2xl:space-y-1 px-4">
        <Form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-col w-full justify-center gap-4">
            <Input
              isRequired
              variant="underlined"
              label="ایمیل"
              labelPlacement="outside"
              name="email"
              placeholder="ایمیل خود را وارد کنید"
              type="email"
              validate={() => formErrors.email}
              value={formData.email}
              onChange={handleInputChange}
              classNames={{ label: "text-[12px]" }}
              errorMessage={formErrors.email}
            />

            <Input
              isRequired
              variant="underlined"
              label="نام و نام خانوادگی (فارسی)"
              labelPlacement="outside"
              name="username"
              placeholder="نام و نام خانوادگی خود را وارد کنید"
              type="text"
              validate={() => formErrors.username}
              value={formData.username}
              onChange={handleInputChange}
              classNames={{ label: "text-[12px]" }}
              errorMessage={formErrors.username}
            />

            <Input
              isRequired
              variant="underlined"
              label="رمز عبور"
              labelPlacement="outside"
              name="password"
              placeholder="رمز عبور خود را وارد کنید"
              type={isVisible ? "text" : "password"}
              validate={() => formErrors.password}
              value={formData.password}
              onChange={handleInputChange}
              errorMessage={formErrors.password}
              classNames={{ label: "text-[12px]" }}
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
              variant="bordered"
              label="تکرار رمز عبور"
              labelPlacement="outside"
              name="repassword"
              placeholder="رمز عبور خود را تکرار کنید"
              type={isVisible ? "text" : "password"}
              validate={() => formErrors.repassword}
              value={formData.repassword}
              onChange={handleInputChange}
              errorMessage={formErrors.repassword}
              classNames={{ label: "text-[12px]" }}
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

            <div className="flex items-center gap-1">
              {" "}
              ✅
              <h2 className="text-sm text-gray-700 dark:text-gray-300">
                ثبت‌نام شما به منزله پذیرش{" "}
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

          <Button
            type="submit"
            className="dark:bg-green-900 bg-green-dark mt-0 text-white dark:text-light w-full rounded-md"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "ثبت نام"}
          </Button>
        </Form>

        <div className="text-center">
          <Btn
            onClick={changePage}
            className="bg-transparent dark:text-white text-primary w-full rounded-md "
          >
            حساب داری اینجا چیکار میکنی پس بیا بریم ورود!!!{" "}
          </Btn>
        </div>

        <div className="flex items-center ">
          <hr className="flex-grow border-t border-gray-300 dark:border-gray-600" />
          <span className="mx-3 text-gray-500 dark:text-gray-400">یا</span>
          <hr className="flex-grow border-t border-gray-300 dark:border-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default Register;
