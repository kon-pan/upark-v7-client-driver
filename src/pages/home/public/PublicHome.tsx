import { useContext } from 'react';
import BasicLayout from '../../../common/components/layout/basic/BasicLayout';
import { ScreenSizeContext } from '../../../common/contexts/ScreenSizeContext';
import { useDocTitle } from '../../../common/hooks/useDocTitle';
import DesktopPublicHome from './desktop/DesktopPublicHome';
import MobilePublicHome from './mobile/MobilePublicHome';

const PublicHome = () => {
  const screen = useContext(ScreenSizeContext);
  const [,] = useDocTitle('uPark | Καλώς ήρθατε!');


  return (
    <BasicLayout>
      {(screen.isMobile || screen.isTablet) && <MobilePublicHome />}
      {(screen.isDesktop || screen.isLargeDesktop) && <DesktopPublicHome />}
    </BasicLayout>
  );
};

export default PublicHome;
