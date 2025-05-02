'use client'
import React, { use, useLayoutEffect, useState } from 'react'
import { cards } from '@/Constants/Constants';
import Image from 'next/image';
import { useAppSelector } from '@/lib/hooks';
import { handleGetAVideo } from "@/api";
import { subscribeApi } from '@/api';
import { useParams } from 'next/navigation';
import IsSubscribedDetails from '@/app/components/IsSubscribedDetails';


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
    const [videoDetails, setVideoDetails] = React.useState<any>(null)
    const [isLoading, setIsLoading] = React.useState(true)
    const videoId = useParams<any>();
    const [user, setUser] = useState(false)

    useLayoutEffect(() => {
        let loggedInUserId = null;
        const userData = localStorage.getItem('user')
        if (!userData) {
            setUser(true)
        } else {
            loggedInUserId = JSON.parse(userData)._id
            setUser(false)
        }

        handleGetAVideo(videoId?.watch, loggedInUserId)

            .then((res) => {
                console.log("rs:", res?.data[0])
                setVideoDetails(res?.data[0])
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])



    console.log("videoDetails: ", videoDetails)
    return (
        <div
            className="w-full h-full p-1 ml-0
            mt-10 
            sm:pl-[50px]
            lg:pl-[200px] lg:[w-90vw]
            xl:max-w-[1600px] "
        >
            {
                isLoading ? "Loading..." : (
                    <div className='lg:w-[70%] h-full'>
                        {/* video container */}
                        <div className='w-full h-[70%] bg-black
                                        flex justify-center items-center 
                                        overflow-hidden'>
                            <video src={videoDetails?.videoFile}
                                autoPlay={autoPlay}
                                controls={controls}
                                height={400}
                                width={600}
                                poster={videoDetails.thumbnail}
                                className='z-5 object-contain'
                                loop >
                            </video>
                        </div>
                        <h1 className='my-2 font-bold '>{videoDetails.description}</h1>

                        {/* video description and comments*/}

                        <div className='w-full h-full flex flex-col'>

                            {/* channel description*/}
                            <div className='w-full flex
                                            items-center mb-5'>

                                <IsSubscribedDetails
                                    avatar={videoDetails?.owner.avatar || ""}
                                    userName={videoDetails?.owner.userName || ""}
                                    subsCount={videoDetails?.subscriberCount || 0}
                                    ownerId={videoDetails?.owner._id || ""}
                                    isSubsd={videoDetails?.isSubscribed || false}
                                />


                            </div>


                            {/* comments */}
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

export default WatchVideo
