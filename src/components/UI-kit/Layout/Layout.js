import { Layout as antLayout } from 'antd';
import styled from 'styled-components';

const Layout = styled(antLayout)``;

const Sider = styled(Layout.Sider)`
  background-color: ${(props) => props.theme.colors.dark100};
  flex: 0 0 355px !important;
  width: 355px !important;
  max-width: 355px !important;
`;

const Content = styled(Layout.Content)`
  height: 100% !important;
  padding: 40px 25px;
  background: #202020;
  margin-top: 0 !important;
`;

Layout.Sider = Sider;
Layout.Content = Content;

export default Layout;
