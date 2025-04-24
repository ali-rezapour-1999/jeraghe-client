import React, { useCallback, useEffect } from "react";
import { Input, Select, SelectItem } from "@heroui/react";
import InputSectionWrapper from "@/components/section/inputWrapperSection";
import { IsLoading } from "@/components/common/isLoading";
import { useCategroryState } from "@/state/categoryState";
import { IdeaChoiseItems } from "@/utils/static/ideaChoicesItems";
import { CategoryState, FormState } from "@/utils/type/ideaStateType";
import { Heading } from "@/components/ui/text";
import { Image } from "@heroui/react";
import whyCreateIdea from "../../../../../public/main-image/i_dont_nkow.png";

interface Props {
  formState: FormState;
  updateForm: (fieldName: keyof FormState, value: any) => void;
  setStep: (step: number) => void;
}

const StepOne: React.FC<Props> = ({
  formState,
  updateForm,
  setStep,
}) => {
  const { categoryData, categoryList, isLoading } =
    useCategroryState() as CategoryState;

  const isStep1NextDisabled =
    formState.title.trim().length <= 5 ||
    !formState.category ||
    !formState.ideaStatus;

  useEffect(() => {
    categoryList();
  }, [categoryList]);

  const handleCategoryChange = useCallback(
    (selectedId: string | null) => {
      if (!selectedId) {
        updateForm("category", null);
        return;
      }
      const selectedCategory = categoryData.find((cat) => cat.id === selectedId) || null;
      updateForm("category", selectedCategory);
    },
    [categoryData, updateForm]
  );

  const handleIdeaStatusChange = useCallback(
    (selectedKey: string | null) => {
      if (!selectedKey) {
        updateForm("ideaStatus", null);
        return;
      }
      const selectedStatus =
        IdeaChoiseItems.find((item) => item.key === selectedKey) || null;
      updateForm("ideaStatus", selectedStatus);
    },
    [updateForm]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      updateForm(name as keyof FormState, value);
    },
    [updateForm]
  );

  return (
    <div className="w-full flex flex-col-reverse lg:flex-row mb-10">
      <InputSectionWrapper
        isPrevDisabled
        isNextDisabled={isStep1NextDisabled}
        nextStepHandler={() => setStep(2)}
        prevStepHandler={() => setStep(1)}
        className="lg:w-1/2 flex flex-col"
      >
        <div>
          <Heading as="h1" className="text-2xl font-bold mb-4">
            عنوان ایده
          </Heading>
          <p className="text-sm">
            اولین قدم برای ایده‌ات انتخاب یک عنوان کوتاه و پرمعناست. سعی کن عنوانی
            پیدا کنی که هم جلب توجه کند و هم پیام اصلی ایده‌ات را به خوبی منتقل
            کرده و نشان‌دهنده هدف مشخص پشت آن باشد.
          </p>
          <Input
            name="title"
            type="text"
            size="lg"
            value={formState.title}
            onChange={handleInputChange}
            variant="underlined"
            placeholder="مثلاً ساختن پلتفرم کاریابی"
            classNames={{ base: "w-full my-16", input: "text-xl" }}
          />
        </div>
        <div className="mt-10 flex flex-col sm:flex-row gap-10 sm:gap-14">
          <div className="flex flex-col w-full sm:w-1/2">
            <p className="font-bold text-xl mb-2">دسته‌بندی</p>
            {isLoading ? (
              <IsLoading />
            ) : (
              <Select
                aria-label="Category Selection"
                size="lg"
                name="category"
                variant="underlined"
                placeholder={
                  formState.category?.title || "دسته‌بندی موردنظر را انتخاب کنید"
                }
                className="w-full"
              >
                {(categoryData || []).map((item) => (
                  <SelectItem
                    key={item.id}
                    textValue={item.title}
                    onPress={() => handleCategoryChange(item.id)}
                    className="text-primary dark:text-light"
                  >
                    {item.title}
                  </SelectItem>
                ))}
              </Select>
            )}
          </div>

          <div className="flex flex-col w-full sm:w-1/2">
            <p className="font-bold text-xl mb-2">وضعیت ایده</p>
            <Select
              aria-label="Idea Status Selection"
              size="lg"
              name="ideaStatus"
              onSelectionChange={(keys) => {
                const selectedKey = Array.from(keys as Set<string>)[0];
                handleIdeaStatusChange(selectedKey ?? null);
              }}
              variant="underlined"
              placeholder={
                formState.ideaStatus?.title || "وضعیت ایده را انتخاب کنید"
              }
              className="w-full"
            >
              {IdeaChoiseItems.map((item) => (
                <SelectItem
                  key={item.key}
                  textValue={item.title}
                  onPress={() => handleIdeaStatusChange(item.key)}
                  className="text-primary dark:text-light"
                >
                  {item.title}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </InputSectionWrapper>


      <div className="flex lg:w-1/2 flex-col items-center justify-center gap-4 text-primary dark:text-light">
        <Image
          src={whyCreateIdea.src}
          alt="why create image"
          sizes="(max-width: 768px) 200px, 300px"
          className="w-[200px] sm:w-[250px] lg:w-[300px]"
        />
        <Heading as="h1" className="text-4xl font-bold ">
          چرا ایدتو اینجا بنویسی؟
        </Heading>
        <p className="text-center w-2/3 mb-10 lg:mb-0">
          با اشتراک‌گذاری ایده‌ات می‌تونی به راحتی همکارهای کاردرستی پیدا کنی
          که آماده‌ان با تو همکاری کنن و با هم پروژه‌ی یک استارتاپ موفق
          بسازین. علاوه بر این، نوشتن ایده‌ات این فرصت رو بهت می‌ده که از
          نظرات و مشاوره‌های کاربران دیگه که ایده‌ت رو می‌خونن بهره‌مند بشی.
          شاید هم افرادی پیدا بشن که با دیدگاه‌های تازه و راهکارهای جدید بتونن
          به پیشرفت ایده‌ت کمک کنن!
        </p>
      </div>
    </div>
  );
};

export default StepOne;
