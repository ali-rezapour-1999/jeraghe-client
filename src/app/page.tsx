import MainSectionContainer from "@/components/ui/container";
import { Heading, Paragraph } from "@/components/ui/text";
import MainNavBar from "@/components/shared/navbar/navbar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Home = () => {
  return (
    <main>
      <MainNavBar />
      <section>
        <div className="flex flex-col justify-center items-center gap-3 md:gap-10 mt-6 md:mt-34">
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
        <div className="w-full md:w-[65%] h-16 flex items-center dark:bg-primary-dark bg-primary-dark/5 rounded-full pl-5 shadow-xl">
          <Input
            type="text"
            className="!border-none !ring-0 !outline-none !focus:border-none !hover:border-none !active:border-none !focus:ring-0 !focus:outline-none !focus-visible:border-none !focus-visible:ring-0 bg-transparent pr-10 text-xl shadow-none h-full"
            placeholder="جستجو برای شغل و ساخت ایده‌ها"
          />
          <Search className="size-7" />
        </div>
      </section>
    </main>
  );
};

export default Home;
