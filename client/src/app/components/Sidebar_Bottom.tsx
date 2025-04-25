'use client'
import React from 'react'
import Link from 'next/link'
import { House, History, FileVideo } from 'lucide-react'
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";

const Sidebar_Bottom = () => {
    const user = useAppSelector((state) => state.user[0]);


    return (
        <div className='sticky bottom-0 left-0 sm:hidden bottom-0 z-5
    flex justify-around items-center w-full bg-white'>
            <Link href={"/"} className="">
                <div className='flex item-center my-1 
           '>
                    <div className='lg:mr-4'>
                        <House size={30} />

                    </div>

                    <p className='hidden lg:block text-base'>Home</p>
                </div>
            </Link>

            <Link href={"/history"} className="">
                <div className='flex item-center my-1
           '>
                    <div className='lg:mr-4'>
                        <History size={30} />

                    </div>

                    <p className='hidden lg:block text-base'>History</p>
                </div>
            </Link>

            <Link href={"/my-videos"} className="">
                <div className='flex item-center my-1
           '>
                    <div className='lg:mr-4'>
                        <FileVideo size={30} />

                    </div>
                    <p className='hidden lg:block text-base '>Your Videos</p>
                </div>
            </Link>

            {
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
            }


        </div>

    )
}

export default Sidebar_Bottom


