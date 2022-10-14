import React from "react";
import { NextPage } from "next";
import Layout from "@/layouts/MainLayout";

const Vacancies: NextPage = () => {
  return <Layout col={1} full={true} title="CRM" needAuth={true}></Layout>;
};

export default Vacancies;
