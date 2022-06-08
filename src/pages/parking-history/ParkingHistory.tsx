import { useContext, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import BasicLayout from '../../common/components/layout/basic/BasicLayout';
import { sleep } from '../../common/utils/sleep';
import useAuth from '../../common/contexts/AuthContext';
import { ScreenSizeContext } from '../../common/contexts/ScreenSizeContext';
import MobileParkingHistory from './mobile/MobileParkingHistory';
import { IInactiveCard } from '../../common/interfaces/interfaces';
import DesktopParkingHistory from './desktop/DesktopParkingHistory';
import { useDocTitle } from '../../common/hooks/useDocTitle';

const ParkingHistory = () => {
  const [,] = useDocTitle('uPark | Ιστορικό σταθμεύσεων');
  const { driver } = useAuth();
  const screen = useContext(ScreenSizeContext);

  const [ready, setReady] = useState(false);
  const [inactiveCards, setInactiveCards] = useState<IInactiveCard[]>([]);

  // Fetch logged in user's inactive card/s (if any)
  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchInactiveCards = async () => {
      await sleep(1000);
      try {
        const response: AxiosResponse = await axios.get(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/driver/${driver?.id}/select/inactive-cards`,
          {
            cancelToken: source.token,
            withCredentials: true,
          }
        );

        if (response.data) {
          setInactiveCards(response.data.inactiveCards);
          setReady(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchInactiveCards();

    return () => {
      source.cancel();
    };
  }, [driver?.id]);

  return (
    <BasicLayout>
      {ready ? (
        <>
          {(screen.isMobile || screen.isTablet) && (
            <MobileParkingHistory inactiveCards={inactiveCards} />
          )}
          {(screen.isDesktop || screen.isLargeDesktop) && (
            <DesktopParkingHistory inactiveCards={inactiveCards} />
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

export default ParkingHistory;
