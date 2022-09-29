import React from "react";
import Layout from "@/layouts/MainLayout";
import { useAppSelector } from "@/hooks/redux";
import { useEffect } from "react";
import { useRouter } from "next/router";

function myProfile() {
  const { auth } = useAppSelector((state) => state.authReducer);
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      router.push("/auth/login");
    }
  }, []);

  return (
    <Layout col={1} title="My Profile">
      <p>myProfile</p>
    </Layout>
  );
}

export default myProfile;
