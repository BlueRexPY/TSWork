import React from "react";
import styles from "./AnimatedLogo.module.css";

const SmallAnimatedLogo = () => {
  return (
    <svg
      width="29"
      height="32"
      viewBox="0 0 29 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="15.23"
        width="31.8622"
        height="6.40342"
        rx="3.20171"
        transform="rotate(64.8522 15.23 0)"
        fill="#072773"
        className={styles.item4}
      />
      <circle
        cx="7.82895"
        cy="20.1304"
        r="4.32895"
        fill="#072773"
        className={styles.item3}
      />
      <circle
        cx="2.85527"
        cy="27.683"
        r="2.85527"
        fill="#072773"
        className={styles.item2}
      />
      <circle
        cx="11.2369"
        cy="27.5909"
        r="1.84211"
        fill="#072773"
        className={styles.item1}
      />
    </svg>
  );
};

export default SmallAnimatedLogo;
