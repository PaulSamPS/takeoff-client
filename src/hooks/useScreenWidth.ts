import React from 'react';
import debounce from 'lodash.debounce';

export const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = React.useState<number>(0);

  const resizeWindow = React.useCallback(
    debounce(() => {
      setScreenWidth(window.innerWidth);
    }, 500),
    []
  );

  React.useEffect(() => {
    resizeWindow();
    window.addEventListener('resize', resizeWindow);
    return () => window.removeEventListener('resize', resizeWindow);
  }, []);

  return { screenWidth };
};
