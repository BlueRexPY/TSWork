import Image from "next/image";
import React from "react";
import logoImg from "@/assets/img/favicon.svg";

const Logo = () => {
  return (
    <>
      <br />
      <Image
        src={logoImg}
        className="link"
        width={100}
        height={70}
        alt="tswork"
        draggable={false}
      />
      <br />
    </>
  );
};

export default Logo;
