import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../common/contexts/AuthContext';
import { INewCard } from '../../../common/interfaces/interfaces';
import Input from './components/Input';
import Scanner from './components/Scanner';

const ScanQr = () => {
  const navigate = useNavigate();
  const { driver } = useAuth();

  const [showScanner, setShowScanner] = useState(true);
  const [addressName, setAddressName] = useState('');
  const [addressId, setAddressId] = useState(0);

  const next = () => {
    const newCard: INewCard = {
      driverId: driver?.id,
      addressId,
      addressName,
      vehicleName: undefined,
      vehicleLicensePlate: undefined,
      cost: undefined,
      duration: undefined,
    };

    navigate('/park/set-vehicle', { state: newCard, replace: true });
  };

  const liftAddressId = (value: number) => {
    setAddressId(value);
  };
  const liftAddressName = (value: string) => {
    setAddressName(value);
  };

  return (
    <div className='flex h-screen w-full flex-1 flex-col items-center bg-neutral-50'>
      {addressId > 0 && addressName ? (
        <div className='flex min-h-full w-full flex-col items-center justify-between'>
          <div className='my-14'>
            {/* OK sing */}
            <div className='py-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-52 w-52 text-green-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            {/* Address info */}
            <div className='font text-center text-lg font-semibold'>
              {addressName}
            </div>
          </div>

          {/* Action buttons */}
          <div className='flex w-full flex-col items-center'>
            <button
              onClick={next}
              className='w-10/12 rounded bg-yellow-300 py-2.5 text-center text-xl font-semibold text-black shadow-md'
            >
              Συνέχεια
            </button>
            <div
              onClick={() => {
                setAddressId(0);
                setAddressName('');
              }}
              className='w-full py-5 text-center underline'
            >
              Ακυρωση
            </div>
          </div>
        </div>
      ) : (
        <>
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
            <div className='w-3/5'>Έναρξη αγοράς</div>
            <div className='w-1/5'></div>
          </div>

          {showScanner ? (
            <Scanner
              liftAddressName={liftAddressName}
              liftAddressId={liftAddressId}
            />
          ) : (
            <Input
              liftAddressName={liftAddressName}
              liftAddressId={liftAddressId}
            />
          )}

          <div className='flex flex-1 flex-col items-center justify-center'>
            {showScanner ? (
              <div className='w-full px-4 py-4 text-center text-sm font-semibold'>
                Έχετε πρόβλημα κατά το σκανάρισμα; Πατήστε{' '}
                <span
                  onClick={() => setShowScanner(false)}
                  className='cursor-pointer font-medium text-blue-700'
                >
                  εδω
                </span>
                .
              </div>
            ) : (
              <div className='w-full px-4 py-4 text-center text-base font-semibold'>
                <span
                  onClick={() => setShowScanner(true)}
                  className='cursor-pointer font-medium text-blue-700'
                >
                  Ακύρωση
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ScanQr;
