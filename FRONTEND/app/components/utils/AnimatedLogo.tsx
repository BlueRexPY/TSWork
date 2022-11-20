import React from "react";
import styles from '../../../styles/Utils.module.css'
const AnimatedLogo = () => {
  return (
    <svg
      width="375"
      height="273"
      viewBox="0 0 375 273"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.AnimatedLogo}
    >
      <path
        d="M83.5 50L177 104.5L276.576 167.5V271.808L83.5 152.5V50Z"
        fill="#AB63F8"
        className={styles.AnimatedLogo1}
      />
      <path
        d="M83.4497 152.5L276.5 51.5L277.768 166.9L83.4498 273L83.4497 152.5Z"
        fill="#FEBE29"
        className={styles.AnimatedLogo2}
      />
      <path
        d="M0 0L83.5 50L83.4498 273L0 227.699V0Z"
        fill="#E7A104"
        className={styles.AnimatedLogo3}
      />
      <path
        d="M276.576 174.052V51.2619L374.331 1.19202V218.161L276.576 271.808V174.052Z"
        fill="#843CD4"
        className={styles.AnimatedLogo4}
      />
    </svg>
  );
};

export default AnimatedLogo;
