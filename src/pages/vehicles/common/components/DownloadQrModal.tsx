import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import useAuth from '../../../../common/contexts/AuthContext';
import QrCode from 'qrcode.react';
import { IVehicle } from '../../../../common/interfaces/interfaces';

const DownloadQrModal = ({
  vehicle,
  isOpen,
  closeModal,
}: {
  vehicle: IVehicle;
  isOpen: boolean;
  closeModal: () => void;
}) => {
  const { driver } = useAuth();

  const [qrCanvasSize] = useState(window.innerWidth > 1024 ? 240 : 180);

  const qrRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef(null);

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector('canvas')!;
    let image = canvas.toDataURL('image/png')!;
    let anchor = document.createElement('a')!;
    anchor.href = image;
    anchor.download = 'upark-qr-code.png';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          initialFocus={closeButtonRef}
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto'
          onClose={closeModal}
        >
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-black opacity-75' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='inline-block h-screen align-top'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div className='my-16 inline-block w-full max-w-md transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900'
                >
                  Λήψη QR κωδικού
                </Dialog.Title>
                <div className='mt-2 flex flex-col items-center'>
                  <div className='text-sm font-light'>
                    Αποθηκεύστε και εκτυπώστε τον παρακάτω QR κωδικό και
                    τοποθετήστε τον στο όχημα σας.
                  </div>

                  <div
                    ref={qrRef}
                    id='qr-container'
                    className='rounded border bg-white p-4 shadow-md'
                  >
                    <QrCode
                      size={qrCanvasSize}
                      value={JSON.stringify({
                        driverId: driver?.id,
                        vehicleName: vehicle.name,
                        licensePlate: vehicle.licensePlate,
                      })}
                      imageSettings={{
                        src: '/favicon.ico',
                        x: undefined,
                        y: undefined,
                        height: 24,
                        width: 24,
                        excavate: true,
                      }}
                    />
                  </div>

                  <div className='mt-4 flex justify-end space-x-2'>
                    <button
                      ref={closeButtonRef}
                      type='button'
                      className='justify-center rounded-md border border-transparent bg-neutral-200 px-4 py-0.5 text-sm font-medium shadow hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
                      onClick={closeModal}
                    >
                      Κλείσιμο
                    </button>
                    <button
                      onClick={downloadQR}
                      type='submit'
                      className='justify-center rounded-md border border-transparent bg-yellow-300 px-4 py-0.5 text-sm font-medium shadow hover:bg-yellow-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
                    >
                      Αποθήκευση
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DownloadQrModal;
