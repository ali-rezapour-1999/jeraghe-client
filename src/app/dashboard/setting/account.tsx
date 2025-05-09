import { AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/store/authState'
import { Avatar } from '@radix-ui/react-avatar'
import React from 'react'

const Account = () => {
  const { user } = useAuthStore()
  return <> <Card className="md:w-1/3 w-full">
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
    <Card>
      <CardHeader>
        <CardTitle>تغییر رمز عبور</CardTitle>
      </CardHeader>
      <CardDescription>رمز عبور خود را تغییر دهید</CardDescription>
      <CardContent className="space-y-4 grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="current-password">رمز عبور فعلی</Label>
          <Input id="current-password" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-password">رمز عبور جدید</Label>
          <Input id="new-password" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">تکرار رمز عبور جدید</Label>
          <Input id="confirm-password" type="password" />
        </div>
      </CardContent>
      <CardFooter>
        <Button>تغییر رمز عبور</Button>
      </CardFooter>
    </Card>
  </>
}

export default Account
