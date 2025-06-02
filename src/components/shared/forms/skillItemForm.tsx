import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Heading } from '@/components/ui/text';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import EnumSelect from '@/components/ui/select/enumSelect';
import { useEnumState } from '@/store/enumStore/enumState';
import { EnumType } from '@/types/enumType';
import { useSkillState } from '@/store/profileStore/skillState';
import { SkillState } from '@/types/profileStateType';
import { toast } from 'sonner';
import { useProfileState } from '@/store/profileStore';
import useBaseState from '@/store/baseState';


const formSchema = z.object({
  skill: z.string({ required_error: "عنوان مهارت را وارد نکردید" }),
  level: z.string({ required_error: "هنوز سطح تجربه را انتخاب نکردید" }),
  profile: z.number().optional(),
});

type FormData = z.infer<typeof formSchema>;

const SkillItemForm = () => {
  const { enumData, skillLevelEnumRequest } = useEnumState() as EnumType;
  const { skillItem, skillItemListRequest } = useSkillState() as SkillState;
  const { profileData } = useProfileState()
  const { setOpneSkillProfileModal } = useBaseState();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skill: "",
      level: "",
      profile: profileData?.ID,
    },
  });

  useEffect(() => {
    const request = async () => {
      await skillLevelEnumRequest();
    }
    request();
  }, [])

  const onSubmit = async (data: FormData) => {
    const formData = { skill: data.skill, profile: profileData!.ID, level: data.level }
    const result = await skillItem(formData);
    if (result.success) {
      toast.success(result.message);
      setOpneSkillProfileModal(false)
      await skillItemListRequest()
    } else {
      toast.error(result.message);
    }

  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <Heading className='text-center mb-6 mt-5 md:mt-3'>مهارت کاربر</Heading>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="skill"
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
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>سطح تجربه</FormLabel>
                <FormControl>
                  <EnumSelect
                    enumData={enumData}
                    value={field.value as string}
                    onSelect={(val) => field.onChange(val)}
                    placeholder="سطح تجربه را انتخاب کنید"
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
