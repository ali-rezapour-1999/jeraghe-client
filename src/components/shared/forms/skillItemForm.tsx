import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Heading } from '@/components/ui/text';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Tags from './tags';


const formSchema = z.object({
  title: z.string().min(1, "عنوان مهارت را وارد نکردید"),
  tags: z.array(z.string()).min(1, "تگ را وارد نکردید"),
});

type FormData = z.infer<typeof formSchema>;

const SkillItemForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      tags: [],
    },
  });

  const onSubmit = (data: FormData) => {
    return data
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
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>تگ‌ها</FormLabel>
                <FormControl>
                  <Tags value={field.value as string[]} onChange={field.onChange} />
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
