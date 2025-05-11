'use client'

import React, { useLayoutEffect, useState } from 'react'
import Image from 'next/image'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { clearHistory, deleteHistory, videoHistory } from '@/lib/features/video/videoHistory'
import Link from 'next/link'
import { deleteHistoryApi, getAllHistoryApi, clearWatchHistoryApi } from '@/api/videoApi'
import { User, Trash2 } from "lucide-react";
import WatchHistoryAnimation from '@/lib/ui-component/watchHistoryAnimation'



const Page = () => {
    const historyDetails = useAppSelector(state => state.history)
    const user = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState(true)


    const handleDeleteHistory = (id: string, index: number) => {
        deleteHistoryApi(id)
            .then(res => {

                dispatch(deleteHistory({ videoId: id, index }))
            })
            .catch(error => console.log("error deleting", error))
    }

    const handleClearWatchHistory = () => {
        clearWatchHistoryApi()
            .then((res) => {
                dispatch(clearHistory())
            })
    }


    useLayoutEffect(() => {
        setIsLoading(true)
        getAllHistoryApi()
            .then((res) => {
                dispatch(videoHistory(res?.data))
                setIsLoading(false)
            }
            )
            .catch(err => console.log("Error getting history: ", err))
    }, [])




    return (

        <div className='w-full lg:max-w-[1200px] ml-0 mt-10
            m-0 h-screen box-border 
            sm:pl-[50px] 
            lg:pl-[200px] 
            xl:max-w-[1300px]
            '>
            {((user._id !== "") && isLoading) ? <WatchHistoryAnimation /> : (
                <div className='flex flex-col p-5 pb-16'>
                    <p className='text-3xl font-bold my-5'>Watch history</p>
                    <div className='flex flex-col lg:flex-row-reverse w-full'>
                        <div className='mb-5 lg:mb-0  w-[50%] md:w-[30%] lg:w-[30%]'>
                            <div className=' flex gap-2 p-2 border place-items-center cursor-pointer' onClick={handleClearWatchHistory}>
                                <Trash2 size={24} />
                                <p className='text-sm lg:text-xs'>Clear all watch history</p>
                            </div>
                        </div>
                        <div className={`flex flex-col videolist 
                                w-full   
                                    ${(user._id !== "") ?
                                'justify-center items-center' :
                                ""
                            } `}>

                            {
                                user._id !== "" ? (!historyDetails.length ? (
                                    <div> No watch history </div>
                                ) : (

                                    historyDetails?.map((history, index) => {

                                        return (

                                            <div key={index} className='flex sm:max-w-130 cursor-pointer
                                        mb-5 relative '>

                                                <button className='absolute top-0 right-[-10px] text-2xl 
                                                text-gray-400 cursor-pointer z-10
                                                rounded-full hover:bg-gray-200 h-8 w-8'
                                                    onClick={() => handleDeleteHistory(history?.videoId, index)}>
                                                    X</button>

                                                <Link href={`/videos/watch/${history.videoId}`} className='flex w-full' >
                                                    {/* delete history - cross at top right corner */}


                                                    {/*  */}
                                                    <div className='h-30 w-[45%] lg:min-w-[200px] max-w-[200px] overflow-hidden 
                                                                    rounded-lg mr-5 bg-black'>
                                                        <Image
                                                            src={history?.thumbnail}
                                                            height={40}
                                                            width={80}
                                                            alt='video thumbnail'
                                                            className='object-contain h-full w-full'
                                                        />
                                                    </div>
                                                    <div className='flex-col md:flex pr-1'>
                                                        <p className='text-lg mr-5'>{history.title}</p>
                                                        <div className='flex item-center'>
                                                            <p className='mr-2 text-xs'>{history.owner.userName}</p>
                                                            <p className='text-xs'>{history.views > 0 ? `${history.views} views` : `${history.views} view`} </p>
                                                        </div>
                                                        <p className='text-gray-400 w-full
                                                break-words text-sm 
                                                overflow-hidden'>{history.description.length > 45 ? `${history?.description?.slice(0, 35)}...` : history.description}</p>
                                                    </div>
                                                </Link>
                                            </div>

                                        )
                                    })
                                )) : (
                                    <Link
                                        href={"/auth/login"}
                                        className="flex justify-center items-center 
                                        p-1 md:border-1 md:border-gray-300 
                                        rounded-[50px] max-w-60"
                                    >
                                        <User size={20} />
                                        <p className="text-[16px] hidden lg:block">Sign in</p>
                                    </Link>
                                )
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Page
