import { Radio as antRadio } from 'antd';
import styled from 'styled-components';

const Radio = styled(antRadio)`
  &.ant-radio-wrapper {
    align-items: center;
    color: ${(props) => props.theme.colors.white};
    font-size: ${(props) => props.theme.text[3].size}px;
    font-weight: ${(props) => props.theme.text[3].weight};
    font-style: ${(props) => props.theme.text[3].style || 'normal'};
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
    top: 2px;
    left: 2px;
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

export default Radio;
