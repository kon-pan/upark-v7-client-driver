import '../Navbar.css';
import BurgerIcon from '../common/icons/BurgerIcon';
import { useSidebar } from '../../../stores/SidebarStore';
import { useContext } from 'react';
import { ScreenSizeContext } from '../../../contexts/ScreenSizeContext';
import CloseIcon from '../common/icons/CloseIcon';

const PublicNavbar = () => {
  const { sidebarOpen, toggleSidebarOpen } = useSidebar();
  const screen = useContext(ScreenSizeContext);

  return (
    <div className='sticky top-0 z-40 flex items-center justify-between bg-neutral-800'>
      {/* Logo */}
      <div id='navbar-logo' className='cursor-pointer'>
        u<span className='font-bold text-yellow-300'>Park</span>
      </div>
      {/* Burger */}
      {(screen.isMobile || screen.isTablet) && (
        <button onClick={toggleSidebarOpen} className='p-2'>
          {sidebarOpen ? <CloseIcon /> : <BurgerIcon />}
        </button>
      )}
    </div>
  );
};

export default PublicNavbar;
