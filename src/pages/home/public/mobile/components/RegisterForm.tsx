import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../../../common/contexts/AuthContext';
import { classNames } from '../../../../../common/utils/classnames';

const RegisterForm = () => {
  const { register: registerInput, handleSubmit } = useForm();
  const { register: registerDriver, loading } = useAuth();

  const [errors, setErrors] = useState<any>(undefined);

  const onSubmit = async (data: any) => {
    const response = await registerDriver(
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      data.passwordConfirm
    );

    if (response.success) {
      console.log('Successfull registration');
    } else {
      setErrors(response.err);
    }
  };

  return (
    <form
      id='register-form'
      onSubmit={handleSubmit(onSubmit)}
      className='flex w-full flex-col p-4'
    >
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
        className='flex items-center justify-center rounded bg-yellow-300 py-1.5 text-lg font-semibold text-neutral-900 shadow-md'
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
    </form>
  );
};

export default RegisterForm;
