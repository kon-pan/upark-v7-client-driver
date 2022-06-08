import { useState } from 'react';
import { ICard } from '../../../../common/interfaces/interfaces';
import { useSidebar } from '../../../../common/stores/SidebarStore';
import ActiveCardsView from './components/ActiveCardsView';
import MapView from './components/MapView';

const MobilePrivateHome = ({
  map,
  activeCards,
}: {
  map: any;
  activeCards: ICard[];
}) => {
  const { setSidebarOpen, sidebarOpen } = useSidebar();

  const [showMapView, setShowMapView] = useState(
    activeCards.length > 0 ? false : true
  );

  const liftShowMapView = (value: boolean) => {
    setShowMapView(value);
  };

  return (
    <div
      className='z-0 flex max-h-full w-full flex-1 flex-col items-center'
      onClick={() => {
        sidebarOpen && setSidebarOpen(false);
      }}
    >
      {!showMapView && (
        <ActiveCardsView
          activeCards={activeCards}
          liftShowMapView={liftShowMapView}
        />
      )}
      {showMapView && <MapView map={map} />}
    </div>
  );
};

export default MobilePrivateHome;
