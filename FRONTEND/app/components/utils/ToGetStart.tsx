import Image from "next/image";
import React from "react";
import serchImg from "@/assets/img/serch.png";

const ToGetStart:React.FC = () => {
  return (
    <div className="indexToGetStart" role="toGetStart">
      <Image
        src={serchImg}
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
