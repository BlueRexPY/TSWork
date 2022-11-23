import { CaretUpOutlined } from "@ant-design/icons";
import { Card } from "antd";
import React from "react";
import styles from "../Trend.module.css";

const BigCard = ({ title, extra, description, ups, url }) => {
  return (
    <Card
      title={<a onClick={() => window.open(url, "_blank")}>{title}</a>}
      extra={
        ups ? (
          <p>
            <CaretUpOutlined /> {extra}
          </p>
        ) : (
          <></>
        )
      }
      style={{ width: "100%" }}
    >
      <p className={styles.description}>{description}</p>
    </Card>
  );
};

export default BigCard;
