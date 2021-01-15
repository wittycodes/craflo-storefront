import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

import { ServerStyleSheet as StyledComponentSheets } from "styled-components";
// import { ServerStyleSheets as MaterialUiServerStyleSheets } from "@material-ui/styles";
import favicons from "custom/favicons";
import theme from "custom/reactionTheme";
import analyticsProviders from "custom/analytics";



/**
 * For details about the styled-components SSR code in this file, see https://www.styled-components.com/docs/advanced#nextjs
 * _document is only rendered on the server side and not on the client side.
 * Event handlers like onClick can't be added to this file.
 */
class HTMLDocument extends Document {
  render() {
    const links = [
      { rel: "canonical", href: process.env.CANONICAL_URL },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Rubik&display=swap" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Kalam&display=swap" },
      { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/leaflet.css" },
      ...favicons
    ];


    // Analytics & Stripe Elements scripts
    const scripts = [
      ...analyticsProviders.map((provider) => ({
        type: "text/javascript",
        innerHTML: provider.renderScript()
      }))
    ];

    return (

      <Html lang="in" style={{

      }}>
        <Head>
          {/*<script src="https://unpkg.com/@webcomponents/custom-elements"></script>*/}

          {/*<script src="https://unpkg.com/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>*/}
          {/*<script src="https://unpkg.com/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js"></script>*/}
          {/*<link href="https://raw.githubusercontent.com/wittycodes/craflo-storefront/master/paperbit-dist/dist/designer/editors/styles/paperbits.css" rel="stylesheet" type="text/css" />*/}
          {/*<script src="https://raw.githubusercontent.com/wittycodes/craflo-storefront/master/paperbit-dist/dist/designer/editors/scripts/paperbits.js" type="text/javascript"></script>*/}
          {/*<link href="https://raw.githubusercontent.com/wittycodes/craflo-storefront/master/paperbit-dist/dist/designer/styles/theme.css" rel="stylesheet" type="text/css" />*/}
          {/*  <script src="https://raw.githubusercontent.com/wittycodes/craflo-storefront/master/paperbit-dist/dist/designer/scripts/theme.js"></script>*/}
          {links.map((link, index) => <link key={index} {...link} />)}
        </Head>
        <body style={{background: '#F7F7F7', overflow: 'scroll !important'}}>

        {/*<PaperbitsInReact/>*/}
        {/*<div id={"paperbits"} />*/}

        <Main />
          <NextScript />
          {scripts.map((script, index) => (script.innerHTML ? /* eslint-disable-next-line */
            <script async key={index} type={script.type} dangerouslySetInnerHTML={{ __html: script.innerHTML }} /> : <script async key={index} {...script} />))}
          {/*<script async type="text/javascript" src="https://maps.google.com/maps/api/js?v=3.31&key=AIzaSyBCZ7Lk_9ZC-EfEkgNB5XdPUebFxRqGh3o" />*/}
        <div id={"portal"} />

        </body>
      </Html>
    );
  }
}

HTMLDocument.getInitialProps = async (ctx) => {
  const styledComponentSheet = new StyledComponentSheets();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () => originalRenderPage({
      enhanceApp: (App) => (props) => (
        styledComponentSheet.collectStyles(<App {...props} />)
      )
    });
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {styledComponentSheet.getStyleElement()}
        </>
      )
    };
  } finally {
    styledComponentSheet.seal();
  }
};

export default HTMLDocument;
