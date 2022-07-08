import styled from 'styled-components';
import { Collapse as collapse } from 'antd';

const Collapse = styled(collapse)`
  background: transparent !important;

  .ant-collapse-item {
    background: #0f0e16;
    border-radius: 15px;
    margin-bottom: 20px;
    color: white;
    border-bottom: none !important;
  }

  .ant-collapse-header {
    font-size: 18px;
    color: white !important;
  }
  .ant-collapse-content-box {
    color: #bbbcbc;
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
