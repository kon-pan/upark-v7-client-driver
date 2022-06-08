import axios, { AxiosResponse } from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';
import { IVehicle } from '../../common/interfaces/interfaces';
import useAuth from '../../common/contexts/AuthContext';
import { ScreenSizeContext } from '../../common/contexts/ScreenSizeContext';
import BasicLayout from '../../common/components/layout/basic/BasicLayout';
import MobileVehicles from './mobile/MobileVehicles';
import { sleep } from '../../common/utils/sleep';
import DesktopVehicles from './desktop/DesktopVehicles';
import { useDocTitle } from '../../common/hooks/useDocTitle';

const Vehicles = () => {
  const [,] = useDocTitle('uPark | Διαχείριση οχημάτων');

  const { driver } = useAuth();
  const screen = useContext(ScreenSizeContext);

  const [update, setUpdate] = useState(true);
  const [ready, setReady] = useState(false);
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);

  // Fetch logged in driver's saved vehicles(if any)
  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchVehicles = async () => {
      setReady(false);
      await sleep(1000);
      const response: AxiosResponse = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/driver/${driver?.id}/vehicles`,
        { cancelToken: source.token, withCredentials: true }
      );

      setVehicles(response.data);
      setReady(true);
    };

    fetchVehicles();
    return () => {
      source.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  function liftAddVehicleSuccess(value: boolean) {
    if (value === true) {
      forceUpdate();
    }
  }
  function liftRemoveVehicleSuccess(value: boolean) {
    if (value === true) {
      forceUpdate();
    }
  }
  function liftEditVehicleSuccess(value: boolean) {
    if (value === true) {
      forceUpdate();
    }
  }

  const forceUpdate = useCallback(() => {
    setUpdate((state) => !state);
  }, []);

  return (
    <BasicLayout>
      {ready ? (
        <>
          {(screen.isMobile || screen.isTablet) && (
            <MobileVehicles
              vehicles={vehicles}
              liftAddVehicleSuccess={liftAddVehicleSuccess}
              liftRemoveVehicleSuccess={liftRemoveVehicleSuccess}
              liftEditVehicleSuccess={liftEditVehicleSuccess}
            />
          )}
          {(screen.isDesktop || screen.isLargeDesktop) && (
            <DesktopVehicles
              vehicles={vehicles}
              liftAddVehicleSuccess={liftAddVehicleSuccess}
              liftRemoveVehicleSuccess={liftRemoveVehicleSuccess}
              liftEditVehicleSuccess={liftEditVehicleSuccess}
            />
          )}
        </>
      ) : (
        <div className='flex max-h-screen w-full flex-1 flex-col items-center justify-center bg-neutral-50'>
          <div
            style={{ borderTopColor: 'transparent' }}
            className='h-12 w-12 animate-spin rounded-full border-4 border-solid border-neutral-400'
          ></div>
        </div>
      )}
    </BasicLayout>
  );
};

export default Vehicles;
