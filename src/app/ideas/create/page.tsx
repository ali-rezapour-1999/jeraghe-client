"use client";
import MainNavBar from "@/components/common/navbar";
import React from "react";
import { Image } from "@heroui/react";
import whyCreateIdea from "../../../../public/main-image/i_dont_nkow.png";
import FormIdeaCreate from "@/components/ui/forms/formIdea";

const CrateIdea = () => {
  return (
    <div>
      <MainNavBar />
      <main className="flex flex-col-reverse gap-10 lg:gap-0 lg:flex-row mt-10">
        <div className="w-full lg:w-2/3 flex items-start px-10 justify-center border-t-1 lg:border-t-0 pt-5 lg:pt-0">
          <FormIdeaCreate />
        </div>

        <div className="w-full lg:w-1/3 flex flex-col items-center justify-center gap-4 text-primary dark:text-light">
          <Image
            src={whyCreateIdea.src}
            alt="why create image"
            width={400}
            height={400}
          />
          <h1 className="text-3xl font-bold ">چرا ایدتو اینجا بنویسی؟</h1>
          <p className="text-center w-2/3">
            با اشتراک‌گذاری ایده‌ات می‌تونی به راحتی همکارهای کاردرستی پیدا کنی
            که آماده‌ان با تو همکاری کنن و با هم پروژه‌ی یک استارتاپ موفق
            بسازین. علاوه بر این، نوشتن ایده‌ات این فرصت رو بهت می‌ده که از
            نظرات و مشاوره‌های کاربران دیگه که ایده‌ت رو می‌خونن بهره‌مند بشی.
            شاید هم افرادی پیدا بشن که با دیدگاه‌های تازه و راهکارهای جدید بتونن
            به پیشرفت ایده‌ت کمک کنن!
          </p>
        </div>
      </main>
    </div>
  );
};

export default CrateIdea;
