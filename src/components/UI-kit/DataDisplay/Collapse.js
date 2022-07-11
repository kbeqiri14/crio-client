import styled from 'styled-components';
import { Collapse as collapse } from 'antd';

const Collapse = styled(collapse)`
  background: transparent !important;

  .ant-collapse-item,
  .ant-collapse-item:last-child {
    background: #0f0e16;
    border-radius: 15px;
    margin-top: 20px;
    color: white;
    border-bottom: none !important;
  }
  .ant-collapse-item:last-child {
    margin-bottom: 20px;
  }
  .ant-collapse-header {
    font-size: 18px;
    color: white !important;
  }
  .ant-collapse-content-box {
    color: ${(props) => props.theme.colors.dark25};
    font-size: 16px;
  }
  .ant-collapse > .ant-collapse-item > .ant-collapse-header .ant-collapse-arrow {
    left: auto;
    right: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    margin: 0;
  }
`;
/** @component */
export default Collapse;
