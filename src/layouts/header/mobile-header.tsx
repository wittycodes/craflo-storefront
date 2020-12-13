import React from 'react';
import { useRouter } from 'next/router';
import { openModal, closeModal } from '@redq/reuse-modal';
// import MobileDrawer from './mobile-drawer';
import {
  MobileHeaderWrapper,
  MobileHeaderInnerWrapper,
  DrawerWrapper,
  LogoWrapper,
  SearchWrapper,
  SearchModalWrapper,
  SearchModalClose,
} from './header.style';
import Search from 'features/search/search';
import LogoImage from 'assets/images/logo.png';

import { SearchIcon } from 'assets/icons/SearchIcon';
import { LongArrowLeft } from 'assets/icons/LongArrowLeft';
import Logo from 'layouts/logo/logo';
import LanguageSwitcher from './menu/language-switcher/language-switcher';
import { isCategoryPage } from '../is-home-page';
import useDimensions from 'utils/useComponentSize';
import {LeftMenu} from "./menu/left-menu/left-menu";
import GeoSwitcher from "./menu/geo-switcher/geo-switcher";
import {SelectedFilters} from '@appbaseio/reactivesearch';
import Headroom from 'react-headroom'
import {Filter} from "../../assets/icons/Filter";
import {Button} from "../../components/button/button";
import useStores from "../../reaction/hooks/useStores";

type MobileHeaderProps = {
  className?: string;
  closeSearch?: any;
};

const SearchModal: React.FC<{}> = () => {
  const onSubmit = () => {
    closeModal();
  };
  return (
    <SearchModalWrapper>
      <SearchModalClose type="submit" onClick={() => closeModal()}>
        <LongArrowLeft />
      </SearchModalClose>
      <Search
        className="header-modal-search"
        showButtonText={false}
        onSubmit={onSubmit}
        mobile={true}
      />
    </SearchModalWrapper>
  );
};

const MobileHeader: React.FC<MobileHeaderProps> = ({ className }) => {
  const { pathname, query } = useRouter();

  const [mobileHeaderRef, dimensions] = useDimensions();

  const handleSearchModal = () => {
    openModal({
      show: true,
      config: {
        enableResizing: false,
        disableDragging: true,
        className: 'search-modal-mobile',
        width: '100%',
        height: '100%',
      },
      closeOnClickOutside: true,
      component: SearchModal,
      closeComponent: () => <div />,
    });
  };
  const type = pathname === '/restaurant' ? 'restaurant' : query.type;

  const isHomePage = isCategoryPage(type);
  const { uiStore } = useStores();

  return (
    <>
    <MobileHeaderWrapper>
      <MobileHeaderInnerWrapper className={className} ref={mobileHeaderRef}>
        <LeftMenu logo={LogoImage} />
        {/*<LogoWrapper>*/}
        {/*  <Logo imageUrl={LogoImage} alt="shop logo" />*/}
        {/*</LogoWrapper>*/}

        {/*<GeoSwitcher />*/}

        {/*{isHomePage ? (*/}
        <Button
          size="big"
          variant="outlined"
          type="button"
          className="add-button"
          onClick={()=> {
            uiStore.toggleFilterDrawerOpen()
            uiStore.closeMenuDrawer()
          }}
          style={{background:"none",border:"none", padding: " 0 1rem  0 1rem",  marginRight: "0.5rem", marginLeft:"4rem"}}
        >
          <Filter color={"#000"} width={28} height={28}/>
        </Button>

          <SearchWrapper
            onClick={handleSearchModal}
            className="searchIconWrapper"
          >
            <SearchIcon />
          </SearchWrapper>
        {/* ) : null}*/}
      </MobileHeaderInnerWrapper>
    </MobileHeaderWrapper>
  {/*<Headroom*/}
  {/*  pinStart={70}*/}
  {/*>*/}
  {/*  <div style={{*/}
  {/*    background: "#fff",*/}
  {/*    paddingRight: 284,*/}
  {/*    paddingLeft: 284,*/}
  {/*    // paddingTop: 8,*/}
  {/*    paddingBottom: 4,*/}
  {/*    // borderTop: "#ddd 1px dashed",*/}
  {/*    // borderBottom: "#ddd 1px solid",*/}
  {/*    zIndex: 999,*/}
  {/*    top: 70,*/}
  {/*    position: "relative"*/}
  {/*  }}>*/}
  {/*    <SelectedFilters*/}
  {/*      showClearAll={false}*/}
  {/*      clearAllLabel={"Clear"}*/}
  {/*      innerClass={{*/}
  {/*        button: 'sfilter-button'*/}
  {/*      }}/>*/}
  {/*  </div>*/}
  {/*</Headroom>*/}
  </>
  );
};

export default MobileHeader;
