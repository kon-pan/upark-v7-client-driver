import axios, { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import useAuth from '../../../../../../../common/contexts/AuthContext';
import { IVehicle } from '../../../../../../../common/interfaces/interfaces';
import { classNames } from '../../../../../../../common/utils/classnames';
import VehicleDropdown from './components/VehicleDropdown';
import VehicleInfoForm from './components/VehicleInfoForm';

const StepTwo = ({
  liftStep,
  liftNewCard,
}: {
  liftStep: (value: number) => void;
  liftNewCard: (type: any, value: any) => void;
}) => {
  const { driver } = useAuth();

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
    if (selectedVehicle) {
      liftNewCard('vehicleName', selectedVehicle.name);
      liftNewCard('vehicleLicensePlate', selectedVehicle.licensePlate);
    } else {
      // User did not select a vehicle from the dropdown menu
      // but entered values through the form
      liftNewCard('vehicleName', vehicleName);
      liftNewCard('vehicleLicensePlate', licensePlate);
    }

    liftStep(3);
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
    <div>
      {/* Header */}
      <div className='flex w-full items-center justify-between border-b bg-white py-2.5 px-3 shadow-md'>
        <div className='text-lg font-medium'>Πληροφορίες οχήματος</div>
        {/* Buttons */}
        <div className='flex space-x-1'>
          <button
            onClick={() => liftStep(1)}
            className='flex space-x-1 rounded border bg-neutral-100 py-0.5 px-2 text-sm font-medium shadow'
          >
            Πίσω
          </button>
          <button
            disabled={
              selectedVehicle || (vehicleName && licensePlate) ? false : true
            }
            onClick={() => next()}
            className={classNames(
              'rounded border py-0.5 px-2 text-sm font-medium shadow',
              selectedVehicle || (vehicleName && licensePlate)
                ? 'bg-yellow-300'
                : 'bg-yellow-100 text-neutral-600'
            )}
          >
            Επόμενο
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className='h-2 w-full bg-neutral-300'>
        <div className='h-2 w-1/3 bg-blue-700'></div>
      </div>

      {vehicles.length === 0 || addNewVehicle ? (
        <div className='mx-auto flex w-10/12 flex-col justify-center py-4'>
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
          <div className='mt-4 flex w-full items-center space-x-2 rounded border bg-white shadow-md'>
            {/* Info icon */}
            <div className='flex items-center justify-center rounded-l border-r bg-gray-800 px-4'>
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
        <div className='mx-auto flex w-10/12 flex-col py-4'>
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
  );
};

export default StepTwo;
