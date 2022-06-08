import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useAuth from '../../common/contexts/AuthContext';
import { ScreenSizeContext } from '../../common/contexts/ScreenSizeContext';
import { classNames } from '../../common/utils/classnames';

const RegisterForm = () => {
  const screen = useContext(ScreenSizeContext);
  const { register: registerInput, handleSubmit } = useForm();
  const { register: registerDriver, loading } = useAuth();

  const [errors, setErrors] = useState<any>(undefined);
  const [success, setSuccess] = useState<boolean | undefined>(undefined);

  const onSubmit = async (data: any) => {
    const response = await registerDriver(
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      data.passwordConfirm
    );

    if (response.success) {
      setSuccess(true);
    } else {
      setErrors(response.err);
    }
  };

  return (
    <form
      id='register-form'
      onSubmit={handleSubmit(onSubmit)}
      className={classNames(
        'flex flex-col rounded border border-neutral-600 bg-white p-4 text-neutral-800 shadow-md shadow-neutral-500',
        screen.isMobile
          ? 'w-10/12'
          : screen.isTablet
          ? 'w-8/12'
          : screen.isSmall
          ? 'w-6/12'
          : screen.isDesktop
          ? 'w-5/12'
          : screen.isLargeDesktop
          ? 'w-4/12'
          : ''
      )}
    >
      <div className='flex flex-col'>
        <div className='mb-2'>
          <input
            {...registerInput('firstName')}
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
        <div className='mb-2'>
          <input
            {...registerInput('lastName')}
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
        <div className='mb-2'>
          <input
            {...registerInput('email')}
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
        <div className='mb-2'>
          <input
            {...registerInput('password')}
            type='password'
            placeholder='Κωδικός πρόσβασης'
            className={classNames(
              errors?.password ? 'form-input-error' : 'form-input'
            )}
          />
          {errors?.password && (
            <div className='mt-1 text-sm font-medium text-red-700'>
              {errors.password}
            </div>
          )}
        </div>
        <div className='mb-4'>
          <input
            {...registerInput('passwordConfirm')}
            type='password'
            placeholder='Επαλήθευση κωδικού πρόσβασης'
            className={classNames(
              errors?.passwordConfirm ? 'form-input-error' : 'form-input'
            )}
          />
          {errors?.passwordConfirm && (
            <div className='mt-1 text-sm font-medium text-red-700'>
              {errors.passwordConfirm}
            </div>
          )}
        </div>

        <button
          type='submit'
          onClick={() => setErrors(undefined)}
          className='flex items-center justify-center rounded bg-yellow-300 py-1.5 text-lg font-semibold text-neutral-900 shadow-md hover:bg-yellow-400'
        >
          {loading ? (
            <>
              <div className='mr-2'>Περιμένετε</div>
              <div
                style={{ borderTopColor: 'transparent' }}
                className='my-0.5 h-5 w-5 animate-spin rounded-full border-2 border-solid border-gray-800'
              ></div>
            </>
          ) : (
            'Εγγραφή'
          )}
        </button>

        {success && (
          <div className='mt-4 flex items-center justify-center rounded bg-green-200 p-4 font-medium text-green-800 shadow'>
            Ο λογαριασμός σας δημιουργήθηκε επιτυχώς. Μπορείτε να συνδεθείτε!
          </div>
        )}
      </div>
      <div className='mt-4 flex flex-col items-center'>
        <div className='text-sm'>
          Έχετε ήδη λογαριασμό;{' '}
          <Link
            className='font-medium text-blue-700  hover:underline'
            to='/login'
          >
            Είσοδος
          </Link>{' '}
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
