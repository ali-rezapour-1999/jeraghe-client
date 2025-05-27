import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import CategorySelect from '@/components/ui/select/categorySelect';
import { Heading } from '@/components/ui/text';
import { Category } from '@/types/baseType';
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
        <Heading className='text-center mb-6'>افزودن/ویرایش مهارت کاربر</Heading>
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
                    placeholder="مثلا: طراحی وبسایت با React"
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
            render={({ field }) => (<FormItem>
              <FormControl>
                <CategorySelect
                  label="دسته‌بندی مهارت"
                  placeholder="انتخاب دسته‌بندی..."
                  value={field.value as Category | null}
                  onChange={field.onChange}
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
