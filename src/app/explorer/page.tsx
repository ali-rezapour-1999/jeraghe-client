"use client";

import MainNavBar from "@/components/common/navbar";
import HomeSectionSearch from "@/components/common/search";
import HomeShowJobItems from "../../components/section/JobItems";
import ProfileAboutMeSection from "@/components/common/sidebar/ProfileAboutMe";
import ProfileSection from "@/components/common/sidebar/profileSection";
import ProfileViewSection from "@/components/common/sidebar/profileReview";
import { useAuthStore } from "@/state/authState";
import { motion } from "framer-motion";

const Explorer = () => {
  const { isAuthenticated } = useAuthStore();
  return (
    <main>
      <MainNavBar />
      <div className="w-full h-full flex px-3 md:px-10 gap-5 mt-5 ">
        <section className="flex flex-col xl:w-8/12 2xl:w-9/12 h-[1500vh] overflow-y-auto scrollbar-hide">
          <HomeSectionSearch />
          <HomeShowJobItems />
        </section>

        <section className="hidden sticky top-20 xl:flex flex-col xl:w-4/12 2xl:w-3/12 px-4 h-[90vh] overflow-y-auto scrollbar-hide">
          {!isAuthenticated && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="absolute flex justify-center items-center z-50 w-full h-full backdrop-blur-xl rounded-2xl text-2xl text-darkPrimary dark:text-light font-bold"
            >
              ورود یا ثبت نام
            </motion.button>
          )}
          <ProfileSection />
          <ProfileViewSection />
          <ProfileAboutMeSection />
        </section>
      </div>
    </main>
  );
};

export default Explorer;
