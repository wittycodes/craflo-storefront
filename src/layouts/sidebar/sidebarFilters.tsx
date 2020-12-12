import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import Sticky from 'react-stickynode';
import { Scrollbars } from 'react-custom-scrollbars';
import Popover from 'components/popover/popover';
import { ArrowDropDown } from 'assets/icons/ArrowDropDown';
import { CategoryIcon } from 'assets/icons/CategoryIcon';
import Grid from "@material-ui/core/Grid";
import { useLocale } from 'contexts/language/language.provider';
import Image from 'next/image'
import {
  SidebarMobileLoader,
  SidebarLoader,
} from 'components/placeholder/placeholder';
import { FormattedMessage } from 'react-intl';
import {
  CategoryWrapper,
  TreeWrapper,
  PopoverHandler,
  PopoverWrapper,
  SidebarWrapper,
  RequestMedicine,
  FiltersWrapper
} from './sidebar.style';
import inject from "hocs/inject";
import ColorFilter from "../../components/color-filter/color-filter";
import {DynamicRangeSlider, RatingsFilter} from '@appbaseio/reactivesearch'


import { NavigationItemDesktop } from "components/NavigationDesktop";

import { TreeMenu } from 'components/tree-menu/tree-menu';

import { GET_CATEGORIES } from 'graphql/query/category.query';
import { Row, Col } from 'react-styled-flexboxgrid';

import { REQUEST_MEDICINE_PAGE } from 'constants/navigation';
import Menu from "src/layouts/header/menu";
import {
  DrawerContentWrapper,
  DrawerMenu,
  DrawerMenuItem,
  DrawerProfile,
  LoginView,
  LogoutView,
  UserAvatar,
  UserDetails, UserOptionMenu
} from "../header/header.style";
import UserImage from "../../assets/images/user.jpg";
import {StyledProfileButton, Button} from "../../components/button/button";
import NavLink from "../../components/nav-link/nav-link";
import AuthenticationForm from "../../features/authentication-form";
import { useAppState, useAppDispatch } from 'contexts/app/app.provider';
import {AuthContext} from "../../contexts/auth/auth.context";
import { openModal, closeModal } from '@redq/reuse-modal';
import useAuthStore from "../../reaction/hooks/globalStores/useAuthStore";
// import {StyledProfileButton} from 'src/components/Button'
type SidebarCategoryProps = {
  deviceType: {
    mobile: string;
    tablet: string;
    desktop: boolean;
  };
  type: string;
};



