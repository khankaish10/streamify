'use client'

import { useLayoutEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import { allVideos } from "@/lib/features/video/videoSlice";
import { handleGetAllVideos } from "@/api";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import HomePageAnimation from "@/lib/ui-component/HomePageAnimation";


function Home() {
  const dispatch = useAppDispatch()
  const cards = useAppSelector((state) => state.video)
  const [isLoading, setIsLoading] = useState(false)
  useLayoutEffect(() => {
    setIsLoading(true)
    handleGetAllVideos()
      .then((res): any => {
        dispatch(allVideos(res.data))
        setIsLoading(false)
        console.log('all videos: ', res.data)
      })
      .catch(err => console.log(err))

  }, [])

  return (

    <div
      className="grid grid-cols-1 
      gap-2 p-1 ml-0 mt-10 pb-16
      sm:grid-cols-2 sm:pl-[50px]
      lg:grid-cols-3 lg:pl-[200px] 
      xl:grid-cols-3 xl:max-w-[1600px] 
      "
    >

      {
        isLoading ? (
          [0, 1, 2, 4].map(index => <HomePageAnimation key={index} />)
        ) : (
          cards?.map((card, index) => {
            return (
              <VideoCard key={index} card={card} />
            )
          })
        )
      }
    </div>
  );
}

export default Home;
