import Layout from "layouts/MainLayout";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from 'react';
const Home: NextPage = () => {
  const router = useRouter();
  useEffect(()=>{
    router.push("/serch");
  },[])
  return (
    <Layout col={1} full={true}>
    </Layout>
  );
};

export default Home;
