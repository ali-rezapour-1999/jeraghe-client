"use client";
import React, { useEffect } from "react";
import {
  Form,
  Input,
  SelectItem,
  Select,
  Textarea,
  Spinner,
  addToast,
} from "@heroui/react";
import { ProfileResponse } from "@/utils/type/profileStateType";
import Btn from "@/components/ui/button";
import { useProfileState } from "@/state/userInformationStore";
import { useForm } from "@/hook/useFormData";
import { IsLoading } from "@/components/common/isLoading";

const genderOptions = [
  { id: 1, label: "مرد" },
  { id: 2, label: "زن" },
];

const ProfileInfo = () => {
  const { profileData, profileRequest, profileUpdate, isLoading } =
    useProfileState();

  const initialFormState: ProfileResponse = {
    age: profileData?.age ?? null,
    gender: profileData?.gender ?? "",
    state: profileData?.state ?? "",
    city: profileData?.city ?? "",
    address: profileData?.address ?? "",
    description: profileData?.description ?? "",
  };

  const { formState, updateForm } = useForm<ProfileResponse>(initialFormState);

  useEffect(() => {
    if (profileData) {
      updateForm("age", profileData.age ?? null);
      updateForm("gender", profileData.gender ?? "");
      updateForm("state", profileData.state ?? "");
      updateForm("city", profileData.city ?? "");
      updateForm("address", profileData.address ?? "");
      updateForm("description", profileData.description ?? "");
    }
  }, [profileData]);

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    updateForm(name as keyof ProfileResponse, value);
  };

  const selectChangeHandler = (name: keyof ProfileResponse, value: string) => {
    updateForm(name, value);
  };

  const onSubmitProfileHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const response = await profileUpdate(formState);
    if (response.success) {
      addToast({
        title: response.message,
        color: "success",
      });
      profileRequest();
    } else {
      addToast({
        title: response.message,
        color: "danger",
      });
    }
  };
  if (!profileData) return <IsLoading />;
  return (
    <div>
      <Form
        className="w-full max-w-full flex flex-col"
        validationBehavior="native"
        onSubmit={onSubmitProfileHandler}
      >
        <div className="w-full h-max lg:h-[100px] flex gap-8 flex-col lg:flex-row justify-start items-start ">
          <Input
            label="سن"
            labelPlacement="outside"
            placeholder={profileData?.age || "سن خود را وارد کنید"}
            name="age"
            type="number"
            size="lg"
            value={formState.age ?? ""}
            onChange={inputChangeHandler}
          />

          <Select
            labelPlacement="outside"
            className="dark:text-light text-primary"
            size="lg"
            label={"جنسیت"}
            name="gender"
            placeholder={profileData?.gender || "جنسیت خود را وارد کنید"}
            value={formState.gender ?? ""}
            onSelectionChange={(keys) =>
              selectChangeHandler("gender", Array.from(keys)[0] as string)
            }
          >
            {genderOptions.map((item) => (
              <SelectItem
                key={item.label}
                className="dark:text-light text-primary"
              >
                {item.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="w-full h-max lg:h-[100px] flex gap-8 flex-col lg:flex-row justify-start items-start ">
          <Select
            labelPlacement="outside"
            className="dark:text-light text-primary"
            label={"استان"}
            size="lg"
            placeholder={profileData?.state || "استان خود را وارد کنید"}
            name="state"
            value={formState.state ?? ""}
            onSelectionChange={(keys) =>
              selectChangeHandler("state", Array.from(keys)[0] as string)
            }
          >
            <SelectItem key="مازندران" className="dark:text-light text-primary">
              مازندران
            </SelectItem>
          </Select>

          <Select
            labelPlacement="outside"
            className="dark:text-light text-primary"
            label={"شهر"}
            size="lg"
            name="city"
            placeholder={profileData?.city || "شهر خود را وارد کنید"}
            value={formState.city ?? ""}
            onSelectionChange={(keys) =>
              selectChangeHandler("city", Array.from(keys)[0] as string)
            }
          >
            <SelectItem key="بابل" className="dark:text-light text-primary">
              بابل
            </SelectItem>
          </Select>
        </div>

        <Input
          label="آدرس"
          labelPlacement="outside"
          name="address"
          placeholder={profileData?.address || "آدرس خود را وراد کنید"}
          type="text"
          size="lg"
          classNames={{
            inputWrapper: "py-4 ",
          }}
          value={formState.address ?? ""}
          onChange={inputChangeHandler}
        />

        <Textarea
          label="درباره من"
          disableAnimation
          disableAutosize
          name="description"
          classNames={{
            base: "w-full mt-5",
            input: "resize-y h-[150px] max-h-[150px] font-light",
          }}
          placeholder={
            profileData?.description || "چند کلمه در مورد خودتون توضیح بدید"
          }
          value={formState.description ?? ""}
          size="lg"
          onChange={(e) => updateForm("description", e.target.value)}
        />

        <Btn
          type="submit"
          className="w-full text-lg mt-3 bg-green-dark dark:bg-green-900 text-light"
          isDisabled={isLoading}
        >
          {isLoading ? <Spinner /> : "ثبت تغییرات"}
        </Btn>
      </Form>
    </div>
  );
};

export default ProfileInfo;
