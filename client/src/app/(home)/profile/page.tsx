'use client'
import { handleGetProfile } from '@/api'
import React, { useLayoutEffect } from 'react'
import { useAppDispatch } from '@/lib/hooks'

const Profile = () => {
    const dispatch = useAppDispatch()


    useLayoutEffect(() => {
        handleGetProfile()
            .then(response => {
                console.log("Profile data:", response); // Log the profile data to verify it's correct

            })
            .catch((error) => {
                console.error("Get profile error:", error);
            });


    }, [])

    return (
        <div className='w-full lg:max-w-[1200px] 
            border-1 border-red-500 m-0 h-screen
            sm:ml-[50px]
            lg:ml-[200px] 
            xl:max-w-[1300px]'>
            <div className="container flex ">
                <div className=''>
                    {/* profile pic, update password */}

                </div>

                <div>
                    {/* profile details */}

                </div>

            </div>
        </div>
    )
}

export default Profile
