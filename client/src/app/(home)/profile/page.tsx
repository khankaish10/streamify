'use client'
import { handleGetProfile, userProfileEdit } from '@/api/userApi'
import React, { useLayoutEffect, useEffect, useState, useRef } from 'react'
import { useAppSelector } from '@/lib/hooks'
import Image from 'next/image'
import Link from 'next/link'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { useAppDispatch } from "@/lib/hooks";
import { videoHistory } from "@/lib/features/video/videoHistory";
import { createHistoryAndViewsApi } from "@/api/videoApi";
import ProfilePageAnimation from '@/lib/ui-component/ProfilePageAnimation'
import ProtectedRoutes from '@/app/components/ProtectedRoutes'
import { Pencil, CircleX, Ellipsis, Trash2, Trash } from 'lucide-react';

import { ProfileVideosAndSubsCount, updateProfile } from '@/lib/features/users/userSlice'
TimeAgo.addLocale(en);


const Profile = () => {
    const timeAgo = new TimeAgo('en')
    const profileUser = useAppSelector<any>((state) => state.user)
    const [isLoading, setIsLoading] = React.useState(true)
    const [updatingProfile, setUpdatingProfile] = useState(false)
    const reload = useAppSelector((state) => state.modal.reload)
    const dispatch = useAppDispatch()
    const avatarRef = useRef<HTMLInputElement>(null)
    const [avatar, setAvatar] = useState<File | null>()
    const [fullName, setFullName] = useState<string>("")
    const [isFullNameEdit, setIsFullNameEdit] = useState<boolean>(false)
    const [isUpdateButton, setIsUpdateButton] = useState<boolean>(false)
    const [isDelete, setIsDelete] = useState<boolean>(false)

    const handleClick = (video: { _id: string }) => {
        createHistoryAndViewsApi(video._id)
            .then((res) => {
                dispatch(videoHistory(video))
            })
            .catch(err => console.log(err))
    }


    useEffect(() => {
        setIsLoading(true)
        handleGetProfile()
            .then((response: any) => {
                dispatch(ProfileVideosAndSubsCount({
                    allvideos: response?.data[0]?.allvideos,
                    subscriberCount: response.data[0]?.subscriberCount
                }))
                setIsLoading(false)
            })
            .catch((error) => {
                console.error("Get profile error:", error);
            });
    }, [reload])

    useEffect(() => {
        setIsLoading(true)
        handleGetProfile()
            .then((response: any) => {
                dispatch(ProfileVideosAndSubsCount({
                    allvideos: response?.data[0]?.allvideos,
                    subscriberCount: response.data[0]?.subscriberCount
                }))
                setIsLoading(false)
            })
            .catch((error) => {
                setIsLoading(false)
            });

    }, [])

    useEffect(() => {
        if (avatar || fullName) {
            setIsUpdateButton(true)
        } else {
            setIsUpdateButton(false)
        }
    }, [avatar, fullName])

    const handleEdit = () => {
        setUpdatingProfile(true)
        const form = new FormData();
        if (avatar) {
            form.append("avatar", avatar)
        }
        if (fullName) {
            form.append("fullName", fullName)
        }
        userProfileEdit(form)
            .then((res: any) => {
                setAvatar(null)
                setFullName("")
                setIsFullNameEdit(false)
                setIsUpdateButton(false)
                setUpdatingProfile(false)
                dispatch(updateProfile(res.data))
            })
            .catch(err => console.log("edit error: ", err))
            .finally(() => setUpdatingProfile(false))
    }
    return (
        <ProtectedRoutes>
            {
                isLoading ? <ProfilePageAnimation /> : (

                    <div className='w-full lg:max-w-[1200px] ml-0 mt-10
            m-0 h-screen box-border
            sm:pl-[50px]
            lg:pl-[200px] 
            xl:max-w-[1300px]
            '>
                        {/* font-[poppins]'> */}


                        <div className="container flex flex-col sm:pl-10 sm:pt-10 h-screen  p-1 sm:p-0 ">
                            <div className='flex flex-col sm:flex-row items-center justify-center sm:justify-start p-3 '>

                                {/* profile pic, update password */}
                                <div className='h-35 w-35 
                                            rounded-full relative border
                                            '>

                                    {
                                        avatar ? (
                                            <div
                                                onClick={() => setAvatar(null)}
                                                className=' absolute top-0 right-0 cursor-pointer'
                                            >
                                                <CircleX size={18} />
                                            </div>
                                        ) : (
                                            <div
                                                onClick={() => {
                                                    avatarRef?.current?.click()
                                                }}
                                                className=' absolute top-0 right-0 cursor-pointer'
                                            >
                                                <Pencil size={18} />
                                            </div>
                                        )
                                    }

                                    <input
                                        type="file"
                                        id='avatar'
                                        className='hidden'
                                        ref={avatarRef}
                                        onChange={(e) => {
                                            if (e.target?.files?.[0]) {
                                                setAvatar(e.target.files[0])
                                            }
                                        }}
                                    />
                                    <Image
                                        src={profileUser?.avatar}
                                        alt="Profile Picture"
                                        width={120}
                                        height={100}
                                        className="object-cover rounded-full h-full w-full"
                                    />
                                </div>

                                <div className='flex flex-col justify-center items-center 
                                        sm:justify-start sm:items-start ml-5 mt-2 sm:mt-0 max-w-[80%]'>
                                    <div className='text-2xl relative '>

                                        {
                                            isFullNameEdit ? (
                                                <div>
                                                    <input
                                                        type='text'
                                                        id='fullName'
                                                        value={fullName}
                                                        onChange={(e) => setFullName(e.target.value)}
                                                        className='outline-none border w-full'
                                                        placeholder={`${profileUser?.fullName}`}
                                                    />
                                                </div>

                                            ) : (
                                                profileUser?.fullName
                                            )
                                        }

                                        {
                                            isFullNameEdit ? (
                                                <div
                                                    onClick={() => {
                                                        setFullName("")
                                                        setIsFullNameEdit(!isFullNameEdit)
                                                    }}
                                                    className=' absolute top-[-15px] right-[-15px] cursor-pointer' >
                                                    <CircleX size={18} />
                                                </div>
                                            ) : (
                                                <div
                                                    onClick={() => setIsFullNameEdit(!isFullNameEdit)}
                                                    className=' absolute top-[-15px] right-[-15px] cursor-pointer' >
                                                    <Pencil size={18} />
                                                </div>
                                            )
                                        }




                                    </div>
                                    <div className='flex flex-col sm:flex-row sm:w-auto items-center mb-2 '>
                                        <p className='font-semibold text-xl'>{`@${profileUser?.userName}. `}</p>
                                        <p className='text-gray-500 ml-1 mr-1'>
                                            {profileUser?.subscriberCount > 1 ? (`${profileUser.subscriberCount} subscribers.`) : (`${profileUser?.subscriberCount} subscriber.`)}
                                        </p>
                                        <p className='text-gray-500'>
                                            {profileUser?.allvideos?.length > 1 ? (` ${profileUser?.allvideos?.length} videos`) : (` ${profileUser?.allvideos?.length} video`)}
                                            { }
                                        </p>
                                    </div>


                                    <button
                                        onClick={() => handleEdit()}
                                        disabled={updatingProfile}
                                        className={`border min-h-10 h-10 ${isUpdateButton ? "block" : "invisible"} p-1 bg-linear-to-r from-[#CB356B] to-[#93291E] 
                                                        rounded-lg text-white w-30`}>
                                        {
                                            updatingProfile ? (
                                                <div role="status">
                                                    <svg aria-hidden="true" className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-[#93291E]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                    </svg>
                                                </div>
                                            ) : "Update"
                                        }
                                    </button>

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
                                profileUser?.allvideos?.length <= 0 && (
                                    <div className='w-full h-full flex
                                                items-center justify-center'>
                                        <p className='text-xl'>No videos.</p>
                                    </div>
                                )
                            }

                            {/* main content - Home(All videos), shorts, playlists, post */}
                            <div className='flex gap-2 mt-3 overflow-x-scroll scrollbar-none relative'>
                                <div className={`absolute top-[0px] right-0 
                                                cursor-pointer rounded-full 
                                                hover:bg-gray-200 ${isDelete ? 'bg-gray-200' : 'bg-white'} p-2`}
                                    onClick={() => setIsDelete(!isDelete)} >
                                    <Trash2 />
                                </div>
                                {

                                    profileUser?.allvideos?.map((video: any) => {
                                        return (
                                            <Link key={video._id} href={`/videos/watch/${video._id}`} onClick={() => handleClick(video)}>
                                                <div className="font-poppins max-w-[180px] min-w-[170px]
                                                        overflow-hidden p-2 flex flex-col items-center
                                                        justify-between cursor-pointer">


                                                    {/* video thumbnail */}
                                                    <div className="overflow-hidden 
                                                        h-40 w-30 relative bg-black">

                                                        <Image
                                                            src={video?.thumbnail}
                                                            height={120}
                                                            width={120}
                                                            alt="video"
                                                            className="h-full w-full rounded-xl object-contain"

                                                        />
                                                    </div>

                                                    {/* profile pic and title with username and views */}
                                                    {
                                                        isDelete ? (
                                                            <div className='py-1 px-2 bg-red-300
                                                                        mt-2 text-white flex gap-2
                                                                        rounded-xl cursor-pointer
                                                                        items-center hover:bg-red-400'>
                                                                <Trash size={20} />
                                                                <p>Delete</p></div>
                                                        ) : (
                                                            <div className="flex mt-2">
                                                                <div className="text-gray-500 ml-2">
                                                                    <p className="text-black">{`${video.title.length > 12 ? video.title.slice(0, 12) : video.title}...`}</p>
                                                                    <div className="flex text-xs text-gray-400">
                                                                        <p className="mr-2">{video.views > 0 ? `${video.views} views` : `${video.views} view`}</p>
                                                                        <p className='break-normal'>{timeAgo.format(new Date(video.createdAt))}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </Link>
                                        )
                                    })
                                }
                            </div>

                        </div >
                    </div >
                )}
            {/* // <div>Login </div> */}
        </ProtectedRoutes >
    )
}

export default Profile
