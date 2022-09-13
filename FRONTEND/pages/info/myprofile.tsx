import React from "react";
import Layout from "layouts/MainLayout";

type Props = {};

function myProfile({}: Props) {
  return <Layout col={1} title="My Profile">
    <p>myProfile</p>
  </Layout>;
}

export default myProfile;
