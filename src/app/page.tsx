import MainSectionContainer from "@/components/ui/container";
import { Heading, Paragraph } from "@/components/ui/text";
import MainNavBar from "@/components/shared/navbar/navbar";
import { Input } from "@/components/ui/input";
import { FileText, Lightbulb, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const Home = () => {
  return (
    <main>
      <MainNavBar />
      <section>
        <div className="flex flex-col justify-center items-center gap-3 md:gap-10 mt-6 md:mt-20">
          <MainSectionContainer
            delay={0.3}
            className="text-center font-bold text-primary dark:text-light"
          >
            <Heading as="h1" className="text-3xl lg:text-5xl 2xl:text-6xl">
              مسیرت برای شغل و ساخت ایده‌ها هموار شده 🚀
            </Heading>
          </MainSectionContainer>
          <MainSectionContainer
            delay={0.5}
            className="text-center text-xl w-[90%] leading-relaxed text-primary dark:text-gray-400 "
          >
            <Paragraph className="text-[.6em] md:text-[.9em] lg:text-[1.1em] 2xl:text-[1.2em] text-center">
              <span className="font-bold">جرقه</span> قراره جایی باشه که بتونی{" "}
              <span className="underline underline-offset-4 mx-1 text-primary dark:text-light">
                یاد بگیری
              </span>
              ،{" "}
              <span className="underline underline-offset-4 mx-1 text-primary dark:text-light">
                مشکلات رو حل
              </span>{" "}
              کنی،{" "}
              <span className="underline underline-offset-4 mx-1 text-primary dark:text-light">
                ایده‌های جدید
              </span>{" "}
              پیدا کنی و توی{" "}
              <span className="underline underline-offset-4 mx-1 text-primary dark:text-light">
                ایده‌ها همکاری{" "}
              </span>{" "}
              کنی
            </Paragraph>

            <p className="mt-2 text-gray-500 dark:text-gray-400 text-[.7em] md:text-[1em] 2xl:text-[1.1em]">
              یه فضای خلاق و مطمئن برای رشد، یادگیری و پیشرفت!
            </p>
          </MainSectionContainer>
        </div>
      </section>
      <section className=" flex justify-center items-center mt-10 md:mt-20 flex-col">
        <div className="w-full md:w-[90%] xl:w-[80%] h-16 flex items-center dark:bg-primary-dark bg-primary-dark/5 rounded-full pl-5 shadow-xl">
          <Input
            type="text"
            className="!border-none !ring-0 !outline-none !focus:border-none !hover:border-none !active:border-none !focus:ring-0 !focus:outline-none !focus-visible:border-none !focus-visible:ring-0 bg-transparent pr-10 text-xl shadow-none h-full"
            placeholder="جستجو برای شغل و ساخت ایده‌ها"
          />
          <Search className="size-7" />
        </div>
        <div className="flex items-center flex-col lg:flex-row gap-1 lg:gap-10 mt-20">
          <Link href="/idea/create">
            <Card className="hover:shadow-md transition-shadow max-w-[450px] h-[200px] dark:bg-primary-dark bg-primary-dark/5 ">
              <CardContent className="flex justify-center gap-4 items-center px-10 py-4">
                <Lightbulb className="h-18 w-18 mr-4 text-amber-500" />
                <div className="w-2/3">
                  <Heading as="h2" className="text-2xl mb-2 font-semibold">نوشتن ایده</Heading>
                  <Paragraph className="text-muted-foreground text-wrap text-start">
                    ایده‌های خام و ناب خود را با دیگران به اشتراک بگذارید؛ اولین قدم برای ساختن آینده، همین‌جاست.
                  </Paragraph>
                </div>
              </CardContent>
            </Card>
          </Link>
          <div className="mx-3 text-2xl w-16 h-16 flex items-center justify-center rounded-full shadow-xl my-10 bg-primary-dark dark:bg-primary text-white dark:text-primary-dark pt-1">یا</div>
          <Link href="/post/create">
            <Card className="hover:shadow-md transition-shadow max-w-[450px] h-[200px] dark:bg-primary-dark bg-primary-dark/5 ">
              <CardContent className="flex justify-center gap-4 items-center px-10 py-4">
                <FileText className="h-18 w-18 mr-4 text-blue-500" />
                <div className="w-2/3">
                  <Heading as="h2" className="text-2xl mb-2 font-semibold">نوشتن پست</Heading>
                  <Paragraph className="text-muted-foreground text-wrap text-justify">
                    تجربه‌ها، دانش یا تحلیل‌های خود را منتشر کنید و با دیگران تعامل سازنده داشته باشید.
                  </Paragraph>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
