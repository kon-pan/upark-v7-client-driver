import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useAuth from '../../common/contexts/AuthContext';
import { ScreenSizeContext } from '../../common/contexts/ScreenSizeContext';
import { classNames } from '../../common/utils/classnames';

const LoginForm = () => {
  const screen = useContext(ScreenSizeContext);
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();

  const [error, setError] = useState('');

  const onSubmit = async (data: any) => {
    const success = await login(data.email, data.password);
    if (success) {
      window.location.href = '/';
    } else {
      setError(
        'Λάθος συνδυασμός διεύθυνσης ηλ. ταχυδρομείου/κωδικού πρόσβασης. Προσπαθήστε ξανά.'
      );
    }
  };

  return (
    <form
      id='login-form'
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
      {error && (
        <div className='mt-1 mb-2 rounded border-red-700 bg-red-100 p-2 text-center text-sm font-medium text-red-800 shadow-md'>
          {error}
        </div>
      )}
      <div className='flex flex-col'>
        <div className='mb-1'>
          <label className='text-sm font-semibold' htmlFor='email'>
            Διεύθυνση ηλ. ταχυδρομείου
          </label>
          <input id='email' {...register('email')} type='text' />
        </div>

        <div className='mb-3'>
          <label className='text-sm font-semibold' htmlFor='email'>
            Κωδικός πρόσβασης
          </label>
          <input {...register('password')} type='password' />
        </div>

        <button
          type='submit'
          className='flex justify-center rounded hover:bg-yellow-400 bg-yellow-300 py-1.5 text-lg font-semibold text-neutral-900 shadow-md'
        >
          Είσοδος
        </button>
      </div>

      <div className='mt-4 flex flex-col items-center'>
        <div className='text-sm'>
          Δεν έχετε λογαριασμό;{' '}
          <Link className='font-medium text-blue-700 hover:underline' to='/register'>
            Εγγραφή
          </Link>{' '}
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
