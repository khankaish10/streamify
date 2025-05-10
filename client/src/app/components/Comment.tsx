import React, { useState } from 'react'
import Image from 'next/image'
import { Ellipsis } from 'lucide-react';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { useAppSelector } from '@/lib/hooks';

interface commentsDetailsType {
  avatar: string,
  userName: string,
  createdAt: string,
  comment: string,
  owner: string;
  videoId: string
  id: string
  onDeleteComment: (id: string) => any
  // handleCommentCreate(): any
}

const Comment = ({ avatar, userName, createdAt, comment, owner, id, onDeleteComment }: commentsDetailsType) => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en')
  const user = useAppSelector<any>(state => state.user)
  const [deleteModal, setDeleteModal] = useState(false)


  return (
    <div className='flex gap-2 mb-2 relative'>
      {/* ======================================= profile pic*/}
      <div className='h-10 w-10 max-w-10 overflow-hidden rounded-full '>
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

      {
        user?._id === owner && (
          <>
            <div
              onClick={() => setDeleteModal(!deleteModal)}
              className='absolute top-0 right-0 cursor-pointer'>
              <Ellipsis />
            </div>
            <div 
              onClick={() => onDeleteComment(id)}
              className={`absolute bottom-[-20px] right-[20px] cursor-pointer hover:bg-gray-200 p-1 border-gray-400 bg-gray-100 ${deleteModal ? "block" : "hidden"}`}>
              Delete
            </div>
          </>
        )
      }



    </div>
  )
}

export default Comment
