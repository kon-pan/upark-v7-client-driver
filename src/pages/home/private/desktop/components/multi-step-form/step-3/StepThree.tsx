import { useState } from 'react';
import { INewCard } from '../../../../../../../common/interfaces/interfaces';
import { classNames } from '../../../../../../../common/utils/classnames';


const StepThree = ({
  newCard,
  liftStep,
  liftNewCard,
  shortTerm,
  longTerm,
}: {
  newCard: INewCard;
  liftStep: (value: number) => void;
  liftNewCard: (type: any, value: any) => void;
  shortTerm: JSX.Element;
  longTerm: JSX.Element;
}) => {
  const [shortTermActive, setShortTermActive] = useState(true);
  const [longTermActive, setLongTermActive] = useState(false);

  const next = () => {
    liftStep(4);
  };

  return (
    <div>
      {/* Header */}
      <div className='flex w-full items-center justify-between border-b bg-white py-2.5 px-3 shadow-md'>
        <div className='text-lg font-medium'>Διάρκεια στάθμευσης</div>
        {/* Buttons */}
        <div className='flex space-x-1'>
          <button
            onClick={() => liftStep(2)}
            className='flex space-x-1 rounded border bg-neutral-100 py-0.5 px-2 text-sm font-medium shadow'
          >
            Πίσω
          </button>
          <button
            disabled={newCard.startsAt ? false : true}
            onClick={() => next()}
            className={classNames(
              'rounded border py-0.5 px-2 text-sm font-medium shadow',
              newCard.startsAt
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
        <div className='h-2 w-2/3 bg-blue-700'></div>
      </div>

      <div className='mx-auto mt-4 flex w-10/12 flex-col space-y-2'>
        <div className='text-justify text-base font-medium mb-2'>
          Επιλέξτε το είδος κάρτας που σας ενδιαφέρει:
        </div>

        {/* Short term/Long term   */}
        <div className='flex w-full items-center justify-evenly space-x-2 py-2'>
          <div
            onClick={() => {
              setShortTermActive(true);
              setLongTermActive(false);
            }}
            className={classNames(
              'w-1/2 cursor-pointer rounded border p-2 text-center text-sm',
              shortTermActive
                ? 'bg-white font-medium shadow-md'
                : 'bg-neutral-100 shadow-inner'
            )}
          >
            Σύντομης διάρκειας
          </div>
          <div
            onClick={() => {
              setShortTermActive(false);
              setLongTermActive(true);
            }}
            className={classNames(
              'w-1/2 cursor-pointer rounded border p-2 text-center text-sm',
              longTermActive
                ? 'bg-white font-medium shadow-md'
                : 'bg-neutral-100 shadow-inner'
            )}
          >
            Μεγάλης διάρκειας
          </div>
        </div>

        {shortTermActive && shortTerm}
        {longTermActive && longTerm}
      </div>
    </div>
  );
};

export default StepThree;
