import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import useBaseState from '@/store/baseState'
import { Input } from '@/components/ui/input'
import { useSkillState } from '@/store/profileStore/skillState'
import { toast } from 'sonner'
import { useProfileState } from '@/store/profileStore'
import SkillList from './skillList'
import AddSkillsForm from './addSkillsForm'
import CategorySelect from '@/components/ui/select/categorySelect'
import Spinner from '@/components/shared/spinner'


const formSchema = z.object({
  title: z.string({ required_error: "عنوان وارد نکردی" }),
  profile: z.number().optional(),
  category: z.number({
    required_error: "لطفاً یک دسته‌بندی برای مهارت انتخاب کنید.",
  }),
});
type FormData = z.infer<typeof formSchema>;

const Skills = () => {
  const { setOpneSkillProfileModal } = useBaseState();
  const { profileData } = useProfileState()
  const { createSkill, skillRequest, skillData, isLoading, setItemNull } = useSkillState()

  useEffect(() => {
    skillRequest();
  }, [skillRequest, createSkill]);

  const defaultValues = {
    title: skillData?.title || "",
    category: skillData?.category?.ID ?? undefined,
    profile: profileData?.ID,
  };

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmitHandler = async (data: FormData) => {
    const formData = { title: data.title, profile: profileData!.ID, category: data.category }
    const response = await createSkill(formData);
    if (response.success) {
      toast.success(response.message);
      await skillRequest();
    }
    else {
      toast.error(response.message);
    }
  };

  const openAddSkillModal = () => {
    setItemNull();
    setOpneSkillProfileModal(true);
  }
  const watchFields = form.watch();
  const isChanged = watchFields.title !== defaultValues.title || watchFields.category !== defaultValues.category;

  return <main className='flex flex-col md:flex-row lg:flex-col items-start gap-10 mt-10 lg:mt-0 w-full lg:w-1/3'>
    <Form {...form} >
      <form className="w-full"
        onSubmit={form.handleSubmit(onSubmitHandler)}
      >
        <Card>
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
                      placeholder={skillData?.title || "عنوان مهارت خود را وارد کنید"}
                      className={
                        fieldState.error
                          ? "border-red-500 dark:border-red-400"
                          : ""
                      }
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm">{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

            <CardContent className="w-full mt-3 px-0">
              <FormField
                control={form.control}
                name="category"
                render={({ field, fieldState }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <CategorySelect placeholder={skillData?.category?.title || "دسته بندی را انتخاب کنید"} onSelect={(val) => field.onChange(Number(val))}
                        value={field.value !== undefined ? field.value.toString() : ""}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm">{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </CardContent>
            <Button
              disabled={form.formState.isSubmitting || !isChanged}
              variant="accent" type='submit' className='w-full mt-3' >{isLoading || form.formState.isSubmitting ? <Spinner variant="card" /> : "ذخیره"}</Button>
          </CardContent>
          <CardContent>
            <Button disabled={skillData?.ID == null} variant="outline" type='button' onClick={openAddSkillModal} className='w-full' >افزودن مهارت</Button>
          </CardContent>
        </Card >
      </form>
    </Form >
    <div className='w-full'>
      <SkillList />
    </div>
    <AddSkillsForm />
  </main>
}

export default Skills
