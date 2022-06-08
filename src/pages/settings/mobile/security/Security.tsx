import React from 'react';
import { Link } from 'react-router-dom';
import BasicLayout from '../../../../common/components/layout/basic/BasicLayout';
import { useSidebar } from '../../../../common/stores/SidebarStore';

const Security = () => {
  const { setSidebarOpen, sidebarOpen } = useSidebar();

  return (
    <BasicLayout>
      <div
        onClick={() => {
          sidebarOpen && setSidebarOpen(false);
        }}
        className='flex w-full flex-col items-center'
      >
        {/* Header */}
        <div className='mb-4 w-full border-b bg-white py-3 text-center text-lg font-medium shadow'>
          Ασφάλεια λογαριασμού
        </div>

        {/* Row */}
        <div className='flex w-full flex-col items-center'>
          <Link
            to='/settings/security/password'
            className='mb-2 flex w-11/12 items-center justify-between rounded border bg-white shadow-md'
          >
            <div className='px-4 py-2 font-medium'>Κωδικός πρόσβασης</div>
            <div className='p-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          </Link>
        </div>

        {/* Row */}
        <div className='mt-16 flex w-full flex-col items-center'>
          <Link
            to='/settings'
            className='flex items-center justify-center rounded border bg-white px-4 py-1 font-medium shadow-md'
          >
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <div>Πίσω</div>
          </Link>
        </div>
      </div>
    </BasicLayout>
  );
};

export default Security;
