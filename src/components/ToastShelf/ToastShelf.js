import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";
import { ToastContext } from "../ToastProvider";
import VisuallyHidden from "../VisuallyHidden";

import useKeyDown from "../../hooks/useKeyDown";
//import useLongKeyDown from "../../hooks/useLongKeyDown";

function ToastShelf() {

  const {toastQueue, removeToast, removeOldToast, queueExists} = React.useContext(ToastContext);  

  useKeyDown("Escape", removeOldToast);
  //useLongKeyDown("Escape", clearAllToasts); // USELESS: if I keep esc pressed it deletes all of them quite fast, one by one

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
