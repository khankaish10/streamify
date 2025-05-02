import React from 'react'

const WatchHistoryAnimation = () => {
  return (
    <div className='flex w-full cursor-pointer
    mb-5 relative shadow animate-pulse border'>

    <div className='flex' >
        {/* delete history - cross at top right corner */}


        {/*  */}
        <div className='h-30 w-[45%] lg:min-w-[200px] max-w-[200px] overflow-hidden 
                                rounded-lg mr-5 bg-black'>
            <div className='h-20 bg-gray-300'></div>
        </div>
        <div className='flex-col md:flex pr-1'>
            <p className='text-xl'></p>
            <div className='flex item-center'>
                <p className='mr-2 text-xs'></p>
                <p className='text-xs'></p>
            </div>
            <p className='text-gray-400 w-full
            break-words text-sm 
            overflow-hidden'></p>
        </div>
    </div>
</div>
  )
}

export default WatchHistoryAnimation
