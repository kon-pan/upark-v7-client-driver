import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const Input = ({
  liftAddressId,
  liftAddressName,
}: {
  liftAddressId: (value: number) => void;
  liftAddressName: (value: string) => void;
}) => {
  const { register, handleSubmit } = useForm();
  const [addressFound, setAddressFound] = useState<boolean | undefined>(
    undefined
  );

  const onSubmit = async (data: any) => {
    const { addressId }: { addressId: string } = data;

    try {
      const response: AxiosResponse = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/driver/address/${addressId}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.id) {
        setAddressFound(true);
        liftAddressId(response.data.id);
        liftAddressName(response.data.name);
        return;
      }
      setAddressFound(false);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='w-full px-4 py-4 text-center text-sm font-semibold'>
        Εισάγετε τον αναγνωριστικό κωδικό που βρίσκεται στη πινακίδα κοντά στη
        θέση στάθμευσής σας
      </div>
      <form
        className='flex w-3/5  flex-col py-10'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex'>
          <input
            {...register('addressId')}
            type='text'
            placeholder='Αναγνωριστικό θέσης'
            className='h-9 w-full rounded-l border border-r-0 border-neutral-200 pl-3 pr-3 text-sm font-semibold placeholder-neutral-900 shadow'
          />

          <button className='rounded-r border border-l-0 bg-yellow-300 p-1.5 shadow'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>

        {addressFound === false && (
          <div className='mt-4 mb-2 rounded border-red-700 bg-red-100 p-2 text-center text-sm font-medium text-red-800 shadow-md'>
            Δεν βρέθηκε θέση στάθμευσής με το συγκεκριμένο αναγνωριστικό κωδικό.
            Προσπαθήστε ξανά.
          </div>
        )}
      </form>
    </div>
  );
};

export default Input;
