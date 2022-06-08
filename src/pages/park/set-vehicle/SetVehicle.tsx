import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../common/contexts/AuthContext';
import { INewCard, IVehicle } from '../../../common/interfaces/interfaces';
import VehicleDropdown from './components/VehicleDropdown';
import OkIcon from '../icons/OkIcon';
import VehicleInfoForm from './components/VehicleInfoForm';
import { classNames } from '../../../common/utils/classnames';

const SetVehicle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { driver } = useAuth();

  const newCard = location.state as INewCard;

  const [vehicleName, setVehicleName] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [addNewVehicle, setAddNewVehicle] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<IVehicle | undefined>(
    undefined
  );

  // Fetch logged in driver's vehicles if there any saved
  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchVehicles = async () => {
      const response: AxiosResponse = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/driver/${driver?.id}/vehicles`,
        { cancelToken: source.token, withCredentials: true }
      );

      setVehicles(response.data);
    };

    fetchVehicles();
    return () => {
      source.cancel();
    };
  }, [driver]);

  const next = () => {
    // We need to check if the user selected a vehicle from the dropdown menu
    // or if they entered their vehicle info through the form

    if (selectedVehicle) {
      newCard.vehicleName = selectedVehicle.name;
      newCard.vehicleLicensePlate = selectedVehicle.licensePlate;
    } else {
      // User did not select a vehicle from the dropdown menu
      // but entered values through the form
      newCard.vehicleName = vehicleName;
      newCard.vehicleLicensePlate = licensePlate;
    }
    navigate('/park/set-time', { state: newCard, replace: true });
  };

  const liftSelectedVehicle = (value: IVehicle) => {
    setSelectedVehicle(value);
  };

  const liftVehicleName = (value: string) => {
    setVehicleName(value);
  };

  const liftLicensePlate = (value: string) => {
    setLicensePlate(value);
  };

  return (
    <div className='flex h-screen w-full flex-1 flex-col items-center justify-between bg-neutral-50'>
      <div className='flex w-full flex-col items-center'>
        {/* Header */}
        <div className='flex w-full items-center border-b bg-white py-3 text-center text-lg font-medium shadow-md'>
          <div
            onClick={() => {
              window.location.replace('/');
            }}
            className='w-1/5 cursor-pointer px-4 text-center text-sm text-blue-700'
          >
            Ακύρωση
          </div>
          <div className='w-3/5'>Βήμα 1/3</div>
          <div className='w-1/5'></div>
        </div>

        {/* Address */}
        <div className='mx-auto mt-4 flex w-full max-w-xs items-center border-b pb-3'>
          <div className='flex w-full justify-between'>
            <div className='mr-2 font-semibold'>Οδός στάθμευσης:</div>
            <div>{newCard.addressName}</div>
          </div>
          <OkIcon />
        </div>

        {/* Vehicle */}
        {vehicles.length === 0 || addNewVehicle ? (
          <div className='flex w-full max-w-xs flex-col py-4'>
            <VehicleInfoForm
              vehicleName={vehicleName}
              licensePlate={licensePlate}
              liftVehicleName={liftVehicleName}
              liftLicensePlate={liftLicensePlate}
            />
            <div
              onClick={() => {
                setVehicleName('');
                setLicensePlate('');
                setAddNewVehicle(false);
              }}
              className='mt-1 cursor-pointer text-sm font-medium text-blue-700 underline underline-offset-1'
            >
              Επιλογή αποθηκευμένου οχήματος
            </div>
            {/* Info message */}
            <div className='mt-4 flex w-full max-w-xs items-center space-x-2 rounded border bg-white shadow-md'>
              {/* Info icon */}
              <div className='my-auto flex h-full items-center justify-center rounded-l border-r bg-gray-800 px-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8 text-white'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              {/* Text */}
              <div className='px-2 py-4 text-left text-xs'>
                Επιλέξτε <span className='font-medium'>"Αποθήκευση"</span> εάν
                επιθυμείτε να χρησιμοποιήσετε ξάνα το ίδιο όχημα. Για να
                διαχειριστείτε τα αποθηκευμένα οχήματά σας επλιλέξτε στο μενού{' '}
                <span className='font-medium'>"Διαχείριση οχημάτων"</span> ή
                πατήστε <span className='font-medium text-blue-700'>εδώ</span>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex w-full max-w-xs flex-col py-4'>
            <VehicleDropdown
              vehicles={vehicles}
              selectedVehicle={selectedVehicle}
              liftSelectedVehicle={liftSelectedVehicle}
            />
            <div
              onClick={() => {
                setSelectedVehicle(undefined);
                setAddNewVehicle(true);
              }}
              className='mt-1 cursor-pointer text-sm font-medium text-blue-700 underline underline-offset-1'
            >
              Προσθήκη νέου οχήματος
            </div>
          </div>
        )}
      </div>

      {/* Bottom buttons */}
      <div className='flex w-10/12 space-x-4 py-4'>
        <Link
          to='/park/scan-qr'
          className='w-1/2 rounded border bg-neutral-200 bg-opacity-75 py-3 text-center font-medium shadow-md'
        >
          Πίσω
        </Link>
        <button
          onClick={next}
          className={classNames(
            'w-1/2 rounded border py-3 text-center font-medium shadow-md',
            selectedVehicle || (vehicleName && licensePlate)
              ? 'bg-yellow-300'
              : 'bg-yellow-100 text-neutral-600'
          )}
          disabled={
            selectedVehicle || (vehicleName && licensePlate) ? false : true
          }
        >
          Συνέχεια
        </button>
      </div>
    </div>
  );
};

export default SetVehicle;
