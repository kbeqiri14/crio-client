import { Switch as antSwitch } from 'antd';
import styled from 'styled-components';

const Switch = styled(antSwitch)`
  background-color: ${(props) => props.theme.colors.dark50};
  margin-left: 12px;
  &.ant-switch-checked {
    background-color: ${(props) => props.theme.colors.green100};
  }
`;

export default Switch;
