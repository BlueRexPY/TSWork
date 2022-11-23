import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./NavBar.module.css";
import logoImg from "../../public/assets/img/logo.png";
import { useRecoilState } from "recoil";
import { auth } from "../../store/atoms/auth/auth";
import { user } from "../../store/atoms/auth/user";
import AuthService from "../../api/services/auth/AuthService";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const NavBar = () => {
  const [authUser, setAuthUser] = useRecoilState(auth);
  const [userData, setUserData] = useRecoilState(user);
  const router = useRouter();
  const onLogout = () => {
    AuthService.logout().then((res) => {
      setAuthUser(false);
      setUserData("");
      router.push("/auth/login");
      Cookies.remove("token");
    });
  };
  return (
    <div className={styles.navBar}>
      <div className={styles.side}>
        <Link href="/">
          <Image
            src={logoImg}
            width={126}
            height={42}
            alt="actable ai"
            draggable={false}
          />
        </Link>

        <div>
          <Link href="/">
            <Button
              type="text"
              style={{ color: "#fff", fontWeight: "bold" }}
              size="large"
            >
              Trend
            </Button>
          </Link>
        </div>
      </div>
      <div className={styles.side}>
        {authUser ? (
          <>
            <p>{`${userData} |`}</p>
            <Button
              onClick={() => onLogout()}
              type="text"
              style={{ color: "#fff", fontWeight: "bold" }}
              size="large"
            >
              Logout
            </Button>
          </>
        ) : (
          <Link href="/auth/login">
            <Button
              type="text"
              style={{ color: "#fff", fontWeight: "bold" }}
              size="large"
            >
              Login
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
