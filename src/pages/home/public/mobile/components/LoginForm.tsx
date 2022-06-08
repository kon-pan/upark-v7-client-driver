import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../../../common/contexts/AuthContext';

const LoginForm = () => {
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
      className='flex w-full flex-col p-4'
    >
      {error && (
        <div className='mt-1 rounded border-red-700 bg-red-100 text-center text-sm font-medium text-red-800 shadow-md mb-2 p-2'>
          {error}
        </div>
      )}
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
        className='flex justify-center rounded bg-yellow-300 py-1.5 text-lg font-semibold text-neutral-900 shadow-md'
      >
        Είσοδος
      </button>
    </form>
  );
};

export default LoginForm;
