import MainNavBar from "@/components/common/navbar";
import Image from "next/image";
import ideaImage from "../../public/main-image/idea_picture.png";
import partnerShipImage from "../../public/main-image/page_partner.png";
import MainSectionContainer from "@/components/container/mainContainer";
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
            <h1 className="text-3xl lg:text-5xl 2xl:text-6xl">
              مسیرت برای شغل و ساخت ایده‌ها هموار شده 🚀
            </h1>
          </MainSectionContainer>
          <MainSectionContainer
            delay={0.5}
            className="text-center text-xl w-[90%] leading-relaxed text-primary dark:text-gray-400 "
          >
            <p className="text-[.6em] md:text-[.9em] lg:text-[1.1em] 2xl:text-[1.2em] text-center">
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
              کنی .
            </p>

            <p className="mt-2 text-gray-500 dark:text-gray-400 text-[.7em] md:text-[1em] 2xl:text-[1.1em]">
              یه فضای خلاق و مطمئن برای رشد، یادگیری و پیشرفت!
            </p>
          </MainSectionContainer>
        </div>
        <MainSectionContainer
          delay={0.7}
          className="w-full flex flex-col md:flex-row px-10 md:px-5 justify-center items-center overflow-hidden mt-5 2xl:mt-10 gap-10"
        >
          <Link href="/write" className="md:border-l-1 border-light md:pl-10">
            <Image
              src={ideaImage}
              alt="blog image"
              width={400}
              height={400}
              className="rounded-2xl w-[250px] lg:w-[350px] 2xl:w-[450px]"
              property="true"
            />
          </Link>
          <Link href="/ideas">
            <Image
              src={partnerShipImage}
              alt="partnership image"
              width={500}
              height={500}
              className="rounded-2xl w-[250px] lg:w-[300px] 2xl:w-[400px]"
              property="true"
            />
          </Link>
        </MainSectionContainer>
      </section>
    </main>
  );
};

export default Home;
