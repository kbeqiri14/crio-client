import { useLayoutEffect, useState } from 'react';

const useClientWidth = () => {
  const [clientWidth, setClientWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    function handleResize() {
      setClientWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return clientWidth;
};

export default useClientWidth;
