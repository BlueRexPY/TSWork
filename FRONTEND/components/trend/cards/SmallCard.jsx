import React from "react";
import styles from "./../Trend.module.css";

const SmallCard = ({ title, extra, url }) => {
  return (
    <div className={styles.smallCard}>
      <p>
        <a onClick={() => window.open(url, "_blank")}>{title}</a>
      </p>
      <p className={styles.extra}>{extra}</p>
    </div>
  );
};

export default SmallCard;
