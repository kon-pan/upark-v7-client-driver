import './MobileSettings.css';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '../../../common/stores/SidebarStore';

const MobileSettings = () => {
  const { setSidebarOpen, sidebarOpen } = useSidebar();
  const navigate = useNavigate();

  return (
    <>
      <div
        onClick={() => {
          sidebarOpen && setSidebarOpen(false);
        }}
        className='flex w-full flex-col'
      >
        {/* Header */}
        <div className='mb-4 w-full border-b bg-white py-3 text-center text-lg font-medium shadow'>
          Ρυθμίσεις
        </div>

        {/* Row */}
        <div className='flex justify-evenly'>
          <div
            onClick={() => {
              navigate('/settings/user-info');
            }}
            className='flex h-36 w-40 cursor-pointer flex-col items-center justify-center rounded border bg-white shadow-md'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-8'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z'
                clipRule='evenodd'
              />
            </svg>

            <div className='text-center font-medium'>Πληροφορίες χρήστη</div>
          </div>

          <div
            onClick={() => {
              navigate('/settings/security');
            }}
            className='flex h-36 w-40 cursor-pointer flex-col items-center justify-center rounded border bg-white shadow-md'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-8'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                clipRule='evenodd'
              />
            </svg>
            <div className='text-center font-medium'>Ασφάλεια λογαριασμού</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSettings;
