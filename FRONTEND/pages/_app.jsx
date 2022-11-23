require("../styles/variables.less");
import "antd/dist/antd.css";
import { RecoilRoot } from "recoil";
import Head from "next/head";
import MainLayout from "../components/layouts/MainLayout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>Actable AI - Trends</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <RecoilRoot>
        <MainLayout>{getLayout(<Component {...pageProps} />)}</MainLayout>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
