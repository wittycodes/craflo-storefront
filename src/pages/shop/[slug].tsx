// @ts-nocheck
import { NextPage } from 'next';
import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { Modal } from '@redq/reuse-modal';
import { GET_LOGGED_IN_CUSTOMER } from 'src/graphql/query/customer.query';
import { ProfileProvider } from 'src/contexts/profile/profile.provider';
import SettingsContent from 'src/features/user-profile/settings/settings';
import {
  PageWrapper,
  SidebarSection,
  ContentBox,
} from 'src/features/user-profile/user-profile.style';
import Sidebar from 'src/features/user-profile/sidebar/sidebar';
import { SEO } from 'src/components/seo';
import Footer from 'src/layouts/footer';
import ErrorMessage from 'src/components/error-message/error-message';
import useViewer from "hooks/viewer/useViewer";
import {withApollo} from "lib/apollo/withApollo";
import withAddressBook from "containers/address/withAddressBook";
import inject from "hocs/inject";
import { useRouter } from 'next/router'

import dynamic from 'next/dynamic'

// const DynamicComponentWithNoSSR = dynamic(() => import('../components/List'), {
//   ssr: false
// })
import ProfilePage from 'src/features/shop-profile/ProfilePage';
// import {App} from '../[lang]/explore-beta';
import { GetStaticProps } from 'next'


type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
import ReactDOM from "react-dom";
// import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// styles
// pages
// import Index from "src/paper-kit-react/src/views/Index.js";
// import NucleoIcons from "src/paper-kit-react/src/views/NucleoIcons.js";
// import PageLoading from "../../reaction/components/PageLoading/PageLoading";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import withCatalogItems from "containers/catalog/withCatalogItems";
// import CartPopUp from "../../features/carts/cart-popup";
import fetchMerchantShop from "staticUtils/shop/fetchMerchantShop";
// import LandingPage from "views/examples/LandingPage.js";
// import ProfilePage from "views/examples/ProfilePage.js";
// import RegisterPage from "views/examples/RegisterPage.js";
// others
// import Sticky from 'react-stickynode';
/////////////////////////////////////////////////

// import dynamic from 'next/dynamic'
import * as ko from "knockout";
import {App} from "../[lang]/explore-beta";
// import "src/paperbits/polyfills";
// import * as ReactDOM from "react-dom";
// import { createElement } from "react";
// import "src/paperbits/starti"
// import { Designer } from "src/paperbits/components/designer";

// import { InversifyInjector } from "@paperbits/common/injection";
// import { CoreDesignModule } from "@paperbits/core/core.design.module";
// import { FormsDesignModule } from "@paperbits/forms/forms.design.module";
// import { EmailsDesignModule } from "@paperbits/emails/emails.design.module";
// import { StylesDesignModule } from "@paperbits/styles/styles.design.module";
// import { ProseMirrorModule } from "@paperbits/prosemirror/prosemirror.module";
// import { OfflineModule } from "@paperbits/common/persistence/offline.module";
// import { DemoDesignModule } from "src/paperbits/modules/demo.design.module";
// import { DemoRuntimeModule } from "src/paperbits/modules/demo.runtime.module";
// import { App } from "src/paperbits/components/app/app";


// document.addEventListener("DOMContentLoaded", () => {

//     // const reactElement = createElement(Designer);
//     // ReactDOM.render(reactElement, document.body);
//     if (process.browser && window !== undefined) {
// //       /* Initializing dependency injection  */
//
//       setTimeout(() => {
//         const injector = new InversifyInjector();
//         // injector.bindModule(new App())
//         injector.bindModule(new CoreDesignModule());
//         // injector.bindModule(new StylesDesignModule());
// // //       injector.bindModule(new ProseMirrorModule());
// //         injector.bindModule(new DemoDesignModule());
// //       injector.bindModule(new OfflineModule({ autosave: false }));
//         injector.resolve("autostart");
//
//       })
// // // injector.bindModule(new FormsDesignModule());
// // // injector.bindModule(new EmailsDesignModule());
// //       injector.bindModule(new StylesDesignModule());
// //       injector.bindModule(new ProseMirrorModule());
// //       injector.bindModule(new DemoDesignModule());
// //       injector.bindModule(new OfflineModule({ autosave: false }));
// //       injector.resolve("autostart");
//     }
  // });
