import { Link, useLocation } from 'react-router-dom';
import { useDocTitle } from '../../../common/hooks/useDocTitle';
import { INewCard } from '../../../common/interfaces/interfaces';
import { classNames } from '../../../common/utils/classnames';
import OkIcon from '../icons/OkIcon';

const Details = () => {
  const [,] = useDocTitle('uPark | Σύνοψη πληροφοριών');
  const location = useLocation();

  const newCard = location.state as INewCard;

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
          <div className='w-3/5'>Σύνοψη πληροφοριών</div>
          <div className='w-1/5'></div>
        </div>

        {/* Address */}
        <div className='mx-auto mt-8 flex w-full max-w-xs items-center border-b pb-3'>
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
        <div className='mx-auto flex w-full max-w-xs items-center border-b py-4'>
          <div className='mr-5 flex w-full justify-between'>
            <div className='mr-2 font-semibold'>Διάρκεια στάθμευσης:</div>
            <div>
              {newCard && newCard.duration === 30
                ? '30 λεπτά'
                : newCard.duration === 60
                ? '1 ώρα'
                : newCard.duration === 90
                ? '1.5 ώρα'
                : `${newCard.duration! / 60} ώρες`}
            </div>
          </div>
          <div>
            <OkIcon />
          </div>
        </div>
        {/* Cost */}
        <div className='mx-auto flex w-full max-w-xs items-center border-b py-4'>
          <div className='mr-5 flex w-full justify-between'>
            <div className='mr-2 font-semibold'>Κόστος:</div>
            <div>{newCard.cost} ευρώ</div>
          </div>
          <div>
            <OkIcon />
          </div>
        </div>
      </div>

      {/* Bottom buttons */}
      <div className='flex w-10/12 space-x-4 py-4'>
        <Link
          to='/park/set-time'
          state={newCard}
          replace
          className='w-1/2 rounded border bg-neutral-200 bg-opacity-75 py-3 text-center font-medium shadow-md'
        >
          Πίσω
        </Link>
        <Link
          to='/park/payment'
          state={newCard}
          className={classNames(
            'w-1/2 rounded border bg-yellow-300 py-3 text-center font-medium shadow-md'
          )}
        >
          Συνέχεια
        </Link>
      </div>
    </div>
  );
};

export default Details;
