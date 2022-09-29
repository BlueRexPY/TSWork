import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "@/layouts/MainLayout";

const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/serch");
  }, []);
  return <Layout col={1} full={true}>
    <p>wait redirect</p>
  </Layout>;
};

export default Home;
