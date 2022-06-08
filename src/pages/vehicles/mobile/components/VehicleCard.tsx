import { IVehicle } from '../../../../common/interfaces/interfaces';

const VehicleCard = ({
  vehicle,
  liftVehicle,
  isRemoveVehicleModalOpen,
  openRemoveVehicleModal,
  closeRemoveVehicleModal,
  isEditVehicleModalOpen,
  openEditVehicleModal,
  closeEditVehicleModal,
  isDownloadQrModalOpen,
  openDownloadQrModal,
  closeDownloadQrModal,
}: {
  vehicle: IVehicle;
  liftVehicle: (value: IVehicle) => void;
  isRemoveVehicleModalOpen: boolean;
  openRemoveVehicleModal: () => void;
  closeRemoveVehicleModal: () => void;
  isEditVehicleModalOpen: boolean;
  openEditVehicleModal: () => void;
  closeEditVehicleModal: () => void;
  isDownloadQrModalOpen: boolean;
  openDownloadQrModal: () => void;
  closeDownloadQrModal: () => void;
}) => {
  return (
    <div className='mt-3 flex w-10/12 flex-col items-center rounded border bg-white shadow-md'>
      <div className='flex w-full flex-col pt-2 pb-1'>
        {/* Vehicle name */}
        <div className='flex w-full border-b pb-1'>
          <div className='flex w-2/12 items-center justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
            >
              <path d='M23.5 7c.276 0 .5.224.5.5v.511c0 .793-.926.989-1.616.989l-1.086-2h2.202zm-1.441 3.506c.639 1.186.946 2.252.946 3.666 0 1.37-.397 2.533-1.005 3.981v1.847c0 .552-.448 1-1 1h-1.5c-.552 0-1-.448-1-1v-1h-13v1c0 .552-.448 1-1 1h-1.5c-.552 0-1-.448-1-1v-1.847c-.608-1.448-1.005-2.611-1.005-3.981 0-1.414.307-2.48.946-3.666.829-1.537 1.851-3.453 2.93-5.252.828-1.382 1.262-1.707 2.278-1.889 1.532-.275 2.918-.365 4.851-.365s3.319.09 4.851.365c1.016.182 1.45.507 2.278 1.889 1.079 1.799 2.101 3.715 2.93 5.252zm-16.059 2.994c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm10 1c0-.276-.224-.5-.5-.5h-7c-.276 0-.5.224-.5.5s.224.5.5.5h7c.276 0 .5-.224.5-.5zm2.941-5.527s-.74-1.826-1.631-3.142c-.202-.298-.515-.502-.869-.566-1.511-.272-2.835-.359-4.441-.359s-2.93.087-4.441.359c-.354.063-.667.267-.869.566-.891 1.315-1.631 3.142-1.631 3.142 1.64.313 4.309.497 6.941.497s5.301-.184 6.941-.497zm2.059 4.527c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm-18.298-6.5h-2.202c-.276 0-.5.224-.5.5v.511c0 .793.926.989 1.616.989l1.086-2z' />
            </svg>
          </div>
          <div className='w-10/12 text-center'>
            <div>{vehicle.name}</div>
          </div>
        </div>
        {/* License plate */}
        <div className='flex w-full pt-1'>
          <div className='flex w-2/12 items-center justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='currentColor'
              viewBox='0 0 16 16'
            >
              <path d='M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961h1.174Zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057h1.138Zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75v.96Z' />
            </svg>
          </div>
          <div className='w-10/12 text-center'>
            <div>{vehicle.licensePlate}</div>
          </div>
        </div>
      </div>

      <div className='flex w-11/12 flex-col space-y-2 py-1'>
        {/* Buttons */}
        <div className='flex w-full space-x-2'>
          <button
            onClick={() => {
              liftVehicle(vehicle);
              openRemoveVehicleModal();
            }}
            className='flex w-1/2 justify-center rounded bg-red-500 py-1.5 font-medium text-white'
          >
            Αφαίρεση
          </button>
          <button
            onClick={() => {
              liftVehicle(vehicle);
              openEditVehicleModal();
            }}
            className='flex w-1/2 justify-center rounded bg-blue-500 py-1.5 font-medium text-white'
          >
            Τροποποίηση
          </button>
        </div>

        {/* Download QR */}
        <button
          onClick={() => {
            liftVehicle(vehicle);
            openDownloadQrModal();
          }}
          className='flex w-full items-center justify-center space-x-1 rounded border bg-neutral-50 py-1.5 font-medium'
        >
          <div>Λήψη QR κωδικού</div>
          <div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z'
                clipRule='evenodd'
              />
              <path d='M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zM16 9a1 1 0 100 2 1 1 0 000-2zM9 13a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zM7 11a1 1 0 100-2H4a1 1 0 100 2h3zM17 13a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM16 17a1 1 0 100-2h-3a1 1 0 100 2h3z' />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;
