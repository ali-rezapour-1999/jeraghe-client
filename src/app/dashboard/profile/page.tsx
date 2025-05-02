import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Globe,
  Instagram,
  Linkedin,
  MapPin,
  Twitter,
} from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">پروفایل</h1>
        <p className="text-muted-foreground">مشاهده و ویرایش اطلاعات پروفایل</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>اطلاعات شخصی</CardTitle>
            <CardDescription>اطلاعات شخصی و تماس شما</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4 text-center sm:flex-row sm:space-x-4 sm:space-y-0 sm:text-right">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src="/placeholder.svg?height=96&width=96"
                  alt="تصویر پروفایل"
                />
                <AvatarFallback>کاربر</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">علی محمدی</h3>
                <p className="text-sm text-muted-foreground">
                  توسعه‌دهنده وب و طراح رابط کاربری
                </p>
                <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                  <Badge variant="outline">React</Badge>
                  <Badge variant="outline">Next.js</Badge>
                  <Badge variant="outline">UI/UX</Badge>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">ایمیل:</span>
                <span>example@example.com</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">شماره تماس:</span>
                <span>۰۹۱۲۳۴۵۶۷۸۹</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">سن:</span>
                <span>۳۲ سال</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">شهر:</span>
                <span>تهران</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">استان:</span>
                <span>تهران</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">کشور:</span>
                <span>ایران</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">تاریخ عضویت:</span>
                <span>۱۴۰۱/۰۶/۱۵</span>
              </div>
            </div>

            <div className="mt-6">
              <Button className="w-full">ویرایش پروفایل</Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>شبکه‌های اجتماعی</CardTitle>
              <CardDescription>حساب‌های شبکه‌های اجتماعی شما</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <a
                  href="https://linkedin.com/in/username"
                  className="flex items-center gap-3 rounded-md border p-3 transition-colors hover:bg-muted"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                    <Linkedin className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                  </div>
                  <div>
                    <p className="font-medium">لینکدین</p>
                    <p className="text-sm text-muted-foreground">
                      linkedin.com/in/username
                    </p>
                  </div>
                </a>

                <a
                  href="https://github.com/username"
                  className="flex items-center gap-3 rounded-md border p-3 transition-colors hover:bg-muted"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                    <Github className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </div>
                  <div>
                    <p className="font-medium">گیت‌هاب</p>
                    <p className="text-sm text-muted-foreground">
                      github.com/username
                    </p>
                  </div>
                </a>

                <a
                  href="https://instagram.com/username"
                  className="flex items-center gap-3 rounded-md border p-3 transition-colors hover:bg-muted"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900">
                    <Instagram className="h-5 w-5 text-pink-600 dark:text-pink-300" />
                  </div>
                  <div>
                    <p className="font-medium">اینستاگرام</p>
                    <p className="text-sm text-muted-foreground">
                      instagram.com/username
                    </p>
                  </div>
                </a>

                <a
                  href="https://twitter.com/username"
                  className="flex items-center gap-3 rounded-md border p-3 transition-colors hover:bg-muted"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                    <Twitter className="h-5 w-5 text-blue-500 dark:text-blue-300" />
                  </div>
                  <div>
                    <p className="font-medium">توییتر</p>
                    <p className="text-sm text-muted-foreground">
                      twitter.com/username
                    </p>
                  </div>
                </a>

                <a
                  href="https://example.com"
                  className="flex items-center gap-3 rounded-md border p-3 transition-colors hover:bg-muted"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                    <Globe className="h-5 w-5 text-green-600 dark:text-green-300" />
                  </div>
                  <div>
                    <p className="font-medium">وب‌سایت شخصی</p>
                    <p className="text-sm text-muted-foreground">example.com</p>
                  </div>
                </a>
              </div>

              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  افزودن شبکه اجتماعی
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>فعالیت‌های اخیر</CardTitle>
              <CardDescription>آخرین فعالیت‌های شما در سایت</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 rtl:space-x-reverse"
                  >
                    <div>
                      <activity.icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>درباره من</CardTitle>
            <CardDescription>بیوگرافی و اطلاعات حرفه‌ای</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                من یک توسعه‌دهنده وب با بیش از ۵ سال تجربه در زمینه طراحی و
                توسعه وب‌سایت‌ها و اپلیکیشن‌های وب هستم. تخصص اصلی من در
                فریم‌ورک‌های React و Next.js است و همچنین در زمینه طراحی رابط
                کاربری و تجربه کاربری نیز فعالیت دارم.
              </p>
              <p>
                در طول دوران فعالیت حرفه‌ای خود، با شرکت‌های مختلفی همکاری
                کرده‌ام و پروژه‌های متنوعی را در زمینه‌های فروشگاه آنلاین،
                سیستم‌های مدیریت محتوا، داشبوردهای مدیریتی و اپلیکیشن‌های موبایل
                انجام داده‌ام.
              </p>
              <p>
                علاقه‌مند به یادگیری تکنولوژی‌های جدید و به اشتراک‌گذاری دانش و
                تجربیات خود با دیگران هستم. در وبلاگ شخصی خو�� مقالات آموزشی در
                زمینه برنامه‌نویسی وب منتشر می‌کنم.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>موقعیت مکانی</CardTitle>
            <CardDescription>محل سکونت و کار</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 rounded-lg border p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/20">
                <MapPin className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h4 className="font-medium">تهران، ایران</h4>
                <p className="text-sm text-muted-foreground">
                  منطقه ۳، خیابان ولیعصر
                </p>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="outline">منطقه زمانی: GMT+3:30</Badge>
                  <Badge variant="outline">کد پستی: ۱۹۹۳۶۳۴۴۱۱</Badge>
                </div>
              </div>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { BookText, FileText, MessageSquare, Settings } from "lucide-react";

const activities = [
  {
    icon: FileText,
    title: "مقاله جدید منتشر کردید: «راهنمای جامع React»",
    time: "۲ ساعت پیش",
    type: "blog",
  },
  {
    icon: MessageSquare,
    title: "به تیکت «مشکل در آپلود تصاویر» پاسخ دادید",
    time: "۵ ساعت پیش",
    type: "ticket",
  },
  {
    icon: BookText,
    title: "فرصت شغلی جدید ایجاد کردید: «توسعه‌دهنده فرانت‌اند»",
    time: "دیروز",
    type: "job",
  },
  {
    icon: Settings,
    title: "تنظیمات پروفایل خود را بروزرسانی کردید",
    time: "۲ روز پیش",
    type: "settings",
  },
];

