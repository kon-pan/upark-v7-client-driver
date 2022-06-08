import { useState } from 'react';
import { Socket } from 'socket.io-client';
import {
  IAddress,
  ICard,
  INewCard,
} from '../../../../common/interfaces/interfaces';
import { classNames } from '../../../../common/utils/classnames';
import Map from '../common/components/map/Map';
import ActiveCards from './components/ActiveCards';
import StepOne from './components/multi-step-form/step-1/StepOne';
import StepTwo from './components/multi-step-form/step-2/StepTwo';
import LongTerm from './components/multi-step-form/step-3/components/LongTerm';
import ShortTerm from './components/multi-step-form/step-3/components/ShortTerm';
import StepThree from './components/multi-step-form/step-3/StepThree';
import StepFour from './components/multi-step-form/step-4/StepFour';

const DesktopPrivateHome = ({
  socket,
  activeCards,
}: {
  socket: Socket;
  activeCards: ICard[];
}) => {
  const [newCard, setNewCard] = useState<INewCard>({
    driverId: undefined,
    addressId: undefined,
    addressName: undefined,
    vehicleName: undefined,
    vehicleLicensePlate: undefined,
    startsAt: undefined,
    duration: undefined,
    cost: undefined,
  });

  const [step, setStep] = useState(1);
  const [newPurchase, setNewPurchase] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<IAddress | undefined>(
    undefined
  );

  const liftStep = (value: number) => {
    setStep(value);
  };

  function liftNewCard(type: any, value: any) {
    setNewCard((prev) => {
      return { ...prev, [type]: value };
    });
  }

  const liftSelectedMarker = (value: IAddress) => {
    setSelectedMarker(value);
  };

  return (
    <div className='z-0 flex max-h-screen w-full flex-1 items-center'>
      {/* Map section */}
      <div className='relative h-full w-2/3 border-l border-r border-gray-400'>
        <Map
          socket={socket}
          liftSelectedMarker={liftSelectedMarker}
          liftNewCard={liftNewCard}
        />
        {/* <button className='absolute top-2 right-2 z-10 rounded border-2 border-gray-400 border-opacity-75 bg-white px-2 py-1.5 text-xs font-semibold'>
          Ανανέωση χάρτη
        </button> */}
      </div>

      {activeCards.length > 0 && !newPurchase ? (
        <div className='flex h-full w-1/3 flex-col items-center'>
          <ActiveCards activeCards={activeCards} />
          <button
            onClick={() => {
              setNewPurchase(true);
            }}
            className='fixed bottom-5 right-5 text-lg z-10 flex items-center space-x-2 rounded bg-yellow-300 px-4 py-2 font-semibold shadow-md'
          >
            <div>Νέα στάθμευση</div>
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
        </div>
      ) : (
        <>
          {selectedMarker ? (
            <div
              className={classNames(
                'flex h-full w-1/3 flex-col',
                step === 4 ? 'space-y-3' : 'justify-between'
              )}
            >
              {step === 1 && <StepOne newCard={newCard} liftStep={liftStep} />}
              {step === 2 && (
                <StepTwo liftStep={liftStep} liftNewCard={liftNewCard} />
              )}
              {step === 3 && (
                <StepThree
                  newCard={newCard}
                  liftStep={liftStep}
                  liftNewCard={liftNewCard}
                  shortTerm={
                    <ShortTerm liftNewCard={liftNewCard} newCard={newCard} />
                  }
                  longTerm={
                    <LongTerm liftNewCard={liftNewCard} newCard={newCard} />
                  }
                />
              )}
              {step === 4 && (
                <StepFour
                  newCard={newCard}
                  liftStep={liftStep}
                  liftNewCard={liftNewCard}
                />
              )}
              <button
                onClick={() => {
                  setSelectedMarker(undefined);
                  setNewCard({
                    addressId: undefined,
                    addressName: undefined,
                    cost: undefined,
                    driverId: undefined,
                    duration: undefined,
                    vehicleLicensePlate: undefined,
                    vehicleName: undefined,
                    startsAt: undefined,
                  });
                  setStep(1);
                  setNewPurchase(false);
                }}
                className='mx-auto mb-16 w-10/12 rounded border bg-white py-2 font-medium shadow-md'
              >
                Ακύρωση
              </button>
            </div>
          ) : (
            <div className='w-1/3'>
              <div className='mx-auto w-10/12 text-center text-lg font-semibold'>
                Επλιλέξτε ένα απο τα διαθέσιμα σημεία στάθμευσης στο χάρτη.
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DesktopPrivateHome;
