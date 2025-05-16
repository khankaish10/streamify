'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import formatDuration from "@/util/formatDuration";


import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { videoHistory } from "@/lib/features/video/videoHistory";
import { createHistoryAndViewsApi} from "@/api/videoApi";
import { getUserChannelApi } from "@/api/userApi";



const VideoCard = ({ card }: any) => {
  TimeAgo.addLocale(en);
  const user = useAppSelector(state => state.user)
  const timeAgo = new TimeAgo('en')
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleClick = (id: string) => {
    if (user) {
      createHistoryAndViewsApi(id)
        .then((res) => {
          dispatch(videoHistory(card))
        })
        .catch(err => console.log(err))
    }

  }


  const handleGetUserChannel = () => {
    router.push(`/profile/${card?.owner._id}`)
  }
  return (
    <div className=" lg:max-h-[310px]"
    >
      <div className="font-poppins 
      overflow-hidden p-2 flex flex-col
      justify-between cursor-pointer 
      ">

        {/* video thumbnail */}
        <Link className="overflow-hidden 
        h-60 sm:h-60 relative "
          href={`/videos/watch/${card._id}`}
          onClick={() => handleClick(card._id)}>
          <Image
            src={card?.thumbnail}
            fill
            alt="video"
            className="rounded-xl object-cover"

          />
          <div className=" absolute bottom-2 right-2 p-0.5"
            style={{ background: "rgb(0,0,0,0.5)" }}>
            <p className="text-white text-sm">{formatDuration(card?.duration)}</p>
            {/* <p className="text-white text-sm">{`${card?.duration.toString().split('.')[0]}`}</p> */}

          </div>
        </Link>

        {/* profile pic and title with username and views */}
        <div className="flex py-1 mt-2 ">
          {/* profile pic */}
          <div className="w-11 h-11 overflow-hidden 
                          cursor-pointer
                          rounded-full flex justify-center 
                          items-center"
            onClick={handleGetUserChannel}>
            <Image src={card.owner.avatar}
              height={50}
              width={50}
              alt='profile pic'
              className="h-full w-full rounded-full object-cover"
            />
          </div>

          <div className="text-gray-500 ml-2 ">
            <h2 className="text-black font-semibold">{card.title}</h2>
            <p className="text-xs">{card?.owner?.userName}</p>
            <div className="flex text-xs text-gray-400">
              <p className="mr-2">{card.views > 0 ? `${card.views} views` : `${card.views} view`}</p>
              <p>{timeAgo.format(new Date(card.createdAt))}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
