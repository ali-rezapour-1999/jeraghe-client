import React, { useCallback, useEffect, useState } from "react";
import InputSectionWrapper from "@/components/shared/wrapper/inputWrapperSection";
import { IsLoading } from "@/components/shared/isLoading";
import { useCategroryState } from "@/store/categoryState";
import { IdeaChoiseItems } from "@/constans/ideaChoicesItems";
import { CategoryState, FormState } from "@/types/ideaStateType";
import { Heading, Paragraph } from "@/components/ui/text";
import whyCreateIdea from "../../../../../public/main-image/i_dont_nkow.png";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  formState: FormState;
  updateForm: (fieldName: keyof FormState, value: any) => void;
  setStep: (step: number) => void;
}

const StepOne: React.FC<Props> = ({ formState, updateForm, setStep }) => {
  const { categoryData, categoryList, isLoading } = useCategroryState() as CategoryState;

  const isStep1NextDisabled =
    formState.title.trim().length <= 5 ||
    !formState.category ||
    !formState.ideaStatus;

  const [openCategory, setOpenCategory] = useState(false);
  const [openIdeaStatus, setOpenIdeaStatus] = useState(false);

  useEffect(() => {
    categoryList();
  }, [categoryList]);

  const handleCategoryChange = useCallback(
    (selectedId: string | null) => {
      if (!selectedId) {
        updateForm("category", null);
        setOpenCategory(false);
        return;
      }
      const selectedCategory =
        categoryData.find((cat) => cat.id === selectedId) || null;
      updateForm("category", selectedCategory);
      setOpenCategory(false);
    },
    [categoryData, updateForm]
  );

  const handleIdeaStatusChange = useCallback(
    (selectedKey: string | null) => {
      if (!selectedKey) {
        updateForm("ideaStatus", null);
        setOpenIdeaStatus(false);
        return;
      }
      const selectedStatus =
        IdeaChoiseItems.find((item) => item.key === selectedKey) || null;
      updateForm("ideaStatus", selectedStatus);
      setOpenIdeaStatus(false);
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
        className="lg:w ambassadors-1/2 flex flex-col"
      >
        <div>
          <Heading as="h1" className="text-2xl font-bold mb-4">
            عنوان ایده
          </Heading>
          <p className="text-sm">
            اولین قدم برای ایده‌ات انتخاب یک عنوان کوتاه و پرمعناست. سعی کن
            عنوانی پیدا کنی که هم جلب توجه کند و هم پیام اصلی ایده‌ات را به خوبی
            منتقل کرده و نشان‌دهنده هدف مشخص پشت آن باشد.
          </p>
          <Input
            name="title"
            type="text"
            value={formState.title}
            onChange={handleInputChange}
            placeholder="مثلاً ساختن پلتفرم کاریابی"
            className="w-full my-16 text-lg"
          />
        </div>
        <div className="mt-10 flex flex-col sm:flex-row gap-10 sm:gap-14">
          <div className="flex flex-col w-full sm:w-1/2">
            <Paragraph className="font-bold text-xl mb-2">دسته‌بندی</Paragraph>
            {isLoading ? (
              <IsLoading />
            ) : (
              <Popover open={openCategory} onOpenChange={setOpenCategory}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCategory}
                    className="w-full justify-between border-primary/20 hover:border-primary hover:bg-transparent"
                  >
                    {formState.category?.title || "انتخاب دسته‌بندی..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className=" p-0">
                  <Command className="w-full">
                    <CommandInput
                      placeholder="جستجو در دسته‌بندی‌ها..."
                      className="h-9"
                    />
                    <CommandList className="w-full">
                      <CommandEmpty>چیزی پیدا نشد</CommandEmpty>
                      <CommandGroup>
                        {(categoryData || []).map((item) => (
                          <CommandItem
                            key={item.id}
                            value={item.id}
                            onSelect={() => handleCategoryChange(item.id)}
                            className=""
                          >
                            {item.title}
                            <Check
                              className={cn(
                                "ml-auto",
                                formState.category?.id === item.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
          </div>

          <div className="flex flex-col w-full sm:w-1/2">
            <p className="font-bold text-xl mb-2">وضعیت ایده</p>
            <Popover open={openIdeaStatus} onOpenChange={setOpenIdeaStatus}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openIdeaStatus}
                  className="w-full justify-between border-primary/20 hover:border-primary hover:bg-transparent"
                >
                  {formState.ideaStatus?.title || "انتخاب وضعیت ایده..."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command className="w-full">
                  <CommandInput
                    placeholder="جستجو در وضعیت‌ها..."
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>چیزی پیدا نشد</CommandEmpty>
                    <CommandGroup heading="وضعیت ایده">
                      {(IdeaChoiseItems || []).map((item) => (
                        <CommandItem
                          key={item.id}
                          value={item.key}
                          onSelect={() => handleIdeaStatusChange(item.key)}
                        >
                          {item.title}
                          <Check
                            className={cn(
                              "ml-auto",
                              formState.ideaStatus?.key === item.key
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </InputSectionWrapper>

      <div className="flex lg:w-1/2 flex-col items-center justify-center gap-4 text-primary dark:text-light">
        <Image
          src={whyCreateIdea.src}
          alt="why create image"
          sizes="(max-width: 768px) 200px, 300px"
          width={400}
          height={300}
          className="w-[200px] sm:w-[250px] lg:w-[300px]"
        />
        <Heading as="h1" className="text-4xl font-bold ">
          چرا ایدتو اینجا بنویسی؟
        </Heading>
        <p className="text-center w-2/3 mb-10 lg:mb-0">
          با اشتراک‌گذاری ایده‌ات می‌تونی به راحتی همکارهای کاردرستی پیدا کنی که
          آماده‌ان با تو همکاری کنن و با هم پروژه‌ی یک استارتاپ موفق بسازین.
          علاوه بر این، نوشتن ایده‌ات این فرصت رو بهت می‌ده که از نظرات و
          مشاوره‌های کاربران دیگه که ایده‌ت رو می‌خونن بهره‌مند بشی. شاید هم
          افرادی پیدا بشن که با دیدگاه‌های تازه و راهکارهای جدید بتونن به پیشرفت
          ایده‌ت کمک کنن!
        </p>
      </div>
    </div>
  );
};

export default StepOne;
