import styled from 'styled-components';

export const LayoutWrapper = styled.div`
  background-color: #f7f7f7;

  .reuseModalHolder {
    padding: 0;
    overflow: auto;
    border-radius: 1rem;
    border: 0;
  }
`;

export const Transition = styled.div`
  .active {
    visibility: visible;
    transition: all 200ms ease-in;
      z-index: 99;

  }
  .hidden {
    visibility: hidden;
    transition: all 200ms ease-out;
    transform: translate(0, -100%);
      z-index: 99;
  }
`;


