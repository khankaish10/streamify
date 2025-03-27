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
    <div className="font-poppins h-auto w-80 overflow-hidden p-2 cursor-pointer">
      <div className="overflow-hidden w-full h-48 relative">
        <Image
          src={`${data.thumbnail}`}
          fill
          style={{ objectFit: "cover" }}
          alt="video thumbnail"
          className="rounded-2xl"
        />
      </div>

      {/* profile pic and title with username and views */}
      <div className="flex py-1 mt-2">
        {/* profile pic */}
        <div className="w-10 h-10 overflow-hidden border-1 border-black-500 rounded-full flex justify-center items-center">
          P
        </div>

        <div className="text-gray-500 ml-2">
          <h2 className="text-black font-semibold">Title of the video</h2>
          <p className="text-sm">username</p>
          <div className="flex text-xs text-gray-400">
            <p className="mr-2">2k views</p>
            <p>2 weeks ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
