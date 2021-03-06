import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";
import withCart from "containers/cart/withCart";
import ProductDetail from "components/ProductDetail";
import PageLoading from "components/PageLoading";
import Layout from "components/Layout";
import { withApollo } from "lib/apollo/withApollo";
import { Client } from '@elastic/elasticsearch'

import { locales } from "translations/config";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchCatalogProduct from "staticUtils/catalog/fetchCatalogProduct";
import fetchAllTags from "staticUtils/tags/fetchAllTags";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import {DynamicRangeSlider, ReactiveList} from '@appbaseio/reactivesearch'
import { Waypoint } from 'react-waypoint';
import { GetStaticProps } from 'next'
/**
 *
 * @name buildJSONLd
 * @param {Object} product - The product
 * @param {Object} shop - The shop
 * @summary Builds a JSONLd object from product properties.
 * @return {String} Stringified product jsonld
 */
function buildJSONLd(product, shop) {
  if (!product || !shop) return "";

  const currencyCode = shop.currency.code || "USD";
  const priceData = product.pricing[0];
  const images = product.media.map((image) => image.URLs.original);

  let productAvailability = "http://schema.org/InStock";
  if (product.isLowQuantity) {
    productAvailability = "http://schema.org/LimitedAvailability";
  }
  if (product.isBackorder && product.isSoldOut) {
    productAvailability = "http://schema.org/PreOrder";
  }
  if (!product.isBackorder && product.isSoldOut) {
    productAvailability = "http://schema.org/SoldOut";
  }

  // Recommended data from https://developers.google.com/search/docs/data-types/product
  const productJSON = {
    "@context": "http://schema.org/",
    "@type": "Product",
    "brand": product.vendor,
    "description": product.description,
    "image": images,
    "name": product.title,
    "sku": product.sku,
    "offers": {
      "@type": "Offer",
      "priceCurrency": currencyCode,
      "price": priceprops.minPrice,
      "availability": productAvailability,
      "seller": {
        "@type": "Organization",
        "name": shop.name
      }
    }
  };

  return JSON.stringify(productJSON);
}



/**
 * Layout for the product detail page
 *
 * @param {Function} addItemsToCart - function to call to add items to cart
 * @param {Object} product - the product
 * @param {Boolean} isLoadingProduct - loading indicator
 * @param {Object} shop - the shop this product belong to
 * @return {React.Component} The product detail page
 */
/*
function ProductDetailPage({ addItemsToCart, product, isLoadingProduct, shop }) {
  const router = useRouter();
  const currencyCode = (shop && shop.currency.code) || "USD";
  const JSONLd = useMemo(() => {
    if (product && shop) {
      return buildJSONLd(product, shop);
    }
    return null;
  }, [product, shop]);

  if (isLoadingProduct || router.isFallback) return <PageLoading />;
  if (!product || !shop) return <Typography>Not Found</Typography>;

  return (
    <Layout shop={shop}>
      <Helmet
        title={`${product && product.title} | ${shop && shop.name}`}
        meta={[{ name: "description", content: product && product.description }]}
        script={[{ type: "application/ld+json", innerHTML: JSONLd }]}
      />
      <ProductDetail
        addItemsToCart={addItemsToCart}
        currencyCode={currencyCode}
        product={product}
        shop={shop}
      />
    </Layout>
  );
}

ProductDetailPage.propTypes = {
  /**
   * Function to add items to a cart, usually using the addItemsToCart from @withCart decorator.
   *
   * @example addItemsToCart(CartItemInput)
   * @type function
   */
/*
  addItemsToCart: PropTypes.func,
  isLoadingProduct: PropTypes.bool,
  /**
   * Catalog Product item
   */
/*
  product: PropTypes.object,
  shop: PropTypes.shape({
    name: PropTypes.string.isRequired,
    currency: PropTypes.shape({
      code: PropTypes.string.isRequired
    })
  })
};

*/

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////


import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { SEO } from 'src/components/seo';
import { Modal } from '@redq/reuse-modal';
import ProductSingleWrapper, {
  ProductSingleContainer,
} from 'src/assets/styles/product-single.style';
import { GET_PRODUCT_DETAILS } from 'src/graphql/query/product.query';
import { initializeApollo } from 'src/utils/apollo';
import {RelatedItems} from "../../components/product-details/product-details-one/product-details-one.style";
import Products from "../../components/product-grid/product-list/product-list";
import Footer from "../../layouts/footer";
import {App} from "../[lang]/explore-beta";
import GeoSwitcher from "../../layouts/header/menu/geo-switcher/geo-switcher";
import {useAppDispatch} from "../../contexts/app/app.provider";

const ProductDetails = dynamic(() =>
  import('src/components/product-details/product-details-one/product-details-one')
);
const ProductDetailsBook = dynamic(() =>
  import('src/components/product-details/product-details-two/product-details-two')
);
const CartPopUp = dynamic(() => import('src/features/carts/cart-popup'), {
  ssr: false,
});


