"use client";

import MainNavBar from "@/components/nav/navbar";
import HomeSectionSearch from "@/components/search/homeSectionSearch";
import ProfileAboutMeSection from "@/components/section/ProfileAboutMeSection";
import ProfileSection from "@/components/section/profileSection";
import ProfileViewSection from "@/components/section/profileViewSection";
import JobDetailDrawer from "@/components/sidebar/jobDetailDrawer";
import { Button, useDisclosure } from "@heroui/react";

const Home = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <main>
      <MainNavBar />
      <div className="w-full h-full flex px-10 gap-5 mt-5 ">
        <section className="hidden md:flex md:w-7/12 xl:w-9/12">
          <HomeSectionSearch />
          <JobDetailDrawer onClose={onClose} isOpen={isOpen} />
          <Button onPress={onOpen}>alirg</Button>
        </section>
        <section className="hidden md:flex flex-col md:w-5/12 xl:w-3/12 px-4 h-[90vh] overflow-y-auto scrollbar-hide">
          <ProfileSection />
          <ProfileViewSection />
          <ProfileAboutMeSection />
        </section>
      </div>
    </main>
  );
};

export default Home;
