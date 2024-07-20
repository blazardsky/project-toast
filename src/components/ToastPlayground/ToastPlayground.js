import React from 'react';

import Button from '../Button';
import ToastShelf from '../ToastShelf/ToastShelf';

import styles from './ToastPlayground.module.css';
import { ToastContext } from '../ToastProvider';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {

  const [message, setMessage] = React.useState('');
  const [currentVariant, setCurrentVariant] = React.useState( ()=> {
    return window.localStorage.getItem('variant') || VARIANT_OPTIONS[0]
  });

  const {setToastQueue} = React.useContext(ToastContext)

  const handlePopToast = (e) => {
    e.preventDefault();
    setToastQueue(message, currentVariant);
    setMessage('');
    setCurrentVariant(VARIANT_OPTIONS[0])
  }

  React.useEffect(()=>{
    window.localStorage.setItem('variant',currentVariant)
  }, [currentVariant]);

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf />

      <form className={styles.controlsWrapper} action="" onSubmit={handlePopToast}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea 
            id="message" 
            className={styles.messageInput}
            value={message}
            onChange={
              (event) => setMessage(message => event.target.value)
            }
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            {
              VARIANT_OPTIONS.map(variant => {
                let ID = `variant-${variant}`;
                return (
                  <label 
                    htmlFor={ID}
                    key={ID}>
                    <input
                      id={ID}
                      type="radio"
                      name="variant"
                      value={variant}
                      checked={variant === currentVariant}
                      onChange={()=>{setCurrentVariant(variant)}}
                    />
                    {variant}
                  </label>
                )
              })
            }
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button >Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
