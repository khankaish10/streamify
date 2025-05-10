import React from 'react'
const SearchedVideoAnimation = () => {
 
    return (
        <div className='flex gap-3 animate-pulse'>
            <div 
                className='bg-gray-300 overflow-hidden rounded-xl relative
                      h-35 w-60
                      sm:h-40 sm:w-70
                      md:h-40 md:w-85
                      lg:h-65 lg:w-110 '>
            </div>

            <div className='md:p-3'>
                <h1 className='h-2 w-20 bg-gray-200 '></h1>
                <div className='flex gap-1 my-2 bg-gray-200 h-2 w-20 '></div>
                <div className='flex mb-2 text-gray-500' >
                    <p className='h-2 w-20 bg-gray-200'></p>
                </div>

                <p className='h-2 w-20 bg-gray-200'></p>

            </div>
        </div>
    )
}

export default SearchedVideoAnimation
