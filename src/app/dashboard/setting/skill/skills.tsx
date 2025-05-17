import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import SkillItems from './skillItems'
import useBaseState from '@/store/baseState'
import SkillFormModal from '@/components/shared/modal/skillFormModal'
import { Input } from '@/components/ui/input'
import { useSkillState } from '@/store/profileStore/skillState'
import { toast } from 'sonner'


const formSchema = z.object({
  title: z.string().min(1, "عنوان وارد نکردی"),
});

const Skills = () => {
  const { setOpneSkillProfileModal } = useBaseState();
  const { createSkill } = useSkillState()

  type FormData = z.infer<typeof formSchema>;
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { formState: { isDirty } } = form;
  const onSubmitHandler = async (data: FormData) => {
    const response = await createSkill(data.title);
    if (response.success) {
      toast.success(response.message);
    }
    else {
      toast.error(response.message);
    }
  };

  return <main className='flex flex-col items-start  gap-10 md:flex-row mt-10'>
    <Form {...form} >
      <form className="md:w-1/2 w-full"
        onSubmit={form.handleSubmit(onSubmitHandler)}
      >
        <Card >
          <CardHeader>
            <CardTitle>مهارت کاربر</CardTitle>
            <CardDescription>
              مهارت نمایشی خود را وارد کنید
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full">
            <FormField
              control={form.control}
              name="title"
              render={({ field, fieldState }) => (
                <FormItem>
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
            <Button disabled={!isDirty} variant="accent" type='submit' className='w-full mt-3' >ذخیره</Button>
          </CardContent>
          <CardContent>
            <Button variant="outline" type='button' onClick={() => setOpneSkillProfileModal(true)} className='w-full' >افزودن مهارت</Button>
          </CardContent>
        </Card >
      </form>
    </Form >
    <div className='w-full md:w-1/2'>
      <SkillItems />
    </div>
    <SkillFormModal />
  </main>
}

export default Skills
