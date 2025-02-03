import React from "react";
import { Form, Input, Button, SelectItem, Select } from "@heroui/react";
import { useProfileState } from "@/state/profileState";

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
        />

        <Select
          labelPlacement="outside"
          className="dark:text-light text-primary"
          label="جنسیت"
          placeholder={personalData?.gender || "جنسیت خود را وارد کنید"}
        >
          <SelectItem className="dark:text-light text-primary">زن</SelectItem>
          <SelectItem className="dark:text-light text-primary">مرد</SelectItem>
        </Select>
      </div>
      <Button color="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ProfileUpdateSection;
