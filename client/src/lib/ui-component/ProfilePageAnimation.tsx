
import React from 'react'
import Link from 'next/link'


const ProfilePageAnimation = () => {
    return (
        <div className='w-full lg:max-w-[1200px] ml-0 mt-10
        m-0 h-screen box-border
        sm:pl-[50px]
        lg:pl-[200px] 
        xl:max-w-[1300px]
        '>
            <div className="container flex flex-col sm:pl-10 sm:pt-10 h-screen  p-1 sm:p-0">
                <div className='flex flex-col sm:flex-row items-center justify-center sm:justify-start p-3'>
                    {/* profile pic, update password */}
                    <div className='h-35 w-35 overflow-hidden 
                                        rounded-full animate-pulse
                                        '>
                        <div className='h-100 w-120 bg-gray-300'></div>
                    </div>

                    <div className='flex flex-col justify-center items-center sm:justify-start sm:items-start ml-5 mt-2 sm:mt-0 w-[120px] animate-pulse '>
                        <div className='text-2xl h-2 bg-gray-300 w-full'></div>
                        <div className='text-2xl h-2 my-1 bg-gray-300 w-full'></div>
                        <div className='text-2xl h-2 bg-gray-300 w-full'></div>
                    </div>

                </div>

                {/* Home, videos, short, playlist*/}
                <div className='border-b-1 border-gray-200
                                    flex gap-2'>
                    <Link href={`/features`} ><div className='border-b-2 border-black p-2 cursor-pointer'>Home</div></Link>
                    <Link href={`/videos`} ><div className='hover:border-b-2 border-black p-2 cursor-pointer'>Videos</div></Link>
                    <Link href={`/playlist`} ><div className='hover:border-b-2 border-black p-2 cursor-pointer'>Playlist</div></Link>
                    <Link href={`/post`} ><div className='hover:border-b-2 border-black p-2 cursor-pointer'>Post</div></Link>
                </div>

                {/* main content - Home(All videos), shorts, playlists, post */}
                <div className='flex gap-2 overflow-x-scroll scrollbar-none'>
                    {

                        [0, 1, 2, 3].map((video: any) => {
                            return (
                                <div key={video} className='animate-pulse' >
                                    <div className="font-poppins 
                                                    overflow-hidden p-2 flex flex-col
                                                    justify-between cursor-pointer ">

                                        {/* video thumbnail */}
                                        <div className="overflow-hidden 
                                                    h-40 w-30 relative rounded-2xl
                                                    ">
                                            <div className='h-full w-full bg-gray-300'></div>
                                        </div>

                                        {/* profile pic and title with username and views */}
                                        <div className="flex mt-2 ">
                                            <div className="text-gray-500 w-[90%] mx-auto ">
                                                <p className="text-black h-2 bg-gray-300 mb-1"></p>
                                                <div className="bg-gray-300 h-2 "></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>



        </div>
    )
}

export default ProfilePageAnimation
