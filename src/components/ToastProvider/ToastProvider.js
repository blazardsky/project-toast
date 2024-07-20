import React from "react";

export const ToastContext = React.createContext();

const ToastProvider = ({ children }) => {
  const [toastQueue, _setToastQueue] = React.useState([]);

  const queueExists = toastQueue.length > 0;

  function setToastQueue(message, variant) {
    console.log(`updated toast queue`)
    let previousQueue = queueExists ? toastQueue.slice(-6) : []
    _setToastQueue([
      ...previousQueue,
      {
        id: `toast-${Math.random() + Math.random()}`,
        message: message,
        variant: variant,
      },
    ]);
  }

  function removeToast(id) {
    console.log(`removed toast id: ${id}`)
    _setToastQueue(
      toastQueue => toastQueue.filter(toast => toast.id != id)
    )
  }

  function removeOldToast(){
    /** remove last item */
    console.log(`removed first toast`)
    _setToastQueue(
      toastQueue => toastQueue.slice(1)
    );
  }

  return (
    <ToastContext.Provider value={{ toastQueue, setToastQueue, removeToast, removeOldToast, queueExists }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
