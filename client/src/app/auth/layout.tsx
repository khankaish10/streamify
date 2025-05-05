'use client'
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';

const AuthLayout = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    const user = localStorage.getItem('user')
    if(user && JSON.parse(user)?.accessToken) {
      router.replace('/')
    } else {
      setLoading(false)
    }
  },[router])

  if(loading) return null;

  return (
    <div className='flex h-screen bg-gray-100'>
      <div className='.left-video hidden md:flex flex-1 justify-center 
        items-center bg-[red] text-[#bbbbbb] h-full font-bold text-3xl
        bg-linear-to-r from-[#CB356B] to-[#93291E] '>
        Streamify
      </div>
      <div className='.right-form flex flex-col flex-1 justify-center items-center
        h-full'>
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
