import '../StepTwo.css';
import axios, { AxiosResponse } from 'axios';
import { FormEvent, useState } from 'react';
import useAuth from '../../../../../../../../common/contexts/AuthContext';
import { classNames } from '../../../../../../../../common/utils/classnames';

const VehicleInfoForm = ({
  vehicleName,
  licensePlate,
  liftVehicleName,
  liftLicensePlate,
}: {
  vehicleName: string;
  licensePlate: string;
  liftVehicleName: (value: string) => void;
  liftLicensePlate: (value: string) => void;
}) => {
  const { driver } = useAuth();

  const [errors, setErrors] = useState<any>(undefined);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response: AxiosResponse = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/driver/${driver?.id}/insert/vehicle`,
        { vehicleName, licensePlate },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        console.log('Vehicle saved successfully');
      } else {
        setErrors(response.data.err);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className='mt-4 w-full flex flex-col items-end rounded bg-white p-4 shadow'
    >
      <div className='mb-3 w-full text-sm font-semibold'>
        Πληροφορίες οχήματος:
      </div>
      <div className='relative mb-2 flex w-full flex-col text-gray-700'>
        <input
          className={classNames(
            errors?.vehicleName ? 'form-input-error' : 'form-input'
          )}
          type='text'
          name='vehicle-name'
          value={vehicleName}
          onChange={(e) => liftVehicleName(e.target.value)}
          placeholder='Ονομασία οχήματος'
        />
        {errors?.vehicleName && (
          <div className='mt-1 text-sm font-medium text-red-700'>
            {errors.vehicleName}
          </div>
        )}
      </div>
      <div className='flex-flex-col relative mb-2 w-full text-gray-700'>
        <input
          className={classNames(
            errors?.licensePlate ? 'form-input-error' : 'form-input'
          )}
          type='text'
          name='license-plate'
          value={licensePlate}
          onChange={(e) => liftLicensePlate(e.target.value)}
          placeholder='Αριθμός κυκλοφορίας οχήματος'
        />
        {errors?.licensePlate && (
          <div className='mt-1 text-sm font-medium text-red-700'>
            {errors.licensePlate}
          </div>
        )}
      </div>
      <button
        type='submit'
        className='max-w-min rounded bg-blue-600 px-3 py-0.5 text-sm text-white'
      >
        Αποθήκευση
      </button>
    </form>
  );
};

export default VehicleInfoForm;
