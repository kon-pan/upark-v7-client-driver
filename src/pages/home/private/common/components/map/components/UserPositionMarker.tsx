import { Marker, Popup } from 'react-leaflet';
import { Icon, LatLngTuple } from 'leaflet';
import { useEffect, useRef } from 'react';
import markerIconBlue from '../../../../common/images/marker-icon-blue.png';
import markerShadow from '../../../../common/images/marker-shadow.png';

type UserPositionMarkerPropsType = {
  userPosition: LatLngTuple;
};

const UserPositionMarker = ({ userPosition }: UserPositionMarkerPropsType) => {
  const userMarkerRef = useRef<any>();
  useEffect(() => {
    if (userMarkerRef) {
      userMarkerRef.current.openPopup();
    }
  }, []);

  if (userPosition) {
    return (
      <Marker
        ref={userMarkerRef}
        key={userPosition[0]}
        draggable={false}
        icon={
          new Icon({
            iconUrl: markerIconBlue,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            shadowUrl: markerShadow,
          })
        }
        position={userPosition}
        interactive={true}
      >
        <Popup offset={[0, -20]}>Βρίσκεστε εδώ.</Popup>
      </Marker>
    );
  } else {
    return null;
  }
};

export default UserPositionMarker;
