import { useEffect } from 'react';

// Source: https://www.30secondsofcode.org/react/s/use-click-inside
export function useOnClickInside(ref: any, callback: any) {
  const handleClick = (e: any) => {
    if (ref.current && ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
}
