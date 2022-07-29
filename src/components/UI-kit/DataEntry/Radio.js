import { Radio as antRadio } from 'antd';
import styled from 'styled-components';

const Radio = styled(antRadio)`
  &.ant-radio-wrapper {
    align-items: center;
    color: ${(props) => props.theme.colors.dark25};
    font-size: ${(props) => props.theme.text[3].size}px;
    font-weight: ${(props) => props.theme.text[3].weight};
    font-style: ${(props) => props.theme.text[3].style || 'normal'};
    &.ant-radio-wrapper-disabled {
      .ant-radio-disabled {
        .ant-radio-inner {
          border: 2px solid ${(props) => props.theme.colors.dark50} !important;
        }
        .ant-radio-inner::after {
          background-color: ${(props) => props.theme.colors.dark50};
        }
      }
    }
    &.ant-radio-wrapper-checked {
      color: ${(props) => props.theme.colors.white};
    }
    &.ant-radio-wrapper-disabled > span {
      color: ${(props) => props.theme.colors.dark50};
    }
  }
  .ant-radio-checked {
    .ant-radio-inner {
      border: 2px solid ${(props) => props.theme.colors.primary};
    }
  }
  .ant-radio-inner {
    border: 2px solid ${(props) => props.theme.colors.dark50};
    background-color: transparent;
  }
  .ant-radio-inner::after {
    background-color: ${(props) => props.theme.colors.primary};
  }
  .ant-radio-input:focus + .ant-radio-inner {
    box-shadow: none;
  }
`;

export default Radio;
