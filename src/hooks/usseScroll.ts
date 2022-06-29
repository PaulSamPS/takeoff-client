import React from 'react';

export const useScroll = () => {
  const isBrowser = typeof window !== 'undefined';
  const [scrollY, setScrollY] = React.useState(0);

  const handleScroll = () => {
    const currentScrollY = isBrowser ? window.scrollY : 0;
    setScrollY(currentScrollY);
  };

  React.useEffect(() => {
    window.onload = () => document.getElementById('input')?.focus();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollY };
};
