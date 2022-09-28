import React from "react";
import logoImg from "@/assets/img/favicon.svg";
import Image from "next/image";
import { Button, Select } from "antd";
import { LVL_LIST, TECH_LIST } from "@/utils/consts";
import { Option } from "antd/lib/mentions";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { navSlice } from "@/store/reducers/navSlice";

type Props = {
  full: boolean;
};

const NavBar = ({ full = false }: Props) => {
  const { auth } = useAppSelector((state) => state.authReducer);
  const { skill, lvl } = useAppSelector((state) => state.navReducer);
  const dispatch = useAppDispatch();
  const { setSerch } = navSlice.actions;

  const changeSerchSkill = (value: string) => {
    dispatch(setSerch({ skill: value, lvl, active: false }));
  };

  const changeSerchLvl = (value: string) => {
    dispatch(setSerch({ skill, lvl: value, active: false }));
  };

  const getButton = () => {
    if (auth) {
      return (
        <Link href="/info/myprofile">
          <Button type="text" style={{ padding: "5px" }}>
            <a target="_blank">Profile</a>
          </Button>
        </Link>
      );
    }
    return (
      <Link target="_blank" href="/auth/login">
        <Button type="text" style={{ padding: "5px" }}>
          <a target="_blank">Login</a>
        </Button>
      </Link>
    );
  };

  if (full) {
    return (
      <div className="navBar">
        <div className="navBarItem">
          <Link href="/serch">
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
            onChange={changeSerchSkill}
          >
            {TECH_LIST.map((i) => (
              <Select.Option key={i}>{i}</Select.Option>
            ))}
          </Select>
          <Select
            showSearch
            defaultValue={"All"}
            style={{ width: "40%", padding: "3px 0px 3px 15px" }}
            placeholder="Lvl"
            onChange={changeSerchLvl}
          >
            {LVL_LIST.map((i) => (
              <Select.Option key={i}>{i}</Select.Option>
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
        <Link href="/serch">
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
