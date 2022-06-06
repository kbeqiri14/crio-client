import { Checkbox as antCheckbox } from 'antd';
import styled from 'styled-components';

const Checkbox = styled(antCheckbox)`
  .ant-checkbox-inner {
    background-color: transparent;
    border: 2px solid ${(props) => props.theme.colors.dark50};
  }
  .ant-checkbox-checked {
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

export default Checkbox;
