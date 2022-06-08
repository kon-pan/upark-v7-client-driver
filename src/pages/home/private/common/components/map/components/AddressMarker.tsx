import { Icon } from 'leaflet';
import { Marker } from 'react-leaflet';
import markerIconGrey from '../../../../common/images/marker-icon-grey.png';
import markerIconGreen from '../../../../common/images/marker-icon-green.png';
import markerIconOrange from '../../../../common/images/marker-icon-orange.png';
import markerShadow from '../../../../common/images/marker-shadow.png';
import { IAddress } from '../../../../../../../common/interfaces/interfaces';
import useAuth from '../../../../../../../common/contexts/AuthContext';

const AddressMarker = ({
  address,
  liftSelectedMarker,
  liftNewCard,
  children,
}: {
  address: IAddress;
  liftSelectedMarker?: (value: IAddress) => void;
  liftNewCard?: (type: any, value: any) => void;
  children: JSX.Element;
}) => {
  const { driver } = useAuth();

  return (
    <Marker
      draggable={false}
      position={address.position}
      interactive={address.available > address.occupied ? true : false}
      icon={
        address.available <= address.occupied
          ? new Icon({
              iconUrl: markerIconGrey,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              shadowUrl: markerShadow,
            })
          : address.occupied / address.available >= 0.8
          ? new Icon({
              iconUrl: markerIconOrange,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              shadowUrl: markerShadow,
            })
          : new Icon({
              iconUrl: markerIconGreen,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              shadowUrl: markerShadow,
            })
      }
      eventHandlers={{
        click: (e) => {
          if (address.available > address.occupied) {
            liftSelectedMarker && liftSelectedMarker(address);
            liftNewCard && liftNewCard('driverId', driver?.id);
            liftNewCard && liftNewCard('addressId', address.id);
            liftNewCard && liftNewCard('addressName', address.name);
          }
        },
      }}
    >
      {children}
    </Marker>
  );
};

export default AddressMarker;
