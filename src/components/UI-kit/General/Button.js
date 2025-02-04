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

  :hover {
    background: #202020;
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
    padding: 0;
    border: none !important;
    line-height: 24px;
    font-weight: 400;
    color: ${(props) => props.theme.colors.dark50} !important;
    &:hover {
      color: ${(props) => props.theme.colors.dark25} !important;
    }
    ::after {
      display: none;
    }
    ${(props) =>
      props?.active === 'true' &&
      css`
        color: ${(props) => props.theme.colors.white} !important;
        &:hover {
          color: ${(props) => props.theme.colors.white} !important;
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
      background: ${(props) =>
        props.theme.colors[`gradient_dark_${props?.fill_color || 'blue'}`]} !important;
    }
  }

  &.ant-btn-primary[disabled],
  .ant-btn-primary[disabled]:hover {
    color: ${(props) => props.theme.colors.dark100} !important;
    background: ${(props) => props.theme.colors.dark50} !important;
    border: none !important;
  }

  ///************** LINK BUTTON **************///

  &.ant-btn-link {
    height: 32px;
    padding: 4px 8px;
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
    width: 185px;
    height: 40px;
    padding: 11px;
    border: none;
    svg {
      margin-right: 12px;
    }
    &:active,
    &:focus {
      background: ${(props) => props.theme.colors.white} !important;
    }
    &:hover {
      background-color: ${(props) => props.theme.colors.white};
    }
    font-family: 'Roboto';
    font-size: 14px;
    line-height: 16px;
    color: rgba(0, 0, 0, 0.54);
    background: ${(props) => props.theme.colors.white};
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.24);
    border-radius: 2px;
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
