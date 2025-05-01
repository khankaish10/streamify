
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { sideBarMenuAndPath } from '@/Constants/Constants'

const Sidebar = () => {

    return (
        <>
            <div className='sm:flex flex-col lg:w-[15%] 
              px-1 z-10 bg-white max-w-[200px]
             fixed top-11 left-0 h-full hidden
             '>
                {/* font-[Poppins]'> */}

                {
                    sideBarMenuAndPath?.map((menu, index) => {
                        return (

                            menu.name !== "Profile" && (
                                <Link key={index} href={menu.path}>
                                    <div className='flex items-center p-1 py-3 hover:bg-gray-200 
                                                hover:border-gray-300 rounded-md
                                                '>
                                        <div className='lg:mr-4'>
                                            <menu.Icon size={menu.iconSize} />
                                        </div>

                                        <p className='hidden lg:block text-base'>{menu.name}</p>
                                    </div>
                                </Link>
                            )
                        )
                    })
                }

            </div>

        </>
    )
}

export default Sidebar
