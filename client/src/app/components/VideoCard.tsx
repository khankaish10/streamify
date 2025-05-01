'use client';
import React, { useLayoutEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en);

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { videoHistory } from "@/lib/features/video/videoHistory";
import { createHistoryAndViewsApi } from "@/api";

const VideoCard = ({ card }: any) => {
  const user = useAppSelector(state => state.user)
  const timeAgo = new TimeAgo('en')
  const dispatch = useAppDispatch()

  const handleClick = (id: string) => {
    if (user) {
      createHistoryAndViewsApi(id)
        .then((res) => {
          console.log("history api before dispatch: ", res.data)
          dispatch(videoHistory(card))
        })
        .catch(err => console.log(err))
    } 

  }


  console.log('video card: ', card)
  return (
    <Link className=" lg:max-h-[310px]"
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
          <div className=" absolute bottom-2 right-2 p-0.5"
            style={{ background: "rgb(0,0,0,0.5)" }}>
            <p className="text-white text-sm">{`${card?.duration.toString().split('.')[0]}.${card.duration.toString().split(".")[1].slice(0, 2)}`}</p>

          </div>
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
              <p className="mr-2">{card.views > 0 ? `${card.views} views` : `${card.views} view`}</p>
              <p>{timeAgo.format(new Date(card.createdAt))}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
