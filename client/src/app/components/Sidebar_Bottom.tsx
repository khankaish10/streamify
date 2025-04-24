import React from 'react'
import Link from 'next/link'
import { House, History, FileVideo } from 'lucide-react'


const Sidebar_Bottom = () => {
  return (
    <div className='sm:hidden sticky bottom-0 z-5
    flex justify-around items-center w-full bg-white'>
       <Link href={"/"} className="">
           <div className='flex item-center p-1 my-3 hover:bg-gray-100 hover:border-1 hover:border-gray-300
           '>
               <div className='lg:mr-4'>
                   <House size={30} />

               </div>

               <p className='hidden lg:block text-base'>Home</p>
           </div>
       </Link>

       <Link href={"/"} className="">
           <div className='flex item-center p-1 my-3 hover:bg-gray-100 hover:border-1 hover:border-gray-300
           '>
               <div className='lg:mr-4'>
                   <History size={30} />

               </div>

               <p className='hidden lg:block text-base'>History</p>
           </div>
       </Link>

       <Link href={"/"} className="">
           <div className='flex item-center p-1 my-3 hover:bg-gray-100 hover:border-1 hover:border-gray-300
           '>
               <div className='lg:mr-4'>
                   <FileVideo size={30} />

               </div>
               <p className='hidden lg:block text-base '>Your Videos</p>
           </div>
       </Link>

       <Link
           href={"/profile"}
           className="flex justify-center items-center p-1 md:border-1 md:border-gray-300 rounded-[50px]"
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
   </div>

  )
}

export default Sidebar_Bottom
