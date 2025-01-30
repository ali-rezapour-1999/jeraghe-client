"use client";

import MainNavBar from "@/components/nav/navbar";
import HomeSectionSearch from "@/components/search/homeSectionSearch";
import HomeShowJobItems from "@/components/section/homeShowJobItems";
import ProfileAboutMeSection from "@/components/section/profileSection/ProfileAboutMeSection";
import ProfileSection from "@/components/section/profileSection/profileSection";
import ProfileViewSection from "@/components/section/profileSection/profileViewSection";

const Explorer = () => {
  return (
    <main>
      <MainNavBar />
      <div className="w-full h-full flex px-10 gap-5 mt-5 ">
        <section className="flex flex-col xl:w-8/12 2xl:w-9/12 h-[1500vh] overflow-y-auto scrollbar-hide">
          <HomeSectionSearch />
          <HomeShowJobItems />
        </section>
        <section className="hidden xl:flex flex-col xl:w-4/12 2xl:w-3/12 px-4 h-[90vh] sticky top-20 overflow-y-auto scrollbar-hide">
          <ProfileSection />
          <ProfileViewSection />
          <ProfileAboutMeSection />
        </section>
      </div>
    </main>
  );
};

export default Explorer;
