import React from "react";
import logoImg from "@/assets/img/favicon.svg";
import Image from "next/image";
import { Button, Select } from "antd";
import { LVL_LIST, TECH_LIST } from "@/utils/consts";
import { Option } from "antd/lib/mentions";
import Link from "next/link";
import { useAppSelector } from "@/hooks/redux";

type Props = {
  full: boolean;
};

const NavBar = ({ full = false }: Props) => {
  const { auth,user } = useAppSelector((state) => state.authReducer);

  const getButton = () => {
    if(auth){
      return (
        <Link href="/myprofile">
          <Button type="text" style={{ padding: "5px" }}>
            Profile - {user.name}
          </Button>
        </Link>
      );
    }
    return (
      <Link href="/auth/login">
        <Button type="text" style={{ padding: "5px" }}>
          Login - {user.name}
        </Button>
      </Link>
    );
  };

  if (full) {
    return (
      <div className="navBar">
        <div className="navBarItem">
          <Link href="">
            <Image
              src={logoImg}
              className="link"
              width={50}
              height={35}
              alt="tswork"
              draggable={false}
            />
          </Link>
          <Select
            showSearch
            style={{ width: "60%", padding: "3px 0px 3px 15px" }}
            placeholder="Select Skill"
          >
            {TECH_LIST.map((i) => (
              <Option key={i}>{i}</Option>
            ))}
          </Select>
          <Select
            showSearch
            defaultValue={"All"}
            style={{ width: "40%", padding: "3px 0px 3px 15px" }}
            placeholder="Lvl"
          >
            {LVL_LIST.map((i) => (
              <Option key={i}>{i}</Option>
            ))}
          </Select>
        </div>
        {getButton()}
      </div>
    );
  }
  return (
    <div className="navBar">
      <div className="navBarItem2">
        <Link href="/">
          <Image
            className="link"
            src={logoImg}
            width={50}
            height={35}
            alt="tswork"
            draggable={false}
          />
        </Link>
      </div>
      <div className="navBarItem2">{getButton()}</div>
    </div>
  );
};

export default NavBar;
