import { Button as antButton } from 'antd';
import styled, { css } from 'styled-components';

const Button = styled(antButton)`
  font-size: ${(props) => props.theme.text[2].size}px;
  font-weight: ${(props) => props.theme.text[2].weight};
  font-style: ${(props) => props.theme.text[2].style || 'normal'};
  line-height: 0px;

  padding: 4px 20px;
  height: 48px;
  border-radius: 100px;

  background: none;
  border: 1px solid ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.primary};
  box-shadow: 0px 4px 5px rgba(12, 17, 36, 0.4);

  :hover {
    background: #202020; // Narine dark25
  }

  &.ant-btn-loading::before {
    opacity: 0;
  }

  &.ant-btn[disabled],
  .ant-btn[disabled]:hover {
    background: none !important;
    color: ${(props) => props.theme.colors.dark50} !important;
    border: 1px solid ${(props) => props.theme.colors.dark50} !important;
  }

  ///************** WHITE BUTTON **************///

  ${(props) =>
    props?.white &&
    css`
      color: ${(props) => props.theme.colors.white} !important;
      border: 1px solid ${(props) => props.theme.colors.white} !important;
      &:hover {
        background: 1px solid ${(props) => props.theme.colors.dark50} !important;
      }
    `}

  ///************** PRIMARY BUTTON **************///

  &.ant-btn-primary {
    border: none !important;
    color: ${(props) => props.theme.colors.white} !important;
    background: ${(props) =>
      props.theme.colors[`gradient_${props?.fill_color || 'blue'}`]} !important;
  }

  &.ant-btn-primary:hover {
    box-shadow: 0px 4px 5px rgba(12, 17, 36, 0.4);
    background: ${(props) =>
      props.theme.colors[`gradient_${props?.fill_color || 'blue'}`]} !important;
  }

  &.ant-btn-primary[disabled],
  .ant-btn-primary[disabled]:hover {
    color: ${(props) => props.theme.colors.dark100} !important;
    box-shadow: none;
    background: ${(props) => props.theme.colors.dark50} !important;
    border: none !important;
  }

  ///************** LINK BUTTON **************///

  &.ant-btn-link {
    height: 32px;
    border: none !important;
    font-size: ${(props) => props.theme.text[3].size}px;
    font-weight: ${(props) => props.theme.text[3].weight};
    font-style: ${(props) => props.theme.text[3].style || 'normal'};
  }

  &.ant-btn-link[disabled],
  .ant-btn-link[disabled]:hover {
    border: none !important;
    color: ${(props) => props.theme.colors.dark50} !important;
  }
`;

export default Button;
