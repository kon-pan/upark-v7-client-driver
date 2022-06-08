import { INewCard } from '../../../../../../../common/interfaces/interfaces';

const StepOne = ({
  newCard,
  liftStep,
}: {
  newCard: INewCard;
  liftStep: (value: number) => void;
}) => {
  return (
    <div>
      {/* Header */}
      <div className='flex w-full items-center justify-between border-b bg-white py-2.5 px-3'>
        <div className='text-lg font-medium'>Έναρξη στάθμευσης</div>
        {/* Buttons */}
        <button
          onClick={() => liftStep(2)}
          className='flex space-x-1 rounded bg-yellow-300 py-0.5 px-2 text-sm font-medium'
        >
          Επόμενο
        </button>
      </div>

      {/* Progress bar */}
      <div className='h-2 w-full bg-neutral-300'></div>

      <div className='flex flex-col space-y-2 p-4'>
        <div className='text-lg font-medium'>Οδός στάθμευσης</div>
        <div>{newCard.addressName}</div>
      </div>
    </div>
  );
};

export default StepOne;
