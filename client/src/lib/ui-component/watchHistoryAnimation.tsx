import React from 'react'

const WatchHistoryAnimation = () => {
    return (
        <div className='p-10 h-full flex flex-col p-5'>
            <div className='pb-10 text-xl text-bold'>Watch history</div>
            <div className='h-30 '>
                <div className='h-full w-full gap-4 
                        animate-pulse flex max-w-[400px]
                        sm:w-[90%] 
                        md:w-[70%]
                        lg:w-[50%] '>
                    {/* // Image */}
                    <div className='h-full rounded-xl bg-gray-400
                                    w-[200px]'></div>
                    <div className='flex flex-col  w-full'>
                        <div className='h-2 bg-gray-300 mb-4'></div>
                        <div className='h-2 bg-gray-300 mb-4'></div>
                        <div className='h-2 bg-gray-300'></div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default WatchHistoryAnimation
