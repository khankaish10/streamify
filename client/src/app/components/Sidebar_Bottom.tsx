'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { House, History, FileVideo } from 'lucide-react'
import Image from "next/image";
import { sideBarMenuAndPath } from '@/Constants/Constants';
import { openModal } from "@/lib/features/globalModalslice";
import { handleLogout } from "@/api";
import { logout } from "@/lib/features/users/userSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { useRouter as userRouter } from "next/navigation";


const Sidebar_Bottom = () => {
    const user = useAppSelector((state) => state.user);
    const [profileModal, setProfileModal] = useState(false);
    const dispatch = useAppDispatch();
    const router = userRouter()


    const handleSubmit = () => {
        handleLogout()
            .then(() => {
                setProfileModal(!profileModal)
                dispatch(logout());
                router.push('/')
            })
            .catch((error) => {
                console.error("Logout error:", error);
            });
    };

    return (
        <div className='fixed bottom-0 left-0 sm:hidden bottom-0 z-5
                        flex justify-around items-center w-full bg-white
                        p-1'>

            {
                sideBarMenuAndPath?.map((menu, index) => {
                    return (
                        <div key={index}>
                            <div className='flex items-center my-1 
           '>
                                <div className='lg:mr-4 flex flex-col items-center 
                                                justify-center'>
                                    {
                                        user && menu.name === "Profile" ? (
                                            <div className='relative'>

                                                <div className={`absolute top-[-120px] left-[-100px] 
                                                            flex flex-col border border-gray-300
                                                            bg-white gap-2 rounded-lg overflow-hidden
                                                            ${profileModal ? 'block' : 'hidden'}`}>
                                                    <Link href={"/profile"}>
                                                        <div className="cursor-pointer hover:bg-gray-100 
                                                                        hover:border-b-1 p-1 " >Profile</div>
                                                    </Link>
                                                    <div className="cursor-pointer hover:bg-gray-100 
                                                                    hover:border-b-1 p-1 "
                                                        onClick={() => dispatch(openModal())} >Upload Video</div>
                                                    <div className="cursor-pointer hover:bg-gray-100 
                                                                    hover:border-b-1 p-1 rounded-b-lg"
                                                        onClick={() => handleSubmit()} >Logout</div>
                                                </div>




                                                <div className='h-8 w-8 rounded-full 
                                                            flex justify-center 
                                                            items-center overflow-hidden'
                                                    id="profileDiv"
                                                    onClick={(e) => {
                                                        if (e.currentTarget.id !== 'profileDiv') { }
                                                        setProfileModal(!profileModal)
                                                    }}>
                                                    <Image
                                                        src={user?.avatar}
                                                        width={28}
                                                        height={28}
                                                        alt="Picture of the author"
                                                        className="rounded-full object-cover h-full w-full"
                                                    />
                                                </div>
                                            </div>

                                        ) : <Link
                                            href={'/auth/login'}>
                                            <menu.Icon size={menu.iconSize} />
                                        </Link>
                                    }

                                    <p className='lg:block text-sm mt-[1]'>{menu.name}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }






            {/* 
                user ? (
                    <div className='flex justify-center items-center'>
                        <Link href={"/profile"} className="border-1 border-gray-300 h-8 w-8 rounded-full 
                                flex justify-center items-center overflow-hidden">
                            <Image
                                src={user?.avatar}
                                width={32}
                                height={32}
                                alt="Picture of the author"
                                className="rounded-full object-cover h-full w-full"
                            />
                        </Link>
                    </div>


                ) : (
                    <Link
                        href={"/profile"}
                        className="flex justify-center items-center "
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-9 md:size-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                        </svg>
                    </Link>
                )
            */}


        </div>

    )
}

export default Sidebar_Bottom


