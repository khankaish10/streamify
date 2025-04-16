// 'use client'
import Link from 'next/link'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { House, History, FileVideo } from 'lucide-react'

const Sidebar = () => {
    // const [sidebarHeight, setSidebarHeight] = React.useState(0)


    // useEffect(() => {
    //     const navbar = document.querySelector('.nav') as HTMLElement
    //     setSidebarHeight(navbar ? navbar.offsetHeight : 0)
    // }, [])

    return (
        <div className=' flex flex-col w-[10%] lg:w-[15%] 
             font-[Poppins] px-1 border-1 border-gray-300 '>
            {/* style={{ height: `calc(100vh - ${sidebarHeight}px)` }}> */}

            <Link href={"/"} className="">
                <div className='flex item-center p-1 my-3 hover:bg-gray-100 hover:border-1 hover:border-gray-300
                    '>
                    <div className=' mr-4'>
                        <House size={30} />

                    </div>

                    <p className='hidden lg:block text-base'>Home</p>
                </div>
            </Link>

            <Link href={"/"} className="">
                <div className='flex item-center p-1 my-3 hover:bg-gray-100 hover:border-1 hover:border-gray-300
                    '>
                    <div className='mr-4'>
                        <History size={30} />

                    </div>

                    <p className='hidden lg:block text-base'>History</p>
                </div>
            </Link>

            <Link href={"/"} className="">
                <div className='flex item-center p-1 my-3 hover:bg-gray-100 hover:border-1 hover:border-gray-300
                    '>
                    <div className=' mr-4'>
                        <FileVideo size={30} />

                    </div>
                    <p className='hidden lg:block text-base '>Your Videos</p>
                </div>
            </Link>



        </div>
    )
}

export default Sidebar
