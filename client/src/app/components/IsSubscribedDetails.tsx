'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { subscribeApi, unSubscribeApi, likeVideoApi } from '@/api/index'
import { UserPlus, UserMinus } from 'lucide-react';
import { useAppSelector } from '@/lib/hooks';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useParams } from 'next/navigation';




interface IsSubscribedDetailsProps {
    avatar: string;
    userName: string;
    subsCount: number;
    ownerId: string;
    isSubsd: boolean;
    likeCount: string[];
}

const IsSubscribedDetails: React.FC<IsSubscribedDetailsProps> = (
    { avatar, userName, subsCount, ownerId, isSubsd, likeCount }
) => {

    const [subscriberCount, setSubscriberCount] = useState(0);
    const [like, setLike] = useState<string[]>([])
    const [isSubscribed, setIsSubscribed] = useState(false)
    const user = useAppSelector(state => state.user)
    const videoidparams = useParams<any>();


    useEffect(() => {
        setSubscriberCount(subsCount)
        setIsSubscribed(isSubsd)
        setLike(likeCount)
    }, [])

    const handleSubsCount = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isSubscribed) {
            unSubscribeApi(ownerId)
                .then(res => {
                    setSubscriberCount((prevCount) => prevCount - 1);
                    setIsSubscribed(prev => !prev)
                })

        } else {
            subscribeApi(ownerId)
                .then((res) => {
                    setSubscriberCount((prevCount) => prevCount + 1);
                    setIsSubscribed(prev => !prev)
                })
                .catch(err => console.log("error subscribing", err))

        }
    }

    const handleLikes = () => {
        likeVideoApi(videoidparams.watch)
            .then(res => {
                setLike(res?.data.likes)
            })
    }

    return (
        <>
            <div className='flex items-center mr-5 '>
                <div className="profilePic flex items-center 
                                            justify-center border-1 border-gray-200 rounded-full
                                            mr-2 w-10 h-10 overflow-hidden">
                    <Image
                        src={avatar}
                        alt="profile"
                        width={50}
                        height={50}
                        className="rounded-full object-cover h-full w-full"
                    />
                </div>

                <div className='flex flex-col'>
                    <h3 className='text-lg font-bold'>{userName}</h3>
                    <p className='text-xs'> {subscriberCount} subscribers
                        {/* {subscriberCount > 0 ? `${subscriberCount} Subscribers` : ""} */}
                    </p>
                </div>

            </div>

            <div className='flex justify-center items-center rounded-3xl  border-1 border-gray-200 bg-gray-100 
                    m-2 sm:m-0 overflow-hidden'>
                <div className={`flex items-center gap-2 border-r-1 cursor-pointer h-full w-full 
                            rounded-l-3xl hover:bg-gray-200 py-1 px-4 `}
                    onClick={handleLikes}>
                    <ThumbsUp size={20} />
                    <p className='text-sm'>{like?.length}</p>
                </div>
                <div className='py-1 flex items-center px-4 cursor-pointer h-full w-full rounded-r-3xl hover:bg-gray-200'>
                    <ThumbsDown size={20} />
                </div>
            </div>



            {
                user && <div className='flex flex-col items-center  sm:mx-10'>
                    <button className='bg-black text-white px-4 py-2 rounded-full
                                cursor-pointer hover:bg-black-300
                                hover:opacity-70 text-sm'
                        onClick={(e) => handleSubsCount(e)

                        }>
                        {isSubscribed ? (
                            <div className='flex gap-1 justify-center items-center'>
                                <UserMinus size={20} />
                                Unsubscribe
                            </div>

                        ) : (
                            <div className='flex gap-1 text-sm'>
                                <UserPlus size={20} />
                                Subscribe
                            </div>

                        )}
                    </button>
                </div>
            }

            





        </>

    )
}

export default IsSubscribedDetails
