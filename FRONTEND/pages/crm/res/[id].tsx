import React from "react";
import { NextPage } from "next";
import Layout from "@/layouts/MainLayout";
const Response: NextPage = () => {
  return (
    <Layout col={1} full={true} title="Responses" needAuth={true}></Layout>
  );
};

export default Response;
