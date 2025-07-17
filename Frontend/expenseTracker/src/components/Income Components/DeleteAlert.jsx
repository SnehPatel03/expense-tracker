import React from 'react'

function DeleteAlert({ onDelete, conetent }) {
    return (
        <div>
            <p className='h-[30vh] text-md font-medium z-10000 text-black ml-3 capitalize'> {conetent} ? </p>
            <div className='flex justify-center font-semibold mt-6 '>
                <button
                    type='button'
                   className='flex justify-center text-red-800 items-center text-md hover:text-red-700 border-2  border-red-900/50 rounded-xl mr-2 py-2 px-3 hover:bg-red-200 duration-700'
                    onClick={onDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default DeleteAlert