// });

// const PaperbitsInReact = dynamic(() => import("src/paperbits/startup.design"), { ssr: false } )
import {DynamicRangeSlider, ReactiveList} from '@appbaseio/reactivesearch'


const Profile: NextPage = ({ deviceType, ...props}) => {
  const [
    account,
    loading,
    refetch
  ] = useViewer();



  const {
    catalogItems,
    catalogItemsPageInfo,
    isLoadingCatalogItems,
    routingStore: { query },
    merchantShop,
    uiStore,
    shop
  } = props;
  console.log(props, "pulkitt")


  let pageTitle;


  const router = useRouter()
  React.useEffect(() => {
    // if (merchantShop?.shop) {
    //   pageTitle = merchantShop?.shop.name;
    //   if (merchantShop?.shop.description) pageTitle = `${pageTitle} | ${merchantShop?.shop.description}`;
    // } else {
    //   pageTitle = "Shop";
    // }
    if(merchantShop?.exists==false) {
      router.push('/in/explore-beta')
    }
  }, [])

  const products = (catalogItems || []).map((item) => item.node.product);
  // DesignScripts

  // const ref= React.useRef(null);
  // if (typeof window !== 'undefined') {
  //
  //   document.addEventListener("DOMContentLoaded", () => {
  //
  //     import("src/paperbits/startup.design").then((a) => {
  //       a(ref.current)
  //
  //     })
  //   })
  // }
  return (<>
    {merchantShop?.exists==true? (
      <Modal>
      <SEO title={merchantShop?.shop.name + " - Craflo"} description={merchantShop?.shop.description} />
      <ProfilePage deviceType {...props}/>
        {/*<PaperbitsInReact />*/}
        {/*<div style={{padding: 30}}>*/}
          <ReactiveList
            react={{
              "and": ["Search", "Price Range"]
            }}
            componentId="SearchResult"
            stream={true}
            infiniteScroll={true}
            size={45}
            // scrollTarget={"rrr-content"}
            dataField={"reaction.catalog"}
          >
            {
              ({ data, error, loading, ...rest }) => (
                // <div>{"pulkit"}</div>
                <App props={props} loading={loading} data={data} routingStore={props.routingStore} deviceType={deviceType}/>
              )
            }
          </ReactiveList>
        {/*</div>*/}



      {/*<ProfileProvider initData={account}>*/}
      {/*  <Modal>*/}
      {/*    <PageWrapper>*/}
      {/*      <SidebarSection>*/}
      {/*        <Sidebar />*/}
      {/*      </SidebarSection>*/}
      {/*      <ContentBox>*/}
      {/*        <SettingsContent deviceType={deviceType} />*/}
      {/*        */}
      {/*      </ContentBox>*/}

      {/*      <Footer />*/}
      {/*    </PageWrapper>*/}
      {/*  </Modal>*/}
      {/*</ProfileProvider>*/}
      <Footer />
      {/*<CartPopUp deviceType={deviceType}/>*/}
      </Modal>): null
    }
    </>
  );
};



export const getStaticProps:GetStaticProps = async ({ params: { slug } }) => {
  let lang = "en"
   // const primaryShop = await fetchPrimaryShop(lang);
  const merchantShop = await fetchMerchantShop(slug)
  console.log(merchantShop, "ioioioio")

    return {
      props: {
        merchantShop: merchantShop,
        //...translations
        // ,
        type: 'grocery',
        lang,
        slug,
        initialApolloState: null  //apolloClient.cache.extract(),
      },
      // eslint-disable-next-line camelcase
      revalidate: 1 // // revalidate immediately
    };
  // }
  //--console.log(primaryShop, "pulkit0009")

  // return {
  //   props: {
  //     // ...primaryShop,
  //     merchantShop: merchantShop,
  //     //...translations,
  //     type: 'grocery',
  //     lang,
  //     slug,
  //     initialApolloState: null  //apolloClient.cache.extract(),
  //   },
  //   // eslint-disable-next-line camelcase
  //   revalidate: 3 // // revalidate each two minutes
  // };
};

export async function getStaticPaths() {

  return {
    paths: [
      { params: { slug: "sgcreations" } }
    ],
    fallback: true
  };
}


export default withApollo()(withCatalogItems(inject("routingStore", "uiStore", "authStore")(Profile)));

