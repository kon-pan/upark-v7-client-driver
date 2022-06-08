import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { IVehicle } from '../../../../../../../../common/interfaces/interfaces';
import CaretDown from '../../icons/CaretDown';

const VehicleDropdown = ({
  vehicles,
  selectedVehicle,
  liftSelectedVehicle,
}: {
  vehicles: IVehicle[];
  selectedVehicle: IVehicle | undefined;
  liftSelectedVehicle: (value: IVehicle) => void;
}) => {
  return (
    <Listbox value={selectedVehicle} onChange={liftSelectedVehicle}>
      <div className='relative mt-1'>
        <Listbox.Button className='relative flex w-full cursor-default appearance-none items-center justify-between rounded border border-gray-200 bg-white px-3 py-1 text-left shadow'>
          <div>
            {selectedVehicle ? selectedVehicle.name : 'Επιλογή οχήματος...'}
          </div>
          <CaretDown />
        </Listbox.Button>

        {vehicles.length > 0 ? (
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none'>
              {vehicles.map((vehicle: any) => (
                <Listbox.Option
                  key={vehicle.vehicleId}
                  className={({ active }) =>
                    `${active ? 'bg-gray-100 text-gray-900' : 'text-gray-900'}
                          relative cursor-pointer select-none py-1 px-3`
                  }
                  value={vehicle}
                >
                  {vehicle.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        ) : null}
      </div>
    </Listbox>
  );
};

export default VehicleDropdown;
