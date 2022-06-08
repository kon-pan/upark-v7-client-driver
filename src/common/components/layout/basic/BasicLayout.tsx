import { useContext } from 'react';
import useAuth from '../../../contexts/AuthContext';
import { ScreenSizeContext } from '../../../contexts/ScreenSizeContext';
import { classNames } from '../../../utils/classnames';
import PrivateNavbar from '../../navbar/private/PrivateNavbar';
import PublicNavbar from '../../navbar/public/PublicNavbar';
import Sidebar from '../../sidebar/Sidebar';

const BasicLayout = ({ children }: any) => {
  const { driver } = useAuth();
  const screen = useContext(ScreenSizeContext);

  return (
    <div
      className={classNames(
        'relative min-h-screen',
        'flex flex-col',
        'bg-neutral-50'
      )}
    >
      {driver?.id ? <PrivateNavbar /> : <PublicNavbar />}
      <div className='flex w-full flex-1'>
        {!driver?.id && (screen.isDesktop || screen.isLargeDesktop) ? null : (
          <Sidebar />
        )}
        {children}
      </div>
    </div>
  );
};

export default BasicLayout;
