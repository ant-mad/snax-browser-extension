import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Anchor = styled(Link)`
  font-size: inherit;
  line-height: inherit;
  opacity: 0.8;
  cursor: pointer;
  text-decoration: underline;

  &,
  &:hover,
  &:focus {
    color: currentColor;
    background-color: transparent;
    border: 0;
    outline: 0;
  }

  &:hover,
  &:focus {
    opacity: 1;
  }
`;

export const AnchorHTML = Anchor.withComponent('a');
