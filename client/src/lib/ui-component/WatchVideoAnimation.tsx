import React from 'react'

const WatchVideoAnimation = () => {
    return (
        <div className='lg:w-[70%] h-full'>
            {/* video container */}
            <div className='w-full h-[70%] bg-gray-300 animate-pulse
                                        flex justify-center items-center 
                                        overflow-hidden'>
                <div className='h-full w-full'></div>
            </div>
            <div className='my-2 bg-gray-300 h-3 animate-pulse'></div>

            {/* video description and comments*/}
            <div className='w-full h-full flex flex-col'>

                {/* channel description*/}
                <div className='w-full flex items-center mb-5'>

                    <div className='flex flex-1 items-center animate-pulse '>

                        {/* avatar */}
                        <div className="profilePic flex items-center 
                                        justify-center border-1 border-gray-200 
                                        rounded-full mr-2 w-10 h-10 overflow-hidden">
                            <div className='bg-gray-300 h-10 w-10
                                rounded-full'></div>
                        </div>

                        {/* title , subscriber count */}
                        <div className='flex flex-col gap-2 animate-pulse w-[50%]'>
                            <div className='h-2  bg-gray-300'></div>
                            <p className='h-1 w-20 bg-gray-300'></p>
                        </div>

                    </div>

                    {/* subscriber button */}
                    <div className='h-full w-40 rounded-3xl bg-gray-300 animate-pulse'>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default WatchVideoAnimation
