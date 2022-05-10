import { Layout as antLayout } from 'antd';
import styled from 'styled-components';

const Layout = styled(antLayout)``;

const Sider = styled(Layout.Sider)`
  background-color: ${(props) => props.theme.colors.dark100};
`;

const Content = styled(Layout.Content)`
  height: 100%;
  min-height: 100vh;
  background: #202020;
  margin-top: 0 !important;
  padding: 0 10px;
`;

Layout.Sider = Sider;
Layout.Content = Content;

export default Layout;
