import { Dialog, Transition } from '@headlessui/react';
import axios, { AxiosResponse } from 'axios';
import { Fragment } from 'react';
import { IVehicle } from '../../../../common/interfaces/interfaces';

const RemoveVehicleModal = ({
  vehicle,
  isOpen,
  closeModal,
  liftRemoveVehicleSuccess,
}: {
  vehicle: IVehicle;
  isOpen: boolean;
  closeModal: () => void;
  liftRemoveVehicleSuccess: (value: boolean) => void;
}) => {
  const removeVehicle = async () => {
    const response: AxiosResponse = await axios.get(
      `${process.env.REACT_APP_SERVER_HOSTNAME}/driver/delete/vehicle/${vehicle.vehicleId}`,
      { withCredentials: true }
    );

    const data: { success: boolean } = response.data;

    if (data.success) {
      liftRemoveVehicleSuccess(true);
      closeModal();
    } else {
      console.log('Could not remove');
    }
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
              <div className='my-16 inline-block w-full max-w-md transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900'
                >
                  Αφαίρεση οχήματος
                </Dialog.Title>
                <div className='mt-2 flex flex-col'>
                  <div className='text-sm font-light'>
                    Είστε σίγουροι ότι θέλετε να αφαιρέσετε το όχημα{' '}
                    <span className='font-medium'>{vehicle.name}</span> με
                    αριθμό κυκλοφορίας{' '}
                    <span className='font-medium'>{vehicle.licensePlate}</span>;
                  </div>
                  <div className='mt-4 flex justify-end space-x-2'>
                    <button
                      type='button'
                      className='justify-center rounded-md border border-transparent bg-gray-200 px-4 py-0.5 text-sm font-medium shadow hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
                      onClick={closeModal}
                    >
                      Ακύρωση
                    </button>
                    <button
                      onClick={removeVehicle}
                      type='button'
                      className='justify-center rounded-md border border-transparent bg-yellow-300 px-4 py-0.5 text-sm font-medium shadow hover:bg-yellow-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
                    >
                      Επιβεβαίωση
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default RemoveVehicleModal;
