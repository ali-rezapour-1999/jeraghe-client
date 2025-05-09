"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PersianDateInput } from "@/components/shared/dateInput";
import SocialMediaEdit from "./socialMediaEdit";
import { Textarea } from "@/components/ui/textarea";
import { useProfileState } from "@/store/profileStore";
import { ProfileResponse } from "@/types/profileStateType";
import { toast } from "sonner";

const formSchema = z.object({
  gender: z.enum(["man", "woman", ""], {
    errorMap: () => ({ message: "جنسیت وارد نکردی یا نامعتبره" }),
  }),
  state: z.string().min(1, "استان وارد نکردی"),
  city: z.string(),
  age: z.object({
    year: z.string().regex(/^\d{4}$/, "سال باید ۴ رقم باشد"),
    month: z.string().regex(/^(0?[1-9]|1[0-2])$/, "ماه باید بین ۱ تا ۱۲ باشد"),
    day: z.string().regex(/^(0?[1-9]|[12]\d|3[01])$/, "روز باید بین ۱ تا ۳۱ باشد"),
  }),
  address: z.string(),
  description: z.string(),
});

type FormData = z.infer<typeof formSchema>;

const ProfileUpdate = () => {
  const { profileUpdate } = useProfileState()
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: "",
      state: "",
      city: "",
      age: {
        year: "",
        month: "",
        day: "",
      },
      address: "",
      description: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const formattedDate = `${data.age.year}-${data.age.month.padStart(2, "0")}-${data.age.day.padStart(2, "0")}`;
    const payload: ProfileResponse = {
      ...data,
      age: formattedDate,
    };
    const res = await profileUpdate(payload);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>اطلاعات پروفایل</CardTitle>
              <CardDescription>
                اطلاعات پروفایل خود را ویرایش کنید
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full px-2 md:px-30">
              <div className="grid grid-cols-1 gap-4 md:gap-10 md:grid-cols-2">
                <FormField
                  name="gender"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <Label>جنسیت</Label>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full py-6">
                          <SelectValue placeholder="جنسیت خود را انتخاب کنید" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-primary-dark bg-primary border-none">
                          <SelectItem value="woman">زن</SelectItem>
                          <SelectItem value="man">مرد</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />

                <PersianDateInput
                  name="age"
                  label="تاریخ تولد"
                  placeholder={{
                    year: "سال",
                    month: "ماه",
                    day: "روز",
                  }}
                  control={form.control}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:gap-10 md:grid-cols-2">
                <FormField
                  name="state"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-1 my-5">
                      <Label>استان</Label>
                      <Input
                        {...field}
                        placeholder="استان خود را وارد کنید"
                      />
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
                <FormField
                  name="city"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-1 my-5">
                      <Label>شهر</Label>
                      <Input
                        {...field}
                        placeholder="شهر خود را وارد کنید"
                      />
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                name="address"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-2 my-1">
                    <Label>آدرس</Label>
                    <Input
                      {...field}
                      placeholder="آدرس خود را وارد کنید"
                    />
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-1 mt-10">
                    <Label htmlFor="bio">بیوگرافی</Label>
                    <Textarea
                      id="bio"
                      placeholder="درباره خود بنویسید"
                      {...field}
                    />
                    <FormDescription>
                      نوشتن بیوگرافی شما در این قسمت ممکن است به عنوان یک نکته کمک کند.
                    </FormDescription>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Button
            className="mt-5 text-lg w-full"
            variant="accent"
            type="submit"
          >
            ذخیره تغییرات
          </Button>
        </form>
      </Form>
      <SocialMediaEdit />
    </>
  );
};

export default ProfileUpdate;
