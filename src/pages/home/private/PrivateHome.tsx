import './PrivateHome.css';
import io from 'socket.io-client';
import { useContext, useEffect, useState } from 'react';
import useAuth from '../../../common/contexts/AuthContext';
import { ScreenSizeContext } from '../../../common/contexts/ScreenSizeContext';
import BasicLayout from '../../../common/components/layout/basic/BasicLayout';
import MobilePrivateHome from './mobile/MobilePrivateHome';
import Map from './common/components/map/Map';
import DesktopPrivateHome from './desktop/DesktopPrivateHome';
import { ICard } from '../../../common/interfaces/interfaces';
import axios, { AxiosResponse } from 'axios';
import { useDocTitle } from '../../../common/hooks/useDocTitle';

const PrivateHome = () => {
  const { driver } = useAuth();
  const [,] = useDocTitle('uPark | Αρχική σελίδα');
  const screen = useContext(ScreenSizeContext);
  const socket = io(`${process.env.REACT_APP_SERVER_HOSTNAME}`);

  const [ready, setReady] = useState(false);
  const [activeCards, setActiveCards] = useState<ICard[]>([]);

  // Fetch logged in user's active card/s (if any)
  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchActiveCards = async () => {
      try {
        const response: AxiosResponse = await axios.get(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/driver/${driver?.id}/select/active-cards`,
          {
            cancelToken: source.token,
            withCredentials: true,
          }
        );

        if (response.data) {
          setActiveCards(response.data.activeCards);
          setReady(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchActiveCards();

    return () => {
      source.cancel();
    };
  }, [driver?.id]);

  return (
    <BasicLayout>
      {ready ? (
        <>
          {(screen.isMobile || screen.isTablet) && (
            <MobilePrivateHome
              activeCards={activeCards}
              map={<Map socket={socket} />}
            />
          )}
          {(screen.isDesktop || screen.isLargeDesktop) && (
            <DesktopPrivateHome activeCards={activeCards} socket={socket} />
          )}
        </>
      ) : (
        <div className='flex max-h-screen w-full flex-col items-center justify-center bg-neutral-50'>
          <div
            style={{ borderTopColor: 'transparent' }}
            className='h-12 w-12 animate-spin rounded-full border-4 border-solid border-neutral-400'
          ></div>
        </div>
      )}
    </BasicLayout>
  );
};

export default PrivateHome;
