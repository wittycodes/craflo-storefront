import React, { useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Button } from 'components/button/button';
import {
  ProductDetailsWrapper,
  ProductPreview,
  ProductInfo,
  ProductTitlePriceWrapper,
  ProductTitle,
  BackButton,
  ProductWeight,
  ProductDescription,
  ButtonText,
  ProductMeta,
  ProductCartWrapper,
  ProductPriceWrapper,
  ProductPrice,
  SalePrice,
  ProductCartBtn,
  MetaSingle,
  MetaItem,
  RelatedItems,
  ZoomImageWrapper
} from './product-details-one.style';
import { LongArrowLeft } from 'assets/icons/LongArrowLeft';
import { CartIcon } from 'assets/icons/CartIcon';
import ReadMore from 'components/truncate/truncate';
import CarouselWithCustomDots from 'components/multi-carousel/multi-carousel';
import Products from 'components/product-grid/product-list/product-list';
import { CURRENCY } from 'utils/constant';
import { FormattedMessage } from 'react-intl';
import { useLocale } from 'contexts/language/language.provider';
// import { useCart } from 'contexts/cart/use-cart';
import { Counter } from 'components/counter/counter';
import Carousel from "../../carousel/carousel";
import OFFERS from "../../../data/offers";
import Carousel1 from "../../../sections/carousels/featured";
import {OfferSection} from "../../../assets/styles/pages.style";
import { Row, Col } from 'react-styled-flexboxgrid';
import GeoSwitcher from "../../../layouts/header/menu/geo-switcher/geo-switcher";
import priceByCurrencyCode from "lib/utils/priceByCurrencyCode";
import variantById from "lib/utils/variantById";
import useCart from 'hooks/cart/useCart';

