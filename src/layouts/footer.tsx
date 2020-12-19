import styled from 'styled-components';
import css from '@styled-system/css';
import Link from 'next/link'
import { FormattedMessage } from 'react-intl';
const Box = styled.div(
  css({
    fontSize: 13,
    fontWeight: 400,
      color: '#65676b',
    px: 20,

    a: {
      color: '#65676b',
      '&:hover':{
        textDecoration: 'underline'
      }
    },
  }),
  {
    borderTop: '1px solid #dedede',
    margin: 'auto',

    paddingTop: '18px',
    paddingBottom: '36px',
    marginTop: 50,
    width: '80%',
    fontFamily: 'Lato, sans-serif',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
);
const Footer = () => {
  return (
    <Box>
      <span>
      <Link href={'/privacy'}>Privacy</Link>{'  · '}
      <Link href={'/terms'}>Terms</Link>{'  · '}
      <a target='_blank' href={'https://help.craflo.com'}>Advertising</a>{'  · '}
      <a target='_blank' href={'https://help.craflo.com'}>Affiliates</a>{'  · '}
      <a target='_blank' href={'https://help.craflo.com'}>Ad Choices</a>{'  · '}
      <Link href={'/privacy'}>Cookies</Link>{'  · '}
      <a target='_blank' href={'https://help.craflo.com'}>More</a>{'  · '}
      <Link href={'/about'}>Craflo</Link>{'  · '}

      &copy; 2014-2020
      &nbsp;
      {/*<a href='#' target='_blank'>*/}

      {/*</a>*/}
      </span>
    </Box>
  );
};
export default Footer;
