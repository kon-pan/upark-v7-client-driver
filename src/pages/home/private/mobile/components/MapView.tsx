import React from 'react';
import { useNavigate } from 'react-router-dom';

const MapView = ({ map }: any) => {
  const navigate = useNavigate();

  return (
    <>
      <div className='flex w-full justify-center border-b border-gray-300 bg-white py-2'>
        <div className='w-10/12 text-center text-xs font-semibold'>
          Επιλέγοντας έναν απο τους δείκτες στο χάρτη μπορείτε να ενημερωθείτε
          για τη διαθεσιμότητα των θέσεων στάθμευσης
        </div>
      </div>
      <div className='relative flex h-full w-full justify-center'>
        {map}
        {/* <button className='absolute top-2 right-2 z-10 rounded border-2 border-gray-400 border-opacity-75 bg-white px-2 py-1.5 text-xs font-semibold'>
          Ανανέωση χάρτη
        </button> */}
        <button
          onClick={() => {
            navigate('/park/scan-qr', { replace: true });
          }}
          className='absolute bottom-5 w-10/12 rounded border border-neutral-600 border-opacity-75 bg-yellow-300 py-3 text-center text-2xl font-semibold shadow-md shadow-neutral-600'
        >
          Στάθμευση
        </button>
      </div>
    </>
  );
};

export default MapView;
