import React from "react";
import styles from "./AnimatedLogo.module.css";

const AnimatedLogo = ({ center = true }) => {
  return (
    <div className={center ? "center" : ""}>
      <svg
        width="157"
        height="172"
        viewBox="0 0 157 172"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="82.6772"
          y="0.221085"
          width="172.966"
          height="34.7614"
          rx="17.3807"
          transform="rotate(64.8522 82.6772 0.221085)"
          fill="#072773"
          className={styles.item4}
        />
        <circle
          cx="42.5"
          cy="109.5"
          r="23.5"
          fill="#072773"
          className={styles.item3}
        />
        <circle
          cx="15.5"
          cy="150.5"
          r="15.5"
          fill="#072773"
          className={styles.item2}
        />
        <circle
          cx="61"
          cy="150"
          r="10"
          fill="#072773"
          className={styles.item1}
        />
      </svg>
    </div>
  );
};

export default AnimatedLogo;