type ProductDetailsProps = {
  product: any;
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const ProductDetails: React.FunctionComponent<ProductDetailsProps> = ({
  product,
  deviceType,
}) => {
  const { isRtl } = useLocale();
  const data = product;

  // const handleAddClick = (e) => {
  //   e.stopPropagation();
  //   addItem(data);
  // };
  //
  // const handleRemoveClick = (e) => {
  //   e.stopPropagation();
  //   removeItem(data);
  // };

  let productQuantity = 0

  const { addItemsToCart, onRemoveCartItems, cart } = useCart(product?.shop?._id);
  const [PQuantity, setPQuantity] = React.useState(0)


  // useEffect(()=>{
  //   let c= false
  //   cart.items.forEach((a)=>{
  //     if (a.productConfiguration.productId == product.productId) {
  //       c=true
  //       setPQuantity(a.quantity)
  //     }
  //   })
  //   if(!c){
  //     setPQuantity(a.quantity)    }
  // }, [cart])

  const currencyCode = "USD";
  let selectedVariant, selectedOption;

  const selectVariant = (variant, optionId) => {// Select the variant, and if it has options, the first option
    const variantId = variant._id;
    let selectOptionId = optionId;
    if (!selectOptionId && variant.options && variant.options.length) {
      selectOptionId = variant.options[0]._id;
    }
    selectedVariant = variantById(product.variants, variantId);
    selectedOption = variantById(selectedVariant.options, selectOptionId);
    //setPDPSelectedVariantId(variantId, selectOptionId);
  }

  const determineProductPrice = ()=>{
    let productPrice;
    if (selectedOption && selectedVariant) {
      productPrice = priceByCurrencyCode(currencyCode, selectedOption.pricing);
    } else if (!selectedOption && selectedVariant) {
      productPrice = priceByCurrencyCode(currencyCode, selectedVariant.pricing);
    }
    return productPrice;
  }

  selectVariant(product.variants[0], null);

  const productPrice = determineProductPrice();
  const compareAtDisplayPrice = (productPrice.compareAtPrice && productPrice.compareAtPrice.displayAmount) || null;

  const handleAddClick = (e) => {
    e.stopPropagation();
    // cartAnimation(e);
    //--console.log(price)
    const selectedVariantOrOption = selectedOption || selectedVariant;

    // Call addItemsToCart with an object matching the GraphQL `CartItemInput` schema
    let quantity = 1.0
    addItemsToCart([
        {
          price: {
            amount: productPrice.price,
            currencyCode
          },
          productConfiguration: {
            productId: product.productId, // Pass the productId, not to be confused with _id
            productVariantId: selectedVariantOrOption.variantId // Pass the variantId, not to be confused with
          },
          quantity
        }
      ]
    );
    if (!isInCart(89)) {
       // cartAnimation(e);
    }
  };



  const handleRemoveClick = (e) => {
    e.stopPropagation();
    //onRemoveCartItems(data);
  };
  const isInCart = (_id: number)=>{
    return false
  }






  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  }, []);

  const media = JSON.parse(product.metafields[0].value)


  return (
    <>
      <ProductDetailsWrapper className="product-card" dir="ltr">
        {!isRtl && (
          <ProductPreview>
            <BackButton>
              <Button
                type="button"
                size="small"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #f1f1f1',
                  color: '#77798c',
                }}
                onClick={Router.back}
              >
                <LongArrowLeft style={{ marginRight: 5 }} />
                <FormattedMessage id="backBtn" defaultMessage="Back" />
              </Button>
            </BackButton>

            <CarouselWithCustomDots
              items={media}
              deviceType={deviceType}
              title={product.title}
            />
          </ProductPreview>
        )}

        <ProductInfo   dir={isRtl ? 'rtl' : 'ltr'}>
          <ProductTitlePriceWrapper>
            <ProductTitle>{product.title}</ProductTitle>
            <ProductPriceWrapper>
              {product.discountInPercent ? (
                <SalePrice>
                  {/*CURRENCY*/}
                  {product.pricing[0].displayPrice}
                </SalePrice>
              ) : null}

              <ProductPrice>
                {/*CURRENCY*/}
                {product.pricing[0].displayPrice}
              </ProductPrice>
            </ProductPriceWrapper>
          </ProductTitlePriceWrapper>
          <ZoomImageWrapper
            style={{
              position: 'absolute',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
            id="product-info-786"></ZoomImageWrapper>

          <ProductWeight>{product.unit}</ProductWeight>
          {console.log(product, cart, "oooooooooooo")}
          <ProductDescription>
            <ReadMore character={200}>{product.description}</ReadMore>
          </ProductDescription>

          <ProductCartWrapper>
            <ProductCartBtn>
              {PQuantity ==0 ? (
                <Button
                  className="cart-button"
                  variant="secondary"
                  borderRadius={100}
                  onClick={handleAddClick}
                >
                  <CartIcon mr={2} />
                  <ButtonText>
                    <FormattedMessage
                      id="addCartButton"
                      defaultMessage="Cart"
                    />
                  </ButtonText>
                </Button>
              ) : (
                <Counter
                  value={PQuantity}
                  onDecrement={handleRemoveClick}
                  onIncrement={handleAddClick}
                />
              )}
              <GeoSwitcher />
            </ProductCartBtn>

          </ProductCartWrapper>

          <ProductMeta>
            <MetaSingle>
              {product?.categories?.map((item: any) => (
                <Link
                  href={`/${product.type.toLowerCase()}?category=${item.slug}`}
                  key={`link-${item.id}`}
                >
                  {
                    <a>
                      <MetaItem>{item.title}</MetaItem>
                    </a>
                  }
                </Link>
              ))}
            </MetaSingle>
          </ProductMeta>
        </ProductInfo>

        {isRtl && (
          <ProductPreview>
            <BackButton>
              <Button
                title="Back"
                intlButtonId="backBtn"
                iconPosition="left"
                size="small"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #f1f1f1',
                  color: '#77798c',
                }}
                icon={<LongArrowLeft />}
                onClick={Router.back}
              />
            </BackButton>

            <CarouselWithCustomDots
              items={product.gallery}
              deviceType={deviceType}
            />
          </ProductPreview>
        )}
      </ProductDetailsWrapper>
      <div style={{background: '#fff'}}>

        <RelatedItems>
          <h2 style={{paddingTop: "30px"}}>Select Variants</h2>
        </RelatedItems>

        <OfferSection>
          <div style={{ margin: '0 -10px' }}>
            <div style={{ margin: ' 0 40px 0 40px' }}>
              <Row>
                <Col xs={12}>
                  <h5 style={{float: 'left'}}>By Styles</h5>
                  <Carousel1/>
                </Col>
                <Col xs={12}>
                  <h5 style={{float: 'left'}}>By Colours</h5>
                  <Carousel1/>
                </Col>
                <Col xs={12}>
                  <h5 style={{float: 'left'}}>By Sizes</h5>
                  <Carousel1/>
                </Col>
              </Row>
            </div>
          </div>
        </OfferSection>
      </div>
    </>
  );
};

export default ProductDetails;
