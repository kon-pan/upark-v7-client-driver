import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICard } from '../../../../../../common/interfaces/interfaces';

const ExtendActiveCardModal = ({
  isOpen,
  closeModal,
  activeCard,
}: {
  isOpen: boolean;
  closeModal: () => void;
  activeCard: ICard;
}) => {
  const navigate = useNavigate();

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

  const confirmHandler = () => {
    navigate('/park/payment?extend=true', {
      state: {
        cardId: activeCard.id,
        expiresAt: activeCard.expiresAt,
        duration,
        price,
      },
    });
  };

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
                  Επιλέξτε τη χρονική διάρκεια επέκτασης της κάρτας στάθμευσής
                  σας.
                </Dialog.Title>
                <div className='mt-6 flex flex-col'>
                  <div className='flex w-full justify-center'>
                    <div
                      onClick={decrementDuration}
                      className='flex w-12 cursor-pointer items-center justify-center rounded-l bg-blue-600 text-white'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4'
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
                    <div className='w-28 border bg-neutral-200 bg-opacity-50 py-3 text-center'>
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
                      className='flex w-12 cursor-pointer items-center justify-center rounded-r bg-blue-600 text-white'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4'
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

                  <div className='mx-auto flex w-full max-w-xs justify-between py-4'>
                    <div className='font-semibold'>Κόστος:</div>
                    <div>{price} ευρώ</div>
                  </div>
                </div>

                <div className='mt-4'>
                  <button
                    type='button'
                    className='inline-flex justify-center rounded-md border border-transparent bg-yellow-300 px-4 py-2 text-sm font-medium shadow hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                    onClick={() => {
                      confirmHandler();
                      closeModal();
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

export default ExtendActiveCardModal;
