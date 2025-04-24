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


    },[])

  return (
    <div>
        Profile
    </div>
  )
}

export default Profile
