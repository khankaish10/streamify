import React from 'react'
import Image from 'next/image'
import TimeAgo from 'javascript-time-ago'
import Link from 'next/link'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en);

import formatDuration from '@/util/formatDuration';

interface searchedVideoType {
    thumbnail: string;
    duration: number;
    description: string;
    owner: string;
    title: string;
    views: number;
    id: string;
    createdAt: string
}

const SearchedVideo = ({
    thumbnail, duration, description, owner, title, views, id, createdAt
}: searchedVideoType) => {
    const timeAgo = new TimeAgo('en')
    
    return (
        <div className='flex gap-3'>
            <Link 
                href={`/videos/watch/${id}`}
                className='bg-black overflow-hidden rounded-xl relative
            h-35 w-60 
            sm:h-40 sm:w-70
            md:h-40 md:w-85
            lg:h-65 lg:w-110 '>
                <Image
                    src={thumbnail}
                    height={300}
                    width={600}
                    alt='video thumbnail'
                    className='h-full w-full object-contain '
                />
                <div className='absolute bottom-2 right-2 p-1 bg-red text-white text-xs' style={{ background: 'rgb(0,0,0,0.5)' }}>
                    {formatDuration(duration)}
                </div>
            </Link>

            <div className='md:p-3'>
                <h1 className='font-bold text-sm'>{title}</h1>
                <div className='flex gap-1 text-xs my-2 text-gray-500'>
                    <p>{`${views} views`}</p>
                    <p>{timeAgo.format(new Date(createdAt))}</p>
                </div>
                <div className='flex mb-2 text-gray-500' >
                    <div className='min-h-5 min-w-5 h-5 w-5 overflow-hidden 
                                rounded-xl mr-2 flex justify-center items-center'>
                        <Image
                            src={"https://res.cloudinary.com/dnlrrhbsl/image/upload/v1746093228/wqlnwxtny5y77eqxnmti.jpg"}
                            height={40}
                            width={40}
                            alt='video thumbnail'
                            className='h-full w-full object-cover rounded-xl'
                        />
                  
                    </div>
                    <p className='text-xs'>Coders's gyan</p>
                </div>

                <p className='text-gray-500 text-xs'>{description}</p>

            </div>
        </div>
    )
}

export default SearchedVideo
