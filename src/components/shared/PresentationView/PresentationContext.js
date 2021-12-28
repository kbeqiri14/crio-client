import { createContext, useContext, useMemo, useState } from 'react';

export const PresentationContext = createContext();

export const usePresentation = () => useContext(PresentationContext);

export const PresentationProvider = ({ children }) => {
  const [videoInfo, setVideoInfo] = useState({});
  const isVisible = useMemo(() => !!Object.keys(videoInfo).length, [videoInfo]);

  return (
    <PresentationContext.Provider value={{ isVisible, videoInfo, setVideoInfo }}>
      {children}
    </PresentationContext.Provider>
  );
};
