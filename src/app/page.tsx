"use client";

import MainNavBar from "@/components/navbar";
import Image from "next/image";
import ideaImage from "../../public/idea_picture.jpg";
import partnerShipImage from "../../public/partnership_pictrue.jpg";
import MainSectionContainer from "@/components/container/mainContainer";
import Link from "next/link";

const Home = () => {
  return (
    <main>
      <MainNavBar />
      <section>
        <div className="flex flex-col justify-center items-center gap-10 mt-20">
          <MainSectionContainer
            delay={0.3}
            className="text-7xl text-center font-bold text-primary dark:text-light"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl">
              سلام به جرقه خوش آومدی
            </h1>
          </MainSectionContainer>
          <MainSectionContainer
            delay={0.5}
            className="text-center text-xl w-[90%] leading-relaxed text-primary dark:text-gray-400 "
          >
            <p className="text-[.9em] md:text-[1.2em] text-center">
              <span className="font-bold">جرقه</span> قراره جایی باشه که بتونی{" "}
              <span className="underline underline-offset-8 mx-1 text-primary dark:text-light">
                یاد بگیری
              </span>
              ،{" "}
              <span className="underline underline-offset-8 mx-1 text-primary dark:text-light">
                مشکلات رو حل
              </span>{" "}
              کنی،{" "}
              <span className="underline underline-offset-8 mx-1 text-primary dark:text-light">
                ایده‌های جدید
              </span>{" "}
              پیدا کنی و توی{" "}
              <span className="underline underline-offset-8 mx-1 text-primary dark:text-light">
                ایده‌ها همکاری کنی
              </span>
              .
            </p>

            <p className="mt-5 md:mt-2 text-gray-500 dark:text-gray-400 text-[.8em] md:text-[1.1em]">
              یه فضای خلاق و مطمئن برای رشد، یادگیری و پیشرفت!
            </p>
          </MainSectionContainer>
        </div>
        <MainSectionContainer
          delay={0.7}
          className="w-full flex flex-col md:flex-row px-10 md:px-5 justify-center items-center overflow-hidden mt-10 gap-10"
        >
          <Link href="/write">
            <Image
              src={ideaImage}
              alt="idea image"
              width={400}
              height={400}
              className="rounded-2xl"
            />
          </Link>
          <Link href="/partner">
            <Image
              src={partnerShipImage}
              alt="partnership image"
              width={400}
              height={400}
              className="rounded-2xl"
            />
          </Link>
        </MainSectionContainer>
      </section>
    </main>
  );
};

export default Home;
