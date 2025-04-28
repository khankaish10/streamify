'use client'
import { handleGetProfile } from '@/api'
import React, { useLayoutEffect,useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import Image from 'next/image'

const Profile = () => {
    // const [user, setUser] = React.useState<any>(null)
    const [loading, setLoading] = React.useState(true)
    const [user, setUser] = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()


    useEffect(() => {
        handleGetProfile()
            .then(response => {
                console.log("Profile data:", response); // Log the profile data to verify it's correct
                setLoading(false)
            })
            .catch((error) => {
                console.error("Get profile error:", error);
            });


    }, [])
    console.log("User data:", user); // Log the user data to verify it's correct
    return (
        <div className='w-full lg:max-w-[1200px] ml-0 mt-10
            m-0 h-screen border-1 border-red-500 box-border
            sm:ml-[50px]
            lg:ml-[200px] 
            xl:max-w-[1300px]
            font-[poppins]'>
            {
                loading ? <div className='flex justify-center items-center h-screen'>Loading...</div> : (
                    <div className="container flex border-1 border-red-500">
                        <div className='pl-10 pt-10 flex items-center'>
                            {/* profile pic, update password */}
                            <div className='h-35 w-35 overflow-hidden rounded-full border-1 border-gray-500'>
                                <Image
                                    src={user?.avatar}
                                    alt="Profile Picture"
                                    width={120}
                                    height={100}
                                    className="object-cover rounded-full h-full w-full"
                                />
                            </div>

                           <div className='flex flex-col ml-5'>
                            <div className='text-2xl'>{user?.fullName}</div>
                            <div className='flex items-center'>
                                <p className='font-semibold text-xl'>{`@${user?.userName}. `}</p>
                                <p className='text-gray-500'>7 subscribers{`. `}</p>
                                <p className='text-gray-500'>2 videos</p>
                            </div>
                           </div>

                        </div>

                        <div>
                            {/* profile details */}

                        </div>

                    </div>
                )
            }

        </div>
    )
}

export default Profile
