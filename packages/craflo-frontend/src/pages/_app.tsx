if (typeof window !== 'undefined') {
  window.setImmediate = window.setTimeout;
}
// import "@paperbits/core/ko/bindingHandlers/bindingHandlers.component";

import dynamic from 'next/dynamic'

const Designer = dynamic(
  () => import('@craflo/paperbits/components/designer'),
  { ssr: false }
)

// const Runtime = dynamic(
//   () => import('@craflo/paperbits/startup.runtime'),
//   { ssr: false }
// )



import React from "react";
import ReactDOM from 'react-dom';
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ContextProviders } from "context/ContextProviders";
import { ComponentsProvider } from "@reactioncommerce/components-context";
import components from "custom/componentsContext";
import muiTheme from "custom/reactionTheme";
import Head from 'next/head'


import { ApolloProvider } from '@apollo/react-hooks';
import { theme } from 'theme';
import {useMedia} from "src/utils/use-media";
import hoistNonReactStatic from "hoist-non-react-statics";
import {LanguageProvider} from "src/contexts/language/language.provider";
import {CartProvider} from "src/contexts/cart/use-cart";
import {AppProvider} from "src/contexts/app/app.provider";
import {AuthProvider} from "src/contexts/auth/auth.provider";
import AppLayout from "src/layouts/app-layout";
import { ThemeProvider } from 'styled-components';
import {ReactiveBase} from '@appbaseio/reactivesearch'



// import "../paperbits/polyfills";
// import "../paperbits/themes/website/scripts";
import { InversifyInjector } from "@paperbits/common/injection";
import { DemoRuntimeModule } from "../paperbits/modules/demo.runtime.module";


// External CSS import here
import 'rc-drawer/assets/index.css';
import 'rc-table/assets/index.css';
import 'rc-collapse/assets/index.css';
import 'react-multi-carousel/lib/styles.css';
import 'components/multi-carousel/multi-carousel.style.css';
import '@redq/reuse-modal/lib/index.css';
// import 'react-tagsinput/react-tagsinput.css';
import { GlobalStyle } from 'assets/styles/global.style';
import { Normalize } from 'styled-normalize'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";  ``

import "src/theme/all.scss";


// Language translation files
import localEn from 'data/translation/en.json';
import localAr from 'data/translation/ar.json';
import localEs from 'data/translation/es.json';
import localDe from 'data/translation/de.json';
import localCn from 'data/translation/zh.json';
import localIl from 'data/translation/he.json';
import {useApollo} from "src/utils/apollo";

// Language translation Config
const messages = {
  in: localEn,
  en: localEn,
  ar: localAr,
  es: localEs,
  de: localDe,
  zh: localCn,
  he: localIl,
};


function withDevice(Component) {
  function withDevice(props) { // eslint-disable-line require-jsdoc

    const mobile = useMedia('(max-width: 580px)');
    const tablet = useMedia('(max-width: 991px)');
    const desktop = useMedia('(min-width: 992px)');
    const apolloClient = useApollo({});
    return (
      <Component {...props} apolloClient={apolloClient} deviceType={{ mobile, tablet, desktop }} />
    )
  }
  hoistNonReactStatic(withDevice, Component);
  return withDevice;
}

export function ExtendedApp({Component, pageProps, ...rest}) {

  const apolloClient= useApollo(pageProps.initialApolloState);
  React.useEffect(()=>{
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, [])
  console.log(pageProps, rest, "pulllu")
  const meta = [
    // Use minimum-scale=1 to enable GPU rasterization
    {
      name: "viewport",
      content: "initial-scale=1 minimum-scale=1, width=device-width, height=device-height"
    }
    // PWA primary color
    // {
    //   name: "theme-color",
    //   content: theme.palette.primary.main
    // }
  ];

  // if(rest.router.asPath != "/in"){
  //   document.addEventListener("DOMContentLoaded", () => {
  //     /* Initializing dependency injection  */
  //     const injector = new InversifyInjector();
  //     injector.bindModule(new DemoRuntimeModule());
  //     injector.resolve("autostart");
  //   });
  // }

  // Dessau Bold


  if(rest.router.query.edit) {
    import("../paperbits/themes/designer/styles/styles.scss")
    return <Designer/>
  }
  else if(!rest.router.query.edit) {
    import("../paperbits/themes/website/styles/styles.scss")
    return (
        <>
          {
            <>
              <Head>
                {meta.map((tag, index) => <meta key={index} {...tag} />)}
              </Head>
              {/*<Runtime/>*/}
              <Normalize/>
              <CssBaseline/>
              <ContextProviders pageProps={pageProps}>
                <ComponentsProvider value={components}>
                  <ApolloProvider client={apolloClient}>
                    <AuthProvider>
                      <ReactiveBase
                          app="reaction.catalog"
                          url="https://elastic.craflo.com/"
                          credentials="elastic:RvZi60f38Y6jVKZGS6908yo9">


                        <LanguageProvider messages={messages}>
                          <CartProvider>
                            <AppProvider>
                              <ThemeProvider theme={theme}>
                                <MuiThemeProvider theme={muiTheme}>
                                  <GlobalStyle/>
                                  <AppLayout client={apolloClient} {...pageProps} {...rest} >
                                    <Component {...rest} {...pageProps} />
                                  </AppLayout>
                                </MuiThemeProvider>
                              </ThemeProvider>
                            </AppProvider>
                          </CartProvider>
                        </LanguageProvider>
                      </ReactiveBase>
                    </AuthProvider>
                  </ApolloProvider>
                </ComponentsProvider>
              </ContextProviders>
            </>
          }
        </>
    )
  }
  else return <></>
}


export default withDevice(ExtendedApp)
