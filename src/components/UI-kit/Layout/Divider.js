import { Divider as antDivider } from 'antd';
import styled, { css } from 'styled-components';

const Divider = styled(antDivider)`
  border-color: ${(props) => props.theme.colors.dark50};
  height: 50%;
  padding: 0 10px;
  margin: 0;

  ${(props) =>
    props?.height &&
    css`
      height: ${props.height}px;
    `}

  ${(props) =>
    props?.top &&
    css`
      top: ${props.top}px;
    `}
`;

export default Divider;
