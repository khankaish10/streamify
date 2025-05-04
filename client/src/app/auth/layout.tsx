import React from 'react'

const AuthLayout = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {
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
