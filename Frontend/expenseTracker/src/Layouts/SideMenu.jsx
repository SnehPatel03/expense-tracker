import React, { useContext } from 'react';
import { SIDE_MENU_DATA } from '../data';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Contexts/UserContext';
import { SideMenuContext } from '../Contexts/SideMenuContext';



function SideMenu({ activeMenu }) {
  const { setOpenSideMenu } = useContext(SideMenuContext);
  const { user, clearUser } = useContext(UserContext);
  const navigateTo = useNavigate();
  
  const handleLogOut = () => {
    localStorage.clear();
    clearUser();
    navigateTo("/login");
  };

  const handleClick = (route) => {
  
    if (route === "/logout") {
      handleLogOut();
    } else {
      navigateTo(route);
       setOpenSideMenu(false);
    }
  };

  return (
    <div className='w-93 sm:w-64 h-[calc(100vh-61px)] z-50 bg-white border-grey-200/50 flex flex-col items-center py-4'>
      
      {user?.profile && (
        <img
          src={`https://expense-tracker-backend-jkhf.onrender.com${user?.profile}`}
          alt="Profile"
          className="w-30 h-30 rounded-full object-cover border border-gray-300 shadow-md"
        />
      )}
      <h5 className='font-medium mt-4 capitalize text-xl'>{user?.fullname || "User"}</h5>

      <div className='w-full px-4 mt-6 '>
        {SIDE_MENU_DATA.map((item, idx) => (
          <button
            key={`menu_${idx}`}
            className={`w-full flex items-center  gap-4 text-[15px] ${activeMenu === item.label
                ? "text-white bg-purple-600"
                : "bg-white text-black"
              } py-3 px-6 rounded-lg mb-3`}
            onClick={() => handleClick(item.path)}
          >
            <item.Icon className='text-xl font-bold' />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SideMenu;
