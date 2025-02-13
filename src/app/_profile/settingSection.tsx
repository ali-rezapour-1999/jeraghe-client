import Image from "next/image";
import React, { useEffect, useState } from "react";
import man from "../../../public/man.jpg";
import woman from "../../../public/woman.jpg";
import { useProfileState } from "@/state/profileState";
import { useAuthStore } from "@/state/authState";
import { Input } from "@heroui/react";
import Btn from "@/components/btn";

interface userInputType {
  email: string;
  username: string;
  profile_image: File | string | null;
  phone_number: string;
}
interface passInputType {
  password: string;
  newPassword: string;
  reNewPassword: string;
}

const SettingSection: React.FC = () => {
  const { personalData } = useProfileState();
  const { user } = useAuthStore();
  const [genderImage, setGenderImage] = useState(man);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [userData, setUserData] = useState<userInputType>({
    email: user?.email || "",
    username: user?.username || "",
    profile_image: user?.profile_image || null,
    phone_number: user?.phone_number || "",
  });
  const [pass, setPass] = useState<passInputType>({
    password: "",
    newPassword: "",
    reNewPassword: "",
  });

  useEffect(() => {
    if (personalData?.gender === "مرد") {
      setGenderImage(man);
    } else {
      setGenderImage(woman);
    }
  }, [personalData]);

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const passInputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setPass((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setUserData({ ...userData, profile_image: file });
    }
  };

  const isValidIranianPhoneNumber = (): boolean => {
    const iranPhoneRegex = /^09[0-9]{10}$/;
    return iranPhoneRegex.test(userData.phone_number);
  };

  const submitUserHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const submitChangePasswordHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={submitUserHandler} className="w-full flex flex-col gap-5">
        <div className="flex justify-between gap-10 w-full">
          <div className="w-1/4">
            <label className="cursor-pointer w-[250px] h-[300px] flex items-center justify-center">
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
              ) : (
                <Image
                  src={user?.profile_image || genderImage}
                  alt={user?.email || "user image"}
                  width={500}
                  height={500}
                  className="rounded-2xl w-full h-full object-cover"
                />
              )}
            </label>
          </div>
          <div className="w-3/4 flex flex-col gap-7">
            <Input
              label="ایمیل"
              labelPlacement="outside"
              placeholder="ایمیل خود را وارد کنید"
              name="email"
              type="email"
              size="lg"
              value={userData?.email || user?.email}
              onChange={inputChangeHandler}
            />
            <Input
              label="نام و نام خانوادگی"
              labelPlacement="outside"
              placeholder="نام و نام خانوادگی خود را وارد کنید"
              name="username"
              type="text"
              size="lg"
              value={userData?.username || user?.username}
              onChange={inputChangeHandler}
            />

            <Input
              label="شماره همراه"
              labelPlacement="outside"
              placeholder="شماره همراه خود را وارد کنید"
              name="phone_number"
              type="number"
              errorMessage={() => <p>فرمت شماره همراه وارد شده دست نیست</p>}
              isInvalid={isValidIranianPhoneNumber()}
              size="lg"
              value={userData?.phone_number || user?.phone_number || ""}
              onChange={inputChangeHandler}
            />
          </div>
        </div>
        <Btn className="bg-orange-400 dark:bg-orange-400" type="submit">
          ثبت تغییرات
        </Btn>
      </form>
      <form
        className="py-10 mt-16 border-t-1 flex relative flex-col gap-7 items-center justify-center"
        onSubmit={submitChangePasswordHandler}
      >
        <h1 className="w-max absolute top-[-16] px-10 rounded-2xl text-center bg-darkPrimary dark:bg-light text-light dark:text-primary">
          تغییر رمز عبور
        </h1>
        <Input
          label="رمز فعلی"
          labelPlacement="outside"
          placeholder="رمز فعلی خود را وارد کنید"
          name="password"
          type="password"
          size="lg"
          value={pass?.password || ""}
          onChange={passInputChangeHandler}
        />
        <Input
          label="رمز عبور جدید"
          labelPlacement="outside"
          placeholder="رمز عبور جدید خود را وارد کنید"
          name="newPassword"
          type="password"
          size="lg"
          value={pass?.newPassword || ""}
          onChange={passInputChangeHandler}
        />
        <Input
          label="تکرار رمز عبور جدید"
          labelPlacement="outside"
          placeholder="رمز عبور جدید خود را تکرار کنید"
          name="reNewPassword"
          type="password"
          size="lg"
          value={pass?.reNewPassword || ""}
          onChange={passInputChangeHandler}
        />
        <Btn className="bg-orange-400 dark:bg-orange-400 w-full" type="submit">
          تغییر رمز عبور
        </Btn>
      </form>
    </div>
  );
};

export default SettingSection;
