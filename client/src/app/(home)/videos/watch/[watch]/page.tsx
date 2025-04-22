import React from 'react'
import { cards } from '@/Constants/Constants';
import Image from 'next/image';
import { Button } from "@/components/ui/button"


interface VideoPlayerProps {
    src: string;
    autoPlay?: boolean;
    controls?: boolean;
    loop?: boolean;
    muted?: boolean;
    className?: string;
}

const WatchVideo: React.FC<VideoPlayerProps> = ({
    src,
    autoPlay = false,
    controls = true,
    loop = false,
    muted = false,
    className = "",
    ...props
}) => {
    return (
        <div
            className="w-full h-full xl:max-w-[1300px] p-1"
        >
            <div className='lg:w-[70%] h-full'>
                {/* video container */}
                <div className='w-full h-[70%] bg-black
                flex justify-center items-center 
                overflow-hidden'>
                    <video src={cards[0].data.videoFile}
                        autoPlay={autoPlay}
                        controls={controls}
                        height={400}
                        width={600}
                        className='z-10 object-contain'
                        loop >
                    </video>
                </div>
                <h1 className='my-2 font-bold '>Car travelling in Nature</h1>

                {/* video description and comments*/}

                <div className='w-full h-full flex flex-col'>

                    {/* channel description*/}
                    <div className='w-full flex
                    items-center mb-5'>

                        <div className='flex flex-1 items-center'>

                            <div className="profilePic flex items-center 
                        justify-center border-1 border-gray-200 rounded-full
                        mr-2 w-10 h-10">
                                {/* <Image
                                src={}
                                alt="profile"
                                width={50}
                                height={50}
                                className="rounded-full"
                            /> */}
                                <p>P</p>
                            </div>

                            <div className='flex flex-col'>
                                <h3 className='text-lg font-bold'>User Name</h3>
                                <p className='text-xs'>Video description</p>
                            </div>

                        </div>


                        <Button variant="outline">Subscribe</Button>


                    </div>


                    {/* comments */}
                    <div>
                        <h1 className='text-2xl font-bold'>Comments</h1>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default WatchVideo
