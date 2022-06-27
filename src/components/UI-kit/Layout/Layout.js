import { Layout as antLayout } from 'antd';
import styled from 'styled-components';

const Layout = styled(antLayout)`
  background: transparent;
`;

const Sider = styled(Layout.Sider)`
  background: #202020;
`;

const Content = styled(Layout.Content)`
  margin: auto;
  margin-top: 0 !important;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  max-width: 1438px;
  @media (max-width: 1792px) {
    max-width: 1084px;
  }
  @media (max-width: 1438px) {
    max-width: 730px;
  }
  @media (max-width: 1084px) {
    max-width: 376px;
  }
`;

Layout.Sider = Sider;
Layout.Content = Content;

export default Layout;
