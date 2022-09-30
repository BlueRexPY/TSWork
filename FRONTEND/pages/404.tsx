import React from "react";
import Layout from "@/layouts/MainLayout";
import Image from "next/image";
import Img from "@/assets/img/404.png";
import { Button } from "antd";
import Link from "next/link";
import { NextPage } from "next";

const NotFound: NextPage = () => {
  return (
    <Layout title={"Page not found"}>
      <div className="notFound">
        <Image
          src={Img}
          width={300}
          height={300}
          alt="Page not found"
          draggable={false}
        ></Image>
        <Link href="/">
          <Button size={"large"} type="link">
            Back to home page
          </Button>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
