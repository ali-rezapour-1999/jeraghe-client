import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Heading } from '@/components/ui/text'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


const formSchema = z.object({
  title: z.string().min(1, "عنوان وارد نکردی"),
});

const SkillItemForm = () => {

  type FormData = z.infer<typeof formSchema>;
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  return <Form {...form} >
    <form className="w-full ">
      <Heading className='text-center mb-4'>مهارت کاربر</Heading>
      <div className="space-y-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>عنوان مهارت</FormLabel>
              <FormControl>
                <Input id="title"
                  placeholder="عنوان مهارت خود را وارد کنید"
                  className={
                    fieldState.error
                      ? "border-red-500 dark:border-red-400"
                      : ""
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />
      </div>
      <Button variant='accent' className='w-full mt-4'>افزودن مهارت</Button>
    </form>
  </Form>
}

export default SkillItemForm
