import { useState } from 'react';
import { ICard } from '../../../../../common/interfaces/interfaces';
import { classNames } from '../../../../../common/utils/classnames';
import ActiveCard from '../../common/components/active-card/ActiveCard';
import EndActiveCardModal from '../../common/components/modals/CancelActiveCardModal';
import ExtendActiveCardModal from '../../common/components/modals/ExtendActiveCardModal';

const ActiveCards = ({ activeCards }: { activeCards: ICard[] }) => {
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
        <div className='text-center font-medium'>
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
    </>
  );
};

export default ActiveCards;
