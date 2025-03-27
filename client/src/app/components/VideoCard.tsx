
import React from "react";
import Image from "next/image";

const data = {
  thumbnail:
    "https://res.cloudinary.com/dnlrrhbsl/image/upload/v1741559069/uzib44uul8tgdb9n1pe2.jpg",
  videoFile:
    "https://res.cloudinary.com/dnlrrhbsl/video/upload/v1741559061/u9oyevlygtzflwlp0wqm.mp4",
  owner: "Kaish10",
  profilePic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
};

const VideoCard = () => {
  return (
    <div className="font-poppins h-60 w-100  flex-col border-1 border-red-300">
      <div className="relative overflow-hidden w-full h-full">
        <Image
          src={`${data.thumbnail}`}
          //   width={100}
          //   height={100}
          layout="fill"
          objectFit="cover"
          alt="video thumbnail"
          className="rounded-2xl"
        />
      </div>

      {/* profile pic and title with username and views */}
      <div className="flex  border-1 border-red-300">
        {/* profile pic */}
        <div className="border-1 border-black-500 rounded-[2xl]">
          p
        </div>

        <div className="text-gray-500">
          <h4>Title of the video</h4>
          <p>username</p>
          <p>2k views</p>
          <p>2 weeks ago</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
