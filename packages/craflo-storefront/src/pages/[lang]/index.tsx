// @ts-nocheck
import React, {useEffect} from 'react';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Modal } from '@redq/reuse-modal';
import StoreNav from 'src/components/store-nav/store-nav';
import Carousel from 'src/components/carousel/carousel';
import { Banner } from 'src/components/banner/banner';
import {
  MainContentArea,
  SidebarSection,
  ContentSection,
  OfferSection,
  MobileCarouselDropdown,
} from 'src/assets/styles/pages.style';
// Static Data Import Here
import OFFERS from 'src/data/offers';
import { PAGES_DATA } from 'src/data/pages';
import storeType from 'src/constants/storeType';
import { SEO } from 'src/components/seo';
import { useRefScroll } from 'src/utils/use-ref-scroll';
import { initializeApollo } from 'src/utils/apollo';
import { GET_PRODUCTS } from 'src/graphql/query/products.query';
import { GET_CATEGORIES } from 'src/graphql/query/category.query';
import Link from 'next/link'
import {Loader} from 'react-loaders';

import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import {withApollo} from "lib/apollo/withApollo";
import inject from "hocs/inject";
import withCatalogItems from "containers/catalog/withCatalogItems";
import withCart from "containers/cart/withCart";
import {DrawerWrapper, MobileHeaderInnerWrapper} from "src/layouts/header/header.style";
import Menu from "src/layouts/header/menu";
import Footer from "src/layouts/footer";
import Grid from '@material-ui/core/Grid';
import useStores from "hooks/useStores";
import Carousel1 from "src/sections/carousels/featured"
import { Row, Col } from 'react-styled-flexboxgrid';

const Sidebar = dynamic(() => import('src/layouts/sidebar/sidebar'));
const SidebarMenu = dynamic(() => import('src/layouts/sidebar/sidebarMenu'));
const Products = dynamic(() =>
  import('src/components/product-grid/product-list/product-list')
);
import { ReactiveBase, CategorySearch, SingleRange, ReactiveList } from '@appbaseio/reactivesearch';
import {App} from "./explore-beta";
const CartPopUp = dynamic(() => import('src/features/carts/cart-popup'), {
  ssr: false,
});

const CategoryPage: React.FC<any> = ({ deviceType }) => {
  const { query } = useRouter();

  // const {uiStore} = useStores();
  // uiStore.closeMenuD rawer()
  // const { elRef: targetRef, scroll } = useRefScroll({
  //   container: scrollContainer,
  //   percentOfElement: 0,
  //   percentOfContainer: 0,
  //   offsetPX: -110,
  // });
  // React.useEffect(() => {
  //   if (query.text || query.category) {
  //     scroll();
  //   }
  // }, [query.text, query.category]);
  const isAvailable = false
  query.type = 'grocery'
  const PAGE_TYPE: any = query.type;
  const page = PAGES_DATA[PAGE_TYPE];

  // useEffect(() => {
  // }, [uiStore.isMenuDrawerOpen]);

  const elasticProps = {
    react: {
      "and": ["Search", "Price Range"]
    },
    componentId: "SearchResult",
    stream: false,
    infiniteScroll: false,
    size: 10,
    showResultStats: false,
    dataField: "reaction.catalog",
    includeFields: "product",
    loader: (
      <>
        <Loader type="ball-pulse" active />
      </>
    ),
    showLoader: false,
    scrollOnChange: false
  }

  return (
    <>
      <SEO title={page?.page_title} description={page?.page_description} />

      <Modal >
      <Banner
              intlTitleId={page?.banner_title_id}
              intlDescriptionId={page?.banner_description_id}
              // imageUrl={page?.banner_image_url}
              isAvailable={isAvailable}
              imageUrl={"https://image.freepik.com/free-vector/art-craft-supplies-doodle-diy-tools-set_6997-1887.jpg"}
            />
            {/*<MobileCarouselDropdown>*/}
            {/*  <StoreNa v items={storeType} />*/}
            {/*</MobileCarouselDropdown>*/}
        <div id={"ppaperbits"}></div>
        {isAvailable && <><OfferSection>
          <div style={{margin: '0 -10px'}}>
            <Carousel deviceType={deviceType} data={OFFERS}/>
          </div>
        </OfferSection>




          <div style={{backgroundColor: '#fff'}}>

          <div style={{marginLeft: 60, marginRight: 60, paddingTop: 20}}>
          <Row>
          <Col xs={12}>

          <h3 style={{float: 'left'}}>Recently Viewed</h3>
          <h5 style={{float: 'right'}}>
          <a target="_blank" href="/in/explore-beta">
          See All
          </a>
          </h5>
          <ReactiveList
          {...elasticProps}
          >
          {
            ({data, error, loading, ...rest}) => (
              // <div>{"pulkit"}</div>
              <>
                {/*{console.log(data)}*/}
                <Carousel1 loading={loading} data={data} deviceType={deviceType}/>
              </>
            )
          }
          </ReactiveList>
          </Col>
          <Col xs={12}>

          <h3 style={{float: 'left'}}>Trending Today</h3>
          <h5 style={{float: 'right'}}>
            <a target="_blank" href="/in/explore-beta">
            See More..
            </a>
          </h5>

          <ReactiveList
          {...elasticProps}
          >
          {
            ({data, error, loading, ...rest}) => (
              // <div>{"pulkit"}</div>
              <>
                <Carousel1 loading={loading} data={data} deviceType={deviceType}/>
              </>
            )
          }
          </ReactiveList>
          </Col>
          <Col xs={12}>

          <h3 style={{float: 'left'}}>Top picks personalised for you</h3>
          <h5 style={{float: 'right'}}>
          <a target="_blank" href="/in/explore-beta">
          See More..
          </a>
          </h5>

          <ReactiveList
          {...elasticProps}
          >
          {
            ({data, error, loading, ...rest}) => (
              // <div>{"pulkit"}</div>
              <>
                {/*{console.log(data)}*/}
                <Carousel1 loading={loading} data={data} deviceType={deviceType}/>
              </>
            )
          }
          </ReactiveList>
          </Col>
          <Col xs={12}>

          <h3 style={{float: 'left'}}>Trending Today</h3>
          <h5 style={{float: 'right'}}>
          <a target="_blank" href="/in/explore-beta">
          See More..
          </a>
          </h5>

          <ReactiveList
          {...elasticProps}
          >
          {
            ({data, error, loading, ...rest}) => (
              <Carousel1 loading={loading} data={data} deviceType={deviceType}/>
            )
          }
          </ReactiveList>
          </Col>
          </Row>
          </div>
          </div>
          <MainContentArea>

          <ContentSection>
          <div >


          {/*<OfferSection>*/}
          {/*  <div style={{ margin: '0 -10px' }}>*/}
          {/*    <Carousel deviceType={deviceType} data={OFFERS} />*/}
          {/*  </div>*/}
          {/*</OfferSection>*/}




          {/*<Row>*/}
          {/*  <Col xs={12} sm={5} md={5} lg={5}>*/}
          {/*    <Carousel1/>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col xs={12} sm={5} md={5} lg={5}>*/}
          {/*    <Carousel1/>*/}
          {/*  </Col>*/}
          {/*</Row>*/}


          </div>
          </ContentSection>
          </MainContentArea></>}
        <CartPopUp deviceType={deviceType} />
        <Footer />

      </Modal>
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
