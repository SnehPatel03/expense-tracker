import React from 'react'

function DeleteAlert({ onDelete, conetent }) {
    return (
        <div>
            <p className='text-md font-medium z-10000 text-gray-900 ml-3'> {conetent} </p>
            <div className='flex justify-end mt-6 '>
                <button
                    type='button'
                   className='flex justify-center text-gray-800 items-center text-md hover:text-red-700  border-gray-900/50 rounded-xl mr-2 py-2 px-3 hover:bg-red-200 duration-700'
                    onClick={onDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default DeleteAlert