import './EditVehicleModal.css';
import { Dialog, Transition } from '@headlessui/react';
import axios, { AxiosResponse } from 'axios';
import { FormEvent, Fragment, useState } from 'react';
import { IVehicle } from '../../../../common/interfaces/interfaces';
import { classNames } from '../../../../common/utils/classnames';

const EditVehicleModal = ({
  vehicle,
  isOpen,
  closeModal,
  liftEditVehicleSuccess,
}: {
  vehicle: IVehicle;
  isOpen: boolean;
  closeModal: () => void;
  liftEditVehicleSuccess: (value: boolean) => void;
}) => {
  const [vehicleName, setVehicleName] = useState(vehicle.name);
  const [licensePlate, setLicensePlate] = useState(vehicle.licensePlate);
  const [errors, setErrors] = useState<any>(undefined);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response: AxiosResponse = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/driver/update/vehicle/${vehicle.vehicleId}`,
        { vehicleName, licensePlate },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        liftEditVehicleSuccess(true);
        closeModal();
      } else {
        setErrors(response.data.err);
      }
    } catch (error) {
      console.log(error);
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
              <div className='my-16 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900'
                >
                  Τροποποίηση οχήματος
                </Dialog.Title>
                <div className='mt-2 flex flex-col'>
                  <div className='text-sm font-light'>
                    Συμπληρώστε τα πεδία της παρακάτω φόρμας.
                  </div>
                  <form onSubmit={submitHandler} className='mt-2 flex flex-col'>
                    <div className='relative mb-2 text-gray-700'>
                      <input
                        className={classNames(
                          errors?.vehicleName
                            ? 'form-input-error'
                            : 'form-input'
                        )}
                        type='text'
                        name='vehicle-name'
                        value={vehicleName}
                        onChange={(e) => setVehicleName(e.target.value)}
                        placeholder='Ονομασία οχήματος'
                      />
                      {errors?.vehicleName && (
                        <div className='mt-1 text-sm font-medium text-red-700'>
                          {errors.vehicleName}
                        </div>
                      )}
                    </div>
                    <div className='relative mb-2 text-gray-700'>
                      <input
                        className={classNames(
                          errors?.licensePlate
                            ? 'form-input-error'
                            : 'form-input'
                        )}
                        type='text'
                        name='license-plate'
                        value={licensePlate}
                        onChange={(e) => setLicensePlate(e.target.value)}
                        placeholder='Αριθμός κυκλοφορίας οχήματος'
                      />
                      {errors?.licensePlate && (
                        <div className='mt-1 text-sm font-medium text-red-700'>
                          {errors.licensePlate}
                        </div>
                      )}
                    </div>

                    <div className='mt-4 flex justify-end space-x-2'>
                      <button
                        type='button'
                        className='justify-center rounded-md border border-transparent bg-gray-200 px-4 py-0.5 text-sm font-medium shadow hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
                        onClick={closeModal}
                      >
                        Κλείσιμο
                      </button>
                      <button
                        type='submit'
                        className='justify-center rounded-md border border-transparent bg-yellow-300 px-4 py-0.5 text-sm font-medium shadow hover:bg-yellow-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
                      >
                        Αποθήκευση
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default EditVehicleModal;
