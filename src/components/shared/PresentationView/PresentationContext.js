import { createContext, useCallback, useContext, useMemo, useState } from 'react';

export const PresentationContext = createContext();

export const usePresentation = () => useContext(PresentationContext);

export const PresentationProvider = ({ children }) => {
  const [videoInfo, setVideoInfo] = useState({});

  const isVisible = useMemo(() => !!Object.keys(videoInfo).length, [videoInfo]);

  const show = useCallback((videoInfo) => setVideoInfo(videoInfo), []);
  const hide = useCallback(() => setVideoInfo({}), []);

  return (
    <PresentationContext.Provider value={{ isVisible, videoInfo, show, hide }}>
      {children}
    </PresentationContext.Provider>
  );
};
