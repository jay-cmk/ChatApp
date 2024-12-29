import React from 'react'

const Loading = () => {
    return (
        <div className='flex justify-center items-center '>
            <div className="flex w-52 flex-col gap-4   justify-items-center">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>
        </div>
    )
}

export default Loading