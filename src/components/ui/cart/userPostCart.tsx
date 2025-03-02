import { PostType } from '@/type/postStateType'
import Image from 'next/image'
import React from 'react'
import Btn from '../btn'
import { Edit, Eye, Trash } from 'lucide-react'

const UserPostCart: React.FC<PostType> = ({ title, content, category, image, status }) => {
  return (
    <div className='dark:bg-darkPrimary max-h-[200px] flex rounded-2xl overflow-hidden'>
      <div className='w-3/5 p-3 flex flex-col items-start justify-between'>
        <h1 className='text-xl border-b-1 my-2 pb-1 px-2'>{title}</h1>
        <p className='text-ellipsis line-clamp-2 text-slate-500 text-xs'>{content}</p>
        <h2>{category}</h2>
        <div className='flex items-center justify-between w-full'>
          <p className='text-sm'>
            <span>وضعیت پست : <span>{status == 'published' ? 'منتشر شده' : 'در انتظار تایید'}</span></span>
          </p>
          <div>
            <Btn className='bg-transparent dark:bg-transparent text-text-green  dark:text-green px-2'><Eye /></Btn>
            <Btn className='bg-transparent dark:bg-transparent text-blue-400 dark:text-blue-400 px-2'><Edit /></Btn>
            <Btn className='bg-transparent dark:bg-transparent text-red-700 dark:text-red-700 px-2'><Trash /></Btn>
          </div>
        </div>
      </div>
      <Image src={image} alt={title as string} width={400} height={400} className='w-2/5 object-cover' />
    </div>
  )
}
export default UserPostCart
