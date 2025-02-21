import { useProfileState } from "@/state/profileState";
import React, { useEffect, useState } from "react";
import man from "../../../../public/man.jpg";
import woman from "../../../../public/woman.jpg";
import { useAuthStore } from "@/state/authState";
import { Input, Spinner } from "@heroui/react";
import Btn from "@/components/btn";
import { User } from "@/type/authStateType";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

const UpdateUserDetail = () => {
  const { personalData } = useProfileState();
  const { user, userUpdate, setLoading, isLoading } = useAuthStore();
  const [genderImage, setGenderImage] = useState(man);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [userData, setUserData] = useState<User>({
    email: user?.email || "",
    username: user?.username || "",
    profile_image: null,
    phone_number: user?.phone_number || "",
  });

  useEffect(() => {
    if (personalData?.gender === "مرد") {
      setGenderImage(woman);
    } else {
      setGenderImage(man);
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
    return iranPhoneRegex.test(userData.phone_number || "");
  };

  const submitUserHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await userUpdate(userData);

    try {
      if (result.success) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch {
      return setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={submitUserHandler} className="w-full flex flex-col gap-5">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-10 w-full">
        <div className="w-full lg:w-1/4 flex items-center justify-center">
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
        <div className="w-full lg:w-3/4 flex flex-col gap-7">
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
        {isLoading ? <Spinner /> : " ثبت تغییرات "}
      </Btn>
      <Toaster position="top-right" />
    </form>
  );
};
export default UpdateUserDetail;
