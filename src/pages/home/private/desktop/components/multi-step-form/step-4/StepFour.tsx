import { Link } from 'react-router-dom';
import { INewCard } from '../../../../../../../common/interfaces/interfaces';
import OkIcon from '../icons/OkIcon';

const StepFour = ({
  newCard,
  liftStep,
  liftNewCard,
}: {
  newCard: INewCard;
  liftStep: (value: number) => void;
  liftNewCard: (type: any, value: any) => void;
}) => {
  return (
    <div className='flex flex-col items-center'>
      {/* Header */}
      <div className='flex w-full items-center justify-between border-b bg-white py-2.5 px-3 shadow-md'>
        <div className='text-lg font-medium'>Σύνοψη Πληροφοριών</div>
        {/* Buttons */}
        <div className='flex space-x-1'>
          <button
            onClick={() => {
              liftNewCard('startsAt', undefined);
              liftStep(3);
            }}
            className='flex space-x-1 rounded border bg-neutral-100 py-0.5 px-2 text-sm font-medium shadow'
          >
            Πίσω
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className='h-2 w-full bg-neutral-300'>
        <div className='w-3/3 h-2 bg-blue-700'></div>
      </div>

      <div className='mt-4 flex w-10/12 flex-col'>
        {/* Address */}
        <div className='mx-auto flex w-full items-center border-b py-3'>
          <div className='mr-5 flex w-full justify-between'>
            <div className='mr-2 font-semibold'>Οδός στάθμευσης:</div>
            <div>{newCard.addressName}</div>
          </div>
          <div>
            <OkIcon />
          </div>
        </div>

        {/* Vehicle */}
        <div className='mx-auto flex w-full items-center justify-between border-b py-3'>
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
        <div className='mx-auto flex w-full items-center border-b py-4'>
          <div className='mr-5 flex w-full justify-between'>
            <div className='mr-2 font-semibold'>Διάρκεια στάθμευσης:</div>
            <div>
              {newCard.duration === 30
                ? '30 λεπτά'
                : newCard.duration === 60
                ? '1 ώρα'
                : newCard.duration === 90
                ? '1.5 ώρα'
                : newCard.duration! > 90 && newCard.duration! < 1440
                ? `${newCard.duration! / 60} ώρες`
                : newCard.duration! >= 1440 && newCard.duration! / 60 / 24 === 1
                ? `1 ημέρα`
                : newCard.duration! >= 1440 && newCard.duration! / 60 / 24 > 1
                ? `${newCard.duration! / 60 / 24} ημέρες`
                : null}
            </div>
          </div>
          <div>
            <OkIcon />
          </div>
        </div>
        {/* Cost */}
        <div className='mx-auto flex w-full items-center py-4'>
          <div className='mr-5 flex w-full justify-between'>
            <div className='mr-2 font-semibold'>Κόστος:</div>
            <div>{newCard.cost} ευρώ</div>
          </div>
          <div>
            <OkIcon />
          </div>
        </div>
      </div>

      {/* To payment */}
      <div className='mt-4 flex w-10/12 flex-col'>
        <Link
          to='/park/payment'
          state={newCard}
          className='rounded border bg-yellow-300 py-2 text-center font-medium shadow-md hover:bg-yellow-400'
        >
          Πληρωμή
        </Link>
      </div>
    </div>
  );
};

export default StepFour;
