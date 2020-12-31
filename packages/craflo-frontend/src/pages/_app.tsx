// import NextApp from "next/app";

// import "../paperbits/polyfills";
// // import * as ReactDOM from "react-dom";
// // import { createElement } from "react";
// // import { Designer } from "./components/designer";
// import { InversifyInjector } from "@paperbits/common/injection";
// import { CoreDesignModule } from "@paperbits/core/core.design.module";
// import { FormsDesignModule } from "@paperbits/forms/forms.design.module";
// import { EmailsDesignModule } from "@paperbits/emails/emails.design.module";
// import { StylesDesignModule } from "@paperbits/styles/styles.design.module";
// import { ProseMirrorModule } from "@paperbits/prosemirror/prosemirror.module";
// import { OfflineModule } from "@paperbits/common/persistence/offline.module";
// // import { DemoDesignModule } from "./modules/demo.design.module";
//
// /* Initializing dependency injection  */
// const injector = new InversifyInjector();
// injector.bindModule(new CoreDesignModule());
// injector.bindModule(new FormsDesignModule());
// injector.bindModule(new EmailsDesignModule());
// injector.bindModule(new StylesDesignModule());
// injector.bindModule(new ProseMirrorModule());
// // injector.bindModule(new DemoDesignModule());
// injector.bindModule(new OfflineModule({ autosave: false }));
// injector.resolve("autostart");




import React from "react";
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


// External CSS import here
import 'rc-drawer/assets/index.css';
import 'rc-table/assets/index.css';
import 'rc-collapse/assets/index.css';
import 'react-multi-carousel/lib/styles.css';
import 'components/multi-carousel/multi-carousel.style.css';
import '@redq/reuse-modal/lib/index.css';
import 'react-tagsinput/react-tagsinput.css';
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
// import {Designer as PaperbitsDesigner} from "../paperbits/components/designer";

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


  return (
    <>
      <Head>
        {meta.map((tag, index) => <meta key={index} {...tag} />)}
      </Head>
    <Normalize />
    <CssBaseline/>
    {/*<PaperbitsDesigner/>*/}
    <ContextProviders pageProps={pageProps}>
      <ComponentsProvider value={components}>
        <ApolloProvider client={apolloClient}>
            <LanguageProvider messages={messages}>
              <CartProvider>
                <AppProvider>
                  <AuthProvider>
                    <ThemeProvider theme={theme}>
                      <ReactiveBase
                      app="reaction.catalog"
                      url="https://elastic.craflo.com/"
                      credentials="elastic:RvZi60f38Y6jVKZGS6908yo9">

                        <MuiThemeProvider theme={muiTheme}>
                          <AppLayout client={apolloClient} {...pageProps} {...rest} >
                              <Component {...rest} {...pageProps} />
                          </AppLayout>
                        </MuiThemeProvider>

                      </ReactiveBase>
                      <GlobalStyle />
                   </ThemeProvider>

                  </AuthProvider>
                </AppProvider>
              </CartProvider>
            </LanguageProvider>
        </ApolloProvider>
      </ComponentsProvider>
    </ContextProviders>
    </>
  )
}


export default withDevice(ExtendedApp)