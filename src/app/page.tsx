'use client'
import { Heading, Paragraph } from "@/components/ui/text";
import MainNavBar from "@/components/shared/navbar/navbar";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useAuthStore } from "@/store/authState";

const Home = () => {
  const { isAuthenticated } = useAuthStore()
  return (
    <main>
      <MainNavBar />
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50 rounded-full px-6 py-2 text-sm font-medium border-0">
            🚀 ارتباط • همکاری • موفقیت
          </Badge>

          <Heading as='h1' className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-l from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              همکار ایده‌آل
            </span>
            <br />
            <span className="text-foreground">خود را پیدا کنید</span>
          </Heading>

          <Paragraph className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            جراقه بزرگترین شبکه همکاری حرفه‌ای ایران است. متخصصان، کارآفرینان و خلاقان را به هم متصل می‌کند تا پروژه‌های
            بزرگ بسازند.
          </Paragraph>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              asChild
              variant="gradient"
              className="rounded-2xl px-10 py-6 text-lg"
            >
              <Link href={isAuthenticated ? "/dashboard" : "/register"}>
                شروع همکاری <ArrowLeft className="mr-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="rounded-2xl px-10 py-6 text-lg border-2 hover:bg-muted/50"
            >
              <Link href="/search">
                <Search className="ml-2 h-5 w-5" />
                کاوش پروفایل‌ها
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">۱۵ هزار+</div>
              <div className="text-muted-foreground text-sm">کاربر فعال</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">۳.۲ هزار+</div>
              <div className="text-muted-foreground text-sm">همکاری موفق</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">۸۵۰+</div>
              <div className="text-muted-foreground text-sm">پروژه فعال</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">۹۷٪</div>
              <div className="text-muted-foreground text-sm">رضایت کاربران</div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Home;
