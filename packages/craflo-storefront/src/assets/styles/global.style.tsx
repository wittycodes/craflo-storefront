import styled, { createGlobalStyle } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
const TIMEOUT = 400;

export const InjectRTL = styled.div`
  ${({ lang }) =>
    (lang === 'ar' || lang === 'he') &&
    `
    font-family: 'Cairo', sans-serif;
    `}
`;

export const GlobalStyle = createGlobalStyle`
  @font-face {
      font-family: 'Graphik';
      src: local('Graphik Regular'), local('Graphik-Regular'),
          url('fonts/Graphik-Regular.woff2') format('woff2'),
          url('fonts/Graphik-Regular.woff') format('woff'),
          url('fonts/Graphik-Regular.ttf') format('truetype');
      font-weight: 400;
      font-style: normal;
    }

  @font-face {
      font-family: 'Guardian-EgypTT';
      src: local('Guardian-EgypTT Light'), local('Guardian-EgypTT-Light'),
          url('fonts/Guardian-EgypTT-Light.woff2') format('woff2')
      font-weight: 100;
      font-style: normal;
    }

  @font-face {
      font-family: 'Guardian-EgypTT';
      src: url('fonts/Guardian-EgypTT-Light.woff') format('woff')
      font-weight: 300;
      font-style: normal;
    }

  @font-face {
    font-family:"Guardian-EgypTT";
    font-style: normal;
    font-weight: 400;
    src: url("/fonts/Guardian-EgypTT-Regular.woff") format("woff");
  }

  @font-face {
    font-family:"Guardian-EgypTT";
    font-style: normal;
    font-weight: 500;
    src: url("/fonts/Guardian-EgypTT-Medium.woff") format("woff");
  }

  html {
    box-sizing: border-box;

  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
  :focus {
    outline: none;
  }
  body{
    margin: 0;
    font-family: ${themeGet('fontFamily.0', 'sans-serif')};
  }

  h1,h2,h3,h4,h5,h6  {
    font-family: ${themeGet('fontFamily.1', 'sans-serif')};
    margin: 0;
  }

  h3 {
    font-size: 16px;
    font-weight: 300;
  }

  p {
    font-size: 14px;
    font-weight: 300;
  }

  p,a,span,button,li,div  {
    font-family: ${themeGet('fontFamily.0', 'sans-serif')};
    margin: 0;
  }
  ul{
    margin: 0;
    padding: 0;
  }
  li{
    list-style: none;
  }

  a{
    text-decoration: none;
  }

  .quick-view-overlay{
    background-color: rgba(0,0,0,0.6);
    transition: opacity 1s;
    opacity: 1;
    z-index: 99990
  }

  .quick-view-modal{
    z-index: 99999 !important
  }

  .reuseModalParentWrapper{
    z-index: 99999 !important
  }

  .add-address-modal,
  .add-contact-modal{
    box-shadow: 0 10px 40px rgba(0,0,0,0.16);
    border-radius: 3px !important;
    .innerRndComponent{
      width: 100%;
      padding: 30px;
      height: auto;
      background-color: #f7f8f9;
      border: 0;
      box-sizing: border-box;
    }
  }

  .search-modal-mobile{
    transform: none!important;
    max-width: none!important;
    max-height: none!important;
    top: 0!important;
    left: 0!important;
    background: transparent!important;;
    border-radius: 0!important;
  }

  .reuseModalCloseBtn{
    right: 10px!important;
    background-color: #ffffff!important;
    color: #222222!important;
    border-radius: 15px!important;
    padding: 0 9px!important;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
  }



  .page-transition-enter {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
  }
  .page-transition-enter-active {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    transition: opacity ${TIMEOUT}ms, transform ${TIMEOUT}ms;
  }
  .page-transition-exit {
    opacity: 1;
  }
  .page-transition-exit-active {
    opacity: 0;
    transition: opacity ${TIMEOUT}ms;
  }
  .loading-indicator-appear,
  .loading-indicator-enter {
    opacity: 0;
  }
  .loading-indicator-appear-active,
  .loading-indicator-enter-active {
    opacity: 1;
    transition: opacity ${TIMEOUT}ms;
  }

  .image-item{
    padding: 0 15px;
  }

  @media (max-width: 1199px) and (min-width: 991px) {
    .image-item{
      padding-left: 10px;
      padding-right: 10px;
    }
  }
  @media (max-width: 768px) {
    .image-item{
      padding-left: 7.5px;
      padding-right: 7.5px;
    }
  }

  .rc-table-fixed-header .rc-table-scroll .rc-table-header{
    margin-bottom: 0 !important;
    padding-bottom: 0 !important;

    th {
      padding: 8px 20px;
      }
  }

  .drawer-content-wrapper{
    *:focus {
      outline: none;
    }
  }

  .rc-table-content{
    border: 0;
  }

  .elastic-search-title{
    display: none
  }

  .price-filter-slider {
  width: 10rem;
  color: #fff;
    & .rheostat-progress {
    background-image: linear-gradient(120deg, #009e7f 0%, #8fd3f4 100%);
    height: 6px !important;
    }
    & .rheostat-background {
    height: 5px !important;
    }
    & .rheostat-handle {
      :hover {transform: scale(1.5);}
        transition: transform .3s cubic-bezier(.215,.61,.355,1);
        width: 1rem !important;
        height: 1rem !important;
        background: #009e7f !important;
        top: -5px !important;
        border: none !important;
    }
  }

  .price-filter-label {
  font-size: 14px
  }

  .search-icon {
    height: 100%;
    font-size: 16px;
    color: #77798C !important;
    fill: #77798C !important;
    width: 16px;
    margin: 5px;

    &.right {
      right: 0;
      left: auto;
    }
  }

  .elastic-search-input{
    flex-grow: 1;
    font-size: 16px;
    height: 48px;
    background-color: #FFFFFF !important;
    border: 0px !important;
    display: flex;
    border-radius: 6px;
    overflow: visible;
    width: 700px !important;
    color: #77798C;
    height: 50px !important;
    box-shadow: 0 21px 36px rgba(0,0,0,0.05);
    padding-left: 1rem !important;

  }


  .elastic-search-input-minimal{
    flex-grow: 1;
    font-size: 16px;
    font-family: ${themeGet('fontFamily.0', 'sans-serif')};

    height: 48px;
    background-color: rgb(247, 247, 247) !important;
    border: 0px !important;
    display: flex;
    border-radius: 6px;
    overflow: visible;
    padding-left: 1rem !important;
    width: 100% !important;
    color: #77798C;
    height: 50px !important
  }


  .elastic-search-input-mobile{
    flex-grow: 1;
    font-size: 16px;
    display: flex;
    overflow: visible;
    width: 100% !important;
    border: 0px !important;
    background: none !important;
    font-family: ${themeGet('fontFamily.0', 'sans-serif')};

  }

  input, textarea, select, button {
      font-family: ${themeGet('fontFamily.0', 'sans-serif')} !important;

  }

  button {
    font-weight:400 !important;
  }
 `;
