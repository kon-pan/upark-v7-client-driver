import { useContext } from 'react';
import BasicLayout from '../../common/components/layout/basic/BasicLayout';
import { ScreenSizeContext } from '../../common/contexts/ScreenSizeContext';
import { useDocTitle } from '../../common/hooks/useDocTitle';
import DesktopSettings from './desktop/DesktopSettings';
import MobileSettings from './mobile/MobileSettings';

const Settings = () => {
  const [,] = useDocTitle('uPark | Ρυθμίσεις');

  const screen = useContext(ScreenSizeContext);
  return (
    <BasicLayout>
      {(screen.isMobile || screen.isTablet) && <MobileSettings />}
      {(screen.isDesktop || screen.isLargeDesktop) && <DesktopSettings />}
    </BasicLayout>
  );
};

export default Settings;
