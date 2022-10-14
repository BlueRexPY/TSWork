import React, { useState } from "react";
import Head from "next/head";
import { ReactChild, ReactNode, useEffect, useLayoutEffect } from "react";
import NavBar from "@/components/NavBar/NavBar";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import AuthService from "@/api/services/AuthService";
import { authSlice } from "@/store/reducers/authSlice";
import Cookies from "js-cookie";
import AnimatedLogo from "@/components/utils/AnimatedLogo";
import { useRouter } from "next/router";

type Props = {
  children?: ReactChild | ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  path?: string;
  col?: number;
  full?: boolean;
  myProfile?: string[];
  needAuth?: boolean;
};

const Layout: React.FC<Props> = (props: Props) => {
  const router = useRouter();
  const [loading, serLoading] = useState(true);
  const { auth } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const { updateAuth } = authSlice.actions;
  const {
    title = "Home",
    description = "Convenient job search in IT",
    keywords = "IT, Work",
    col = 1,
    myProfile = [""],
    full = false,
    needAuth = false,
  } = props;

  const checkAuth = new Promise((resolve, reject) => {
    if (Cookies.get("refreshToken") && auth === false) {
      AuthService.refresh()
        .then((res) => {
          if (res) {
            dispatch(updateAuth(res.data.user));
          }
        })
        .then(() => {
          if (auth) {
            resolve(true);
          }
        })
        .catch((e) => console.log("error " + e));
    } else {
      resolve(true);
    }
  });

  useEffect(() => {
    checkAuth.then((res) => {
      serLoading(false);
      if (needAuth && auth === false) {
        router.push("/auth/login");
      }
    });
  });

  const getContent = () => {
    if (loading) {
      return (
        <div className={`columnLayout1`}>
          <AnimatedLogo />
        </div>
      );
    } else {
      return <div className={`columnLayout${col}`}>{props.children}</div>;
    }
  };

  return (
    <div className="layout">
      <Head>
        <title>{`TSWork - ${title}`}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={`IT, Work, ${keywords}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:image"
          content="https://cdn.discordapp.com/attachments/736633764930912257/1027366515126833183/Logo.png"
        />
        <meta
          name="twitter:image"
          content="https://cdn.discordapp.com/attachments/736633764930912257/1027366515126833183/Logo.png"
        />
      </Head>
      <NavBar full={full} myProfile={myProfile}></NavBar>
      {getContent()}
    </div>
  );
};

export default Layout;
