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
    font-size: ${(props) => props.theme.text[4].size}px;
    color: white !important;
    padding: 20px 0px 20px 20px !important;
  }
  .ant-collapse-content-box {
    color: ${(props) => props.theme.colors.dark25};
    font-size: 16px;
    padding: 0 50px 20px 0 !important;
  }
  .ant-collapse-item > .ant-collapse-item-active > .ant-collapse-header {
    padding: 0 !important;
  }
`;
/** @component */
export default Collapse;
