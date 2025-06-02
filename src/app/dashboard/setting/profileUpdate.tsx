"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PersianDateInput } from "@/components/shared/dateInput";
import Skills from "./skill/skills";
import { Textarea } from "@/components/ui/textarea";
import { useProfileState } from "@/store/profileStore";
import { ProfileResponse } from "@/types/profileStateType";
import { toast } from "sonner";
import Spinner from "@/components/shared/spinner";

const formSchema = z.object({
  gender: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  age: z
    .object({
      year: z.string().optional(),
      month: z.string().optional(),
      day: z.string().optional(),
    })
    .optional()
    .refine(
      (data) => {
        if (data && (data.year || data.month || data.day)) {
          return data.year && data.month && data.day;
        }
        return true;
      },
      { message: "تاریخ باید کامل وارد شود یا کاملاً خالی باشد" }
    ),
  address: z.string().optional(),
  description: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const ProfileUpdate = () => {
  const { profileUpdate, profileData, isLoading } =
    useProfileState();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: profileData?.gender || "",
      state: profileData?.state || "",
      city: profileData?.city || "",
      age: profileData?.age
        ? {
          year: profileData.age.split("-")[0],
          month: profileData.age.split("-")[1],
          day: profileData.age.split("-")[2],
        }
        : {
          year: "",
          month: "",
          day: "",
        },
      address: profileData?.address || "",
      description: profileData?.description || "",
    },
  });


  const { formState: { isDirty, dirtyFields } } = form;

  const onSubmit = async (data: FormData) => {
    const payload: ProfileResponse = {
      ID: profileData!.ID,
    };

    if (dirtyFields.gender) {
      payload.gender = data.gender || "";
    }
    if (dirtyFields.state) {
      payload.state = data.state || "";
    }
    if (dirtyFields.city) {
      payload.city = data.city || "";
    }
    if (dirtyFields.age && data.age?.year && data.age?.month && data.age?.day) {
      payload.age = `${data.age.year}-${data.age.month.padStart(2, "0")}-${data.age.day.padStart(2, "0")}`;
    }
    if (dirtyFields.address) {
      payload.address = data.address || "";
    }
    if (dirtyFields.description) {
      payload.description = data.description || "";
    }

    if (Object.keys(payload).length === 0) {
      toast.info("هیچ تغییری برای ارسال وجود ندارد");
      return;
    }

    const res = await profileUpdate(payload);
    if (res.success) {
      toast.success(res.message);
      window.location.reload();
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
            <CardContent className="w-full px-2 md:px-16 lg:px-32">
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
                          <SelectValue
                            placeholder={
                              profileData?.gender || "جنسیت خود را انتخاب کنید"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-primary-dark bg-primary border-none">
                          <SelectItem value="زن">زن</SelectItem>
                          <SelectItem value="مرد">مرد</SelectItem>
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
                    year:
                      profileData?.age && typeof profileData.age === "string"
                        ? profileData.age.split("-")[0]
                        : "سال",
                    month:
                      profileData?.age && typeof profileData.age === "string"
                        ? profileData.age.split("-")[1]
                        : "ماه",
                    day:
                      profileData?.age && typeof profileData.age === "string"
                        ? profileData.age.split("-")[2]
                        : "روز",
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
                        placeholder={
                          profileData?.state || "استان خود را وارد کنید"
                        }
                        value={field.value || ""}
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
                        placeholder={
                          profileData?.city || "شهر خود را وارد کنید"
                        }
                        value={field.value || ""}
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
                      placeholder={
                        profileData?.address || "آدرس خود را وارد کنید"
                      }
                      value={field.value || ""}
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
                      placeholder={
                        profileData?.description || "درباره خود بنویسید"
                      }
                      {...field}
                      value={field.value || ""}
                    />
                    <FormDescription>
                      نوشتن بیوگرافی شما در این قسمت ممکن است به عنوان یک نکته
                      کمک کند.
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
            disabled={!isDirty}
          >
            {isLoading ? <Spinner /> : "ذخیره تغییرات"}
          </Button>
        </form>
      </Form>
      <Skills />
    </>
  );
};

export default ProfileUpdate;
