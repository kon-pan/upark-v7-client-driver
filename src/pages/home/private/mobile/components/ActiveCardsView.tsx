import { useState } from 'react';
import { ICard } from '../../../../../common/interfaces/interfaces';
import { classNames } from '../../../../../common/utils/classnames';
import ActiveCard from '../../common/components/active-card/ActiveCard';
import EndActiveCardModal from '../../common/components/modals/CancelActiveCardModal';
import ExtendActiveCardModal from '../../common/components/modals/ExtendActiveCardModal';

const ActiveCardsView = ({
  activeCards,
  liftShowMapView,
}: {
  activeCards: ICard[];
  liftShowMapView: (value: boolean) => void;
}) => {
  const [activeCardIndex, setactiveCardIndex] = useState(0);
  let [isEndActiveCardModalOpen, setIsEndActiveCardModalOpen] = useState(false);
  let [isExtendActiveCardModalOpen, setIsExtendActiveCardModalOpen] =
    useState(false);

  function closeExtendActiveCardModal() {
    setIsExtendActiveCardModalOpen(false);
  }

  function openExtendActiveCardModal() {
    setIsExtendActiveCardModalOpen(true);
  }

  function closeEndActiveCardModal() {
    setIsEndActiveCardModalOpen(false);
  }

  function openEndActiveCardModal() {
    setIsEndActiveCardModalOpen(true);
  }

  return (
    <>
      <div className='mb-4 flex w-full justify-center border-b bg-white py-3 shadow-md'>
        <div className='w-10/12 text-center font-medium'>
          {activeCards.length === 1 && 'Η κάρτα στάθμευσης σας είναι ενεργή'}
          {activeCards.length > 1 && 'Έχετε ενεργές κάρτες στάθμευσης'}
        </div>
      </div>

      <EndActiveCardModal
        isOpen={isEndActiveCardModalOpen}
        closeModal={closeEndActiveCardModal}
        activeCard={activeCards[activeCardIndex]}
      />

      <ExtendActiveCardModal
        isOpen={isExtendActiveCardModalOpen}
        closeModal={closeExtendActiveCardModal}
        activeCard={activeCards[activeCardIndex]}
      />

      {activeCards.length === 1 && (
        <ActiveCard
          info={activeCards[activeCardIndex]}
          openEndActiveCardModal={openEndActiveCardModal}
          openExtendActiveCardModal={openExtendActiveCardModal}
        />
      )}

      {activeCards.length > 1 && (
        <>
          {/* Prev/Next */}
          <div
            className={classNames(
              'mx-auto mb-4 flex w-10/12',
              activeCardIndex === 0 ? 'justify-end' : '',
              activeCardIndex === activeCards.length - 1 ? 'justify-start' : '',
              activeCardIndex > 0 && activeCardIndex < activeCards.length - 1
                ? 'justify-between'
                : ''
            )}
          >
            {activeCardIndex !== 0 && (
              <button
                className='rounded border bg-white px-2 py-1 text-sm font-medium shadow'
                onClick={() => setactiveCardIndex((prevState) => prevState - 1)}
              >
                Προηγούμενη
              </button>
            )}
            {activeCardIndex !== activeCards.length - 1 && (
              <button
                className='rounded border bg-yellow-300 px-2 py-1 text-sm font-medium shadow'
                onClick={() => setactiveCardIndex((prevState) => prevState + 1)}
              >
                Επόμενη
              </button>
            )}
          </div>

          <ActiveCard
            info={activeCards[activeCardIndex]}
            openEndActiveCardModal={openEndActiveCardModal}
            openExtendActiveCardModal={openExtendActiveCardModal}
          />
        </>
      )}

      <button
        onClick={() => {
          liftShowMapView(true);
        }}
        className='fixed bottom-5 right-5 z-10 flex items-center space-x-2 rounded bg-yellow-300 px-4 py-2 font-semibold shadow-md'
      >
        <div>Νέα στάθμευση</div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
            clipRule='evenodd'
          />
        </svg>
      </button>
    </>
  );
};

export default ActiveCardsView;
