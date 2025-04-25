
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { House, History, FileVideo } from 'lucide-react'

const Sidebar = () => {

    return (
        <>
            <div className='sm:flex flex-col  lg:w-[15%] 
             font-[Poppins] px-1 
             sticky top-11 left-0 h-full hidden'>

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
            </div>

        </>
    )
}

export default Sidebar
