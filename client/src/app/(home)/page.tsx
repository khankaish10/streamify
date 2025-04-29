'use client'

import { useEffect } from "react";
import VideoCard from "../components/VideoCard";
// import { cards } from "@/Constants/Constants";
import { allVideos } from "@/lib/features/video/videoSlice";
import { handleGetAllVideos } from "@/api";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";


function Home() {
  const dispatch = useAppDispatch()
  const cards = useAppSelector((state) => state.video)
  useEffect(() => {
    handleGetAllVideos()
    .then((res):any => {dispatch(allVideos(res.data))
      console.log('all videos: ', res.data)
    })
    .catch(err => console.log(err))

  }, [])

  console.log("cards: ", cards)
  return (

    <div
      className="grid grid-cols-1 
      gap-2 w-full p-1 ml-0 mt-10
      sm:grid-cols-2 sm:ml-[50px] sm:h-90
      lg:grid-cols-3 lg:ml-[200px] 
      xl:max-w-[1600px]  
      "
    >
      {cards?.map((card, index) => {
        return (
          <VideoCard key={index} card={card} />
        )
      })}
    </div>
  );
}

export default Home;
