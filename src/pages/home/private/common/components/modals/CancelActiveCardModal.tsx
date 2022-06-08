import { Transition, Dialog } from '@headlessui/react';
import axios, { AxiosResponse } from 'axios';
import { DateTime } from 'luxon';
import { Fragment, useEffect, useState } from 'react';
import useAuth from '../../../../../../common/contexts/AuthContext';
import { ICard } from '../../../../../../common/interfaces/interfaces';

const CancelActiveCardModal = ({
  isOpen,
  closeModal,
  activeCard,
}: {
  isOpen: boolean;
  closeModal: () => void;
  activeCard: ICard;
}) => {
  const { driver } = useAuth();

  const [remaingTime, setRemaingTime] = useState<
    | {
        days: number;
        hours: number;
        minutes: number;
      }
    | undefined
  >(undefined);
  /* -------------------------------------------------------------------------- */
  /*                                   ACTIONS                                  */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    let end = DateTime.fromISO(activeCard.expiresAt);

    let now = DateTime.now();
    let diff = end.diff(now, ['days', 'hours', 'minutes', 'seconds']);
    diff.toObject();
    setRemaingTime({
      days: diff.days,
      hours: diff.hours,
      minutes: diff.minutes,
    });

    return () => {};
  }, [activeCard.expiresAt]);

  const confirmHandler = async () => {
    if (driver?.id) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const response: AxiosResponse = await axios.post(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/driver/card/cancel`,
          {
            driverId: driver.id,
            cardId: activeCard.id,
            expiresAt: activeCard.expiresAt,
          },
          { withCredentials: true }
        );

        if (response.data.success) {
          window.location.reload();
        }
      } catch (error) {
        throw error;
      }
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto'
          onClose={closeModal}
        >
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-black opacity-75' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='inline-block h-screen align-top'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div className='my-16 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900'
                >
                  Είστε σίγουροι ότι θέλετε να λήξετε τη στάθμευση σας;
                </Dialog.Title>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>
                    Επιλέγοντας{' '}
                    <span className='font-medium text-gray-800'>
                      "Επιβεβαίωση"
                    </span>{' '}
                    θα σας προστεθούν
                    {remaingTime &&
                      (remaingTime.hours === 0 && remaingTime.minutes > 0 ? (
                        <span className='font-medium text-gray-800'>
                          {' '}
                          {remaingTime.minutes} λεπτά{' '}
                        </span>
                      ) : remaingTime.hours > 1 && remaingTime.minutes > 0 ? (
                        <span className='font-medium text-gray-800'>
                          {' '}
                          {remaingTime.hours} ώρες και {remaingTime.minutes}{' '}
                          λεπτά{' '}
                        </span>
                      ) : remaingTime.hours === 1 && remaingTime.minutes > 0 ? (
                        <span className='font-medium text-gray-800'>
                          {' '}
                          1 ώρα και {remaingTime.minutes} λεπτά{' '}
                        </span>
                      ) : null)}
                    για χρήση στην επόμενή σας στάθμευση.
                  </p>
                </div>

                <div className='mt-4'>
                  <button
                    type='button'
                    className='inline-flex justify-center rounded-md border border-transparent bg-yellow-300 px-4 py-2 text-sm font-medium shadow hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                    onClick={() => {
                      closeModal();
                      confirmHandler();
                    }}
                  >
                    Επιβεβαίωση
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CancelActiveCardModal;
