import { Input as antInput } from 'antd';
import styled from 'styled-components';

const Input = styled(antInput)`
  font-size: ${(props) => props.theme.text[4].size}px;
  font-weight: ${(props) => props.theme.text[4].weight};
  font-style: ${(props) => props.theme.text[4].style || 'normal'};
  padding: 10px 11px;
  background-color: #202020;
  border-radius: 8px;
  border: 1px solid #202020;
  color: ${(props) => props.theme.colors.white};

  :hover,
  :focus {
    box-shadow: none;
    border: 1px solid ${(props) => props.theme.colors.primary} !important;
  }

  &.ant-input-disabled {
    border: none !important;
    background-color: rgba(32, 32, 32, 0.6);
  }
`;

const TextArea = styled(Input.TextArea)`
  // font-size: ${(props) => props.theme.text[4].size}px;
  // font-weight: ${(props) => props.theme.text[4].weight};
  // font-style: ${(props) => props.theme.text[4].style || 'normal'};
  // padding: 10px 11px;
  // background-color: #202020;
  // border-radius: 8px;
  // border: 1px solid #202020;
  // color: ${(props) => props.theme.colors.white};

  // :hover,
  // :focus {
  //   box-shadow: none;
  //   border: 1px solid ${(props) => props.theme.colors.primary} !important;
  // }

  // &.ant-input-disabled {
  //   border: none !important;
  //   background-color: rgba(32, 32, 32, 0.6);
  // }
`;

Input.TextArea = TextArea;

export default Input;
