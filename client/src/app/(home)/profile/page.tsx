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
        <div className='border-1 border-gray-300 w-full lg:max-w-[1200px] border-1 border-red-500'>
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
