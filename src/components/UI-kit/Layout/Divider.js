import { Divider as antDivider } from 'antd';
import styled, { css } from 'styled-components';

const Divider = styled(antDivider)`
  border-color: ${(props) => props.theme.colors.dark50};
  height: 50%;
  margin: 12px;

  ${(props) =>
    props?.height &&
    css`
      height: ${props.height}px;
    `}
  ${(props) =>
    props?.width &&
    css`
      width: ${props.width}px;
    `}
  ${(props) =>
    props?.top &&
    css`
      top: ${props.top}px;
    `}

  ${(props) =>
    props?.padding_left &&
    css`
      padding-left: ${props.padding_left}px;
    `}
`;

export default Divider;
