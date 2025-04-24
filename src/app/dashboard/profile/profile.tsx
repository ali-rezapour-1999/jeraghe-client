"use client";
import React from "react";
import {
  Form,
  Input,
  SelectItem,
  Select,
  Textarea,
  Spinner,
} from "@heroui/react";
import { ProfileResponse } from "@/utils/type/profileStateType";
import Btn from "@/components/ui/button";
import { useProfileState } from "@/state/userInformationStore";
import { useForm } from "@/hook/useFormData";

const genderOptions = [
  { id: 1, label: "مرد" },
  { id: 2, label: "زن" },
];

const ProfileInfo: React.FC = () => {
  const { profileRequest, profileUpdate, isLoading } =
    useProfileState();

  const initialFormState: ProfileResponse = {
    age: null,
    gender: "",
    state: "",
    city: "",
    address: "",
    description_myself: "",
  };

  const { formState, updateForm } = useForm<ProfileResponse>(initialFormState);

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
      profileRequest();
    }
  };

  return (
    <div>
      <Form
        className="w-full max-w-full flex flex-col"
        validationBehavior="native"
        onSubmit={onSubmitProfileHandler}
      >
        <div className="w-full h-max md:h-[100px] flex gap-8 flex-col md:flex-row justify-start items-start ">
          <Input
            label="سن"
            labelPlacement="outside"
            placeholder="سن خود را وارد کنید"
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
            placeholder={"جنسیت خود را وارد کنید"}
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

        <div className="w-full h-max md:h-[100px] flex gap-8 flex-col md:flex-row justify-start items-start">
          <Select
            labelPlacement="outside"
            className="dark:text-light text-primary"
            label={"استان"}
            size="lg"
            placeholder={"استان خود را وارد کنید"}
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
            placeholder={"شهر خود را وارد کنید"}
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
          placeholder={"آدرس خود را وراد کنید"}
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
          name="description_myself"
          classNames={{
            base: "w-full mt-5",
            input: "resize-y h-[150px] max-h-[150px] font-light",
          }}
          placeholder={"چند کلمه در مورد خودتون توضیح بدید"}
          value={formState.description_myself ?? ""}
          size="lg"
          onChange={(e) =>
            updateForm("description_myself", e.target.value)
          }
        />

        <Btn
          type="submit"
          className="w-full text-lg mt-3 bg-green-dark dark:bg-green-900 text-light"
          isDisabled={isLoading || !formState.age || !formState.gender || !formState.state || !formState.city || !formState.address || !formState.description_myself || formState.description_myself.length < 5}
        >
          {isLoading ? <Spinner /> : "ثبت تغییرات"}
        </Btn>
      </Form>
    </div>
  );
};

export default ProfileInfo;
