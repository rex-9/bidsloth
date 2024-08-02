import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
            rel="stylesheet"
          />
          <meta
            name="description"
            content="The only free to use tool made just for creators to easily auction anything for their fans."
          />
          <meta
            name="keywords"
            content="auction, creators, fans, bidding, platform"
          />
          <meta
            property="og:title"
            content="bidsloth - Auction anything fantastic"
          />
          <meta
            property="og:description"
            content="The only free to use tool made just for creators to easily auction anything for their fans."
          />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/dfmz4mxod/image/upload/v1690201641/mvp/twitter-card-1.png"
          />

          <meta property="og:url" content="https://www.bidsloth.com/" />
          <meta
            name="twitter:title"
            content="bidsloth - Auction anything fantastic"
          />
          <meta
            name="twitter:description"
            content="The only free to use tool made just for creators to easily auction anything for their fans."
          />
          <meta
            name="twitter:image"
            content="https://res.cloudinary.com/dfmz4mxod/image/upload/v1690201641/mvp/twitter-card-1.png"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <link rel="canonical" href="https://www.bidsloth.com/" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
