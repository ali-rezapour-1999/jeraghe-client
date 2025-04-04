import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCategroryState } from "@/state/categoryState";
import { IsLoading } from "@/components/common/isLoading";
import Editor from "@/components/editor/editor";
import { useAuthStore } from "@/state/authState";

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
      className="w-full p-2 text-primary dark:text-light"
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
  const { isAuthenticated } = useAuthStore();
  const { categoryData, categoryList, isLoading } = useCategroryState();
  const [content, setContent] = useState<string>("");
  const [formValue, setValue] = useState({
    title: "",
    content: "",
    category: "",
  });

  useEffect(() => {
    setValue((prev) => ({ ...prev, content }));
  }, [content]);

  const saveTitle = () => {
    const title = localStorage.getItem("idea_title");
    if (title !== formValue.title) {
      localStorage.setItem("idea_title", formValue.title);
    }
    setStep(2);
  };

  const saveContent = () => {
    localStorage.setItem("idea_title", formValue.title);
    localStorage.setItem(formValue.title, formValue.content);
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
    if (!isAuthenticated) {
      localStorage.removeItem("idea_title");
    }
    const localTitle = localStorage.getItem("idea_title");
    if (localTitle) {
      const localContent = localStorage.getItem(localTitle) || "";
      setContent(localContent);
      setValue((prev) => ({
        ...prev,
        title: localTitle,
        content: localContent,
      }));
    }
  }, [isAuthenticated]);

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
          isNextDesable={formValue.content.trim().length > 100 ? false : true}
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
          <div className="mt-7 border-b-1 dark:border-light bg-black/20 rounded-t-lg overflow-x-scroll">
            <Editor
              headerMode={false}
              bubbleMode={true}
              content={content}
              onChange={setContent}
              placeholder="محتوای ایده خود را به صورت کامل توضیح دهید"
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