const ProductPage: NextPage = ({ data, deviceType, ...props }) => {
  // console.log(props)
  const device = {
    mobile: false,
    tablet: false,
    desktop: true
  }
  let content = (
    <ProductDetails product={props.product} deviceType={device} />
  );
  /*
  if (props.product.type === 'BOOK') {
    content = (
      <ProductDetailsBook product={props.product} deviceType={deviceType} />
    );
  }*/

  const dispatch = useAppDispatch();
  const setSticky = useCallback(() => dispatch({ type: 'SET_STICKY' }), [
    dispatch,
  ]);
  const removeSticky = useCallback(() => dispatch({ type: 'REMOVE_STICKY' }), [
    dispatch,
  ]);
  const onWaypointPositionChange = ({ currentPosition }) => {
    if (!currentPosition || currentPosition === 'below' ) {
      removeSticky();
    }
    // if (!currentPosition || currentPosition === 'invisible' ) {
    //   removeSticky();
    // }
  };


  return (
    <>

      <SEO
        title={`${props?.product?.slug} - Craflo`}
        description={`${props?.product?.description} Details`}
      />

      <Modal>
        <ProductSingleWrapper>
          <ProductSingleContainer>
            {content}

            <CartPopUp  deviceType={deviceType} />
          </ProductSingleContainer>
        </ProductSingleWrapper>

        {/*<RelatedItems>*/}

        {/*  <h2>Related Items</h2>*/}
        {/*  /!*product.type.toLowerCase()*!/*/}
        {/*</RelatedItems>*/}
        {/*  <Waypoint*/}
        {/*    onEnter={setSticky}*/}
        {/*    // onLeave={}*/}
        {/*    onPositionChange={onWaypointPositionChange}*/}
        {/*    debug={true}*/}
        {/*  />*/}
        {/*  <ReactiveList*/}
        {/*    react={{*/}
        {/*      "and": ["Search", "Price Range"]*/}
        {/*    }}*/}
        {/*    componentId="SearchResult"*/}
        {/*    stream={true}*/}
        {/*    infiniteScroll={true}*/}
        {/*    size={45}*/}
        {/*    // scrollTarget={"rrr-content"}*/}
        {/*    dataField={"reaction.catalog"}*/}
        {/*  >*/}
        {/*    {*/}
        {/*      ({ data, error, loading, ...rest }) => (*/}
        {/*        // <div>{"pulkit"}</div>*/}
        {/*        <App props={props} loading={loading} data={data} routingStore={props.routingStore} deviceType={deviceType}/>*/}
        {/*      )*/}
        {/*    }*/}
        {/*  </ReactiveList>*/}
        {/*</RelatedItems>*/}
        <Footer />
      </Modal>
    </>
  );
};
export const getStaticProps: GetStaticProps = async ({ params: { slugOrId} }) => {
  const productSlug = slugOrId && slugOrId[0];
  // const primaryShop = await fetchPrimaryShop(lang);
  const catalogProduct = await fetchCatalogProduct(productSlug)
  // const tags = await fetchAllTags(lang)
  // console.log(productSlug, primaryShop, catalogProduct, tags,  "llllllllllllllllllllllllllllllll\n\n\n\n\n")

  // if (!primaryShop) {
  //   return {
  //     props: {
  //       shop: null,
  //       translations: null,
  //       products: null,
  //       tags: null
  //     },
  //
  //     // eslint-disable-next-line camelcase
  //     //// revalidate: 1 // // revalidate immediately
  //     revalidate: 120
  //   };
  // }

  return {
    props: {
      // ...primaryShop,
      //...await fetchTranslations(lang, ["common", "productDetail"]),
      ...catalogProduct,
      // ...tags
    },
    // eslint-disable-next-line camelcase
    //// revalidate: 120 // // revalidate each two minutes
    revalidate: 120
  };

  /*
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: GET_PRODUCT_DETAILS,
    variables: {
      slug: params.slug,
    },
  });
  return {
    props: {
      data,
    },
  };
  */
}


export async function getStaticPaths() {
  const client = new Client({
    node: 'https://elastic.craflo.com/',
    auth: {
      username: 'elastic',
      password: 'RvZi60f38Y6jVKZGS6908yo9'
    }
  })
  const { body} = await client.search({
    index: 'reaction.catalog',
    scroll: '1m',
    _source: ['product.slug'],
    size: 1000
  })
  const slugs = body.hits.hits
  console.log(slugs)

  const paths = slugs.map((slug)=> slug._source?.product?.slug)
  console.log(paths)

  return {
    paths: [
      {
        params: {
          slugOrId: paths
        }
      }
    ],
    fallback: true // See the "fallback" section below
  };
}
export default  withApollo()(withCart(ProductPage));




/**
 *  Static props for a product
 *
 * @returns {Object} the props
 */
/**
 export async function getStaticProps({ params: { slugOrId, lang } }) {
  const productSlug = slugOrId && slugOrId[0];
  const primaryShop = await fetchPrimaryShop(lang);

  if (!primaryShop) {
    return {
      props: {
        shop: null,
        translations: null,
        products: null,
        tags: null
      },
      // eslint-disable-next-line camelcase
      // revalidate: 1 // // revalidate immediately
    };
  }

  return {
    props: {
      ...primaryShop,
      //...await fetchTranslations(lang, ["common", "productDetail"]),
      ...await fetchCatalogProduct(productSlug),
      ...await fetchAllTags(lang)
    },
    // eslint-disable-next-line camelcase
    // revalidate: 120 // // revalidate each two minutes
  };
}

 **/

/**
 *  Static paths for a product
 *
 * @returns {Object} the paths
 */
/**
 export async function getStaticPaths() {
  return {
    paths: locales.map((locale) => ({ params: { lang: locale, slugOrId: ["-"] } })),
    fallback: true
  };
}

 export default withApollo()(withCart(ProductDetailPage));
 **/
