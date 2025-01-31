"use client";

import MainNavBar from "@/components/nav/navbar";
import { motion } from "framer-motion";
import Image from "next/image";
import ideaImage from "../../public/idea_picture.jpg";
import partnerShipImage from "../../public/partnership_pictrue.jpg";

const Home = () => {
  return (
    <main>
      <MainNavBar />
      <section>
        <div className="flex flex-col justify-center items-center gap-10 mt-20">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-7xl text-center font-bold text-primary dark:text-light"
          >
            سلام به جرقه خوش آومدی
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center text-xl w-[90%] md:w-[55%] leading-relaxed text-primary dark:text-gray-400 "
          >
            <p>
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

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              یه فضای خلاق و مطمئن برای رشد، یادگیری و پیشرفت!
            </p>
          </motion.div>
        </div>
        <div className="w-full flex justify-center overflow-hidden mt-10 gap-10">
          <Image
            src={ideaImage}
            alt="idea image"
            width={400}
            height={400}
            className="rounded-2xl"
          />
          <Image
            src={partnerShipImage}
            alt="partnership image"
            width={400}
            height={400}
            className="rounded-2xl"
          />
        </div>
      </section>
    </main>
  );
};

export default Home;
