import React, {useState} from 'react'
import Image from 'next/image'
import { Ellipsis } from 'lucide-react';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'



interface commentsDetailsType {
  avatar: string,
  userName: string,
  createdAt: string,
  comment: string,
  // handleCommentCreate(): any
}

const Comment = ({ avatar, userName, createdAt, comment }: commentsDetailsType) => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en')

  // const [commentInput, setCommentInput] = useState()

  return (
    <div className='flex gap-2 mb-2 relative'>
      {/* ======================================= profile pic*/}
      <div className='h-10 max-w-10 overflow-hidden rounded-full '>
        <Image
          src={avatar}
          height={50}
          width={50}
          alt='profile pic'
          className='h-full w-full rounded-full object-cover'
        />
      </div>
      {/* ----------------------------------- */}

      <div className='flex flex-col gap-1'>
        <div className='flex gap-2 text-sm items-center'>
          <p className='font-bold'>{`@${userName}`}</p>
          <p className='text-xs text-gray-500'>{timeAgo.format(new Date(createdAt))}</p>
        </div>

        <div className='text-xs mr-8 ml-2'>
          {comment}
        </div>
      </div>

      <div className='absolute top-0 right-0 cursor-pointer'>
        <Ellipsis />
      </div>
    </div>
  )
}

export default Comment
