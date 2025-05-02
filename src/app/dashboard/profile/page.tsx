'use client'
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
  Linkedin,
} from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuthStore();
  const { profileData } = useProfileState();
  const persianDate = usePersianDate(user?.created_at);
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
                  src={user?.image_url}
                  className="object-cover shadow-2xl drop-shadow-2xl"
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
              <div className="flex justify-between pb-2">
                <span className="font-medium">ایمیل:</span>
                <span>{user?.email}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="font-medium">شماره تماس:</span>
                <span>{user?.phone_number}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="font-medium">سن:</span>
                <span>{user?.age || "هنوز وارد نشده"} سال</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="font-medium">شهر:</span>
                <span>{profileData?.city || "هنوز وارد نشده"}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="font-medium">استان:</span>
                <span>{profileData?.state || "هنوز وارد نشده"}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="font-medium">تاریخ عضویت:</span>
                <span>{persianDate}</span>
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
                <Link
                  href="https://linkedin.com/in/username"
                  variant="outline"
                  className="flex items-center justify-start gap-3 rounded-md p-8 transition-colors hover:bg-muted"
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
                </Link>
              </div>

              <div className="mt-4">
                <Button variant="accent" className="w-full">
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
      </div>
    </div>
  );
}

import { BookText, FileText, MessageSquare, Settings } from "lucide-react";
import { Link } from "@/components/ui/link";
import { useAuthStore } from "@/store/authState";
import { usePersianDate } from "@/hooks/useToPersionDate";
import { useProfileState } from "@/store/profileStore";

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

