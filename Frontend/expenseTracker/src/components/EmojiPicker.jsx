import React, { useState } from 'react'
import { LuImage, LuX } from 'react-icons/lu'

function EmojiPicker({ icon, onSelect }) {
    const [isOpen, setisOpen] = useState(false)
    return (
        <div className=' flex flex-col md:flex-row items-start gap-5 mb-6'>
            <div className=' flex items-center gap-4 cursor-pointer'
                onClick={() => setisOpen(true)}>
                <div className='w-12 h-12 flex items-center justify-center text-2xl bg-purple-100 text-purple-700 rounded-md'>
                    {icon ? (
                        <img src={icon} alt="Icon" className="w-12 h-12" />
                    ) : (
                        <LuImage />
                    )}
                </div>
                <p className=''>{icon ? "Change Icon" : "Pick Icon "}</p>
            </div>
            (isOpen && (
            <div className='relative'>
                <button className='w-7 h-7 items-center justify-center bg-white border-gray-600 rounded-full absolute -top-2 -left-2 z-10 cursor-pointer'
                    onClick={() => setisOpen(false)}>
                    <LuX />
                </button>

                <Emoji
                    open={isOpen}
                    onEmojiClick={(emoji) => onSelect(emoji?.imageUrl || "")}
                />


            </div>
            ))

        </div>
    )
}

export default EmojiPicker