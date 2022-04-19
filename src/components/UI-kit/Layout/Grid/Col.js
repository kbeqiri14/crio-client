import { Col as antCol } from 'antd';
import styled, { css } from 'styled-components';

const Col = styled(antCol)`
  ${(props) =>
    props?.margin_top &&
    css`
      margin-top: ${props.margin_top}px;
    `}

  ${(props) =>
    props?.margin_right &&
    css`
      margin-right: ${props.margin_right}px;
    `}

  ${(props) =>
    props?.margin_bottom &&
    css`
      margin-bottom: ${props.margin_bottom}px;
    `}

  ${(props) =>
    props?.margin_left &&
    css`
      margin-left: ${props.margin_left}px;
    `}

  ${(props) =>
    props.padding_top &&
    css`
      padding-top: ${props.padding_top}px;
    `}

  ${(props) =>
    props.padding_bottom &&
    css`
      padding-bottom: ${props.padding_bottom}px;
    `}

  ${(props) =>
    props?.align &&
    css`
      text-align: ${props.align};
    `}
`;

export default Col;