const SidebarCategory: React.FC<SidebarCategoryProps> = ({
  deviceType: { mobile, tablet, desktop },
  type,
  ...props
}) => {
  const router = useRouter();
  // let { data, loading } = useQuery(GET_CATEGORIES, {
  //   variables: { type },
  // });


  let loading = false
  let data = {
      categories: [
      {
    id: 1, title: 'Fruits & Vegetables',
    slug: 'fruits-and-vegetables',
    products: [],
    type: 'grocery',
    icon: 'FruitsVegetable',
    children: [
    {
      id: 2,
      title: 'Fruits',
      slug: 'fruits',
      products: [],
      type: 'grocery',
    },
    {
      id: 3,
      title: 'vegetables',
      slug: 'vegetables',
      products: [],
      type: 'grocery',
    },
  ]}]}




  const {
    isAuthenticated,
    account:{
      primaryEmailAddress,
      name
    }
  } = useAuthStore()

  const { pathname, query } = router;
  const selectedQueries = query.category;

  const { isRtl } = useLocale();

  const onCategoryClick = (slug: string) => {
    const { type, ...rest } = query;
    router.push(
      {
        pathname,
        query: { ...rest, category: slug },
      },
      {
        pathname: `/${type}`,
        query: { ...rest, category: slug },
      }
    );
  };
  const isSidebarSticky = useAppState('isSidebarSticky');

  if (!data || loading) {
    if (mobile || tablet) {
      return <SidebarMobileLoader />;
    }
    return <SidebarLoader />;
  }

  function renderNavItem(navItem, index) {
    return <NavigationItemDesktop key={index} navItem={navItem} />;
  }
  const { navItems } = props
  // console.log(props)



  const isDrawerOpen = useAppState('isDrawerOpen');
  const dispatch = useAppDispatch();
  const {
    authDispatch,
  } = React.useContext<any>(AuthContext);
  // Toggle drawer
  const toggleHandler = React.useCallback(() => {
    dispatch({
      type: 'TOGGLE_DRAWER',
    });
  }, [dispatch]);

  /*
    React.useEffect(() => {
      window.addEventListener("GuestAuthSuccess", (e)=>{
        closeModal()
        console.log(e, "areeee had h be ye kaam krne lag gya bc")
      }, false);
    });
  */

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      authDispatch({ type: 'SIGN_OUT' });
      Router.push('/');
    }
  };

  /*
    React.useEffect(() => {
      window.addEventListener("GuestAuthSuccess", (e)=>{
        closeModal()
        console.log(e, "areeee had h be ye kaam krne lag gya bc")
      }, false);
    });
  */

  const signInOutForm = () => {
    dispatch({
      type: 'TOGGLE_DRAWER',
    });

    authDispatch({
      type: 'SIGNIN',
    });

    openModal({
      show: true,
      overlayClassName: 'quick-view-overlay',
      closeOnClickOutside: true,
      component: AuthenticationForm,
      closeComponent: '',
      config: {
        enableResizing: false,
        disableDragging: true,
        className: 'quick-view-modal',
        width: 410
      },
    });
  };

  console.log(useAuthStore(), "hgdawwwww")


  return (
    <CategoryWrapper>
      {/*<PopoverWrapper*/}
      {/*// className={`${mobile || tablet ? 'mobileView' : ''}`}*/}
      {/*>*/}
      {/*  <Popover*/}
      {/*    handler={*/}
      {/*      <PopoverHandler>*/}
      {/*        <div>*/}
      {/*          <CategoryIcon />*/}
      {/*          Select your Category*/}
      {/*        </div>*/}
      {/*        <div>*/}
      {/*          <ArrowDropDown />*/}
      {/*        </div>*/}
      {/*      </PopoverHandler>*/}
      {/*    }*/}
      {/*    className="category-popover"*/}
      {/*    content={*/}
      {/*      <>*/}
      {/*        {type === 'medicine' && (*/}
      {/*          <Link href={REQUEST_MEDICINE_PAGE}>*/}
      {/*            <RequestMedicine>*/}
      {/*              <FormattedMessage id="reqMedicine" />*/}
      {/*            </RequestMedicine>*/}
      {/*          </Link>*/}
      {/*        )}*/}
      {/*        <nav>{navItems?.items.map(renderNavItem)}</nav>;*/}
      {/*        <TreeMenu*/}
      {/*          data={data.categories}*/}
      {/*          onClick={onCategoryClick}*/}
      {/*          active={selectedQueries}*/}
      {/*        />*/}
      {/*      </>*/}
      {/*    }*/}
      {/*  />*/}
      {/*</PopoverWrapper>*/}

      {/*<SidebarWrapper*/}
      {/*  // className={`${mobile || tablet ? 'mobileView' : ''}`}*/}
      {/*  style={{ paddingTop: type === 'medicine' ? 0 : 45 }}*/}
      {/*>*/}
        {/*<Sticky enabled={false} top={type === 'medicine' ? 89 : 110}>*/}



          <Scrollbars
            universal
            autoHide
            autoHeight
            autoHeightMax={"calc(100vh - 82px - 20px)"}
            style={{top: '82px'}}
            renderView={(props) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  marginLeft: isRtl ? props.style.marginRight : 0,
                  marginRight: isRtl ? 0 : props.style.marginRight,
                  marginTop: '80px'
                }}
              />
            )}
          >

            <DrawerContentWrapper >
              {mobile ?
                <DrawerProfile>

                  {isAuthenticated ? (
                    <LoginView>

                      <Grid container spacing={1}>
                        <UserAvatar>
                          <Image src={UserImage} alt="user_avatar"/>
                        </UserAvatar>
                        <UserDetails>
                          <h3>{name}</h3>

                          <span>{primaryEmailAddress}</span>
                        </UserDetails>

                        <Grid item xs={12} style={{paddingTop: 24}}/>

                        <Grid item xs={6}>
                          <StyledProfileButton variant={'orders'}>Your Orders</StyledProfileButton>
                        </Grid>
                        <Grid item xs={6}>
                          <StyledProfileButton variant={'address'}>Saved Address</StyledProfileButton>
                        </Grid>
                        <Grid item xs={6}>
                          <StyledProfileButton variant={'payments'}>Payments</StyledProfileButton>
                        </Grid>
                        <Grid item xs={6}>
                          <StyledProfileButton variant={'offers'}>Offers</StyledProfileButton>
                        </Grid>
                        <Grid item xs={12}>
                          <DrawerMenuItem>
                            <div onClick={handleLogout} style={{marginTop: 24}} className="drawer_menu_item">
                            <span className="logoutBtn">
                              <FormattedMessage
                                id="navlinkLogouts"
                                defaultMessage={"Not " + name + "? Logout"}
                              />
                            </span>
                            </div>
                          </DrawerMenuItem>
                        </Grid>

                      </Grid>

                    </LoginView>
                  ) : (
                    <LogoutView>
                      <Button variant="primary" onClick={signInOutForm}>
                        <FormattedMessage
                          id="mobileSignInButtonText"
                          defaultMessage="join"
                        />
                      </Button>
                    </LogoutView>
                  )}

                </DrawerProfile> : null
              }

            </DrawerContentWrapper>


              {/*{isAuthenticated && (*/}
              {/*  <UserOptionMenu>*/}
              {/*    /!*<DrawerMenuItem>*!/*/}
              {/*    /!*  <NavLink*!/*/}
              {/*    /!*    href="/profile"*!/*/}
              {/*    /!*    label="Your Account Settings"*!/*/}
              {/*    /!*    className="drawer_menu_item"*!/*/}
              {/*    /!*    intlId="navlinkAccountSettings"*!/*/}
              {/*    /!*  />*!/*/}
              {/*    /!*</DrawerMenuItem>*!/*/}

              {/*  </UserOptionMenu>*/}
              {/*)}*/}
              <FiltersWrapper>

            <div style={{marginTop: 24}}/>
            <Col style={{width: '16rem', alignItems: 'flex-end', margin:'auto', height:72, backgroundColor: "#fff" }}>
              <Row xs={4} sm={3} md={3} lg={3} style={{marginTop: '2rem'}}>
                <b> Choose Colors </b>
                <ColorFilter/>
              </Row>
              <Row xs={4} sm={3} md={3} lg={3} style={{width: '10rem', marginTop: '2rem'}}>
                <b> Price Range </b>
                <DynamicRangeSlider
                  componentId="Price Range"
                  filterLabel="Price ₹"
                  dataField="product.pricing.USD.minPrice"
                  showHistogram={true}
                  rangeLabels={(min, max) => ({
                    start: `Rs. ${min}`,
                    end: `Rs. ${max}`,
                  })}
                  innerClass={{
                    slider: 'price-filter-slider',
                    label: 'price-filter-label'
                  }}
                />
              </Row>

              <Row xs={4} sm={3} md={3} lg={3} style={{width: '10rem', marginTop: '2rem'}}>
                <b> Ratings </b>
                <RatingsFilter
                  componentId="Ratings"
                  filterLabel={"Stars"}
                  dataField="ratings"
                  data={[
                    { start: 4, end: 5, label: '4 & up' },
                    { start: 3, end: 5, label: '3 & up' },
                    { start: 1, end: 5, label: 'All' },
                  ]}
                />
              </Row>

            </Col>

            {/*  <TreeMenu*/}
            {/*    data={data.categories}*/}
            {/*    onClick={onCategoryClick}*/}
            {/*    active={selectedQueries}*/}
            {/*  />*/}
            </FiltersWrapper>
          </Scrollbars>
        {/*</Sticky>*/}
      {/*</SidebarWrapper>*/}
    </CategoryWrapper>
  );
};

export default React.memo(inject("navItems")(SidebarCategory));
