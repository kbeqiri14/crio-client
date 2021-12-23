import { createContext, useContext, useState } from 'react';

export const PresentationContext = createContext();

export const usePresentation = () => useContext(PresentationContext);

export const PresentationProvider = ({ children }) => {
  const [videoInfo, setVideoInfo] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  const handleShow = (videoInfo) => {
    setVideoInfo(videoInfo);
    setIsVisible(true);
  };

  const handleHide = () => {
    setVideoInfo({});
    setIsVisible(false);
  };

  return (
    <PresentationContext.Provider
      value={{
        isVisible,
        videoInfo,
        show: handleShow,
        hide: handleHide,
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
};
