import styled from 'styled-components';

const ImageWrapper = styled('div')`
  display: flex !important;
  justify-content: center;
  align-items: center;
  background: #182024;
  max-width: 1040px;
  min-height: 538px;
  height: auto;
  @media (min-width: 575px) {
    border-radius: 16px;
  }
  img {
    height: auto;
    max-width: 100%;
    max-height: 538px;
    &.default {
      object-fit: contain;
    }
  }
`;

export default ImageWrapper;
