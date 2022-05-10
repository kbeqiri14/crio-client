import { Layout as antLayout } from 'antd';
import styled from 'styled-components';

const Layout = styled(antLayout)``;

const Sider = styled(Layout.Sider)`
  background-color: ${(props) => props.theme.colors.dark100};
  flex: 0 0 355px !important;
  width: 355px !important;
  max-width: 355px !important;
  padding-top: 80px;
  top: 0;
  bottom: 0;
  position: fixed;
  .ant-layout-sider-children {
    overflow-y: scroll;
  }
`;

const Content = styled(Layout.Content)`
  height: 100% !important;
  padding: 40px 10px;
  background: #202020;
  margin-top: 0 !important;
  margin-left: 355px;
  min-height: 100vh;
`;

Layout.Sider = Sider;
Layout.Content = Content;

export default Layout;
