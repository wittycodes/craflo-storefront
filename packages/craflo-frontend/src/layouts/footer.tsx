import styled from 'styled-components';
import css from '@styled-system/css';
import Link from 'next/link'
import { FormattedMessage } from 'react-intl';
import {FooterWrapper} from '../layouts/header/header.style'
const Box = styled.div(
  css({
    fontSize: 13,
    fontWeight: 500,
    color: '#8c8c8c',
    px: 20,

    a: {
      color: '#8c8c8c',
      '&:hover':{
        textDecoration: 'underline'
      },
      marginRight: '4px'
    },
  }),
  {
    borderTop: '1px solid #dedede',
    margin: 'auto',

    paddingTop: '12px',
    paddingBottom: '36px',
    width: '100%',
    fontFamily: 'Lato, sans-serif',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
);
const Footer = () => {
  return (
    <FooterWrapper>
    <Box>
      <span>
      <Link href={'/privacy'}>Privacy</Link>{'  · '}
      <Link href={'/terms'}>Terms</Link>{'  · '}
      {/*<a target='_blank' href={'https://help.craflo.com'}>Ad Choices</a>{'  · '}*/}
      <Link href={'/privacy'}>Cookies</Link>{'  · '}
        <a target='_blank' href={'https://help.craflo.com'}>Affiliate</a>{'  · '}
        <a target='_blank' href={'https://help.craflo.com'}>Support</a>{'  · '}
      {/*<a target='_blank' href={'https://help.craflo.com'}>More</a>{'  · '}*/}
      <Link href={'/about'}>Craflo.com</Link>

      &copy; 2014-2020
      &nbsp;
      {/*<a href='#' target='_blank'>*/}

      {/*</a>*/}
      </span>
    </Box>
    </FooterWrapper>
  );
};
export default Footer;
