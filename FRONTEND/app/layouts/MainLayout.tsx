import React from "react";
import Head from "next/head";
import { ReactChild, ReactNode, useEffect } from 'react';
import NavBar from "@/components/NavBar/NavBar";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { AuthResponse } from "@/api/models/response/AuthResponse";
import AuthService from "@/api/services/AuthService";
import { authSlice } from "@/store/reducers/authSlice";

type Props = {
  children?: ReactChild | ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  path?: string;
  col?: number;
  full?: boolean;
  myProfile?:string[]
};

const Layout: React.FC<Props> = (props: Props) => {
  const { auth } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const { updateAuth } = authSlice.actions;
  const {
    title = "Home",
    description = "Convenient job search in IT",
    keywords = "IT, Work",
    col = 1,
    myProfile=[""],
    full = false,
  } = props;

  useEffect(() => {
    if(localStorage.getItem('token')&&!auth){
      AuthService.refresh().then((res)=>{if(res){dispatch(updateAuth(res.data))}}).catch(e => console.log("error "+e))
    }
  })
  

  return (
    <div className="layout">
      <Head>
        <title>{`TSWork - ${title}`}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={`IT, Work, ${keywords}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:image" content="https://cdn.discordapp.com/attachments/736633764930912257/1027366515126833183/Logo.png"/>
        <meta name="twitter:image" content="https://cdn.discordapp.com/attachments/736633764930912257/1027366515126833183/Logo.png"/>
      </Head>
      <NavBar full={full} myProfile={myProfile}></NavBar>
      <div className={`columnLayout${col}`}>{props.children}</div>
    </div>
  );
};

export default Layout;
