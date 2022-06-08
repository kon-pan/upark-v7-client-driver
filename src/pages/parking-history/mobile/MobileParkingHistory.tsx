import { useSidebar } from '../../../common/stores/SidebarStore';
import { IInactiveCard } from '../../../common/interfaces/interfaces';
import { useEffect, useRef, useState } from 'react';
import { DateTime } from 'luxon';
import DetailsModal from '../common/components/DetailsModal';

const MobileParkingHistory = ({
  inactiveCards,
}: {
  inactiveCards: IInactiveCard[];
}) => {
  const { setSidebarOpen, sidebarOpen } = useSidebar();

  const itemsPerPage = 5;
  const totalPageCount = Math.ceil(inactiveCards.length / itemsPerPage);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(inactiveCards.slice(0, itemsPerPage));
  const [details, setDetails] = useState<IInactiveCard | undefined>(undefined);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const loader = useRef(null);

  const handleObserver = (entities: any) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      threshold: 1.0,
    };
    // initialize IntersectionObserver and attach it to Load More div
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

  useEffect(() => {
    if (page === 1) {
      setItems(inactiveCards.slice(0, itemsPerPage));
    }

    if (page > 1) {
      setItems(
        items.concat(
          inactiveCards.slice((page - 1) * itemsPerPage, page * itemsPerPage)
        )
      );
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  function openDetailsModal() {
    setIsDetailsModalOpen(true);
  }

  function closeDetailsModal() {
    setIsDetailsModalOpen(false);
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
        Ιστορικό σταθμεύσεων
      </div>
      <div className='flex w-full flex-col items-center'>
        {items.map((item) => {
          return (
            <div
              className='mb-3 flex w-10/12 flex-col justify-between rounded border bg-white shadow-md'
              key={item.id}
              id={`${item.id}`}
              // onClick={}
            >
              <div className='px-4'>
                {/* Address */}
                <div className='mt-2 flex w-full border-b py-1'>
                  <div className='flex w-2/12 items-center justify-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                  <div className='w-10/12 text-center'>
                    <div>{item.addressName}</div>
                  </div>
                </div>
                {/* Vehicle name */}
                <div className='flex w-full border-b py-1'>
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
                    <div>{item.vehicleName}</div>
                  </div>
                </div>
                {/* Date */}
                <div className='flex w-full py-1'>
                  <div className='flex w-2/12 items-center justify-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                  <div className='w-10/12 text-center'>
                    <div>
                      {DateTime.fromISO(item.startsAt)
                        .toLocal()
                        .toLocaleString(DateTime.DATETIME_MED)}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setDetails({
                    addressId: item.addressId,
                    addressName: item.addressName,
                    cancelled: item.cancelled,
                    cost: item.cost,
                    driverId: item.driverId,
                    duration: item.duration,
                    expired: item.expired,
                    id: item.id,
                    licensePlate: item.licensePlate,
                    startsAt: item.startsAt,
                    vehicleName: item.vehicleName,
                  });
                  openDetailsModal();
                }}
                className='mt-2 w-full bg-neutral-100 p-1.5 font-medium shadow-md'
              >
                Λεπτομέρειες
              </button>
              {/* <button
                onClick={() => {
                  setDetails({
                    addressId: item.addressId,
                    addressName: item.addressName,
                    cancelled: item.cancelled,
                    cost: item.cost,
                    driverId: item.driverId,
                    duration: item.duration,
                    expired: item.expired,
                    id: item.id,
                    licensePlate: item.licensePlate,
                    startsAt: item.startsAt,
                    vehicleName: item.vehicleName,
                  });
                  openDetailsModal();
                }}
                className='my-2 mx-auto w-fit rounded-full border bg-neutral-50 p-2 font-medium shadow-md'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z' />
                </svg>
              </button> */}
            </div>
          );
        })}
      </div>

      {/* Details Modal */}
      {isDetailsModalOpen && details && (
        <DetailsModal
          isOpen={isDetailsModalOpen}
          closeModal={closeDetailsModal}
          details={details}
        />
      )}

      <div className='mb-4 flex w-10/12 justify-center ' ref={loader}>
        {page > totalPageCount ? (
          <div className='w-full border bg-white py-2 text-center shadow-md'>
            Τέλος αποτελεσμάτων.
          </div>
        ) : (
          <div
            style={{ borderTopColor: 'transparent' }}
            className='my-2 h-10 w-10 animate-spin rounded-full border-4 border-solid border-neutral-400'
          ></div>
        )}
      </div>
    </div>
  );
};

export default MobileParkingHistory;
