import React from "react";
import {
  Form,
  Input,
  Button,
  SelectItem,
  Select,
  Textarea,
} from "@heroui/react";
import { useProfileState } from "@/state/profileState";
import Btn from "@/components/button/btn";

const ProfileUpdateSection = () => {
  const { personalData } = useProfileState();
  return (
    <Form
      className="w-full max-w-full flex flex-col gap-4"
      validationBehavior="native"
    >
      <div className="w-full flex gap-8">
        <Input
          label="سن"
          labelPlacement="outside"
          name="age"
          placeholder={personalData?.age || "سن خود را وارد کنید"}
          type="number"
          size="lg"
        />

        <Select
          labelPlacement="outside"
          className="dark:text-light text-primary"
          label="جنسیت"
          placeholder={personalData?.gender || "جنسیت خود را وارد کنید"}
          size="lg"
        >
          <SelectItem className="dark:text-light text-primary">زن</SelectItem>
          <SelectItem className="dark:text-light text-primary">مرد</SelectItem>
        </Select>
      </div>

      <div className="w-full flex gap-8">
        <Select
          labelPlacement="outside"
          className="dark:text-light text-primary"
          label="استان"
          placeholder={personalData?.state || "استان خود را وارد کنید"}
          size="lg"
        >
          <SelectItem className="dark:text-light text-primary">
            مازندران
          </SelectItem>
        </Select>

        <Select
          labelPlacement="outside"
          className="dark:text-light text-primary"
          label="شهر"
          placeholder={personalData?.city || "شهر خود را وارد کنید"}
          size="lg"
        >
          <SelectItem className="dark:text-light text-primary">گتاب</SelectItem>
          <SelectItem className="dark:text-light text-primary">بابل</SelectItem>
        </Select>
      </div>
      <Input
        label="آدرس"
        labelPlacement="outside"
        name="address"
        placeholder={personalData?.address || "آدرس خود را وارد کنید"}
        type="text"
        size="lg"
      />
      <Textarea
        label="درباره من"
        disableAnimation
        disableAutosize
        classNames={{
          base: "w-full mt-8",
          input: "resize-y min-h-[100px]",
        }}
        placeholder={
          personalData?.description_myself ||
          "چند کلمه در مورد خودتون توضیح بدید"
        }
        size="lg"
      />
      <Btn
        type="submit"
        className="w-full dark:bg-light-light bg-darkPrimary dark:text-darkPrimary text-lg  mt-3 text-light-light"
      >
        ثبت تغییرات
      </Btn>
    </Form>
  );
};

export default ProfileUpdateSection;
