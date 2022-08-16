import styled from 'styled-components';

const FormWrapper = styled('div')`
  padding: 40px 20px;
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
  .help {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    right: 24px;
    .ant-tooltip {
      top: 0 !important;
    }
    .got-it-button {
      left: 158px;
      @media (max-width: 768px) {
        left: -123px;
      }
      margin-top: 23px;
    }
  }
  .selectTitle {
    @media (max-width: 768px) {
      margin-top: 137px;
    }
  }
`;

export default FormWrapper;
