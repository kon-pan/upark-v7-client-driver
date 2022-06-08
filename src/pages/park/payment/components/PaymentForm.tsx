import {
  useElements,
  useStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import axios, { AxiosResponse } from 'axios';
import { FormEvent, useState } from 'react';
import {
  IExtensionInfo,
  INewCard,
} from '../../../../common/interfaces/interfaces';

const PaymentForm = ({
  newCard,
  extend,
  extensionInfo,
  liftPurchaseSucceeded,
}: {
  newCard?: INewCard;
  extend: boolean;
  extensionInfo?: IExtensionInfo;

  liftPurchaseSucceeded: (value: boolean) => void;
}) => {
  const elements = useElements();
  const stripe = useStripe();

  const [error, setError] = useState<string | undefined>(undefined);
  const [processing, setProcessing] = useState(false);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const response: AxiosResponse = await axios.post(
      `${process.env.REACT_APP_SERVER_HOSTNAME}/driver/payment/create-payment-intent`,
      { cost: extend ? extensionInfo?.price : newCard?.cost },
      { withCredentials: true }
    );

    const clientSecret = response.data.clientSecret;
    const cardNumberElement = elements.getElement(CardNumberElement)!;

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardNumberElement,
        },
      }
    );

    console.log(paymentIntent, error);

    // If there are error during payment, show error message and
    // terminate payment process
    if (error) {
      setError(error.message);
      setProcessing(false);
      return;
    }

    // At this point payment intent has succeeded and we can
    // insert the new parking card in our database
    try {
      if (extend) {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/driver/card/${extensionInfo?.cardId}/extend`,
          {
            expiresAt: extensionInfo?.expiresAt,
            duration: extensionInfo?.duration,
            price: extensionInfo?.price,
            useAccumulatedTime: false,
          },
          { withCredentials: true }
        );

        setProcessing(false);
        liftPurchaseSucceeded(response.data.success);

        console.log(response);
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/driver/card/insert`,
        { card: newCard, useAccumulatedTime: false },
        { withCredentials: true }
      );

      setProcessing(false);
      liftPurchaseSucceeded(response.data.success);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className='mt-4 flex w-10/12 flex-col space-y-2 rounded border bg-white px-5 py-3 shadow-md md:w-96'
    >
      <div className='text-center text-lg font-medium'>Ολοκλήρωση αγοράς</div>
      <div>
        <label
          className='mb-1 text-sm font-medium text-gray-700'
          htmlFor='card-number'
        >
          Αριθμός κάρτας
        </label>
        <div
          style={{
            border: '1px solid #ddd8d8',
            borderRadius: '4px',
            padding: '8px',
          }}
          className='rounded border px-3 py-2 shadow'
        >
          <CardNumberElement
            options={{
              showIcon: true,
              style: {
                base: {
                  fontSize: '20px',
                },
              },
            }}
            id='card-number'
          />
        </div>
      </div>

      <div className='flex justify-between space-x-8'>
        <div>
          <label
            className='mb-1 text-sm font-medium text-gray-700'
            htmlFor='card-number'
          >
            Ημ. λήξης
          </label>
          <div
            style={{
              border: '1px solid #ddd8d8',
              borderRadius: '4px',
              padding: '8px',
            }}
            className='w-28 rounded border px-3 py-2 shadow'
          >
            <CardExpiryElement
              id='card-expiry'
              options={{
                style: {
                  base: {
                    fontSize: '20px',
                  },
                },
              }}
            />
          </div>
        </div>

        <div className='mb-2'>
          <label
            className='mb-1 text-sm font-medium text-gray-700'
            htmlFor='card-number'
          >
            Κωδ. ασφαλείας
          </label>
          <div
            style={{
              border: '1px solid #ddd8d8',
              borderRadius: '4px',
              padding: '8px',
            }}
            className='w-18 rounded border px-3 py-2 shadow'
          >
            <CardCvcElement
              options={{
                style: {
                  base: {
                    fontSize: '20px',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
      <button
        className='mx-auto flex w-1/2 justify-center rounded border bg-yellow-300 py-2 font-semibold shadow-md'
        type='submit'
      >
        {processing ? (
          <>
            <div className='mr-2'>Περιμένετε</div>
            <div
              style={{ borderTopColor: 'transparent' }}
              className='my-0.5 h-5 w-5 animate-spin rounded-full border-2 border-solid border-gray-800'
            ></div>
          </>
        ) : (
          <>
            {extend
              ? `Πληρώστε ${extensionInfo?.price} €`
              : `Πληρώστε ${newCard?.cost} €`}
          </>
        )}
      </button>
      {error && (
        <div className='text-center text-sm font-medium text-red-700'>
          {error}
        </div>
      )}
    </form>
  );
};

export default PaymentForm;
