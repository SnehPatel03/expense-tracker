
import { createContext, useState } from 'react';

export const SideMenuContext = createContext();

export const SideMenuProvider = ({ children }) => {
  const [openSideMenu, setOpenSideMenu] = useState(true);

  return (
    <SideMenuContext.Provider value={{ openSideMenu, setOpenSideMenu }}>
      {children}
    </SideMenuContext.Provider>
  );
};
