import React, { useState, useEffect } from "react";
// import styles from "./Snackbar.module.css";
import styles from './css/SnackBar.module.css';

function Snackbar({ message, duration }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  return (
    <div className={`${styles.snackbar} ${isVisible ? styles.show : ""}`}>
      <span>{message}</span>
    </div>
  );
}

export default Snackbar;
