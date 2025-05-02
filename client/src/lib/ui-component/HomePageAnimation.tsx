import React from 'react'

const VideoThumbnail = () => {
    return (
        <div className=" lg:max-h-[310px]">
            <div className="font-poppins animate-pulse
      overflow-hidden p-2 flex flex-col
      justify-between cursor-pointer 
      ">

                {/* video thumbnail */}
                <div className="overflow-hidden 
        h-60 sm:h-60 relative

        ">
                    <div className="h-60 bg-gray-300 rounded-xl object-cover"></div>

                </div>

                {/* profile pic and title with username and views */}
                <div className="flex py-1 mt-2">
                    {/* profile pic */}
                    <div className="w-10 h-10 
                        bg-gray-300 rounded-full 
                          rounded-full ">

                    </div>

                    <div className="text-gray-500 ml-2 w-[100%]">
                        <div className="h-2 mb-2 bg-gray-300"></div>
                        <p className="h-2 mb-2 bg-gray-300"></p>
                        <p className="h-2 bg-gray-300"></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoThumbnail

