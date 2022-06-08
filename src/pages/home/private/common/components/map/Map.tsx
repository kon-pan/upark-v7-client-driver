import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import L, { LatLngTuple } from 'leaflet';
import { MapContainer, Popup, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { Socket } from 'socket.io-client';
import { useInterval } from '../../../../../../common/hooks/useInterval';
import { IAddress } from '../../../../../../common/interfaces/interfaces';
import AddressMarker from './components/AddressMarker';
import UserPositionMarker from './components/UserPositionMarker';

// Function for creating custom icon for cluster group
const createClusterCustomIcon = function (cluster: any) {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: 'marker-cluster-custom',
    iconSize: L.point(40, 40, true),
  });
};

const Map = ({
  socket,
  liftSelectedMarker,
  liftNewCard,
}: {
  socket: Socket;
  liftSelectedMarker?: (value: IAddress) => void;
  liftNewCard?: (type: any, value: any) => void;
}) => {
  const addressesRef = useRef<IAddress[] | []>([]);
  const userPositionRef = useRef<LatLngTuple>();

  const [addresses, setAddresses] = useState<IAddress[] | []>([]);

  useInterval(() => {
    socket.emit('fetch-addresses');
  }, 1000 * 10);

  useEffect(() => {
    socket.emit('fetch-addresses'); // Emit on load for initial fetch
    socket.on('connection-success', (msg: any) => console.log(msg));
    socket.on('addresses', (data: any) => {
      let tmp: IAddress[] = [];

      for (const address of data) {
        tmp.push({
          id: address.id,
          name: address.name,
          available: address.available,
          occupied: address.occupied,
          position: [address.position[0], address.position[1]],
        });
      }

      addressesRef.current = tmp;
      setAddresses(tmp);
    });

    // cleanup
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  // Get user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((currentPosition) => {
      const { latitude, longitude } = currentPosition.coords;
      userPositionRef.current = [latitude, longitude];
      // setUpdate((prev) => prev + 1); // force rerender
    });
    return () => {};
  }, []);

  // Source: https://stackoverflow.com/questions/64541528/react-leaflet-map-not-correctly-displayed-even-with-leaflet-css-import
  // "Hacky" way for leaflet tiles to load properly
  useEffect(() => {
    window.dispatchEvent(new Event('resize'));

    return () => {};
  }, []);

  return userPositionRef.current ? (
    <MapContainer
      className='z-0'
      center={userPositionRef.current}
      zoom={12}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      <UserPositionMarker
        userPosition={userPositionRef.current}
      ></UserPositionMarker>

      {addressesRef && (
        <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}>
          {addressesRef.current.map((address) => {
            return (
              <AddressMarker key={address.id} address={address}>
                <Popup offset={[0, -20]}>
                  <div className='flex flex-col'>
                    <div className='border-b py-1 text-center font-bold'>
                      {address.name}
                    </div>
                    {/* <div className='flex space-x-1 py-1'>
                      <div>Αναγνωριστικό θέσης:</div>
                      <div className='font-bold'>{address.id}</div>
                    </div> */}
                    <div className='flex space-x-1'>
                      <div>Σύνολο θέσεων:</div>
                      <div className='font-bold'>{address.available}</div>
                    </div>
                    <div className='flex space-x-1'>
                      <div>Κατειλημμένες θέσεις:</div>
                      <div className='font-bold'>{address.occupied}</div>
                    </div>
                  </div>
                </Popup>
              </AddressMarker>
            );
          })}
        </MarkerClusterGroup>
      )}
    </MapContainer>
  ) : (
    <MapContainer
      className='z-0'
      center={[38.8857856, 22.4526336]}
      zoom={12}
      scrollWheelZoom={true}
      tap={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {addresses.length > 0 && (
        <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}>
          {addresses.map((address) => {
            return (
              <AddressMarker
                key={address.id}
                address={address}
                liftSelectedMarker={liftSelectedMarker}
                liftNewCard={liftNewCard}
              >
                <Popup offset={[0, -20]}>
                  <div className='flex flex-col'>
                    <div className='border-b py-1 text-center font-bold'>
                      {address.name}
                    </div>
                    {/* <div className='flex space-x-1 py-1'>
                      <div>Αναγνωριστικό θέσης:</div>
                      <div className='font-bold'>{address.id}</div>
                    </div> */}
                    <div className='flex space-x-1 py-1'>
                      <div>Σύνολο θέσεων:</div>
                      <div className='font-bold'>{address.available}</div>
                    </div>
                    <div className='flex space-x-1'>
                      <div>Κατειλημμένες θέσεις:</div>
                      <div className='font-bold'>{address.occupied}</div>
                    </div>
                  </div>
                </Popup>
              </AddressMarker>
            );
          })}
        </MarkerClusterGroup>
      )}
    </MapContainer>
  );
};

export default Map;
