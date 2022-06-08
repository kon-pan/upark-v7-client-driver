import { Transition, Dialog } from '@headlessui/react';
import { DateTime } from 'luxon';
import { Fragment } from 'react';
import { IInactiveCard } from '../../../../common/interfaces/interfaces';

type DetailsModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  details: IInactiveCard;
};

const DetailsModal = ({ isOpen, closeModal, details }: DetailsModalProps) => {
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
                  Λεπτομέρειες στάθμευσης
                </Dialog.Title>
                <div className='mt-2 flex flex-col'>
                  <div className='flex justify-between border-b py-2 text-sm'>
                    <div className='font-medium'>Οδός στάθμευσης</div>
                    <div>{details.addressName}</div>
                  </div>
                  <div className='flex justify-between border-b py-2 text-sm'>
                    <div className='font-medium'>Ημερ. στάθμευσης</div>
                    <div>
                      {DateTime.fromISO(details.startsAt)
                        .toLocal()
                        .toLocaleString(DateTime.DATETIME_MED)}
                    </div>
                  </div>
                  <div className='flex justify-between border-b py-2 text-sm'>
                    <div className='font-medium'>Όχημα</div>
                    <div>{details.vehicleName}</div>
                  </div>
                  <div className='flex justify-between border-b py-2 text-sm'>
                    <div className='font-medium'>Αρ. κυκλοφορίας</div>
                    <div>{details.licensePlate}</div>
                  </div>
                  <div className='flex justify-between border-b py-2 text-sm'>
                    <div className='font-medium'>Διάρκεια στάθμευσης</div>
                    <div>
                      {parseInt(details.duration) === 30
                        ? '30 λεπτά'
                        : parseInt(details.duration) === 60
                        ? '1 ώρα'
                        : parseInt(details.duration) === 90
                        ? '1.5 ώρα'
                        : parseInt(details.duration) > 90 &&
                          parseInt(details.duration) < 1440
                        ? `${parseInt(details.duration) / 60} ώρες`
                        : parseInt(details.duration) >= 1440 &&
                          parseInt(details.duration) / 60 / 24 === 1
                        ? `1 ημέρα`
                        : parseInt(details.duration) >= 1440 &&
                          parseInt(details.duration) / 60 / 24 > 1
                        ? `${parseInt(details.duration) / 60 / 24} ημέρες`
                        : null}
                    </div>
                  </div>
                  <div className='flex justify-between border-b py-2 text-sm'>
                    <div className='font-medium'>Κόστος</div>
                    <div>{details.cost} ευρώ</div>
                  </div>
                  <div className='flex items-center justify-between py-2 text-sm'>
                    <div className='font-medium'>Κατάσταση</div>
                    <div>
                      {!details.expired && !details.cancelled && (
                        <div className='rounded bg-green-200 py-0.5 px-2 text-xs font-semibold text-green-800'>
                          Ενεργή
                        </div>
                      )}
                      {details.cancelled && (
                        <div className='rounded bg-red-200 py-0.5 px-2 text-xs font-semibold text-red-800'>
                          Ακυρώθηκε
                        </div>
                      )}
                      {details.expired && !details.cancelled && (
                        <div className='text-gray -800 rounded bg-gray-200 py-0.5 px-2 text-xs font-semibold'>
                          Έληξε
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className='mt-4'>
                  <button
                    type='button'
                    className='inline-flex justify-center rounded-md border border-transparent bg-yellow-200 px-4 py-0.5 text-sm font-medium shadow hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                    onClick={closeModal}
                  >
                    Κλείσιμο
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

export default DetailsModal;
