import { Row as antRow } from 'antd';
import styled, { css } from 'styled-components';

const Row = styled(antRow)`
  ${(props) =>
    props?.padding_top &&
    css`
      padding-top: ${props.padding_top}px;
    `}

  ${(props) =>
    props?.padding_right &&
    css`
      padding-right: ${props.padding_right}px;
    `}

  ${(props) =>
    props?.padding_bottom &&
    css`
      padding-bottom: ${props.padding_bottom}px;
    `}

  ${(props) =>
    props?.padding_left &&
    css`
      padding-left: ${props.padding_left}px;
    `}

  ${(props) =>
    props?.padding_horizontal &&
    css`
      padding-left: ${props.padding_horizontal}px;
      padding-right: ${props.padding_horizontal}px;
    `}

  ${(props) =>
    props?.direction &&
    css`
      flex-direction: ${props.direction};
    `}
`;

export default Row;
