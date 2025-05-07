'use client'
import SearchedVideo from '@/app/components/SearchedVideo'
import React from 'react'
import { useAppSelector } from '@/lib/hooks'

const Result = () => {
    const searchedVideo = useAppSelector(state => state.search)



    return (
        <div className='w-full lg:max-w-[1200px] ml-0 mt-10
            m-0 pb-20 box-border
            sm:pl-[50px]
            lg:pl-[200px] 
            xl:max-w-[1300px]
            '>
            <div className="container flex flex-col gap-2 sm:pl-10 sm:pt-10  p-1 sm:p-0">
                {
                    searchedVideo?.length > 0 ? (
                        searchedVideo?.map((video: any) => {
                            return (
                                <SearchedVideo
                                    key={video._id}
                                    thumbnail={video?.thumbnail}
                                    duration={video?.duration}
                                    description={video?.description}
                                    owner={video?.owner}
                                    title={video?.title}
                                    views={video?.views}
                                    id={video?._id}
                                    createdAt={video?.createdAt}
                                />
                            )
                        })
                    ) : (
                        <p>no video found</p>
                    )

                }
            </div>
        </div>
    )
}

export default Result
