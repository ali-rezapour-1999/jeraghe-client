'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  const { user } = useAuthStore();
  const { profileData } = useProfileState();
  return (
    <div className="space-y-6">
      <DynamicTitleBar />

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
                <span className="font-medium">سال تولد:</span>
                <span>{profileData?.age || "هنوز وارد نشده"}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="font-medium">شهر:</span>
                <span>{profileData?.city || "هنوز وارد نشده"}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="font-medium">استان:</span>
                <span>{profileData?.state || "هنوز وارد نشده"}</span>
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
            <div>
              {profileData?.description || <Link href="/dashboard/setting" variant='link' className="!text-primary/50 text-center w-full">اضافه کردن توضیحات</Link>}
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
import { useProfileState } from "@/store/profileStore";
import { DynamicTitleBar } from "@/components/dashboard/dynamicTitleBar";

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

