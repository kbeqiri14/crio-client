import styled from 'styled-components';

const ImageDraggerWrapper = styled('div')`
  max-height: 232px;
  border-radius: 8px;
  .ant-upload.ant-upload-drag {
    max-width: 568px;
    height: 232px;
  }
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

export default ImageDraggerWrapper;
