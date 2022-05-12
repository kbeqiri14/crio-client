import { Tabs as antTabs } from 'antd';
import styled from 'styled-components';

const Tabs = styled(antTabs)`
  max-width: 1394px;
  @media (max-width: 1393px) {
    max-width: 1040px;
  }
  @media (max-width: 1039px) {
    max-width: 686px;
  }
  @media (max-width: 685px) {
    max-width: 332px;
  }
  margin: auto;
  padding: 40px 0;
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
