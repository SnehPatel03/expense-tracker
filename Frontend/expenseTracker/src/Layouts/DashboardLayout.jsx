import React, {  useContext } from 'react'
import { UserContext } from '../Contexts/UserContext'
import SideMenu from './SideMenu';
import Navbar from './Navbar';

function DashboardLayout({children ,activeMenu}) {
    const { user ,updateUser } = useContext(UserContext)
    console.log(user)
  return (
<div>
    <Navbar activeMenu={activeMenu} />
     {user && (
        <div className=''>
        <div className=''>
            <SideMenu activeMenu={activeMenu} />
        </div>
        <div className='grow mx-5'>{children}</div>
    </div>
    )}
</div>
  );
}

export default DashboardLayout