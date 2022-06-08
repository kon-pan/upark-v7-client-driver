import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { INewCard } from '../../../common/interfaces/interfaces';
import { classNames } from '../../../common/utils/classnames';
import OkIcon from '../icons/OkIcon';

const SetTime = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const newCard = location.state as INewCard;

  const [duration, setDuration] = useState(30);
  const [price, setPrice] = useState(0.5);

  const incrementDuration = () => {
    if (duration >= 300) return;
    setDuration((prevState: number) => prevState + 30);
    setPrice((prevState: number) => prevState + 0.5);
  };

  const decrementDuration = () => {
    if (duration <= 30) return;
    setDuration((prevState: number) => prevState - 30);
    setPrice((prevState: number) => prevState - 0.5);
  };

  const next = () => {
    newCard.duration = duration;
    newCard.cost = price;

    navigate('/park/details', { state: newCard, replace: true });
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
          <div className='w-3/5'>Βήμα 2/3</div>
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

        {/* Vehicle info*/}
        <div className='mx-auto flex w-full max-w-xs items-center justify-between border-b py-4'>
          <div className='mr-5 flex w-full flex-col'>
            <div className='flex justify-between'>
              <div className='mr-2 font-semibold'>Όχημα:</div>
              <div>{newCard.vehicleName}</div>
            </div>
            <div className='flex justify-between'>
              <div className='mr-2 font-semibold'>Αρ. κυκλοφορίας:</div>
              <div>{newCard.vehicleLicensePlate}</div>
            </div>
          </div>
          <div>
            <OkIcon />
          </div>
        </div>

        {/* Duration */}
        <div className='mx-auto flex w-full max-w-xs flex-col border-b py-4'>
          <div className='mb-2 font-semibold'>Επιλογή διάρκειας</div>
          <div className='flex w-full justify-center'>
            <div
              onClick={decrementDuration}
              className='flex w-12 cursor-pointer items-center justify-center rounded-l border border-r-0 bg-blue-600 text-white shadow-md'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <div className='w-28 border-t border-b bg-white bg-opacity-50 py-3 text-center shadow-sm'>
              {duration === 30
                ? '30 λεπτά'
                : duration === 60
                ? '1 ώρα'
                : duration === 90
                ? '1.5 ώρα'
                : `${duration / 60} ώρες`}
            </div>
            <div
              onClick={incrementDuration}
              className='flex w-12 cursor-pointer items-center justify-center rounded-r border border-l-0 bg-blue-600 text-white shadow-md'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Cost */}
        <div className='mx-auto flex w-full max-w-xs items-center justify-between border-b py-4'>
          <div className='font-semibold'>Κόστος:</div>
          <div className='text-lg'>{price} ευρώ</div>
        </div>
      </div>

      {/* Bottom buttons */}
      <div className='flex w-10/12 space-x-4 py-4'>
        <Link
          to='/park/set-vehicle'
          state={newCard}
          replace
          className='w-1/2 rounded border bg-neutral-200 bg-opacity-75 py-3 text-center font-medium shadow-md'
        >
          Πίσω
        </Link>
        <button
          onClick={next}
          className={classNames(
            'w-1/2 rounded border bg-yellow-300 py-3 text-center font-medium shadow-md'
          )}
        >
          Συνέχεια
        </button>
      </div>
    </div>
  );
};

export default SetTime;
