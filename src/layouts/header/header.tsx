import React from 'react';
import Router, { useRouter } from 'next/router';
import { openModal, closeModal } from '@redq/reuse-modal';
import { AuthContext } from 'contexts/auth/auth.context';
import AuthenticationForm from 'features/authentication-form';
import { RightMenu } from './menu/right-menu/right-menu';
import { LeftMenu } from './menu/left-menu/left-menu';
import HeaderWrapper from './header.style';
import LogoImage from 'assets/images/logo.png';
import UserImage from 'assets/images/user.jpg';
import { isCategoryPage } from '../is-home-page';
import Search from 'features/search/search';
import useAuthStore from "hooks/globalStores/useAuthStore";
import LanguageSwitcher from "./menu/language-switcher/language-switcher";
import GeoSwitcher from "./menu/geo-switcher/geo-switcher";
import { useAppState, useAppDispatch } from 'contexts/app/app.provider';
import useMiniProfile from "hooks/viewer/useMiniProfile";
import {withApollo} from "lib/apollo/withApollo";

type Props = {
  className?: string;
};

const CANONICAL_URL = process.env.CANONICAL_URL

const Header: React.FC<Props> = ({ className }) => {
  const {
    authDispatch,
  } = React.useContext<any>(AuthContext);

  const {isAuthenticated, account} = useAuthStore()
  const {miniProfile} = useMiniProfile()
  const { pathname, query } = useRouter();

  const handleLogout = () => {
    // if (typeof window !== 'undefined') {
    //   localStorage.removeItem('access_token');
    //   authDispatch({ type: 'SIGN_OUT' });
    //   Router.push('/');
    // }
    Router.push('/logout');
    // fetch(CANONICAL_URL + "/logout").then((res)=>res.json()).then((res)=>{
    //   console.log(res)
    // },
    //   (err)=>{
    //     console.log(err)
    //   })
  };

  const handleJoin = () => {
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
        width: 410,
        height: 'auto',
      },
    });
  };

  const isSticky = useAppState('isSticky');
  const showSearch =  isSticky
  console.log(miniProfile, "randi")
  return (
    <HeaderWrapper className={className} id="layout-header" style={{background: pathname == '/[lang]'? 'none' :  "#fff !important"}}>
      <LeftMenu logo={LogoImage} />
      {showSearch && (
        <>
          <GeoSwitcher />
          <Search minimal={true} className="headerSearch" />
        </>
      )}
      <RightMenu
        isAuthenticated={isAuthenticated}
        onJoin={handleJoin}
        onLogout={handleLogout}
        avatar={ miniProfile?.picture || UserImage}
      />
    </HeaderWrapper>
  );
};

export default withApollo()(Header);


