import React from "react";
import logoImg from "@/assets/img/favicon.svg";
import Image from "next/image";
import { Button, Select, message } from "antd";
import { LVL_LIST, TECH_LIST } from "@/utils/consts";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { navSlice } from "@/store/reducers/navSlice";
import AuthService from "@/api/services/AuthService";
import { authSlice } from "@/store/reducers/authSlice";
import { useRouter } from "next/router";

type Props = {
  full: boolean;
  myProfile: string[];
};

const NavBar: React.FC<Props> = ({ full = false, myProfile = [""] }: Props) => {
  const { auth, user } = useAppSelector((state) => state.authReducer);
  const { skill, lvl } = useAppSelector((state) => state.navReducer);
  const dispatch = useAppDispatch();
  const { setSearch } = navSlice.actions;
  const { updateAuth, logoutAuth } = authSlice.actions;
  const router = useRouter();

  const handleRole = (role: string, path: string) => {
    if (!user.roles.includes(role)) {
      AuthService.addRole(user.email, role)
        .then((res) => {
          updateAuth(res.data);
          message.success("You became an employer");
          router.push(path);
        })
        .catch(() => message.error("error"));
    }
  };

  const changeSearchSkill = (value: string) => {
    dispatch(setSearch({ skill: value, lvl, active: false }));
  };

  const changeSearchLvl = (value: string) => {
    dispatch(setSearch({ skill, lvl: value, active: false }));
  };

  const getButton = () => {
    if (auth) {
      return (
        <>
          {myProfile[0] === "" ? (
            <Link href="/info/myprofile">
              <Button type="text" style={{ padding: "5px" }}>
                <a target="_blank">Profile</a>
              </Button>
            </Link>
          ) : myProfile.includes("EMPLOYER") ? (
            <>
              <Link href="/crm/vacancies">
                <Button type="text" style={{ padding: "5px" }}>
                  <a target="_blank">CRM</a>
                </Button>
              </Link>
              <p>{" | "}</p>
              <Button
                type="text"
                style={{ padding: "5px" }}
                onClick={() => {
                  dispatch(logoutAuth());
                  router.push("/auth/login");
                }}
              >
                <a target="_blank">Logout</a>
              </Button>
            </>
          ) : (
            <>
              <Button
                type="text"
                style={{ padding: "5px" }}
                onClick={() => handleRole("EMPLOYER", "/crm/vacancies")}
              >
                <a target="_blank">Post a job</a>
              </Button>
              <p>{" | "}</p>
              <Button
                type="text"
                style={{ padding: "5px" }}
                onClick={() => {
                  dispatch(logoutAuth());
                  router.push("/auth/login");
                }}
              >
                <a target="_blank">Logout</a>
              </Button>
            </>
          )}
        </>
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
          <div className="logoImg">
            <Link href="/search">
              <Image
                src={logoImg}
                className="link"
                width={50}
                height={35}
                alt="tswork"
                draggable={false}
              />
            </Link>
          </div>
          <Select
            showSearch
            style={{ width: "60%", padding: "3px 0px 3px 15px" }}
            placeholder="Select Skill"
            onChange={changeSearchSkill}
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
            onChange={changeSearchLvl}
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
        <Link href="/search">
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
