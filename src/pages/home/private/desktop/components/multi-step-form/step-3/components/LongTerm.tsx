import { DateTime } from 'luxon';
import { useState } from 'react';
import { INewCard } from '../../../../../../../../common/interfaces/interfaces';
import { classNames } from '../../../../../../../../common/utils/classnames';

const cards = [
  {
    id: 1,
    title: 'Κάρτα στάθμευσης 1 ημέρας',
    price: 7,
    duration: 1440,
  },
  {
    id: 2,
    title: 'Κάρτα στάθμευσης 2 ημερών',
    price: 15,
    duration: 2880,
  },
  {
    id: 3,
    title: 'Κάρτα στάθμευσης 3 ημερών',
    price: 25,
    duration: 4320,
  },
];

const LongTerm = ({
  newCard,
  liftNewCard,
}: {
  newCard: INewCard;
  liftNewCard: (type: any, value: any) => void;
}) => {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <div className='flex flex-col overflow-y-scroll bg-white px-6 py-4 shadow-md'>
      <div className='mb-4 flex w-full flex-col text-base font-semibold'>
        <div className='mb-2 text-sm'>Έναρξη στάθμευσης</div>
        <input
          className='w-full rounded border-gray-400 bg-neutral-100 bg-opacity-50 py-1 text-gray-800 shadow-md'
          type='datetime-local'
          onChange={(e) => {
            liftNewCard('startsAt', DateTime.fromISO(e.target.value).toISO());
          }}
          id='dt'
        />
      </div>
      <div className='mb-4 text-sm font-semibold'>Επιλογή διάρκειας</div>
      <div className='flex max-h-96 w-full flex-col items-center'>
        {cards.map((card) => {
          return (
            <div
              key={card.id}
              onClick={() => {
                setActiveCard(card.id);
                liftNewCard('duration', card.duration);
                liftNewCard('cost', card.price);
              }}
              className={classNames(
                'flex w-full cursor-pointer items-center justify-between',
                ' mr-2 mb-2 rounded px-3 py-1.5',
                card.id === activeCard
                  ? 'bg-white font-medium shadow-inner'
                  : 'bg-gray-100 bg-opacity-75',
                ' border border-gray-200 shadow'
              )}
            >
              <div className='text-sm'>{card.title}</div>
              <div className='flex items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className={classNames(
                    'mr-1 h-5 w-5',
                    card.id === activeCard ? 'text-yellow-500' : 'text-gray-600'
                  )}
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.736 6.979C9.208 6.193 9.696 6 10 6c.304 0 .792.193 1.264.979a1 1 0 001.715-1.029C12.279 4.784 11.232 4 10 4s-2.279.784-2.979 1.95c-.285.475-.507 1-.67 1.55H6a1 1 0 000 2h.013a9.358 9.358 0 000 1H6a1 1 0 100 2h.351c.163.55.385 1.075.67 1.55C7.721 15.216 8.768 16 10 16s2.279-.784 2.979-1.95a1 1 0 10-1.715-1.029c-.472.786-.96.979-1.264.979-.304 0-.792-.193-1.264-.979a4.265 4.265 0 01-.264-.521H10a1 1 0 100-2H8.017a7.36 7.36 0 010-1H10a1 1 0 100-2H8.472c.08-.185.167-.36.264-.521z'
                    clipRule='evenodd'
                  />
                </svg>
                <div className='text-xl font-semibold'>{card.price}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LongTerm;
