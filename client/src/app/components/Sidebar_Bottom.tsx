'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { House, History, FileVideo, User } from 'lucide-react'
import Image from "next/image";
import { sideBarMenuAndPath } from '@/Constants/Constants';
import { openModal } from "@/lib/features/globalModalslice";
import { handleLogout } from "@/api";
import { logout } from "@/lib/features/users/userSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { useRouter as userRouter } from "next/navigation";


const Sidebar_Bottom = () => {
    const user = useAppSelector((state: any) => state.user);
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
                        // <div key={index}>
                        <div key={index} className='flex items-center my-1 
           '>
                            <Link href={`${menu.path}`} className='lg:mr-4 flex flex-col items-center 
                                                justify-center'>

                                <menu.Icon size={menu.iconSize} />
                                <p className='lg:block text-sm mt-[1]'>{menu.name}</p>
                            </Link>
                        </div>
                        // </div>
                    )
                })
            }

            {
                <div className='flex items-center my-1 
                '>
                    {
                        user ? (
                            <div className='relative flex flex-col items-center justify-center'>

                                <div className={`absolute top-[-120px] left-[-100px] 
                            flex flex-col border border-gray-300
                            bg-white gap-2 rounded-lg overflow-hidden
                            ${profileModal ? 'block' : 'hidden'}`}>
                                    <Link href={'/profile'}>
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
                                <p className='lg:block text-sm mt-[1]'>Profile</p>
                            </div>
                        ) : (
                            <Link href="/auth/login" className='lg:mr-4 flex flex-col items-center 
                                                justify-center'>

                                <User size={24} />
                                <p className='lg:block text-sm mt-[1]'>Sign in</p>
                            </Link>
                        )
                    }

                </div>
            }
        </div>

    )
}

export default Sidebar_Bottom


