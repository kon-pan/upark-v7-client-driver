import './Sidebar.css';
import { classNames } from '../../utils/classnames';
import { useSidebar } from '../../stores/SidebarStore';
import { Link } from 'react-router-dom';
import useAuth from '../../contexts/AuthContext';
import HomeIcon from './common/icons/HomeIcon';
import CarIcon from './common/icons/CarIcon';
import HistoryIcon from './common/icons/HistoryIcon';
import CogIcon from './common/icons/CogIcon';
import LogoutIcon from './common/icons/LogoutIcon';

const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const { driver, logout } = useAuth();

  return (
    <div
      id='sidebar'
      className={classNames(
        'w-72 space-y-6 bg-white py-7 px-2 text-blue-100',
        'absolute inset-y-0 left-0 z-50 transform',
        'shadow-[0_0px_40px_-10px_rgba(0,0,0,0.3)]',
        sidebarOpen
          ? 'lg:border-r'
          : '-translate-x-full shadow-none lg:border-r',
        'xl:relative xl:top-0 xl:-mt-0 xl:translate-x-0',
        'lg:top-16 lg:z-10 lg:-mt-2',
        'transition duration-200 ease-in-out'
      )}
    >
      <nav className=' text-neutral-800'>
        {driver ? (
          <div className='flex flex-col justify-between space-y-1'>
            <Link
              onClick={() => {
                setSidebarOpen(false);
              }}
              to='/'
              className='sidebar-navlink'
            >
              <HomeIcon />
              <div>Αρχική σελίδα</div>
              {/* <div>Home</div> */}
            </Link>
            <Link
              onClick={() => {
                setSidebarOpen(false);
              }}
              to='/vehicles'
              className='sidebar-navlink'
            >
              <CarIcon />
              <div>Διαχείριση οχήματων</div>
              {/* <div>Manage vehicles</div> */}
            </Link>
            <Link
              onClick={() => {
                setSidebarOpen(false);
              }}
              to='/parking-history'
              className='sidebar-navlink'
            >
              <HistoryIcon />
              <div>Ιστορικό σταθμεύσεων</div>
              {/* <div>Parking history</div> */}
            </Link>
            <Link
              onClick={() => {
                setSidebarOpen(false);
              }}
              to='/settings'
              className='sidebar-navlink'
            >
              <CogIcon />
              <div>Ρυθμίσεις</div>
              {/* <div>Settings</div> */}
            </Link>
            <div onClick={logout} id='logout-navlink'>
              <LogoutIcon />
              <div>Αποσύνδεση</div>
              {/* <div>Log out</div> */}
            </div>
          </div>
        ) : (
          <div className='flex flex-col justify-between space-y-1'>
            <Link
              onClick={() => {
                setSidebarOpen(false);
              }}
              to='/login'
              className='sidebar-navlink'
            >
              Είσοδος
            </Link>
            <Link
              onClick={() => {
                setSidebarOpen(false);
              }}
              to='/register'
              className='sidebar-navlink'
            >
              Εγγραφή
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
