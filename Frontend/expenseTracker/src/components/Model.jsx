import React from 'react'
import { IoClose } from "react-icons/io5";


function Model({
    isOpen, onClose, title, children
}) {
    if (!isOpen) return null
    return (
        <div className='fixed top-0 right-0 left-0 z-100 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-x-hidden bg-white/20 bg-opecity-10  '>
            <div className='realtive p-4 w-full max-w-2xl max-h-full'>
                <div className='relative bg-gray-200 rounded-lg shadow-sm '>
                    <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t'>
                        <h3 className='text-lg font-semibold ml-3 text-gray-900'>{title}</h3>
                        <button
                            type='button'
                            className='text-gray-600 bg-transparent hover:bg-red-700 hover:text-gray-200 rounded-lg 
                            text-sm w-8  h-8 inline-flex justify-center items-center cursor-pointer duration-500'
                            onClick={onClose}
                        > <IoClose /></button>
                    </div>
                    <div className='p-4 md:p-5  space-y-4 text-white'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Model