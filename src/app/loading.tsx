'use client'
import { Spinner } from '@heroui/react'
import React from 'react'

const Loading = () => {
  return <div className='w-full h-screen flex items-center justify-center'>
    <Spinner color='success' size='lg' />
  </div>
}

export default Loading
