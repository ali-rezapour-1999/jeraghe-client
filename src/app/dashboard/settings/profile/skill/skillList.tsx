import { IsLoading } from '@/components/shared/isLoading'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import useBaseState from '@/store/baseState'
import { useSkillState } from '@/store/profileStore/skillState'
import { SkillLevel } from '@/types/enumType'
import React, { useEffect } from 'react'


const skillLevels = [
  { label: 'حرفه‌ای', level: SkillLevel.Expert, color: 'bg-emerald-500', text: 'text-emerald-500' },
  { label: 'پیشرفته', level: SkillLevel.Advanced, color: 'bg-sky-500', text: 'text-sky-500' },
  { label: 'متوسط', level: SkillLevel.Intermediate, color: 'bg-amber-400', text: 'text-amber-400' },
  { label: 'مبتدی', level: SkillLevel.Beginner, color: 'bg-zinc-400', text: 'text-zinc-400' },
  { label: 'نوآموز', level: SkillLevel.Novice, color: 'bg-rose-400', text: 'text-rose-400' },
]

const SkillItems = () => {
  const { skillItemListData = [], skillItemListRequest, isLoading, getSkillItem } = useSkillState()
  const { setOpneSkillProfileModal } = useBaseState()

  useEffect(() => {
    skillItemListRequest()
  }, [skillItemListRequest])

  const skillItemOnClickHandler = async (id?: number) => {
    if (id == null) return
    const res = await getSkillItem(id)
    if (res.success) setOpneSkillProfileModal(true)
  }

  if (isLoading) return <IsLoading />

  return (
    <Card>
      <CardContent>
        <div className="flex gap-5 flex-wrap w-full">
          {skillItemListData?.map((skill, index) => (
            <div key={index} onClick={() => skillItemOnClickHandler(skill?.ID)} className="space-y-2 hover:bg-gray-200/30 transition-all duration-300 rounded-lg p-2 w-max cursor-pointer">
              <div className="flex gap-2 items-center">
                <h3 className="font-medium">{skill.tag.title}</h3>
                <Badge className={`${skillLevels.find(item => item.level === skill.level)?.color} h-[20px] pt-[4px]`}>
                  {skillLevels.find(item => item.level === skill.level)?.label}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card >
  )
}

export default SkillItems
