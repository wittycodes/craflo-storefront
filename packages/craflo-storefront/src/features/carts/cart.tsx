import React, { useState } from 'react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import {
  CartPopupBody,
  PopupHeader,
  PopupItemCount,
  CloseButton,
  PromoCode,
  CheckoutButtonWrapper,
  CheckoutButton,
  Title,
  PriceBox,
  NoProductMsg,
  NoProductImg,
  ItemWrapper,
  CouponBoxWrapper,
  CouponCode,
  ErrorMsg,
} from './cart.style';
import { CloseIcon } from 'assets/icons/CloseIcon';
import { ShoppingBagLarge } from 'assets/icons/ShoppingBagLarge';
import { CURRENCY } from 'utils/constant';
import { FormattedMessage } from 'react-intl';
import { useLocale } from 'contexts/language/language.provider';
import CouponBox from 'components/coupon-box/coupon-box';

import { Scrollbars } from 'react-custom-scrollbars';
import { useCart } from 'contexts/cart/use-cart';
import { CartItem } from 'components/cart-item/cart-item/cart-item';
import useRCart from "hooks/cart/useCart";
import { NoCartBag } from 'assets/icons/NoCartBag';


type CartPropsType = {
  style?: any;
  className?: string;
  scrollbarHeight?: string;
  onCloseBtnClick?: (e: any) => void;
  useReactionCart: any;
  cartCollection: any;
};

const APPLY_COUPON = gql`
  mutation applyCoupon($code: String!) {
    applyCoupon(code: $code) {
      id
      code
      discountInPercent
    }
  }
`;

const Cart: React.FC<CartPropsType> = ({
  style,
  className,
  onCloseBtnClick,
  scrollbarHeight,
  cartCollection
}) => {

  let {
    // items,
    coupon,
    addItem,
    removeItem,
    // removeItemFromCart,
    // cartCollection.totalItemQuantity,
    // cartCollection.totalPrice,
    applyCoupon,
  } = useCart()

  // let ReactionCart = useRCart("cmVhY3Rpb24vc2hvcDpvRXNybmM5bXFCRHZ0NTJUVw==")

  // const items = cartCollection.items
  // const cartCollection.totalItemQuantity = cartCollection.totalItemQuantity
  // const cartCollection.totalPrice = cartCollection.totalPrice


  //   Object.keys(cartCollection.shop).map((key, index) => {
  //   cartCollection.shop[key].checkout ? cartCollection.shop[key].checkout.summary.total.amount : 0
  // }


  const [couponText, setCoupon] = useState('');
  const [displayCoupon, showCoupon] = useState(false);
  const [error, setError] = useState('');
  const [appliedCoupon] = useMutation(APPLY_COUPON);
  const { isRtl } = useLocale();

  const handleApplyCoupon = async () => {
    setError('Invalid Coupon');
    /*

    const { data }: any = await appliedCoupon({
      variables: { code: couponText },
    });
    if (data.applyCoupon && data.applyCoupon.discountInPercent) {
      setError('');
      applyCoupon(data.applyCoupon);
      setCoupon('');
    } else {
      setError('Invalid Coupon');
    }*/
  };
  let items = []

  for(const key in cartCollection.shop){
    (cartCollection.shop[key]?.cart?.items || []).forEach((item)=>{
      console.log(item, "pulkittttttt")
      items.push(<CartItem
        key={`cartItem-${item._id}`}
        onIncrement={() => addItem(item)}
        onDecrement={() => removeItem(item)}
        onRemove={() => cartCollection.shop[key].onRemoveCartItems(item._id)}
        data={item}
      />)
    })
  }


  const handleChange = (value: string) => {
    setCoupon(value);
  };

  const toggleCoupon = () => {
    showCoupon(true);
  };

  return (
    <CartPopupBody className={className} style={style}>
      <PopupHeader>
        <PopupItemCount>
          <ShoppingBagLarge width='19px' height='24px' />
          <span>
            {cartCollection.totalItemQuantity}
            &nbsp;
            {cartCollection.totalItemQuantity > 1 ? (
              <FormattedMessage id='cartItems' defaultMessage='items' />
            ) : (
              <FormattedMessage id='cartItem' defaultMessage='item' />
            )}
          </span>
        </PopupItemCount>

        <CloseButton onClick={onCloseBtnClick}>
          <CloseIcon />
        </CloseButton>
      </PopupHeader>

      <Scrollbars
        universal
        autoHide
        autoHeight
        autoHeightMax={scrollbarHeight}
        renderView={(props) => (
          <div
            {...props}
            style={{
              ...props.style,
              marginLeft: isRtl ? props.style.marginRight : 0,
              marginRight: isRtl ? 0 : props.style.marginRight,
            }}
          />
        )}
      >
        {}
        <ItemWrapper className='items-wrapper'>
          {!!cartCollection.totalItemQuantity ? (
              items
          ) : (
            <>
              <NoProductImg>
                <NoCartBag />
              </NoProductImg>
              <NoProductMsg>
                <FormattedMessage
                  id='noProductFound'
                  defaultMessage='No products found'
                />
              </NoProductMsg>
            </>
          )}
        </ItemWrapper>
      </Scrollbars>

      <CheckoutButtonWrapper>
        <PromoCode>
          {!coupon?.discountInPercent ? (
            <>
              {!displayCoupon ? (
                <button onClick={toggleCoupon}>
                  <FormattedMessage
                    id='specialCode'
                    defaultMessage='Have a special code?'
                  />
                </button>
              ) : (
                <CouponBoxWrapper>
                  <CouponBox
                    onUpdate={handleChange}
                    value={couponText}
                    onClick={handleApplyCoupon}
                    disabled={!couponText.length || !cartCollection.totalItemQuantity}
                    buttonTitle='Apply'
                    intlCouponApplyButton='voucherApply'
                    intlCouponBoxPlaceholder='couponPlaceholder'
                    style={{
                      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.06)',
                    }}
                  />
                  {error ? <ErrorMsg>{error}</ErrorMsg> : ''}
                </CouponBoxWrapper>
              )}
            </>
          ) : (
            <CouponCode>
              <FormattedMessage
                id='couponApplied'
                defaultMessage='Coupon Applied'
              />
              <span>{coupon.code}</span>
            </CouponCode>
          )}
        </PromoCode>

        {cartCollection.totalItemQuantity !== 0 ? (
          <Link href='/checkout'>
            <CheckoutButton onClick={onCloseBtnClick}>
              <>
                <Title>
                  <FormattedMessage
                    id='navlinkCheckout'
                    defaultMessage='Checkout'
                  />
                </Title>
                <PriceBox>
                  {CURRENCY}
                  {cartCollection.totalPrice}
                </PriceBox>
              </>
            </CheckoutButton>
          </Link>
        ) : (
          <CheckoutButton>
            <>
              <Title>
                <FormattedMessage
                  id='navlinkCheckout'
                  defaultMessage='Checkout'
                />
              </Title>
              <PriceBox>
                {CURRENCY}
                {cartCollection.totalPrice}
              </PriceBox>
            </>
          </CheckoutButton>
        )}
      </CheckoutButtonWrapper>
    </CartPopupBody>
  );
};

export default Cart;