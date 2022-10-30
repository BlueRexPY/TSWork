import React, { useState } from "react";
import Head from "next/head";
import { ReactChild, ReactNode, useEffect } from "react";
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
  const [loading, setLoading] = useState(true);
  const { auth } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const { updateAuth } = authSlice.actions;
  const {
    title = "Home",
    description = "💼 Job search market for the IT segment",
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
        .catch((e) => {console.log("error " + e);Cookies.remove("refreshToken");router.push("/auth/login");});
    } else {
      resolve(true);
    }
  });

  useEffect(() => {
    checkAuth
      .then((res) => {
        setLoading(false);
        if (needAuth && auth === false) {
          router.push("/auth/login");
        }
      })
      .catch((e) => console.log(e));
  });

  return (
    <div className="layout">
      <Head>
        <title>{`TSWork - ${title}`}</title>
        <meta property="og:type" content="website"></meta>
        <meta property="og:site_name" content="TSWork"></meta>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={`IT, Work, ${keywords}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="twitter:image"
          content="https://cdn.discordapp.com/attachments/736633764930912257/1036392375687331901/1212.png"
        />
        <meta
          property="og:image"
          content="https://cdn.discordapp.com/attachments/736633764930912257/1036392375687331901/1212.png"
        />
        <meta property="og:image:width" content="1280px"></meta>
        <meta property="og:image:height" content="640px"></meta>
      </Head>
      <NavBar full={full} myProfile={myProfile}></NavBar>
      {loading?<div className={`columnLayout1`}><AnimatedLogo /></div>:<div className={`columnLayout${col}`}>{props.children}</div>}
    </div>
  );
};

export default Layout;
