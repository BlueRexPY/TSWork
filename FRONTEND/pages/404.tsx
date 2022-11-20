import React from "react";
import Layout from "@/layouts/MainLayout";
import Image from "next/image";
import Img from "@/assets/img/404.png";
import { Button } from "antd";
import Link from "next/link";
import { NextPage } from "next";
import  styles from '../styles/Utils.module.css'

const NotFound: NextPage = () => {
  return (
    <Layout title={"Page not found"}>
      <div className={styles.notFound} role="wrapper">
        <Image
          src={Img}
          width={300}
          height={300}
          alt="Page not found"
          draggable={false}
          role="image"
        ></Image>
        <Link href="/" role="button">
          <Button size={"large"} type="link">
            Back to home page
          </Button>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
