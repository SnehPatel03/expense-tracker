import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi"
import SideMenu from './SideMenu'
function Navbar({ activeMenu }) {
    const [openSideMenu, setOpenSideMenu] = useState(true)
    return (
        <div className='fixed px-3 py-4 z- w-[100vw] flex gap-5 bg-white border border-b  border-gray-200/50'>
            <button
                className='block  text-black'
                onClick={() => setOpenSideMenu(!openSideMenu)}>
                {(openSideMenu ? (<HiOutlineX />) : (<HiOutlineMenu />))}
            </button>
            <h2 className='text-lg font-semibold text-black '> Expense Tracker</h2>

            {openSideMenu && (
                <div className='fixed top-[61px] -ml-4 bg-red-white '>
                        <SideMenu activeMenu={activeMenu}/>
                </div>
            )}

        </div>
    )
}

export default Navbar