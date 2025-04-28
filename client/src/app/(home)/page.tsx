'use client'

import { useLayoutEffect } from "react";
import VideoCard from "../components/VideoCard";
// import { cards } from "@/Constants/Constants";
import { allVideos } from "@/lib/features/video/videoSlice";
import { handleGetAllVideos } from "@/api";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";


function Home() {
  const dispatch = useAppDispatch()
  const cards = useAppSelector((state) => state.video)
  console.log(cards)
  useLayoutEffect(() => {
    handleGetAllVideos().then(res =>  dispatch(allVideos(res.data))).catch(err => console.log(err))
  }, [])

  return (

    <div
      className="grid gap-2 w-full p-1 ml-0 mt-10
      sm:grid-cols-2 sm:ml-[50px]
      lg:grid-cols-3 lg:ml-[200px] 
      xl:max-w-[1600px]  
      "
    >
      {cards?.map((card) => {
        return <p></p>
        // <VideoCard key={card.data._id} card={card.data} />;
      })}
    </div>
  );
}

export default Home;
