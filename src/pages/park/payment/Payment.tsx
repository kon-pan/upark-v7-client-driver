import { useLocation, useSearchParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import {
  IExtensionInfo,
  INewCard,
} from '../../../common/interfaces/interfaces';
import PaymentForm from './components/PaymentForm';
import { useState } from 'react';
import useAuth from '../../../common/contexts/AuthContext';
import { Duration } from 'luxon';
import axios from 'axios';

const publishableKey = process.env.REACT_APP_STRIPE_PK_KEY!;
const stripePromise = loadStripe(publishableKey);

const Payment = () => {
  const location = useLocation();
  const { driver } = useAuth();
  const [searchParams] = useSearchParams();
  const extend = searchParams.get('extend') === 'true';

  const [purchaseSucceeded, setPurchaseSucceeded] = useState(false);

  const newCard = location.state as INewCard | IExtensionInfo;

  const liftPurchaseSucceeded = (value: boolean) => {
    setPurchaseSucceeded(value);
  };

  const formattedAccumulatedTime = () => {
    const duration = Duration.fromObject({
      minutes: driver?.accumulatedTime,
    });
    const remainingTime = duration.shiftTo('days', 'hours', 'minutes');

    if (remainingTime.days > 0) {
    }

    if (remainingTime.days === 0 && remainingTime.hours > 0) {
      if (remainingTime.hours === 1) {
        return `1 ώρα και ${remainingTime.minutes} λεπτά`;
      }

      return `${remainingTime.hours} ώρες και ${remainingTime.minutes} λεπτά`;
    }

    if (remainingTime.days === 0 && remainingTime.hours === 0) {
      return `${remainingTime.minutes} λεπτά`;
    }
  };

  const accumulatedTimePayment = async () => {
    try {
      if (extend) {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/driver/card/${
            (
              newCard as {
                cardId: number;
                expiresAt: string;
                duration: number;
                price: number;
              }
            ).cardId
          }/extend`,
          // data
          {
            expiresAt: (newCard as IExtensionInfo).expiresAt,
            duration: (newCard as IExtensionInfo).duration,
            price: (newCard as IExtensionInfo).price,
            useAccumulatedTime: true,
          },
          { withCredentials: true }
        );

        setPurchaseSucceeded(response.data.success);

        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/driver/card/insert`,
        { card: newCard, useAccumulatedTime: true },
        { withCredentials: true }
      );

      setPurchaseSucceeded(response.data.success);
    } catch (error) {
      console.log(error);
    }
  };

  return purchaseSucceeded ? (
    <div className='flex h-screen w-full flex-1 flex-col items-center bg-neutral-50'>
      {/* Header */}
      <div className='w-full bg-neutral-800'>
        <div className='py-2 text-center text-3xl font-semibold text-white'>
          u<span className='font-bold text-yellow-300'>Park</span>
        </div>
      </div>
      <div className='mt-6 flex flex-col items-center'>
        <div className='text-center font-semibold'>
          Η πληρωμή σας ολοκληρώθηκε με επιτυχία!
        </div>
        <div className='py-8'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-48 w-48 text-green-600'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </div>
        <div
          onClick={() => {
            window.location.replace('/');
          }}
          className='cursor-pointer rounded border bg-yellow-300 px-6 py-2 font-semibold shadow-md'
        >
          Επιστροφή στην αρχική οθόνη
        </div>
      </div>
    </div>
  ) : (
    <div className='flex h-screen w-full flex-1 flex-col items-center justify-between bg-neutral-50'>
      <div className='flex w-full flex-col items-center'>
        {/* Header */}
        <div className='flex w-full items-center border-b bg-white py-3 text-center text-lg font-medium shadow-md'>
          <div
            onClick={() => window.location.replace('/')}
            className='flex items-center px-2 text-sm font-semibold text-blue-700 cursor-pointer underline-offset-1 hover:underline'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z'
                clipRule='evenodd'
              />
            </svg>
            <div>Επιστροφή στην αρχική σελίδα</div>
          </div>
        </div>

        <Elements stripe={stripePromise}>
          {extend ? (
            <PaymentForm
              extensionInfo={{
                expiresAt: (newCard as IExtensionInfo).expiresAt,
                cardId: (newCard as IExtensionInfo).cardId,
                duration: (newCard as IExtensionInfo).duration,
                price: (newCard as IExtensionInfo).price,
              }}
              extend={extend}
              liftPurchaseSucceeded={liftPurchaseSucceeded}
            />
          ) : (
            <PaymentForm
              newCard={newCard as INewCard}
              extend={extend}
              liftPurchaseSucceeded={liftPurchaseSucceeded}
            />
          )}
        </Elements>

        {driver?.accumulatedTime! > newCard.duration! && (
          <div className='mx-auto mt-8 flex w-10/12 flex-col items-center space-y-2 rounded bg-white shadow-md md:w-96'>
            <div className='flex w-full items-center space-x-3 rounded-t bg-gray-800 p-2 text-white'>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div>Ενημέρωση</div>
            </div>
            <div className='flex flex-col items-center space-y-4 px-6 py-2'>
              <div className='flex flex-col'>
                <div className='text-center'>
                  Έχετε{' '}
                  <span className='font-medium'>
                    {formattedAccumulatedTime()}
                  </span>{' '}
                  διαθέσιμο χρονικό υπόλοιπο στο λογαριασμό σας.
                </div>
                <div className='text-justify text-xs font-light'>
                  Επιλέγοντας "Χρήση υπολοίπου" μπόρειτε να ολοκληρώσετε τη
                  στάθμευση σας χωρίς πληρωμή, κάνοντας χρήση του χρονικού σας
                  υπολοίπου από προηγούμενη ακυρωμένη στάθμευση.
                </div>
              </div>

              <div
                onClick={accumulatedTimePayment}
                className='w-fit rounded border bg-yellow-300 px-4 py-2 font-medium shadow'
              >
                Χρήση υπολοίπου
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
