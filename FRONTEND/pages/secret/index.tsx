import type { NextPage } from "next";
import Layout from "@/layouts/MainLayout";
import AnimatedLogo from "@/components/utils/AnimatedLogo";

const Secret: NextPage = () => {
  return (
    <Layout col={1} full={true}>
      <AnimatedLogo />
    </Layout>
  );
};

export default Secret;
