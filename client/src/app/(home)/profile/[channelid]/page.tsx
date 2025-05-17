'use client'
import { handleGetProfile } from '@/api/userApi'
import React, { useLayoutEffect, useEffect, useState } from 'react'
import { useAppSelector } from '@/lib/hooks'
import Image from 'next/image'
import Link from 'next/link'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { useAppDispatch } from "@/lib/hooks";
import { videoHistory } from "@/lib/features/video/videoHistory";
import { createHistoryAndViewsApi} from "@/api/videoApi";
import { getUserChannelApi } from '@/api/userApi'
import ProfilePageAnimation from '@/lib/ui-component/ProfilePageAnimation'
import { useParams } from 'next/navigation'
import { getUserChannel } from '@/app/types/userRequest'
import { getProfileResponsePayload } from '@/app/types/userResponse'

TimeAgo.addLocale(en);


const Profile = () => {
    const timeAgo = new TimeAgo('en')
    const [user, setUser] = useState<any>(null)
    const [isLoading, setIsLoading] = React.useState(true)
    const reload = useAppSelector((state) => state.modal.reload)
    const dispatch = useAppDispatch()
    const params = useParams<{channelid: string}>()

    const handleClick = (video: { _id: string }) => {
        createHistoryAndViewsApi(video._id)
            .then((res) => {
                dispatch(videoHistory(video))
            })
            .catch(err => console.log(err))
    }


    useEffect(() => {
        setIsLoading(true)
        getUserChannelApi(params?.channelid)
        .then((res: any) => {
            // console.log("userChannel : ", res)
            setUser(res?.data[0])
            setIsLoading(false)
        })
        .catch((error) => {
            setIsLoading(false)
        });
    }, [reload])

    useLayoutEffect(() => {
        setIsLoading(true)

            getUserChannelApi(params?.channelid)
            .then((res: any) => {
                setUser(res?.data[0])
                setIsLoading(false)
            })
            .catch((error) => {
                setIsLoading(false)
            });

    }, [])
    return (


        isLoading ? <ProfilePageAnimation /> : (

            <div className='w-full lg:max-w-[1200px] ml-0 mt-10
            m-0 h-screen box-border
            sm:pl-[50px]
            lg:pl-[200px] 
            xl:max-w-[1300px]
            '>
                {/* font-[poppins]'> */}


                <div className="container flex flex-col sm:pl-10 sm:pt-10 h-screen  p-1 sm:p-0">
                    <div className='flex flex-col sm:flex-row items-center justify-center sm:justify-start p-3 '>
                        {/* profile pic, update password */}
                        <div className='h-35 w-35 overflow-hidden 
                                            rounded-full
                                            '>
                            <Image
                                src={user?.avatar}
                                alt="Profile Picture"
                                width={120}
                                height={100}
                                className="object-cover rounded-full h-full w-full"
                            />
                        </div>

                        <div className='flex flex-col justify-center items-center sm:justify-start sm:items-start ml-5 mt-2 sm:mt-0 '>
                            <div className='text-2xl'>{user?.fullName}</div>
                            <div className='flex flex-col sm:flex-row sm:w-auto items-center '>
                                <p className='font-semibold text-xl'>{`@${user?.userName}. `}</p>
                                <p className='text-gray-500 ml-1 mr-1'>
                                    {user?.subscriberCount > 1 ? (`${user.subscriberCount} subscribers.`) : (`${user?.subscriberCount} subscriber.`)}
                                </p>
                                <p className='text-gray-500'>
                                    {user?.allvideos?.length > 1 ? (` ${user?.allvideos?.length} videos`) : (` ${user?.allvideos?.length} video`)}
                                    { }
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Home, videos, short, playlist*/}
                    <div className='border-b-1 border-gray-200
                                        flex gap-2'>
                        <Link href={`/features`} ><div className='border-b-2 border-black p-2 cursor-pointer'>Home</div></Link>
                        <Link href={`/videos`} ><div className='hover:border-b-2 border-black p-2 cursor-pointer'>Videos</div></Link>
                        <Link href={`/playlist`} ><div className='hover:border-b-2 border-black p-2 cursor-pointer'>Playlist</div></Link>
                        <Link href={`/post`} ><div className='hover:border-b-2 border-black p-2 cursor-pointer'>Post</div></Link>
                    </div>

                    {
                        user?.allvideos?.length <= 0 && (
                            <div className='w-full h-full flex
                                                items-center justify-center'>
                                <p className='text-xl'>No videos.</p>
                            </div>
                        )
                    }

                    {/* main content - Home(All videos), shorts, playlists, post */}
                    <div className='flex gap-2 overflow-x-scroll scrollbar-none'>
                        {

                            user?.allvideos.map((video: any) => {
                                return (
                                    <Link key={video._id} href={`/videos/watch/${video._id}`} onClick={() => handleClick(video)}>
                                        <div className="font-poppins max-w-40  
                                                        overflow-hidden p-2 flex flex-col
                                                        justify-between cursor-pointer ">

                                            {/* video thumbnail */}
                                            <div className="overflow-hidden 
                                                        h-40 w-30 relative
                                                        ">
                                                <Image
                                                    src={video?.thumbnail}
                                                    height={100}
                                                    width={100}
                                                    alt="video"
                                                    className="h-full w-full rounded-xl object-cover"

                                                />
                                            </div>

                                            {/* profile pic and title with username and views */}
                                            <div className="flex mt-2 ">
                                                <div className="text-gray-500  ">
                                                    <p className="text-black text-sm">{`${video.title.length > 12 ? `${video.title.slice(0, 12)}...`: video.title}`}</p>
                                                    <div className="flex text-xs text-gray-400">
                                                        <p className="mr-1 ">{video.views > 0 ? `${video.views} views` : `${video.views} view`}</p>
                                                        <p>{timeAgo.format(new Date(video.createdAt))}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        )

    )
}

export default Profile
