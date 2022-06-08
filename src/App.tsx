import { useContext, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import useAuth from './common/contexts/AuthContext';
import { ScreenSizeContext } from './common/contexts/ScreenSizeContext';
import RequireAuth from './routers/RequireAuth';
import PrivateHome from './pages/home/private/PrivateHome';
import PublicHome from './pages/home/public/PublicHome';
import Login from './pages/login/Login';
import ScanQr from './pages/park/scan-qr/ScanQr';
import SetTime from './pages/park/set-time/SetTime';
import SetVehicle from './pages/park/set-vehicle/SetVehicle';
import ParkingHistory from './pages/parking-history/ParkingHistory';
import Register from './pages/register/Register';
import Vehicles from './pages/vehicles/Vehicles';
import Details from './pages/park/details/Details';
import Payment from './pages/park/payment/Payment';
import Settings from './pages/settings/Settings';
import MobileUserInfo from './pages/settings/mobile/user-info/UserInfo';
import DesktopUserInfo from './pages/settings/desktop/user-info/UserInfo';
import ContactInfo from './pages/settings/mobile/user-info/contact-info/ContactInfo';
import PersonalInfo from './pages/settings/mobile/user-info/personal-info/PersonalInfo';
import MobileSecurity from './pages/settings/mobile/security/Security';
import DesktopSecurity from './pages/settings/desktop/security/Security';
import Password from './pages/settings/mobile/security/password/Password';

const RequireMobile = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element | any => {
  const screen = useContext(ScreenSizeContext);

  return screen.isMobile || screen.isTablet ? (
    children
  ) : (
    <Navigate to='/' replace />
  );
};

function App() {
  const { driver } = useAuth();
  const screen = useContext(ScreenSizeContext);

  //gets screen size - to fix mobile viewport height problem
  useEffect(() => {
    function handleResize() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    // only execute all the code below in client side
    if (typeof window !== 'undefined') {
      // Handler to call on window resize

      // Add event listener
      window.addEventListener('resize', handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/settings/security/password'
          element={
            <RequireMobile>
              <RequireAuth>
                <Password />
              </RequireAuth>
            </RequireMobile>
          }
        />
        <Route
          path='/settings/security'
          element={
            screen.isMobile || screen.isTablet ? (
              <RequireAuth>
                <MobileSecurity />
              </RequireAuth>
            ) : (
              <RequireAuth>
                <DesktopSecurity />
              </RequireAuth>
            )
          }
        />
        <Route
          path='/settings/user-info/personal-info'
          element={
            <RequireMobile>
              <RequireAuth>
                <PersonalInfo />
              </RequireAuth>
            </RequireMobile>
          }
        />
        <Route
          path='/settings/user-info/contact-info'
          element={
            <RequireMobile>
              <RequireAuth>
                <ContactInfo />
              </RequireAuth>
            </RequireMobile>
          }
        />
        <Route
          path='/settings/user-info'
          element={
            screen.isMobile || screen.isTablet ? (
              <RequireAuth>
                <MobileUserInfo />
              </RequireAuth>
            ) : (
              <RequireAuth>
                <DesktopUserInfo />
              </RequireAuth>
            )
          }
        />
        <Route
          path='/settings'
          element={
            <RequireAuth>
              <Settings />
            </RequireAuth>
          }
        />
        <Route
          path='/park/payment'
          element={
            <RequireAuth>
              <Payment />
            </RequireAuth>
          }
        />
        <Route
          path='/park/details'
          element={
            <RequireMobile>
              <RequireAuth>
                <Details />
              </RequireAuth>
            </RequireMobile>
          }
        />
        <Route
          path='/park/set-time'
          element={
            <RequireMobile>
              <RequireAuth>
                <SetTime />
              </RequireAuth>
            </RequireMobile>
          }
        />
        <Route
          path='/park/set-vehicle'
          element={
            <RequireMobile>
              <RequireAuth>
                <SetVehicle />
              </RequireAuth>
            </RequireMobile>
          }
        />
        <Route
          path='/park/scan-qr'
          element={
            <RequireMobile>
              <RequireAuth>
                <ScanQr />
              </RequireAuth>
            </RequireMobile>
          }
        />
        <Route
          path='/parking-history'
          element={
            <RequireAuth>
              <ParkingHistory />
            </RequireAuth>
          }
        />
        <Route
          path='/vehicles'
          element={
            <RequireAuth>
              <Vehicles />
            </RequireAuth>
          }
        />
        <Route
          path='/register'
          element={driver ? <Navigate to='/' /> : <Register />}
        />
        <Route
          path='/login'
          element={driver?.id ? <Navigate to='/' /> : <Login />}
        />
        <Route
          path='/'
          element={driver?.id ? <PrivateHome /> : <PublicHome />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
