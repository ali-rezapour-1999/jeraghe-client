import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const NewPassword = () => {
  return <Card>
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
}

export default NewPassword
