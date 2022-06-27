import { createContext, useContext, useMemo, useState } from 'react';

export const SendEmailContext = createContext();

export const useSendEmail = () => useContext(SendEmailContext);

export const SendEmailProvider = ({ children }) => {
  const [sendEmailInfo, setSendEmailInfo] = useState({});
  const visible = useMemo(() => !!Object.keys(sendEmailInfo).length, [sendEmailInfo]);

  return (
    <SendEmailContext.Provider value={{ visible, sendEmailInfo, setSendEmailInfo }}>
      {children}
    </SendEmailContext.Provider>
  );
};
