import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="description" content="AAI trend app" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website"></meta>
        <meta property="og:site_name" content="AAI"></meta>
        <meta name="keywords" content="Trend app" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
