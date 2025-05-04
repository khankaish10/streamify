'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { subscribeApi, unSubscribeApi } from '@/api/index'
import { UserPlus, UserMinus } from 'lucide-react';
import { useAppSelector } from '@/lib/hooks';



interface IsSubscribedDetailsProps {
    avatar: string;
    userName: string;
    subsCount: number;
    ownerId: string;
    isSubsd: boolean;
}

const IsSubscribedDetails: React.FC<IsSubscribedDetailsProps> = (
    { avatar, userName, subsCount, ownerId, isSubsd }
) => {

    const [subscriberCount, setSubscriberCount] = useState(0);
    const [isSubscribed, setIsSubscribed] = useState(false)
    const user = useAppSelector(state => state.user)


    useEffect(() => {
        setSubscriberCount(subsCount)
        setIsSubscribed(isSubsd)
    }, [])

    const handleSubsCount = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isSubscribed) {
            unSubscribeApi(ownerId)
                .then(res => {
                    console.log("unsubs: ", res?.data)
                    setSubscriberCount((prevCount) => prevCount - 1);
                    setIsSubscribed(prev => !prev)
                })

        } else {
            subscribeApi(ownerId)
                .then((res) => {
                    console.log("subs: ", res?.data)
                    setSubscriberCount((prevCount) => prevCount + 1);
                    setIsSubscribed(prev => !prev)
                })
                .catch(err => console.log("error subscribing", err))

        }
    }


    return (
        <>
            <div className='flex flex-1 items-center'>
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

            {
                user && <div className='flex flex-col items-center'>
                    <button className='bg-black text-white px-4 py-2 rounded-full
                                cursor-pointer hover:bg-black-300
                                hover:opacity-70 text-sm'
                        onClick={(e) => handleSubsCount(e)

                        }>
                        {isSubscribed ? (
                            <div className='flex gap-2 justify-center items-center'>
                                <UserMinus />
                                Unsubscribe
                            </div>

                        ) : (
                            <div className='flex gap-2'>
                                <UserPlus />
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
