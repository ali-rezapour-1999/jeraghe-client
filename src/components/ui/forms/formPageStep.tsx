import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCategroryState } from "@/state/categoryState";
import { IsLoading } from "@/components/common/isLoading";
import Editor from "@/components/editor/editor";
import IdeaContentFileModal from "../modals/ideaContentFileModal";
import Btn from "../btn";

interface Category {
  id: string;
  title: string;
}

interface CategoryState {
  categoryData: Category[];
  categoryList: () => void;
  isLoading: boolean;
}

interface InputSectionWrapperProps {
  children: React.ReactNode;
  prevStepHandler: () => void;
  nextStepHandler: () => void;
  isPrevDisabled?: boolean;
  isNextDisabled?: boolean;
}

interface PageStepProps {
  step: number;
  setStep: (step: number) => void;
}

interface FormValue {
  title: string;
  category: string;
}

const InputSectionWrapper: React.FC<InputSectionWrapperProps> = ({
  children,
  prevStepHandler,
  nextStepHandler,
  isPrevDisabled = false,
  isNextDisabled = false,
}) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className="w-full mb-10 lg:mb-0 p-2 text-primary dark:text-light"
  >
    {children}
    <div className="flex justify-between mt-10">
      {!isPrevDisabled && (
        <Button
          className="bg-transparent flex items-center gap-2"
          onPress={prevStepHandler}
        >
          <ArrowRight />
          <span className="text-lg">قبلی</span>
        </Button>
      )}
      {!isNextDisabled && (
        <Button
          className="bg-transparent flex items-center gap-2"
          onPress={nextStepHandler}
        >
          <span className="text-lg">بعدی</span>
          <ArrowLeft />
        </Button>
      )}
    </div>
  </motion.div>
);

const PageStep: React.FC<PageStepProps> = ({ step, setStep }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const { categoryData, categoryList, isLoading } =
    useCategroryState() as CategoryState;

  const [formValue, setFormValue] = useState<FormValue>({
    title: "",
    category: "",
  });
  const [content, setContent] = useState<string>("");
  const [editorContent, setEditorContent] = useState<string>("");
  const [contentFile, setContentFile] = useState<File | null>(null);
  const [isOpenContent, setOpenContent] = useState<boolean>(false);
  const [contentLoading, setContentLoading] = useState<boolean>(false);

  useEffect(() => {
    categoryList();
  }, [categoryList]);

  useEffect(() => {
    if (content && editorRef.current) {
      editorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [content]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormValue((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleEditContentFile = useCallback(() => {
    if (!content) {
      return;
    }
    setContentLoading(true);
    setTimeout(() => {
      setEditorContent(content);
      setContentLoading(false);
    }, 500);
  }, [content]);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type === "text/markdown") {
        setContentFile(file);
        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target?.result as string;
          setContent(text);
        };
        reader.onerror = () => {
          setContent("");
        };
        reader.readAsText(file);
      }
    },
    [],
  );

  const isStep1NextDisabled =
    formValue.title.trim().length <= 5 || !formValue.category;
  const isStep2NextDisabled = content.trim().length <= 100 && !contentFile;

  if (step === 1) {
    return (
      <InputSectionWrapper
        isPrevDisabled
        isNextDisabled={isStep1NextDisabled}
        nextStepHandler={() => setStep(2)}
        prevStepHandler={() => setStep(1)}
      >
        <div>
          <h1 className="text-2xl font-bold mb-4">عنوان ایده</h1>
          <p className="text-sm">
            اولین قدم برای ایده‌ات انتخاب یک عنوان کوتاه و پرمعناست. سعی کن
            عنوانی پیدا کنی که هم جلب توجه کند و هم پیام اصلی ایده‌ات را به خوبی
            منتقل کرده و نشان‌دهنده هدف مشخص پشت آن باشد.
          </p>
          <Input
            name="title"
            type="text"
            size="lg"
            value={formValue.title}
            onChange={handleInputChange}
            variant="underlined"
            placeholder="مثلاً ساختن پلتفرم کاریابی"
            classNames={{ base: "w-full my-5", input: "text-xl" }}
          />
        </div>
        <div className="mt-10">
          <p className="font-bold text-xl">دسته‌بندی</p>
          {isLoading ? (
            <IsLoading />
          ) : (
            <Select
              size="lg"
              name="category"
              value={formValue.category}
              onChange={handleInputChange}
              variant="underlined"
              placeholder="دسته‌بندی موردنظر را انتخاب کنید"
            >
              {categoryData.map((item) => (
                <SelectItem key={item.id}>{item.title}</SelectItem>
              ))}
            </Select>
          )}
        </div>
      </InputSectionWrapper>
    );
  }

  if (step === 2) {
    return (
      <InputSectionWrapper
        nextStepHandler={() => setStep(3)}
        prevStepHandler={() => setStep(1)}
        isNextDisabled={isStep2NextDisabled}
      >
        <div>
          <h1 className="text-2xl font-bold mb-2">محتوای ایده‌ات</h1>
          <p className="text-sm">
            جزئیات ایده‌ات رو اینجا بنویس یا فایل مارک‌داون آپلود کن
          </p>
        </div>
        <div className="mt-7">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <span className="whitespace-nowrap">اضافه کردن فایل Readme.md</span>
            <Input
              type="file"
              accept=".md"
              variant="bordered"
              onChange={handleFileUpload}
            />
            {contentFile && (
              <div className="flex gap-2">
                <Btn onClick={() => setOpenContent(true)}>خواندن محتوا</Btn>
                <Btn onClick={handleEditContentFile}>نیاز به تغییرات داره</Btn>
              </div>
            )}
            <IdeaContentFileModal
              setOpen={() => setOpenContent(false)}
              isOpen={isOpenContent}
              content={content}
            />
          </div>

          <div className="flex items-center gap-5 my-5">
            <span className="flex-grow h-px bg-gray-300" />
            <span className="text-lg">یا</span>
            <span className="flex-grow h-px bg-gray-300" />
          </div>

          <div ref={editorRef}>
            {contentLoading ? (
              <IsLoading />
            ) : (
              <Editor
                headerMode={false}
                bubbleMode={true}
                content={editorContent}
                onChange={setEditorContent}
                placeholder="ایده خود را با جزئیات توضیح دهید..."
              />
            )}
          </div>
        </div>
      </InputSectionWrapper>
    );
  }

  if (step === 3) {
    return (
      <InputSectionWrapper
        isNextDisabled
        nextStepHandler={() => setStep(3)}
        prevStepHandler={() => setStep(2)}
      >
        <div>
          <h1 className="text-2xl font-bold mb-2">تنظیمات ایده</h1>
          <p className="text-sm">تنظیمات دلخواهت رو مشخص کن</p>
        </div>
        <Input
          type="file"
          name="config"
          size="lg"
          variant="underlined"
          className="w-full"
        />
      </InputSectionWrapper>
    );
  }

  return null;
};

export default PageStep;
