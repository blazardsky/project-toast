import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from 'react-feather';

import VisuallyHidden from '../VisuallyHidden';

import styles from './Toast.module.css';

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({variant, dismiss, children}) {
  
  const Icon = ICONS_BY_VARIANT[variant];

  React.useEffect(() => {
    const disappear = setTimeout(() => {
      console.log(`Time's up!`);
      dismiss();
    }, 6000);
    return () => clearTimeout(disappear);
  }, []);

  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.iconContainer}>
        <Icon size={24} />
      </div>
      <p className={styles.content}>
        <VisuallyHidden>
          {variant} -{' '}
        </VisuallyHidden>
        {children}
      </p>
      <button tab-index="1" className={styles.closeButton} onClick={dismiss} aria-live="off" aria-label="Dismiss message">
        <X size={24} />
      </button>
    </div>
  );
  
}

export default Toast;
