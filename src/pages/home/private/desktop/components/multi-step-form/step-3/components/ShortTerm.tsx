import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { INewCard } from '../../../../../../../../common/interfaces/interfaces';

const ShortTerm = ({
  newCard,
  liftNewCard,
}: {
  newCard: INewCard;
  liftNewCard: (type: any, value: any) => void;
}) => {
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

  useEffect(() => {
    liftNewCard('duration', duration);
    liftNewCard('cost', price);

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, price]);

  return (
    <div className='flex flex-col rounded border bg-white px-6 shadow-md'>
      <div className='mx-auto flex w-full max-w-xs flex-col border-b py-4'>
        <div className='mb-4 flex w-full flex-col text-base font-semibold'>
          <div className='mb-2 text-sm'>Έναρξη στάθμευσης</div>
          <input
            className='w-full rounded border-gray-400 bg-neutral-100 bg-opacity-50 py-1 text-gray-800 shadow-md'
            type='datetime-local'
            onChange={(e) => {
              liftNewCard('startsAt', DateTime.fromISO(e.target.value).toISO());
            }}
            id='dt'
          />
        </div>
        <div className='mb-2 text-sm font-semibold'>Επιλογή διάρκειας</div>
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
      <div className='mx-auto flex w-full max-w-xs items-center justify-between py-4'>
        <div className='font-semibold'>Κόστος:</div>
        <div className='text-lg'>{price} ευρώ</div>
      </div>
    </div>
  );
};

export default ShortTerm;
