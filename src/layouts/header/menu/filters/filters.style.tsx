import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const Box = styled.div`
  margin-right: 2px;
  margin-left: 4%;


  .popover-wrapper.right {
    .popover-content {
      padding: 15px 0;
    }
  }

  @media (max-width: 767px) {
    margin-right: 2px;
  }
`;

export const SelectedItem = styled.button`
  width: 9rem;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: none !important;
  background: none !important;
  border: none;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 6px;
  outline: 0;
  cursor: pointer;

  span {
    display: flex;
    align-items: center;
    font-family: 'Lato', sans-serif;
    font-size: ${themeGet('fontSizes.2', '15')}px;
    font-weight: 300;
    color: #aaa
    text-decoration: none;

    &:first-child {
      margin-right: auto;
    }
  }
`;

export const Flag = styled.div`
  margin-right: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  svg {
    width: auto;
    height: 1.5rem;
  }
`;

export const MenuItem = styled.button`
  width: 100%;
  font-size: 15px;
  font-weight: 700;
  color: ${themeGet('colors.darkBold', '#0D1136')};
  line-height: 1.2em;
  display: block;
  padding: 15px 30px;
  border-radius: 6px;
  transition: 0.15s ease-in-out;
  display: flex;
  align-items: center;
  border: 0;
  border-bottom: 1px solid ${themeGet('colors.borderColor', '#f1f1f1')};
  border-radius: 0;
  background-color: transparent;
  outline: 0;
  cursor: pointer;

  &:last-child {
    border-bottom: 0;
  }

  @media (max-width: 1400px) {
    margin-right: 10px;
    font-size: 15px;
  }

  @media only screen and (min-width: 991px) and (max-width: 1200px) {
    padding: 15px 30px;
  }

  span {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    overflow: hidden;
    margin-right: 15px;

    svg {
      display: block;
      width: 20px;
      height: auto;
    }
  }
`;
