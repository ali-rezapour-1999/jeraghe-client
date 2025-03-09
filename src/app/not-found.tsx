import React from 'react'
import Link from 'next/link'
import { Home } from 'lucide-react'

const NotFound = () => {
  return <div className='h-screen w-full flex items-center justify-center flex-col gap-7'>
    <div className='flex items-center justify-center gap-4 text-4xl md:text-7xl font-bold text-darkPrimary dark:text-light'>
      <span>4</span>
      <span>0</span>
      <span>4</span>
    </div>
    <div className='flex flex-col items-center gap-4'>
      <p className='text-xl md:text-2xl font-bold text-darkPrimary dark:text-light'>اوه اوه اشتباه اومدی</p>
      <Link href={'/'} className='flex items-center justify-center gap-2 bg-green-dark dark:bg-green-dark px-7 py-3 text-lg rounded-2xl mt-1'>
        <span>
          صفحه اصلی
        </span>
        <Home />
      </Link>
    </div>
  </div>
}

export default NotFound 
