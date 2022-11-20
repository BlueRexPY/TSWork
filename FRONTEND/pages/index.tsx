import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "@/layouts/MainLayout";
import AnimatedLogo from "@/components/utils/AnimatedLogo";

const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/search");
  });
  return (
    <Layout col={1} full={true}>
      <AnimatedLogo />
    </Layout>
  );
};

export default Home;
