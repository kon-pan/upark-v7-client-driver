import React from 'react';
import { Link } from 'react-router-dom';

const DesktopHome = () => {
  return (
    <div className='flex w-full flex-col'>
      {/* Jumbotron */}
      <div className='flex justify-center py-16'>
        {/* Welcome message */}
        <div className='w-1/3'>
          <div className='mb-3 text-5xl font-semibold'>
            Καλώς ήρθατε στο <span className='font-bold'>uPark</span>
          </div>
          <div className='pr-12 text-2xl'>
            Με το <span className='font-medium'>uPark</span> μπορείτε εύκολα και
            γρήγορα να αγοράσετε κάρτες στάθμευσης για το όχημά σας, μέσω της
            κινήτης συσκευής ή του προσωπικού σας ηλεκτρονικού υπολογιστή.
          </div>
        </div>
        {/* Login/Register */}
        <div className='flex w-1/3 flex-col items-center justify-center'>
          <Link
            to='/register'
            className='rounded bg-blue-500 py-2 px-8 text-xl font-medium text-white shadow-md shadow-neutral-300 hover:bg-blue-600'
          >
            Δημιουργία λογαριασμού
          </Link>
          <div className='my-4 text-2xl font-light'>ή</div>
          <Link
            to='/login'
            className='flex items-center space-x-1 rounded bg-yellow-300 py-2 px-8 text-xl font-medium shadow-md shadow-neutral-300 hover:bg-yellow-400'
          >
            <div>Είσοδος</div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z'
                clipRule='evenodd'
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DesktopHome;
