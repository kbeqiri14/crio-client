import { Divider as antDivider } from 'antd';
import styled from 'styled-components';

const Divider = styled(antDivider)`
  border-color: ${(props) => props.theme.colors.dark50};
  height: 50%;
  top: 15px;
`;

export default Divider;
