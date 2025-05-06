'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/store/authState'
import React from 'react'
import SocialMediaEdit from './socialMediaEdit'
const ProfileUpdate = () => {
  const { user } = useAuthStore()
  return (<>
    <div className="flex w-full justify-between gap-3 flex-col md:flex-row">
      <Card className="md:w-2/3 w-full">
        <CardHeader>
          <CardTitle>اطلاعات پروفایل</CardTitle>
          <CardDescription>
            اطلاعات پروفایل خود را ویرایش کنید
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">نام</Label>
              <Input id="name" placeholder="نام خود را وارد کنید" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="family">نام خانوادگی</Label>
              <Input
                id="family"
                placeholder="نام خانوادگی خود را وارد کنید"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="space-y-2 my-5">
              <Label htmlFor="email">ایمیل</Label>
              <Input
                id="email"
                type="email"
                placeholder="ایمیل خود را وارد کنید"
              />
            </div>
            <div className="space-y-2 my-5">
              <Label htmlFor="email">سن</Label>
              <Input
                id="age"
                type="number"
                placeholder="سن خود را وارد کنید"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">بیوگرافی</Label>
            <textarea
              id="bio"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="درباره خود بنویسید"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="md:w-1/3 w-full">
        <CardHeader>
          <CardTitle>تصویر پروفایل</CardTitle>
          <CardDescription>تصویر پروفایل خود را تغییر دهید</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4 w-full">
            <Avatar className="h-[300px] w-[300px] transition-all duration-200 hover:ring-2 hover:ring-secondary">
              <AvatarImage
                className="object-cover shadow-2xl drop-shadow-2xl"
                src={user?.image_url}
                alt="تصویر کاربر"
              />
              <AvatarFallback className="bg-primary-dark text-white text-2xl">
                {"تصویر کاربر"}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline">آپلود تصویر</Button>
          </div>
        </CardContent>
      </Card>
    </div>
    <Button className='mt-5 text-lg w-1/3' variant="accent">ذخیره تغییرات</Button>
    <SocialMediaEdit />
  </>
  )
}

export default ProfileUpdate
