import React, { useContext } from 'react';
import { UserContext } from '../Contexts/UserContext';
import SideMenu from './SideMenu';
import Navbar from './Navbar';

function DashboardLayout({ children, activeMenu }) {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-amber-800 ">
      <Navbar activeMenu={activeMenu} />
      {user && (
        <div className="flex min-w-[calc(100vh-55px)] sm:ml-64 ">
        
          <div className="flex-1 p-5 overflow-y-auto bg-gray-00 mr-50">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardLayout;
