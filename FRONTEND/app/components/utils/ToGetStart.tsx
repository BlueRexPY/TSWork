import Image from "next/image";
import React from "react";
import searchImg from "@/assets/img/search.png";
import styles from '../../../styles/Utils.module.css'

const ToGetStart: React.FC = () => {
  return (
    <div className={styles.toGetStart} role="toGetStart">
      <Image
        src={searchImg}
        width={300}
        height={300}
        alt="To get started, choose one of the offers"
        draggable={false}
      ></Image>
      <h1>
        To get started,<br></br>
        choose one of the offers
      </h1>
    </div>
  );
};

export default ToGetStart;
