import React from 'react'
import Btn from '../ui/btn'

type RedirectPageType = {
  link: string,
  content: string,
  btnTitle: string
}
const RedirectPage: React.FC<RedirectPageType> = ({ link, content, btnTitle }) => {
  return (
    <div className='flex flex-col items-center justify-center gap-3'>
      <p className='text-xl text-darkPrimary dark:text-light'>
        {content}
      </p>
      <Btn className='px-10 py-1 ' link={link}>{btnTitle}</Btn>
    </div>
  )
}

export default RedirectPage
