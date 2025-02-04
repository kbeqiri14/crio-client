import { Tabs as antTabs } from 'antd';
import styled from 'styled-components';

const Tabs = styled(antTabs)`
  .ant-tabs-tab {
    margin-right: 20px;
  }
  .ant-tabs-tab-btn {
    font-size: ${(props) => props.theme.title[2].size}px;
    font-weight: ${(props) => props.theme.title[2].weight};
    font-style: ${(props) => props.theme.title[2].style || 'normal'};
    padding: 0;
    color: ${(props) => props.theme.colors.dark25} !important;
  }
  .ant-tabs-ink-bar {
    height: 1px !important;
    background: ${(props) => props.theme.colors.white} !important;
  }
  .ant-tabs-nav {
    margin-bottom: 40px;
    margin-left: 40px;
  }
  .ant-tabs-nav::before {
    display: none;
  }
  .ant-tabs-tab-active {
    padding: 4px 0;
  }
  .ant-tabs-tab-active > div {
    color: ${(props) => props.theme.colors.white} !important;
  }
`;

export default Tabs;
