'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en);

import { useAppDispatch } from "@/lib/hooks";

const VideoCard = ({ card }: any) => {
  const timeAgo = new TimeAgo('en')
  const dispatch = useAppDispatch()

  const handleClick = (id: string) => {

  }

  console.log('video card: ', card)
  return (
    <Link
      href={`/videos/watch/${card._id}`}
      onClick={() => handleClick(card._id)} >
      <div className="font-poppins 
      overflow-hidden p-2 flex flex-col
      justify-between cursor-pointer 
      ">

        {/* video thumbnail */}
        <div className="overflow-hidden 
        h-60 sm:h-60 relative
        ">
          <Image
            src={card?.thumbnail}
            fill
            alt="video"
            className="rounded-xl object-cover"

          />
        </div>

        {/* profile pic and title with username and views */}
        <div className="flex py-1 mt-2">
          {/* profile pic */}
          <div className="w-10 h-10 overflow-hidden 
                       
                          rounded-full flex justify-center 
                          items-center">
            <Image src={card.owner.avatar}
              height={32}
              width={32}
              alt='profile pic'
              className="h-full w-full rounded-full object-cover"
            />
          </div>

          <div className="text-gray-500 ml-2">
            <h2 className="text-black font-semibold">{card.title}</h2>
            <p className="text-sm">{card.owner.username}</p>
            <div className="flex text-xs text-gray-400">
              <p className="mr-2">{card.views}</p>
              <p>{timeAgo.format(new Date(card.createdAt))}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
