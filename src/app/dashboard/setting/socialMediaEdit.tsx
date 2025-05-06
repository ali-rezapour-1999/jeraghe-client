import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const SocialMediaEdit = () => {
  return <div>
    <Card className="md:w-1/2 w-full mt-10">
      <CardHeader>
        <CardTitle>مهارت کاربر</CardTitle>
        <CardDescription>
          مهارت کاربر خود را ویرایش کنید
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="skill">نام</Label>
            <Input id="skill" placeholder="مهارت خود را وارد کنید" />
          </div>
        </div>
      </CardContent>
    </Card >
  </div>
}

export default SocialMediaEdit
