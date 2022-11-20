import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="robots" content="index, follow" />
        <meta name="description" content="💼  Job search market for the IT segment" />
        <meta property="og:type" content="website"></meta>
        <meta property="og:site_name" content="TSWork"></meta>
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={`IT, Work`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="twitter:image"
          content="https://cdn.discordapp.com/attachments/736633764930912257/1036392375687331901/1212.png"
        />
        <meta
          property="og:image"
          content="https://cdn.discordapp.com/attachments/736633764930912257/1036392375687331901/1212.png"
        />
        <meta property="og:image:width" content="1280"></meta>
        <meta property="og:image:height" content="640"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}