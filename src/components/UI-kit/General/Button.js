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

  &.ant-btn:active,
  &.ant-btn:focus {
    background: none !important;
  }

  &.ant-btn[disabled],
  .ant-btn[disabled]:hover {
    background: none !important;
    color: ${(props) => props.theme.colors.dark50} !important;
    border: 1px solid ${(props) => props.theme.colors.dark50} !important;
  }

  ${(props) =>
    props?.min_width &&
    css`
      min-width: ${props.min_width}px;
    `}

  ${(props) =>
    props?.width &&
    css`
      width: ${props.width}px;
    `}

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

  ///************** TAB BUTTON **************///

  &.ant-btn-tab {
    padding: 10px;
    border: none !important;
    border-radius: 10px;
    box-shadow: none;
    line-height: 24px;
    color: ${(props) => props.theme.colors.dark25} !important;
    border: 1px solid transparent !important;
    &:hover {
      border: 1px solid ${(props) => props.theme.colors.dark50} !important;
      background-color: transparent !important;
    }
    ${(props) =>
      props?.active &&
      css`
        color: ${(props) => props.theme.colors.white} !important;
        background-color: ${(props) => props.theme.colors.dark50} !important;
        &:hover {
          color: ${(props) => props.theme.colors.white} !important;
          background-color: ${(props) => props.theme.colors.dark50} !important;
        }
      `}
  }

  ///************** PRIMARY BUTTON **************///

  &.ant-btn-primary {
    border: none !important;
    color: ${(props) => props.theme.colors.white} !important;
    background: ${(props) =>
      props.theme.colors[`gradient_${props?.fill_color || 'blue'}`]} !important;
    &:active,
    &:focus {
      background: ${(props) =>
        props.theme.colors[`gradient_${props?.fill_color || 'blue'}`]} !important;
    }
    &:hover {
      box-shadow: 0px 4px 5px rgba(12, 17, 36, 0.4);
      background: ${(props) =>
        props.theme.colors[`gradient_${props?.fill_color || 'blue'}`]} !important;
    }
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
    box-shadow: none;
  }

  &.ant-btn-link[disabled],
  .ant-btn-link[disabled]:hover {
    border: none !important;
    color: ${(props) => props.theme.colors.dark50} !important;
  }

  ///************** WITH ICON BUTTON **************///

  ${(props) =>
    props?.icon &&
    css`
      svg {
        vertical-align: middle;
        margin-right: 8px;
      }
      span {
        vertical-align: middle;
      }
    `}

  ///************** GOOGLE BUTTON **************///

  &.ant-btn-google {
    border: none;
    background-color: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.dark100};
    svg {
      margin-left: -36px;
      margin-right: 20px;
    }
    &:active,
    &:focus {
      background: ${(props) => props.theme.colors.white} !important;
    }
    &:hover {
      background-color: ${(props) => props.theme.colors.white};
    }
  }

  ///************** FACEBOOK BUTTON **************///

  &.ant-btn-facebook {
    border: none;
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.colors[`gradient_blue`]};
    svg {
      margin-left: -30px;
      margin-right: 10px;
    }
    &:active,
    &:focus {
      background: ${(props) => props.theme.colors[`gradient_blue`]} !important;
    }
    &:hover {
      background-color: ${(props) => props.theme.colors.white};
      border-color: ${(props) => props.theme.colors.white};
    }
  }
`;

export default Button;
