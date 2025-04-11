import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCategroryState } from "@/state/categoryState";
import { IsLoading } from "@/components/common/isLoading";
import Editor from "@/components/editor/editor";
import IdeaContentFileModal from "../modals/ideaContentFileModal";
import Btn from "../btn";

const InputSectionWrapper = ({
  children,
  prevStepHandler,
  nextStepHandler,
  isPrevDesable = false,
  isNextDesable = false,
}: {
  children: React.ReactNode;
  prevStepHandler: () => void;
  nextStepHandler: () => void;
  isPrevDesable?: boolean;
  isNextDesable?: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full mb-10 lg:mb-0 p-2 text-primary dark:text-light"
    >
      {children}
      <div className="w-full flex justify-between mt-10">
        <Button
          className={`bg-transparent ${isPrevDesable ? "hidden" : "flex"}`}
          onPress={prevStepHandler}
        >
          <ArrowRight />
          <p className="text-lg">قبلی</p>
        </Button>
        <Button
          className={`bg-transparent ${isNextDesable ? "hidden" : "flex"}`}
          onPress={nextStepHandler}
        >
          <p className="text-lg">بعدی</p> <ArrowLeft />
        </Button>
      </div>
    </motion.div>
  );
};

interface Props {
  step: number;
  setStep: (step: number) => void;
}

const PageStep: React.FC<Props> = ({ step, setStep }) => {
  const [isOpenContent, setOpenContent] = useState<boolean>(false);
  const { categoryData, categoryList, isLoading } = useCategroryState();
  const [content, setContent] = useState<string>("");
  const [contentFile, setContentFile] = useState<string>("");

  const [formValue, setValue] = useState({
    title: "",
    content: "",
    category: "",
  });

  useEffect(() => {
    setValue((prev) => ({ ...prev, content }));
  }, [content]);

  const saveContentFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setContentFile(text);
      };
      reader.readAsText(file);
    }
  };

  const saveTitle = () => {
    setStep(2);
  };

  const saveContent = () => {
    setStep(3);
  };

  const inputChangeHandler = (
    input: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setValue({ ...formValue, [input.target.name]: input.target.value });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      await categoryList();
    };
    fetchCategories();
  }, [categoryList]);

  switch (step) {
    case 1:
      return (
        <InputSectionWrapper
          isPrevDesable={true}
          isNextDesable={
            formValue.title.trim().length > 5 && formValue.category
              ? false
              : true
          }
          nextStepHandler={saveTitle}
          prevStepHandler={() => setStep(1)}
        >
          <div>
            <h1 className="text-2xl font-bold mb-2">عنوان ایده</h1>
            <p className="text-sm">
              اولین قدم برای ایده‌ات انتخاب یک عنوان کوتاه و پرمعناست. سعی کن
              عنوانی پیدا کنی که هم جلب توجه کند و هم پیام اصلی ایده‌ات را به
              خوبی منتقل کرده و نشان‌دهنده هدف مشخص پشت آن باشد.
            </p>
            <Input
              label
              type="text"
              name="title"
              placeholder="عنوان محتوای خود را وارد کنید (حداقل باید ۵ حرف باشه)"
              size="lg"
              value={formValue.title}
              onChange={inputChangeHandler}
              variant="underlined"
              classNames={{ base: "w-full", input: "text-xl" }}
            />
          </div>
          <div className="flex flex-col mt-10">
            <p className="font-bold text-xl">دسته‌بندی</p>
            <p className="text-sm mt-2">ایدت جزو کدوم دسته‌بندی قراره میگیره</p>
            {!isLoading ? (
              <Select
                labelPlacement="outside"
                className="text-lg mt-4"
                size="lg"
                name="category"
                placeholder="دسته‌بندی را انتخاب کنید"
                value={formValue.category}
                onChange={inputChangeHandler}
                variant="underlined"
              >
                {categoryData.map((item) => (
                  <SelectItem
                    className="text-primary dark:text-light"
                    key={item.id}
                  >
                    {item.title}
                  </SelectItem>
                ))}
              </Select>
            ) : (
              <IsLoading />
            )}
          </div>
        </InputSectionWrapper>
      );
    case 2:
      return (
        <InputSectionWrapper
          nextStepHandler={saveContent}
          prevStepHandler={() => setStep(1)}
          isNextDesable={
            formValue.content.trim().length > 100 || contentFile != ""
              ? false
              : true
          }
        >
          <div>
            <h1 className="text-2xl font-bold mb-2">محتوای ایده‌ات</h1>
            <p className="text-[14px]">
              ایده‌ی تو چطور قراره یک مشکل رو حل کنه یا یک تجربه جدید ایجاد کنه؟
              اینجا جاییه که می‌تونی جزئیات ایده‌ات رو توضیح بدی. سعی کن توضیحت
              روان، واضح و جذاب باشه، طوری که هر کسی با خواندنش بتونه تصویر
              روشنی از ایده‌ی تو داشته باشه
            </p>
          </div>
          <div className="mt-7">
            <div className="flex items-center justify-center gap-5">
              <span className="whitespace-nowrap w-full">
                اضافه کردن فایل Readme.md
              </span>
              <Input
                type="file"
                accept=".md"
                variant="bordered"
                className="contentFile"
                onChange={saveContentFile}
                value={contentFile}
              />
              <Btn
                onClick={() => setOpenContent(!isOpenContent)}
                className={contentFile === "" ? "hidden" : "block min-w-40"}
              >
                خواندن محتوا
              </Btn>
              <IdeaContentFileModal
                setOpen={() => setOpenContent(!isOpenContent)}
                isOpen={isOpenContent}
                content={contentFile}
              />
            </div>

            <div className="flex items-center gap-5 mt-5">
              <span className="flex-grow h-px bg-gray-300"></span>
              <span className="text-lg">یا</span>
              <span className="flex-grow h-px bg-gray-300"></span>
            </div>

            <Editor
              headerMode={false}
              bubbleMode={true}
              content={content}
              onChange={setContent}
              placeholder="ایده خود را با جزئیات توضیح دهید..."
            />
          </div>
        </InputSectionWrapper>
      );
    case 3:
      return (
        <InputSectionWrapper
          isNextDesable={true}
          nextStepHandler={() => setStep(3)}
          prevStepHandler={() => setStep(2)}
        >
          <div>
            <h1 className="text-2xl font-bold mb-2">تنظیمات ایده</h1>
            <p className="text-sm">
              در این بخش می‌تونی تنظیمات خودتو برای محتوای مورد نظر نشون بدی
            </p>
          </div>
          <Input
            label
            type="file"
            name="alirg"
            placeholder="عنوان محتوای خود را وارد کنید"
            size="lg"
            variant="underlined"
            className="w-full"
          />
        </InputSectionWrapper>
      );
    default:
      return null;
  }
};

export default PageStep;
