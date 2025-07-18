import React, { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from './SideMenu';

function Navbar({ activeMenu }) {
  const [openSideMenu, setOpenSideMenu] = useState(true || false);

  return (
    <div className="relative z-50">

      <div className="fixed px-3 py-5 w-full flex gap-5 bg-white border-b border-gray-200/50">
        <button
          className="block text-black"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? <HiOutlineX className='text-xl ml-2 hover:scale-90 hover:text-red-600' /> : <HiOutlineMenu className='text-xl ml-2 hover:scale-90 duration-200' />}
        </button>
        <h2 className="text-lg font-semibold text-black tracking-wide">ByteBudget</h2>
      </div>


      <div
        className={`
          fixed top-[61px] left-0 h-screen w-64 z-40 bg-white shadow-lg
          transition-transform duration-300 ease-in-out
          ${openSideMenu ? 'translate-x-20' : '-translate-x-full'}
        `}
      >
        <SideMenu activeMenu={activeMenu} />
      </div>
    </div>
  );
}

export default Navbar;
