"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./login/loginForm";
import RegisterForm from "./register/registerForm";
import Image from "next/image";
import authImage from "../../../public/main-image/page_partner.png";
import { Heading } from "@/components/ui/text";
import Link from "next/link";

const AuthButtons = () => {
  const [activeTab, setActiveTab] = useState("login");
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const authTabs = (
    <Tabs
      defaultValue="login"
      value={activeTab}
      onValueChange={handleTabChange}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2 gap-1 dark:bg-transparent bg-transparent border-b-1 rounded-none">
        <TabsTrigger value="login" >
          ورود
        </TabsTrigger>
        <TabsTrigger
          className={
            activeTab == "register"
              ? "bg-primary/30"
              : ""
          }
          value="register"
        >
          ثبت نام
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login" className="mt-4 min-h-[400px]">
        <LoginForm />
      </TabsContent>
      <TabsContent value="register" className="mt-4 min-h-[400px]">
        <RegisterForm />
      </TabsContent>
    </Tabs>
  );

  return (
    <main className="flex min-h-screen">
      <div className="w-full md:w-1/2 lg:w-1/3 flex items-center gap-3 justify-center px-10 flex-col">
        <section className="w-full flex items-center flex-2/3">
          {authTabs}
        </section>
        <Link href='/' className="my-4">
          صفحه اصلی
        </Link>
      </div>
      <div className="w-full md:w-1/2 lg:w-2/3 bg-white flex flex-col items-center justify-center px-10">
        <Image src={authImage} alt="idea-image" width={400} height={400} />
        <div className="p-8 text-cetner space-y-4 flex items-center flex-col">
          <Heading as='h1' className="text-3xl md:text-4xl font-bold leading-snug text-primary-dark/80">
            به <span className="text-primary-dark">جرقه</span> خوش آمدی ✨
          </Heading>
          <p className="text-lg leading-relaxed text-primary-dark/60">
            جرقه فقط یک پلتفرم کاریابی نیست!
            اینجا می‌تونی <strong>هم‌تیمی پیدا کنی</strong>،
            با افراد هم‌فکر آشنا بشی و برای <strong>ایده‌هات هم‌سفر پیدا کنی</strong>.
          </p>
          <p className="text-base text-primary-dark/60">
            از طراحی تا برنامه‌نویسی، از محتوا تا بازاریابی —
            ما بهت کمک می‌کنیم تیم رؤیایی‌ت رو بسازی.
          </p>
          <p className="text-sm text-muted-foreground">
            همین الان وارد شو و اولین جرقه‌ت رو روشن کن!
          </p>
        </div>
      </div>
    </main>
  );
};
export default AuthButtons;
