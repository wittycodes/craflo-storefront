// @ts-nocheck
import React, {useEffect} from 'react';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
// import { Modal } from '@redq/reuse-modal';
// import StoreNav from 'src/components/store-nav/store-nav';
// import Carousel from 'src/components/carousel/carousel';
// import { Banner } from 'src/components/banner/banner';
// import {
//   MainContentArea,
//   SidebarSection,
//   ContentSection,
//   OfferSection,
//   MobileCarouselDropdown,
// } from 'src/assets/styles/pages.style';
// // Static Data Import Here
// import OFFERS from 'src/data/offers';
// import { PAGES_DATA } from 'src/data/pages';
// import storeType from 'src/constants/storeType';
// import { SEO } from 'src/components/seo';
// import { useRefScroll } from 'src/utils/use-ref-scroll';
// import { initializeApollo } from 'src/utils/apollo';
// import { GET_PRODUCTS } from 'src/graphql/query/products.query';
// import { GET_CATEGORIES } from 'src/graphql/query/category.query';
// import Link from 'next/link'
// import {Loader} from 'react-loaders';

import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import {withApollo} from "lib/apollo/withApollo";
import inject from "hocs/inject";
import withCatalogItems from "containers/catalog/withCatalogItems";
// import withCart from "containers/cart/withCart";
// import {DrawerWrapper, MobileHeaderInnerWrapper} from "src/layouts/header/header.style";
// import Menu from "src/layouts/header/menu";
// import Footer from "src/layouts/footer";
// import Grid from '@material-ui/core/Grid';
// import useStores from "hooks/useStores";
// import Carousel1 from "src/sections/carousels/featured"
// import { Row, Col } from 'react-styled-flexboxgrid';
//
// const Sidebar = dynamic(() => import('src/layouts/sidebar/sidebar'));
// const SidebarMenu = dynamic(() => import('src/layouts/sidebar/sidebarMenu'));
// const Products = dynamic(() =>
//   import('src/components/product-grid/product-list/product-list')
// );
// import { ReactiveBase, CategorySearch, SingleRange, ReactiveList } from '@appbaseio/reactivesearch';
// import {App} from "./explore-beta";
// const CartPopUp = dynamic(() => import('src/features/carts/cart-popup'), {
//   ssr: false,
// });
//

const Designer = dynamic(
  () => import('../../paperbits/components/designer'),
  { ssr: false }
)


const CategoryPage: React.FC<any> = ({ deviceType }) => {
  const { query } = useRouter();
//
//   // const {uiStore} = useStores();
//   // uiStore.closeMenuD rawer()
//   // const { elRef: targetRef, scroll } = useRefScroll({
//   //   container: scrollContainer,
//   //   percentOfElement: 0,
//   //   percentOfContainer: 0,
//   //   offsetPX: -110,
//   // });
//   // React.useEffect(() => {
//   //   if (query.text || query.category) {
//   //     scroll();
//   //   }
//   // }, [query.text, query.category]);
//   const isAvailable = false
//   query.type = 'grocery'
//   const PAGE_TYPE: any = query.type;
//   const page = PAGES_DATA[PAGE_TYPE];
//
//   // useEffect(() => {
//   // }, [uiStore.isMenuDrawerOpen]);
//
//   const elasticProps = {
//     react: {
//       "and": ["Search", "Price Range"]
//     },
//     componentId: "SearchResult",
//     stream: false,
//     infiniteScroll: false,
//     size: 10,
//     showResultStats: false,
//     dataField: "reaction.catalog",
//     includeFields: "product",
//     loader: (
//       <>
//         <Loader type="ball-pulse" active />
//       </>
//     ),
//     showLoader: false,
//     scrollOnChange: false
//   }

  return (
    <>
      <Designer/>
    </>
  );
};


export const getStaticProps: GetStaticProps = async ({ params: { lang } }) => {
  const primaryShop = await fetchPrimaryShop("en");
  //const translations = await fetchTranslations(lang, ["common"]);

  if (!primaryShop) {
    return {
      props: {
        shop: null,
        //...translations,
        type: 'grocery',
        lang,
        initialApolloState: null  //apolloClient.cache.extract(),
      },
      // eslint-disable-next-line camelcase
      // revalidate: 1 // // revalidate immediately
    };
  }

  return {
    props: {
      ...primaryShop,
      //...translations,
      type: 'grocery',
      lang,
      initialApolloState: null  //apolloClient.cache.extract(),
    },
    // eslint-disable-next-line camelcase
    // revalidate: 120 // // revalidate each two minutes
  };

  // const apolloClient = initializeApollo();
  //
  // await apolloClient.query({
  //   query: GET_PRODUCTS,
  //   variables: {
  //     type: params.type,
  //     offset: 0,
  //     limit: 20,
  //   },
  // });
  // await apolloClient.query({
  //   query: GET_CATEGORIES,
  //   variables: {
  //     type: params.type,
  //   },
  // });
};



//  <ContentSection>
//             <div ref={targetRef}>
//               <Products
//                 type={PAGE_TYPE}
//                 deviceType={deviceType}
//                 fetchLimit={20}
//               />
//             </div>
//           </ContentSection>

export async function getStaticPaths() {
  return {
    paths: [
      { params: { lang: 'in' } }
    ],
    fallback: false,
  };
}
export default  withApollo()(withCatalogItems(inject("routingStore")(CategoryPage)));
