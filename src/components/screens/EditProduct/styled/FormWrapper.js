import styled from 'styled-components';

const FormWrapper = styled('div')`
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  > div {
    max-width: 620px;
  }
  .ant-upload {
    .ant-upload-btn {
      padding: 78px 0;
    }
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
  .help {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 10px;
    right: 0;
    .ant-tooltip {
      top: 0 !important;
    }
    .got-it-button {
      left: 160px;
      @media (max-width: 1060px) {
        left: -115px;
      }
      margin-top: 58px;
    }
  }
`;

export default FormWrapper;
