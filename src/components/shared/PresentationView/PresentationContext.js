import { createContext, useContext, useState } from 'react';

const defaultMockValue = {
  title: 'Work’s name goes here',
  description:
    'Hi everyone!\n\nToday I wanna share with you my work.\nYour feedback and appreciation are always welcome.',
  url: 'https://vimeo.com/436328286',
  author: {
    name: 'Ann Bee',
    avatar: `https://avatars.dicebear.com/api/pixel-art/${Date.now()}.svg`,
  },
};

const contextValue = {
  isVisible: false,
  videoInfo: defaultMockValue,
  show: () => undefined,
  hide: () => undefined,
};

export const PresentationContext = createContext(contextValue);

export const usePresentation = () => {
  return useContext(PresentationContext);
};

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
