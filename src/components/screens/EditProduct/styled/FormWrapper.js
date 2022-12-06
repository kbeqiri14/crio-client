import styled from 'styled-components';

const FormWrapper = styled('div')`
  padding: 40px 20px;
  max-width: 1000px;
  margin: auto;
  .ant-upload {
    &.ant-upload-drag {
      border-radius: 8px;
    }
  }
  .info {
    opacity: 0;
    visibility: hidden;
    transition: visibility 0s, opacity 0.2s linear;
  }
  .price:hover {
    .info {
      opacity: 1;
      visibility: visible;
    }
  }
  .upload-text {
    padding-bottom: 10px;
  }
  .limit-section {
    display: flex;
    align-items: center;
    > .ant-typography {
      margin-left: 12px;
    }
  }
  .formContainer {
    min-width: 350px;
  }
  .controller {
    max-width: 568px;
  }
  .help {
    max-height: 65px;
    padding-top: 4px;
    .ant-tooltip {
      top: 0 !important;
    }
    .got-it-button {
      left: 158px;
      top: 48px;
      @media (max-width: 1061px) {
        left: -166px;
      }
    }
  }
  .select-title {
    @media (max-width: 1061px) {
      margin-top: 137px;
    }
  }

  .uploaded-images {
    img {
      width: 100%;
      height: auto;
      max-height: 232px;
      object-fit: cover;
    }
    .remove {
      position: absolute;
      top: 4px;
      right: 10px;
      opacity: 0;
      transition: visibility 0s, opacity 0.4s linear;
      visibility: hidden;
      cursor: pointer;
    }
    :hover {
      .remove {
        opacity: 1;
        visibility: visible;
      }
    }
  }
`;

export default FormWrapper;
