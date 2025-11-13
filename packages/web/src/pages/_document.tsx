import Document, { Html, Head, Main, NextScript } from 'next/document';

class ZecknaDocument extends Document {
  render() {
    return (
      <Html lang="en" className="bg-slate-950">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.ico" />
          <meta name="theme-color" content="#050a18" />
        </Head>
        <body className="bg-slate-950 antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default ZecknaDocument;

