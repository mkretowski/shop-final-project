import React, { createContext, useContext, useState } from 'react';
import InfoToast from '../components/features/InfoToast/InfoToast';
const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

const ToastProvider = ({ children }) => {
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toastMessage && <InfoToast message={toastMessage} />}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
