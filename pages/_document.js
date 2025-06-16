// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Orbitron:wght@700;900&display=swap"
          rel="stylesheet"
        />
        {/* Favicon, meta tags etc. can go here */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}