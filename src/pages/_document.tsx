import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.png" type="image/png" />
          <link rel="icon" href="/favicon.png" />
          <link rel="apple-touch-icon" href="/apple-icon.png" />
          <link rel="manifest" href="/manifest.json" />

          {/* Google fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
            rel="stylesheet"
          />

          <meta httpEquiv="x-ua-compatible" content="IE=edge,chrome=1" />
          <meta name="MobileOptimized" content="320" />
          <meta name="HandheldFriendly" content="True" />
          <meta name="theme-color" content="#3A7FFF" />
          <meta name="msapplication-TileColor" content="#3A7FFF" />
          <meta name="referrer" content="no-referrer-when-downgrade" />
          <meta name="google" content="notranslate" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

          {/* Facebook */}
          <meta property="og:url" content="https://wwd-virid.vercel.app/" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="World wide dev" />
          <meta property="og:site_name" content="World wide dev" />
          <meta
            property="og:description"
            content="Crie sala de perguntas e respostas ao vivo"
          />
          <meta
            property="og:image"
            content="https://wwd-virid.vercel.app/world-wide-dev.jpg"
          />
          <meta
            property="og:image:secure_url"
            content="https://wwd-virid.vercel.app/world-wide-dev.jpg"
          />
          <meta property="og:image:alt" content="Thumbnail" />
          <meta property="og:image:type" content="image/jpg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />

          {/* Twitter */}
          <meta name="twitter:title" content="World wide dev" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="World wide dev" />
          <meta name="twitter:creator" content="@EddyPBR" />
          <meta
            name="twitter:image"
            content="https://wwd-virid.vercel.app/world-wide-dev.jpg"
          />
          <meta
            name="twitter:image:src"
            content="https://wwd-virid.vercel.app/world-wide-dev.jpg"
          />
          <meta name="twitter:image:alt" content="Thumbnail" />
          <meta name="twitter:image:width" content="1200" />
          <meta name="twitter:image:height" content="620" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
