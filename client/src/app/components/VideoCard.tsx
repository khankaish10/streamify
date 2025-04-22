import React from "react";
import Image from "next/image";
import Link from "next/link";

const VideoCard = ({ card }: any) => {
  // console.log(card);
  return (
    <Link href={`/videos/watch/${card._id}`} >
      <div className="font-poppins h-auto w-full overflow-hidden p-2 flex flex-col
    justify-between cursor-pointer border-1 border-gray-300">

        <div className="overflow-hidden w-full  h-60 sm:h-48 
        relative">
          <Image
            src={`${card.thumbnail}`}
            fill
            style={{ objectFit: "cover" }}
            alt="video"
            className="rounded-xl"

          />
        </div>
        {/* md:w-90 lg:w-70 */}
        {/* profile pic and title with username and views */}
        <div className="flex py-1 mt-2">
          {/* profile pic */}
          <div className="w-10 h-10 overflow-hidden border-1 border-black-500 rounded-full flex justify-center items-center">
            {card.owner}
          </div>

          <div className="text-gray-500 ml-2">
            <h2 className="text-black font-semibold">{card.title}</h2>
            <p className="text-sm">username</p>
            <div className="flex text-xs text-gray-400">
              <p className="mr-2">{card.views}</p>
              <p>{card.createdAt}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
