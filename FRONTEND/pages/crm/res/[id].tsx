import React from "react";
import { NextPage } from 'next';
import Layout from "@/layouts/MainLayout";
import { useEffect } from 'react';
import { useAppSelector } from "@/hooks/redux";
import { useRouter } from "next/router";

const Response:NextPage = () => {
  const router = useRouter();
  const { auth } = useAppSelector((state) => state.authReducer);
  useEffect(() => {
    if (!auth) {
      router.push("/auth/login");
    } 
  }, [])
  return (
    <Layout col={1} full={true} title="Responses">

    </Layout>
  )
};

export default Response;
