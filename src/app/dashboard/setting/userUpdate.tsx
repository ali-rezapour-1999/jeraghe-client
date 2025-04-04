import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/state/authState";
import { addToast, Avatar, AvatarIcon, Input, Spinner } from "@heroui/react";
import Btn from "@/components/ui/btn";
import { User } from "@/utils/type/authStateType";
import Image from "next/image";
import { IsLoading } from "@/components/common/isLoading";

const UpdateUserDetail = () => {
  const { user, userInformation, userUpdate, isLoading } = useAuthStore();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [userData, setUserData] = useState<User>({
    email: "",
    username: "",
    image: null,
    phone_number: "",
  });

  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    if (user) {
      setUserData({
        email: user.email || "",
        username: user.username || "",
        image: null,
        phone_number: user.phone_number || "",
      });
    }
  }, [user]);

  useEffect(() => {
    setIsFormChanged(
      userData.email !== user?.email ||
        userData.username !== user?.username ||
        userData.phone_number !== user?.phone_number ||
        userData.image !== null,
    );
  }, [userData, user]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setUserData((prev) => ({ ...prev, image: file }));
    }
  };

  const isValidIranianPhoneNumber = (): boolean => {
    const iranPhoneRegex = /^09[0-9]{9}$/;
    return iranPhoneRegex.test(userData.phone_number || "");
  };

  const submitUserHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", userData.email);
    formData.append("username", userData.username);
    if (userData.phone_number)
      formData.append("phone_number", userData.phone_number);
    if (userData.image) formData.append("image", userData.image);

    try {
      const response = await userUpdate(formData);
      if (response.success) {
        addToast({ title: response.message, color: "success" });
        userInformation();
      } else {
        addToast({ title: response.message, color: "danger" });
      }
    } catch {
      addToast({ title: "خطایی رخ داده است", color: "danger" });
    }
  };

  if (isLoading) return <IsLoading />;

  return (
    <form onSubmit={submitUserHandler} className="w-full flex flex-col gap-5">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-10 w-full">
        <div className="w-full lg:w-1/4 flex items-center justify-center">
          <label className="cursor-pointer w-[350px] h-[300px] flex items-center justify-center">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {previewImage ? (
              <Image
                src={previewImage}
                alt="Uploaded Image"
                width={100}
                height={100}
                className="rounded-2xl w-full h-full object-cover"
              />
            ) : user?.image ? (
              <Image
                src={user?.image}
                alt={user?.email}
                width={500}
                height={500}
                className="rounded-2xl w-full h-full object-cover"
              />
            ) : (
              <Avatar
                radius="lg"
                classNames={{
                  base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B] w-full h-full",
                  icon: "text-black/80",
                }}
                icon={<AvatarIcon />}
              />
            )}
          </label>
        </div>
        <div className="w-full lg:w-3/4 flex flex-col gap-7">
          <Input
            label="ایمیل"
            labelPlacement="outside"
            placeholder="ایمیل خود را وارد کنید"
            name="email"
            type="email"
            size="lg"
            value={userData.email}
            onChange={inputChangeHandler}
          />
          <Input
            label="نام و نام خانوادگی"
            labelPlacement="outside"
            placeholder="نام و نام خانوادگی خود را وارد کنید"
            name="username"
            type="text"
            size="lg"
            value={userData.username}
            onChange={inputChangeHandler}
          />
          <Input
            label="شماره همراه"
            labelPlacement="outside"
            placeholder="شماره همراه خود را وارد کنید"
            name="phone_number"
            type="tel"
            errorMessage={() => <p>فرمت شماره همراه وارد شده صحیح نیست</p>}
            isInvalid={!!userData.phone_number && !isValidIranianPhoneNumber()}
            size="lg"
            value={userData.phone_number}
            onChange={inputChangeHandler}
            classNames={{ input: "text-right" }}
          />
        </div>
      </div>
      <Btn
        className="bg-orange-400 dark:bg-orange-400"
        type="submit"
        isDisable={isLoading || !isFormChanged}
      >
        {isLoading ? <Spinner /> : " ثبت تغییرات "}
      </Btn>
    </form>
  );
};
export default UpdateUserDetail;
