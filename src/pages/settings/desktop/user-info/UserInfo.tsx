import { Transition } from '@headlessui/react';
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import BasicLayout from '../../../../common/components/layout/basic/BasicLayout';
import useAuth from '../../../../common/contexts/AuthContext';
import { useSidebar } from '../../../../common/stores/SidebarStore';
import { classNames } from '../../../../common/utils/classnames';
import { sleep } from '../../../../common/utils/sleep';
import CaretRight from '../common/icons/CaretRight';

const UserInfo = () => {
  const { setSidebarOpen, sidebarOpen } = useSidebar();
  const { register, handleSubmit } = useForm();
  const { driver } = useAuth();

  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [errors, setErrors] = useState<any>(undefined);
  const [submitting, setSubmitting] = useState(false);

  const onPersonalInfoSubmit = async (data: any) => {
    setSubmitting(true);
    await sleep(1000);

    const { firstName, lastName } = data;

    try {
      const response: AxiosResponse = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/driver/${driver?.id}/account/personal-info/update`,
        { firstName, lastName },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        window.location.reload();
      } else {
        setErrors(response.data.err);
      }

      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onContactInfoSubmit = async (data: any) => {
    setSubmitting(true);
    await sleep(1000);

    const { email } = data;

    try {
      const response: AxiosResponse = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/driver/${driver?.id}/account/contact-info/update`,
        { email },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        window.location.reload();
      } else {
        setErrors(response.data.err);
      }

      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BasicLayout>
      <div
        className='z-0 flex w-full flex-1 flex-col items-center'
        onClick={() => {
          sidebarOpen && setSidebarOpen(false);
        }}
      >
        <div className='w-11/12'>
          {/* Header */}
          <Link
            to='/settings'
            className='mb-4 flex w-full items-center space-x-2 border-b py-3'
          >
            <div className='cursor-pointer text-2xl font-medium hover:underline hover:underline-offset-2'>
              Ρυθμίσεις
            </div>
            <CaretRight />
            <div className='text-2xl font-medium'>Πληροφορίες χρήστη</div>
          </Link>

          {/* Row */}
          <div className='flex flex-col items-center space-y-2'>
            <div className='flex w-10/12 flex-col rounded border bg-white px-6 py-2 font-medium shadow-md'>
              <div
                className={classNames(
                  'flex items-center justify-between',
                  showPersonalInfo ? 'border-b pb-2' : ''
                )}
              >
                <div>Προσωπικά στοιχεία</div>
                <div
                  onClick={() => {
                    setShowContactInfo(false);
                    setShowPersonalInfo(!showPersonalInfo);
                  }}
                  className='cursor-pointer text-sm text-blue-600 hover:underline'
                >
                  {showPersonalInfo ? 'Κλείσιμο' : 'Αλλαγή'}
                </div>
              </div>
              <Transition
                as='form'
                onSubmit={handleSubmit(onPersonalInfoSubmit)}
                show={showPersonalInfo}
                enter='transition-opacity duration-75'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='transition-opacity duration-75'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
                className='flex flex-col items-center px-4 py-2 text-sm font-normal'
              >
                <div className='mb-2 flex w-1/3 flex-col'>
                  <label htmlFor='' className='font-medium'>
                    Όνομα
                  </label>
                  <input
                    defaultValue={driver?.firstName}
                    {...register('firstName')}
                    type='text'
                    placeholder='Όνομα'
                    className={classNames(
                      errors?.firstName ? 'form-input-error' : 'form-input'
                    )}
                  />
                  {errors?.firstName && (
                    <div className='mt-1 text-sm font-medium text-red-700'>
                      {errors.firstName}
                    </div>
                  )}
                </div>
                <div className='mb-4 flex w-1/3 flex-col'>
                  <label htmlFor='' className='font-medium'>
                    Επώνυμο
                  </label>
                  <input
                    defaultValue={driver?.lastName}
                    {...register('lastName')}
                    type='text'
                    placeholder='Επώνυμο'
                    className={classNames(
                      errors?.lastName ? 'form-input-error' : 'form-input'
                    )}
                  />
                  {errors?.lastName && (
                    <div className='mt-1 text-sm font-medium text-red-700'>
                      {errors.lastName}
                    </div>
                  )}
                </div>
                <div className='flex w-1/3 items-center space-x-2'>
                  <button
                    type='submit'
                    className='rounded bg-blue-600 px-2 py-0.5 text-sm font-medium text-white'
                  >
                    {submitting ? (
                      <div className='flex items-center justify-center'>
                        <div className='mr-2'>Περιμένετε</div>
                        <div
                          style={{ borderTopColor: 'transparent' }}
                          className='my-0.5 h-3 w-3 animate-spin rounded-full border-2 border-solid border-white'
                        ></div>
                      </div>
                    ) : (
                      'Αποθήκευση'
                    )}
                  </button>
                  <button
                    type='button'
                    className='rounded border px-2 py-0.5 text-sm font-normal'
                  >
                    Ακύρωση
                  </button>
                </div>
              </Transition>
            </div>
            <div className='flex w-10/12 flex-col rounded border bg-white px-6 py-2 font-medium shadow-md'>
              <div
                className={classNames(
                  'flex items-center justify-between',
                  showContactInfo ? 'border-b pb-2' : ''
                )}
              >
                <div>Στοιχεία επικοινωνίας</div>
                <div
                  onClick={() => {
                    setShowPersonalInfo(false);
                    setShowContactInfo(!showContactInfo);
                  }}
                  className='cursor-pointer text-sm text-blue-600 hover:underline'
                >
                  {showContactInfo ? 'Κλείσιμο' : 'Αλλαγή'}
                </div>
              </div>
              <Transition
                as='form'
                onSubmit={handleSubmit(onContactInfoSubmit)}
                show={showContactInfo}
                enter='transition-opacity duration-75'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='transition-opacity duration-75'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
                className='flex flex-col items-center px-4 py-2 text-sm font-normal'
              >
                <div className='mb-4 flex w-1/3 flex-col'>
                  <label htmlFor='' className='font-medium'>
                    Διεύθυνση ηλ. ταχυδρομείου
                  </label>
                  <input
                    defaultValue={driver?.email}
                    {...register('email')}
                    type='text'
                    placeholder='Διεύθυνση ηλ. ταχυδρομείου'
                    className={classNames(
                      errors?.email ? 'form-input-error' : 'form-input'
                    )}
                  />
                  {errors?.email && (
                    <div className='mt-1 text-sm font-medium text-red-700'>
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className='flex w-1/3 items-center space-x-2 pt-2'>
                  <button
                    type='submit'
                    className='rounded bg-blue-600 px-2 py-0.5 text-sm font-medium text-white'
                  >
                    {submitting ? (
                      <div className='flex items-center justify-center'>
                        <div className='mr-2'>Περιμένετε</div>
                        <div
                          style={{ borderTopColor: 'transparent' }}
                          className='my-0.5 h-3 w-3 animate-spin rounded-full border-2 border-solid border-white'
                        ></div>
                      </div>
                    ) : (
                      'Αποθήκευση'
                    )}
                  </button>
                  <button
                    type='button'
                    className='rounded border px-2 py-0.5 text-sm font-normal'
                  >
                    Ακύρωση
                  </button>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default UserInfo;
