"use client";
import React, { useEffect } from "react";
import { ProfileResponse } from "@/types/profileStateType";
import { Button } from "@/components/ui/button";
import { useProfileState } from "@/store/profileStore";
import { IsLoading } from "@/components/shared/isLoading";
import Spinner from "@/components/shared/spinner";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const genderOptions = [
  { id: 1, label: "مرد" },
  { id: 2, label: "زن" },
];

const stateOptions = [
  { id: 1, label: "مازندران" },
  // می‌توانید گزینه‌های بیشتری اضافه کنید
];

const formSchema = z.object({
  age: z
    .number({ invalid_type_error: "سن باید یک عدد باشد" })
    .min(1, "سن خود را وارد کنید")
    .max(120, "سن معتبر نیست")
    .nullable(),
  gender: z.string().min(1, "جنسیت خود را انتخاب کنید"),
  state: z.string().min(1, "استان خود را انتخاب کنید"),
  city: z.string().min(1, "شهر خود را وارد کنید"),
  address: z.string().min(1, "آدرس خود را وارد کنید"),
  description: z.string().max(500, "توضیحات حداکثر ۵۰۰ کاراکتر می‌تواند باشد").optional(),
});

type FormData = z.infer<typeof formSchema>;

const ProfileInfo = () => {
  const { profileData, profileRequest, profileUpdate, isLoading } = useProfileState();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: profileData?.age ? parseInt(profileData.age) : null,
      gender: profileData?.gender ?? "",
      state: profileData?.state ?? "",
      city: profileData?.city ?? "",
      address: profileData?.address ?? "",
      description: profileData?.description ?? "",
    },
  });

  useEffect(() => {
    if (profileData) {
      form.reset({
        age: profileData.age ? parseInt(profileData.age) : null,
        gender: profileData.gender ?? "",
        state: profileData.state ?? "",
        city: profileData.city ?? "",
        address: profileData.address ?? "",
        description: profileData.description ?? "",
      });
    }
  }, [profileData, form]);

  const onSubmitProfileHandler = async (data: FormData) => {
    const transformedData: ProfileResponse = {
      age: data.age !== null ? data.age.toString() : null,
      gender: data.gender || null,
      state: data.state || null,
      city: data.city || null,
      address: data.address || null,
      description: data.description ?? null,
    };

    const response = await profileUpdate(transformedData);
    if (response.success) {
      toast.success(response.message);
      profileRequest();
    } else {
      toast.error(response.message);
    }
  };

  if (!profileData) return <IsLoading />;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitProfileHandler)}
        className="w-full max-w-full flex flex-col gap-6"
      >
        <div className="w-full flex flex-col lg:flex-row gap-8">
          <FormField
            control={form.control}
            name="age"
            render={({ field, fieldState }) => (
              <FormItem className="flex-1">
                <FormLabel>سن</FormLabel>
                <FormControl>
                  <Input
                    placeholder="سن خود را وارد کنید"
                    type="number"
                    className={fieldState.error ? "border-red-500 dark:border-red-400" : ""}
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field, fieldState }) => (
              <FormItem className="flex-1">
                <FormLabel>جنسیت</FormLabel>
                <FormControl>
                  <select
                    className={`w-full p-2 border rounded-md dark:bg-gray-800 dark:text-light text-primary ${fieldState.error ? "border-red-500 dark:border-red-400" : "border-gray-300"
                      }`}
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                    value={field.value}
                  >
                    <option value="" disabled>
                      جنسیت خود را انتخاب کنید
                    </option>
                    {genderOptions.map((option) => (
                      <option key={option.id} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full flex flex-col lg:flex-row gap-8">
          <FormField
            control={form.control}
            name="state"
            render={({ field, fieldState }) => (
              <FormItem className="flex-1">
                <FormLabel>استان</FormLabel>
                <FormControl>
                  <select
                    className={`w-full p-2 border rounded-md dark:bg-gray-800 dark:text-light text-primary ${fieldState.error ? "border-red-500 dark:border-red-400" : "border-gray-300"
                      }`}
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                    value={field.value}
                  >
                    <option value="" disabled>
                      استان خود را انتخاب کنید
                    </option>
                    {stateOptions.map((option) => (
                      <option key={option.id} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field, fieldState }) => (
              <FormItem className="flex-1">
                <FormLabel>شهر</FormLabel>
                <FormControl>
                  <Input
                    placeholder="شهر خود را وارد کنید"
                    type="text"
                    className={fieldState.error ? "border-red-500 dark:border-red-400" : ""}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>آدرس</FormLabel>
              <FormControl>
                <Input
                  placeholder="آدرس خود را وارد کنید"
                  type="text"
                  className={fieldState.error ? "border-red-500 dark:border-red-400" : ""}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>توضیحات</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="چند کلمه در مورد خودتون توضیح بدید"
                  className={`resize-y h-[150px] max-h-[150px] font-light ${fieldState.error ? "border-red-500 dark:border-red-400" : ""
                    }`}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full text-lg mt-3 text-light dark:text-secondary bg-primary dark:bg-light"
          disabled={isLoading || form.formState.isSubmitting}
        >
          {isLoading || form.formState.isSubmitting ? <Spinner variant="card" /> : "ثبت تغییرات"}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileInfo;
