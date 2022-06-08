import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';

const CountDownTimer = ({ expiresAt }: { expiresAt: string }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  
  const dt = DateTime.fromISO(expiresAt);

  const tick = () => {
    const diff = dt.diffNow([
      'days',
      'hours',
      'minutes',
      'seconds',
      'milliseconds',
    ]);

    setDays(diff.days);
    setHours(diff.hours);
    setMinutes(diff.minutes);
    setSeconds(diff.seconds);
  };

  const format = () => {
    if (days > 0) {
      if (days === 1) {
        return `1 ημέρα και ${
          hours > 1 ? `${hours.toString()} ώρες` : `1 ώρα`
        }`;
      }

      return `${days.toString()} ημέρες και ${
        hours > 1 ? `${hours.toString()} ώρες` : `1 ώρα`
      }`;
    }

    if (days === 0 && hours !== 0) {
      if (hours === 1) {
        return `1 ώρα και ${minutes.toString()} λεπτά`;
      }

      return `${hours.toString()} ώρες και ${minutes.toString()} λεπτά`;
    }

    if (days === 0 && hours === 0) {
      return `${minutes.toString()}:${seconds
        .toString()
        .padStart(2, '0')} λεπτά`;
    }

    if (minutes === 0) {
      return `${seconds.toString().padStart(2, '0')} δευτ.`;
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  return days === 0 && hours === 0 && minutes === 0 && seconds === 0 ? (
    <div
      style={{ borderTopColor: 'transparent' }}
      className='mt-1 h-6 w-6 animate-spin rounded-full border-4 border-solid border-white'
    ></div>
  ) : (
    <div className='text-xl font-semibold'>{format()}</div>
  );
};

export default CountDownTimer;
