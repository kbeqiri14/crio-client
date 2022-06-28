import { Checkbox as antCheckbox } from 'antd';
import styled from 'styled-components';

const Checkbox = styled(antCheckbox)`
  .ant-checkbox-inner {
    background-color: transparent;
    border: 2px solid ${(props) => props.theme.colors.dark50};
    :hover,
    :focus {
      border: 2px solid ${(props) => props.theme.colors.dark50};
    }
  }
  .ant-checkbox-checked {
    border-radius: 2px;
    background-color: ${(props) => props.theme.colors.primary};
    .ant-checkbox-inner {
      border: 2px solid ${(props) => props.theme.colors.primary};
      :hover,
      :focus {
        border: 2px solid ${(props) => props.theme.colors.primary};
      }
    }
  }
  .ant-checkbox-disabled {
    background-color: ${(props) => props.theme.colors.dark50};
    .ant-checkbox-inner {
      border: 2px solid ${(props) => props.theme.colors.dark50} !important;
      ::after {
        border-color: rgba(255, 255, 255, 0.5) !important;
      }
    }
  }
`;

export default Checkbox;
