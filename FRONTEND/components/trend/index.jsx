import React from "react";
import styles from "./Trend.module.css";
import ControlButtons from "./ControlButtons";
import Table from "./Table";

const Trend = () => {
  return (
    <div className={styles.columns}>
      <ControlButtons />
      <Table />
    </div>
  );
};

export default Trend;
