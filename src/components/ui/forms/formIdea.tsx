import { Button, Form, Input, Textarea } from "@heroui/react";
import React, { useState } from "react";
import BreadcrumbsIdea from "../breadcrumbs/breadcrumbsIdea";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
const InputSectionWrapper = ({
  children,
  prevStepHandler,
  nextStepHanlder,
  isPrevDesable = false,
  isNextDesable = false,
}: {
  children: React.ReactNode;
  prevStepHandler: () => void;
  nextStepHanlder: () => void;
  isPrevDesable?: boolean;
  isNextDesable?: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full p-2"
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
          onPress={nextStepHanlder}
        >
          <p className="text-lg">بعدی</p> <ArrowLeft />
        </Button>
      </div>
    </motion.div>
  );
};

const FormIdeaCreate = () => {
  const [step, setStep] = useState(1);

  const PageStep = () => {
    switch (step) {
      case 1:
        return (
          <InputSectionWrapper
            isPrevDesable={true}
            nextStepHanlder={() => {
              setStep(2);
            }}
            prevStepHandler={() => setStep(1)}
          >
            <div>
              <h1 className="text-2xl font-bold mb-2">عنوان ایده</h1>
              <p className="text-sm">
                اولین قدم برای ایده‌ات انتخاب یک عنوان کوتاه و پرمعناست. سعی کن
                عنوانی پیدا کنی که هم جلب توجه کند و هم پیام اصلی ایده‌ات را به
                خوبی منتقل کرده و نشان‌دهنده هدف مشخص پشت آن باشد.
              </p>
            </div>
            <Input
              label
              type="text"
              name="title"
              placeholder="عنوان محتوای خود را وارد کنید"
              size="lg"
              variant="underlined"
              className="w-full"
            />
          </InputSectionWrapper>
        );
      case 2:
        return (
          <InputSectionWrapper
            nextStepHanlder={() => setStep(3)}
            prevStepHandler={() => setStep(1)}
          >
            {" "}
            <div>
              <h1 className="text-2xl font-bold mb-2">محتوای ایدت</h1>
              <p className="text-sm">
                اولین قدم برای ایده‌ات انتخاب یک عنوان کوتاه و پرمعناست. سعی کن
              </p>
            </div>
            <Textarea
              variant="bordered"
              className="mt-7"
              placeholder="محتوای خود را وارد کنید"
              name="content"
            />
          </InputSectionWrapper>
        );
      case 3:
        return (
          <InputSectionWrapper
            isNextDesable={true}
            nextStepHanlder={() => setStep(3)}
            prevStepHandler={() => setStep(2)}
          >
            {" "}
            <div>
              <h1 className="text-2xl font-bold mb-2">تنظیمات ایده</h1>
              <p className="text-sm">
                در این بخش میتوی تنظیمات خودتو برای محتوای مورد نظر نشون بدی
              </p>
            </div>
            <Input
              label
              type="text"
              name="title"
              placeholder="عنوان محتوای خود را وارد کنید"
              size="lg"
              variant="underlined"
              className="w-full"
            />
          </InputSectionWrapper>
        );
    }
  };

  return (
    <div className="w-full flex flex-col gap-10">
      <BreadcrumbsIdea step={step} />
      <Form className="w-full t-10">
        <PageStep />
      </Form>
    </div>
  );
};
export default FormIdeaCreate;
