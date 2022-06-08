import { Dialog, Transition } from '@headlessui/react';
import axios, { AxiosResponse } from 'axios';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../../common/contexts/AuthContext';
import { classNames } from '../../../../common/utils/classnames';

const AddVehicleModal = ({
  isOpen,
  closeModal,
  liftAddVehicleSuccess,
}: {
  isOpen: boolean;
  closeModal: () => void;
  liftAddVehicleSuccess: (value: boolean) => void;
}) => {
  const { driver } = useAuth();
  const { register: registerInput, handleSubmit } = useForm();

  const [errors, setErrors] = useState<any>(undefined);

  const onSubmit = async (data: any) => {
    const vehicleName = data.vehicleName;
    const licensePlate = data.vehicleLicensePlate;

    try {
      const response: AxiosResponse = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/driver/${driver?.id}/insert/vehicle`,
        { vehicleName, licensePlate },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        liftAddVehicleSuccess(true);
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
              <div className='my-16 inline-block w-full max-w-md transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900'
                >
                  Προσθήκη οχήματος
                </Dialog.Title>
                <div className='mt-2 flex flex-col'>
                  <div className='text-sm font-light'>
                    Συμπληρώστε τα πεδία της παρακάτω φόρμας.
                  </div>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='mt-2 flex flex-col'
                  >
                    <div className='relative mb-2 text-gray-700'>
                      <input
                        {...registerInput('vehicleName')}
                        type='text'
                        placeholder='Όνομασία οχήματος'
                        className={classNames(
                          errors?.vehicleName
                            ? 'form-input-error'
                            : 'form-input'
                        )}
                      />
                      {errors?.vehicleName && (
                        <div className='mt-1 text-sm font-medium text-red-700'>
                          {errors.vehicleName}
                        </div>
                      )}
                    </div>
                    <div className='relative mb-2 text-gray-700'>
                      <input
                        {...registerInput('vehicleLicensePlate')}
                        type='text'
                        placeholder='Αριθμός κυκλοφορίας'
                        className={classNames(
                          errors?.licensePlate
                            ? 'form-input-error'
                            : 'form-input'
                        )}
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
                        className='justify-center rounded-md border border-transparent bg-neutral-200 px-4 py-0.5 text-sm font-medium shadow hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
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

export default AddVehicleModal;
