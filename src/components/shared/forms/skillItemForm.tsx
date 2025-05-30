import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import CategorySelect from '@/components/ui/select/categorySelect';
import { Heading } from '@/components/ui/text';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';


const formSchema = z.object({
  title: z.string().min(1, "عنوان مهارت را وارد نکردید"),
  category: z.string().nullable().refine(id => id !== null && id !== "", {
    message: "لطفاً یک دسته‌بندی برای مهارت انتخاب کنید.",
  }),
});

type FormData = z.infer<typeof formSchema>;

const SkillItemForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data Submitted:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <Heading className='text-center mb-6 mt-5 md:mt-3'>مهارت کاربر</Heading>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>عنوان مهارت</FormLabel>
                <FormControl>
                  <Input
                    id="title"
                    placeholder="مهارت خود را وارد کنید"
                    className={
                      fieldState.error
                        ? "border-red-500 dark:border-red-400"
                        : ""
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>دسته‌بندی مهارت</FormLabel>
                <FormControl>
                  <CategorySelect
                    onSelect={field.onChange}
                    value={field.value as string}
                    placeholder="انتخاب دسته‌بندی"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button variant='accent' type="submit" className='w-full mt-8'>
          افزودن مهارت
        </Button>
      </form>
    </Form>
  );
};

export default SkillItemForm;
