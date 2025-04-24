import InputSectionWrapper from "@/components/section/inputWrapperSection";
import Btn from "@/components/ui/button";
import { Heading, Paragraph } from "@/components/ui/text";
import { IdeaNeededCollaborators } from "@/utils/static/ideaChoicesItems";
import { FormState } from "@/utils/type/ideaStateType";
import { Checkbox, Input, Select, SelectItem } from "@heroui/react";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

interface Props {
  formState: FormState;
  updateForm: (fieldName: keyof FormState, value: any) => void;
  setStep: (step: number) => void;
  initialFormState: FormState;
}

const StepThree = ({
  formState,
  setStep,
  updateForm,
}: Props) => {
  const [imageBannerUrl, setImageBannerUrl] = useState<string | null>(null);
  const [imageLogoUrl, setImageLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (formState.imageBanner instanceof File) {
      const url = URL.createObjectURL(formState.imageBanner);
      setImageBannerUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (!formState.imageBanner) {
      setImageBannerUrl(null);
    }
  }, [formState.imageBanner]);

  useEffect(() => {
    if (formState.imageLogo instanceof File) {
      const url = URL.createObjectURL(formState.imageLogo);
      setImageLogoUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (!formState.imageLogo) {
      setImageLogoUrl(null);
    }
  }, [formState.imageLogo]);

  const handleIdeaNeededColabrators = useCallback(
    (selectedKey: string | null) => {
      if (!selectedKey) {
        updateForm("neededCollaborator", null);
        return;
      }
      const selectedStatus = IdeaNeededCollaborators.find((item) => item.key === selectedKey) ||
        null;
      updateForm("neededCollaborator", selectedStatus);
    },
    [updateForm]
  );

  const handleImageLogo = useCallback((logo: File | null) => {
    if (!logo) {
      return;
    }
    updateForm("imageLogo", logo);
  }, [updateForm]);

  const handleImageBanner = useCallback((banner: File | null) => {
    if (!banner) {
      return;
    }
    updateForm("imageBanner", banner);
  }, [updateForm]);

  const handleRemoveLogo = useCallback(() => {
    updateForm("imageLogo", null);
  }, [updateForm]);

  const handleRemoveBanner = useCallback(() => {
    updateForm("imageBanner", null);
  }, [updateForm]);

  return (
    <InputSectionWrapper isNextDisabled nextStepHandler={() => {
      setStep(4);
    }}
      prevStepHandler={() => setStep(2)}
    >
      <div>
        <Heading as="h1" className="text-2xl font-bold mb-2">
          تنظیمات عمومی
        </Heading>
        <Paragraph className="text-sm text-gray-600">
          تنظیمات عمومی متونی جلوه بهتری به ایدت بدی
        </Paragraph>
      </div>
      <div className="flex gap-10 px-12">
        <div className="w-[30%] h-[350px] border-1 border-gray-700 rounded-2xl relative flex items-center justify-center mt-10 overflow-hidden">
          {imageLogoUrl ? (
            <>
              <Image src={imageLogoUrl} alt="image logo" className="w-full h-full object-fill" fill={true} />
              <Btn
                className="absolute top-2 left-2 z-50 opacity-80 hover:opacity-100"
                onClick={handleRemoveLogo}
              >
                <IoMdClose size={20} />
              </Btn>
            </>
          ) : (
            <Paragraph className="">اضافه کردن لوگو ایده</Paragraph>
          )}
          <Input
            placeholder="لوگوی ایده را وارد کنید"
            classNames={{
              base: "w-full h-full absolute opacity-0",
              input: "w-full h-[350px] absolute top-0 left-0 opacity-0 z-50 cursor-pointer",
            }}
            type='file'
            variant="bordered"
            onChange={(e) => {
              if (e.target && e.target.files) {
                handleImageLogo(e.target.files[0] || null);
              }
            }}
          />
        </div>
        <div className="w-[70%] h-[350px] border-1 border-gray-700 rounded-2xl relative flex items-center justify-center mt-10 overflow-hidden">
          {imageBannerUrl ? (
            <>
              <Image src={imageBannerUrl} alt="image banner" className="w-full h-full object-cover" width={700} height={300} />
              <Btn
                className="absolute top-2 left-2 z-50 opacity-80 hover:opacity-100"
                onClick={handleRemoveBanner}
              >
                <IoMdClose size={20} />
              </Btn>
            </>
          ) : (
            <Paragraph className="">اضافه کردن بنر ایده</Paragraph>
          )}
          <Input
            placeholder="بنر ایده را وارد کنید"
            classNames={{
              base: "w-full h-[350px] absolute opacity-0",
              input: "w-full h-[350px] absolute top-0 left-0 opacity-0 z-50 cursor-pointer",
            }}
            type='file'
            onChange={(e) => {
              if (e.target && e.target.files) {
                handleImageBanner(e.target.files[0] || null);
              }
            }}
          />
        </div>
      </div>

      <div>
        <div className="mt-10 flex flex-col mb-5">
          <Heading as="h4" className="text-xl font-bold mb-2">
            تنظیمات همکاری
          </Heading>
          <Paragraph className="text-sm text-gray-600">
            نظرات و مشاوره‌های کاربران دیگه که ایده‌ت رو می‌خونن بهره‌مند بشی. شاید هم افرادی پیدا بشن که با دیدگاه‌های تازه و راهکارهای جدید بتونن به پیشرفت ایده‌ت کمک کنن!
          </Paragraph>
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <Checkbox
            onValueChange={(value) => updateForm("needColabration", value)}
            isSelected={formState.needColabration}
            defaultSelected
            color="success"
            size="lg"
            className="w-1/2"
          >
            نیاز به همکار دارم
          </Checkbox>

          <Select
            isDisabled={!formState.needColabration}
            aria-label="Idea needColabration Selection"
            size="lg"
            name="needColabration"
            variant="underlined"
            placeholder={
              formState.neededCollaborator?.title || "وضعیت همکاری رو انتخاب کن"
            }
            className="w-1/2"
          >
            {IdeaNeededCollaborators.map((item) => (
              <SelectItem
                key={item.key}
                textValue={item.title}
                onPress={() => handleIdeaNeededColabrators(item.key)}
              >
                {item.title}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </InputSectionWrapper>
  )
};

export default StepThree;
