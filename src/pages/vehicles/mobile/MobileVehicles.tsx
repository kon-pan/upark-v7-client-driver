import './MobileVehicles.css';
import { useState } from 'react';
import { IVehicle } from '../../../common/interfaces/interfaces';
import AddVehicleModal from './components/AddVehicleModal';
import VehicleCard from './components/VehicleCard';
import { useSidebar } from '../../../common/stores/SidebarStore';
import DownloadQrModal from '../common/components/DownloadQrModal';
import RemoveVehicleModal from '../common/components/RemoveVehicleModal';
import EditVehicleModal from '../common/components/EditVehicleModal';

const MobileVehicles = ({
  vehicles,
  liftAddVehicleSuccess,
  liftRemoveVehicleSuccess,
  liftEditVehicleSuccess,
}: {
  vehicles: IVehicle[];
  liftAddVehicleSuccess: (value: boolean) => void;
  liftRemoveVehicleSuccess: (value: boolean) => void;
  liftEditVehicleSuccess: (value: boolean) => void;
}) => {
  const { setSidebarOpen, sidebarOpen } = useSidebar();

  const [vehicle, setVehicle] = useState<IVehicle>();
  const [isAddVehicleModalOpen, setIsAddVehicleModalOpen] = useState(false);
  const [isRemoveVehicleModalOpen, setIsRemoveVehicleModalOpen] =
    useState(false);
  const [isEditVehicleModalOpen, setIsEditVehicleModalOpen] = useState(false);
  const [isDownloadQrModalOpen, setIsDownloadQrModalOpen] = useState(false);

  function closeAddVehicleModal() {
    setIsAddVehicleModalOpen(false);
  }

  function openRemoveVehicleModal() {
    setIsRemoveVehicleModalOpen(true);
  }
  function closeRemoveVehicleModal() {
    setIsRemoveVehicleModalOpen(false);
  }

  function openEditVehicleModal() {
    setIsEditVehicleModalOpen(true);
  }
  function closeEditVehicleModal() {
    setIsEditVehicleModalOpen(false);
  }

  function openDownloadQrModal() {
    setIsDownloadQrModalOpen(true);
  }
  function closeDownloadQrModal() {
    setIsDownloadQrModalOpen(false);
  }

  function liftVehicle(value: IVehicle) {
    setVehicle(value);
  }

  return (
    <div
      className='z-0 flex w-full flex-1 flex-col items-center'
      onClick={() => {
        sidebarOpen && setSidebarOpen(false);
      }}
    >
      {/* Header */}
      <div className='mb-2 w-full border-b bg-white py-3 text-center text-lg font-medium shadow'>
        Διαχείριση οχημάτων
      </div>
      {vehicles.length > 0 && (
        <>
          {vehicles.map((vehicle) => {
            return (
              <VehicleCard
                key={vehicle.vehicleId}
                vehicle={vehicle}
                liftVehicle={liftVehicle}
                isRemoveVehicleModalOpen={isRemoveVehicleModalOpen}
                openRemoveVehicleModal={openRemoveVehicleModal}
                closeRemoveVehicleModal={closeRemoveVehicleModal}
                isEditVehicleModalOpen={isEditVehicleModalOpen}
                openEditVehicleModal={openEditVehicleModal}
                closeEditVehicleModal={closeEditVehicleModal}
                isDownloadQrModalOpen={isDownloadQrModalOpen}
                openDownloadQrModal={openDownloadQrModal}
                closeDownloadQrModal={closeDownloadQrModal}
              />
            );
          })}
        </>
      )}

      {vehicles.length === 0 && (
        <div className='mt-12 flex w-10/12'>
          <div className='flex items-center space-x-2 rounded border bg-white shadow-md'>
            {/* Info icon */}
            <div className='my-auto flex h-full items-center justify-center rounded-l border-r bg-neutral-800 px-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-8 w-8 text-white'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            {/* Text */}
            <div className='px-2 py-4 text-left text-xs'>
              Δεν έχετε αποθηκεύσει κάποιο όχημα. Αποθηκεύοντας ένα όχημα
              μπόρειτε να απλοποίεισετε τη διαδικασία κατά τη διάρκεια έκδοσης
              κάρτας στάθμευσης!
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => {
          setIsAddVehicleModalOpen(true);
        }}
        className='fixed bottom-5 right-5 z-10 flex items-center space-x-1 rounded bg-yellow-300 px-4 py-2 font-semibold shadow-md'
      >
        <div>Προσθήκη</div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
            clipRule='evenodd'
          />
        </svg>
      </button>

      {/* Modals */}
      {vehicle && (
        <>
          <DownloadQrModal
            vehicle={vehicle}
            isOpen={isDownloadQrModalOpen}
            closeModal={closeDownloadQrModal}
          />
          <RemoveVehicleModal
            vehicle={vehicle}
            isOpen={isRemoveVehicleModalOpen}
            closeModal={closeRemoveVehicleModal}
            liftRemoveVehicleSuccess={liftRemoveVehicleSuccess}
          />
          <EditVehicleModal
            vehicle={vehicle}
            isOpen={isEditVehicleModalOpen}
            closeModal={closeEditVehicleModal}
            liftEditVehicleSuccess={liftEditVehicleSuccess}
          />
        </>
      )}
      <AddVehicleModal
        isOpen={isAddVehicleModalOpen}
        closeModal={closeAddVehicleModal}
        liftAddVehicleSuccess={liftAddVehicleSuccess}
      />
    </div>
  );
};

export default MobileVehicles;
