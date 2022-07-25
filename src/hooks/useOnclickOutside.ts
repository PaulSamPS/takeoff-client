import { RefObject, useEffect } from 'react';
type Handler = (event: { target: MouseEvent }) => void;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler
) => {
  useEffect(() => {
    const listener = (event: { target: any }) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('click', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('click', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
