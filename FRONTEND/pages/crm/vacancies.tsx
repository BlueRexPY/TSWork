import React, { useEffect } from "react";
import { NextPage } from 'next';
import Layout from "@/layouts/MainLayout";
import { useAppSelector } from "@/hooks/redux";
import { useRouter } from "next/router";


const Vacancies:NextPage = () => {
  const router = useRouter();
  const { auth } = useAppSelector((state) => state.authReducer);
  useEffect(() => {
    if (!auth) {
      router.push("/auth/login");
    } 
  }, [])
  return (
    <Layout col={1} full={true} title="CRM">

    </Layout>
  )
};

export default Vacancies;
