import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import ProfileUpdate from "./profile/profileUpdate";
import Account from "./account";
import { Paragraph } from "@/components/ui/text";
import { DynamicTitleBar } from "@/components/dashboard/dynamicTitleBar";

export default function SettingsPage() {
  return (
    <main className="space-y-6 ">
      {/* Dynamic Title Bar */}
      <DynamicTitleBar />

      {/* Tabs For Settings Dashboard Page */}
      <Tabs dir="rtl" defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">پروفایل</TabsTrigger>
          <TabsTrigger value="account">حساب کاربری</TabsTrigger>
          <TabsTrigger value="notifications">اعلان‌ها</TabsTrigger>
          <TabsTrigger value="appearance">ظاهر</TabsTrigger>
        </TabsList>

        <TabsContent dir="rtl" value="profile" className=" w-full">
          <ProfileUpdate />
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <Account />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>تنظیمات اعلان‌ها</CardTitle>
              <CardDescription>
                نحوه دریافت اعلان‌ها را مدیریت کنید
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-y-2">
                <div>
                  <p className="font-medium">اعلان‌های ایمیلی</p>
                  <p className="text-sm text-muted-foreground">
                    دریافت اعلان‌ها از طریق ایمیل
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between space-y-2">
                <div>
                  <Paragraph>دریافت اعلان‌ها از طریق پیامک</Paragraph>
                  <Paragraph className="text-sm text-muted-foreground">
                    دریافت اعلان‌ها از طریق پیامک
                  </Paragraph>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between space-y-2">
                <div>
                  <Paragraph className="font-medium">اعلان‌های مرورگر</Paragraph>
                  <Paragraph className="text-sm text-muted-foreground">
                    دریافت اعلان‌ها در مرورگر
                  </Paragraph>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>ذخیره تنظیمات</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>تنظیمات ظاهری</CardTitle>
              <CardDescription>ظاهر داشبورد را سفارشی کنید</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>حالت نمایش</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="justify-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2 h-4 w-4"
                    >
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2" />
                      <path d="M12 20v2" />
                      <path d="m4.93 4.93 1.41 1.41" />
                      <path d="m17.66 17.66 1.41 1.41" />
                      <path d="M2 12h2" />
                      <path d="M20 12h2" />
                      <path d="m6.34 17.66-1.41 1.41" />
                      <path d="m19.07 4.93-1.41 1.41" />
                    </svg>
                    روشن
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2 h-4 w-4"
                    >
                      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                    </svg>
                    تاریک
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2 h-4 w-4"
                    >
                      <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34" />
                      <polygon points="18 2 22 6 12 16 8 16 8 12 18 2" />
                    </svg>
                    سیستم
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>ذخیره تنظیمات</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
