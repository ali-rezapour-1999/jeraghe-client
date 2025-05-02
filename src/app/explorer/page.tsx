"use client";

import Navbar from "@/components/shared/navbar/navbar";

const Explorer = () => {
  return (
    <main>
      <Navbar />
      <div className="w-full h-full flex px-3 md:px-10 gap-5 mt-5 ">
        <section className="flex flex-col xl:w-8/12 2xl:w-9/12 h-[1500vh] overflow-y-auto scrollbar-hide">
          alirg section
        </section>

        <section className="hidden sticky top-20 xl:flex flex-col xl:w-4/12 2xl:w-3/12 px-4 h-[90vh] overflow-y-auto scrollbar-hide">
          alirg
        </section>
      </div>
    </main>
  );
};

export default Explorer;
