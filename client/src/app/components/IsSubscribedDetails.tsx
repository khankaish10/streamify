'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { subscribeApi, unSubscribeApi, likeVideoApi } from '@/api/videoApi'
import { UserPlus, UserMinus } from 'lucide-react';
import { useAppSelector } from '@/lib/hooks';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';




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
    const [isLiked, setIsLiked] = useState(false)
    const [isSubscribed, setIsSubscribed] = useState(false)
    const user = useAppSelector<any>(state => state.user)
    const videoidparams = useParams<any>();
      const router = useRouter()


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
        if (user?._id !== "") {

            likeVideoApi(videoidparams.watch)
                .then(res => {
                    setLike(res?.data.likes)
                })
                
        } else {
            alert("Please login to like video")
        }
    }
    useEffect(() => {
        if (like?.find(id => id === user?._id)) {
            setIsLiked(true)
        } else {
            setIsLiked(false)
        }
    }, [like])
    
    const handleGetUserChannel = () => {
    router.push(`/profile/${ownerId}`)
  }

    return (
        <>
            <div className='flex items-center mr-5 cursor-pointer'
                onClick={handleGetUserChannel}>
                <div className="profilePic flex items-center 
                                            justify-center border-gray-200 rounded-full
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

                    {
                        isLiked ? (<svg xmlns="http://www.w3.org/2000/svg" 
                            width="20" height="20" viewBox="0 0 24 24" 
                            fill="black" stroke="currentColor" strokeWidth="0" 
                            strokeLinecap="round" strokeLinejoin="round" 
                            className="lucide lucide-thumbs-up-icon lucide-thumbs-up">
                                <path d="M7 10v12" />
                                <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" /></svg>)
                            : <ThumbsUp size={20} />
                    }

                    <p className='text-sm'>{like?.length}</p>
                </div>
                <div className='py-1 flex items-center px-4 cursor-pointer h-full w-full rounded-r-3xl hover:bg-gray-200'>
                    <ThumbsDown size={20} />
                </div>
            </div>



            {
                user?._id !== "" && <div className='flex flex-col items-center  sm:mx-10'>
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
