import { createContext, useContext, useMemo, useState } from 'react';

export const PresentationContext = createContext();

export const usePresentation = () => useContext(PresentationContext);

export const PresentationProvider = ({ children }) => {
  const [info, setInfo] = useState({});
  const isVisible = useMemo(() => !!Object.keys(info).length, [info]);

  return (
    <PresentationContext.Provider value={{ isVisible, info, setInfo }}>
      {children}
    </PresentationContext.Provider>
  );
};
