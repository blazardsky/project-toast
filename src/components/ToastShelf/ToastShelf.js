import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";
import { ToastContext } from "../ToastProvider";
import VisuallyHidden from "../VisuallyHidden";
import useKeyDown from "../../hooks/useKeyDown";

function ToastShelf() {

  const {toastQueue, removeToast, removeOldToast, queueExists} = React.useContext(ToastContext);  

  useKeyDown("Escape", removeOldToast);

  return (
    <>
      <VisuallyHidden id="notification-title">Notification</VisuallyHidden>
      <ol
        role="region"
        aria-live="polite"
        aria-labelledby="notification-title"
        className={styles.wrapper}
      >
        {queueExists &&
          toastQueue.map(({ id, variant, message }) => (
            <li key={id} id={id} className={styles.toastWrapper}>
              <Toast variant={variant} dismiss={() => removeToast(id)}>
                {message}
              </Toast>
            </li>
          ))}
      </ol>
    </>
  );
  
}

export default ToastShelf;
