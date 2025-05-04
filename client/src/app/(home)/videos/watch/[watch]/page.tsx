'use client'
export const dynamic = 'force-dynamic'

import React, { useLayoutEffect, useState } from 'react'
import Image from 'next/image';
import { useAppSelector } from '@/lib/hooks';
import { handleGetAVideo } from "@/api";
import { useParams } from 'next/navigation';
import IsSubscribedDetails from '@/app/components/IsSubscribedDetails';
import WatchVideoAnimation from '@/lib/ui-component/WatchVideoAnimation';

interface VideoPlayerProps {
  src: string;
  autoPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
}

function WatchVideo({
  src,
  autoPlay = false,
  controls = true,
  loop = false,
  muted = false,
  className = "",
  ...props
}: VideoPlayerProps) {
  const [videoDetails, setVideoDetails] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const videoId = useParams<any>();
  const user = useAppSelector(state => state.user)

  useLayoutEffect(() => {
    handleGetAVideo(videoId?.watch, user?._id)
      .then((res) => {
        console.log("rs:", res?.data[0])
        setVideoDetails(res?.data[0])
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  return (
    <div className="w-full h-full p-1 ml-0 mt-10 sm:pl-[50px] lg:pl-[200px] lg:[w-90vw] xl:max-w-[1600px]">
      {
        isLoading ? <WatchVideoAnimation /> : (
          <div className='lg:w-[70%] h-full'>
            <div className='w-full h-[70%] bg-black flex justify-center items-center overflow-hidden'>
              <video
                src={videoDetails?.videoFile}
                autoPlay={autoPlay}
                controls={controls}
                height={400}
                width={600}
                poster={videoDetails?.thumbnail}
                className='z-5 object-contain'
                loop={loop}
                muted={muted}
              />
            </div>
            <h1 className='my-2 font-bold'>{videoDetails?.description}</h1>

            <div className='w-full h-full flex flex-col'>
              <div className='w-full flex items-center mb-5'>
                <IsSubscribedDetails
                  avatar={videoDetails?.owner?.avatar || ""}
                  userName={videoDetails?.owner?.userName || ""}
                  subsCount={videoDetails?.subscriberCount || 0}
                  ownerId={videoDetails?.owner?._id || ""}
                  isSubsd={videoDetails?.isSubscribed || false}
                />
              </div>

              <div>
                <h1 className='text-2xl font-bold'>Comments</h1>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default WatchVideo;