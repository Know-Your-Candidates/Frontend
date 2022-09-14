import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="/styles/global.css" />
          <link rel="stylesheet" href="/styles/nprogress.css" />
          <link rel="icon" href="/icon.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#fff" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-title" content="KYC" />
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript initialColorMode="light" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
