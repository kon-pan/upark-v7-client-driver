import { DateTime } from 'luxon';
import { ICard } from '../../../../../../common/interfaces/interfaces';
import CountDownTimer from './components/CountDownTimer';

const ActiveCard = ({
  info,
  openEndActiveCardModal,
  openExtendActiveCardModal,
}: {
  info: ICard;
  openEndActiveCardModal: () => void;
  openExtendActiveCardModal: () => void;
}) => {
  return (
    <div className='flex w-10/12 flex-col rounded border bg-white text-base shadow-md'>
      {/* Card info */}
      <div className='p-4'>
        <div className='flex justify-center border-b pb-2'>
          <div className='flex w-1/6 justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
          </div>
          <div className='w-5/6'>{info.addressName}</div>
        </div>

        <div className='flex justify-center border-b py-2'>
          <div className='flex w-1/6 justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
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
          <div className='w-5/6'>{info.vehicleName}</div>
        </div>

        <div className='flex items-end justify-center pt-2'>
          <div className='flex w-1/6 justify-center pl-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='currentColor'
              viewBox='0 0 16 16'
              className='mr-3'
            >
              <path d='M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961h1.174Zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057h1.138Zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75v.96Z' />
            </svg>
          </div>
          <div className='w-5/6'>{info.vehicleLicensePlate}</div>
        </div>
      </div>

      {/* Remaining time */}
      <div className='flex flex-col items-center border-t bg-gray-800 p-4 text-white'>
        <div className=''>Η κάρτα σας θα λήξει σε:</div>
        {DateTime.fromISO(info.expiresAt) > DateTime.now() ? (
          <CountDownTimer expiresAt={info.expiresAt} />
        ) : (
          <div className='font text-lg font-bold'>
            Η κάρτα στάθμευσής σας έχει λήξει.
          </div>
        )}
      </div>

      {/* Cancel/Extend buttons */}
      <div className='flex rounded-b text-white'>
        <button
          onClick={openEndActiveCardModal}
          className='w-1/2 rounded-bl bg-red-500 py-2 font-medium'
        >
          Ακύρωση
        </button>
        <button
          onClick={openExtendActiveCardModal}
          className='w-1/2 rounded-br bg-blue-500 py-2 font-medium'
        >
          Επέκταση
        </button>
      </div>
    </div>
  );
};

export default ActiveCard;
