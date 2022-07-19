import styled from 'styled-components';

const CoverDraggerWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 568px;
  max-height: 232px;
  border-radius: 8px;
  img {
    width: 100%;
    height: auto;
    max-height: 232px;
    object-fit: cover;
  }
  .remove {
    opacity: 0;
    visibility: hidden;
    transition: visibility 0s, opacity 0.4s linear;
    position: absolute;
    right: 8px;
    top: 12px;
    cursor: pointer;
  }
  :hover {
    .remove {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export default CoverDraggerWrapper;
