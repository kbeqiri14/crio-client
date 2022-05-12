import { Layout as antLayout } from 'antd';
import styled from 'styled-components';

const Layout = styled(antLayout)`
  background: #202020;
`;

const Sider = styled(Layout.Sider)`
  background-color: ${(props) => props.theme.colors.dark100};
`;

const Content = styled(Layout.Content)`
  margin: auto;
  margin-top: 0 !important;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  max-width: 1394px;
  @media (max-width: 1768px) {
    max-width: 1040px;
  }
  @media (max-width: 1394px) {
    max-width: 686px;
  }
  @media (max-width: 1040px) {
    max-width: 332px;
  }
`;

Layout.Sider = Sider;
Layout.Content = Content;

export default Layout;
