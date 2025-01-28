"use client";

import MainNavBar from "@/components/nav/navbar";

const Home = () => {
  return (
    <main>
      <MainNavBar />
      <div className="w-screen h-full flex px-10 gap-5">
        <section className="w-3/12 bg-red-300">alirg</section>
        <section className="w-6/12 bg-yellow-200">name</section>
        <section className="w-3/12 bg-primary">profile</section>
      </div>
    </main>
  );
};

export default Home;
