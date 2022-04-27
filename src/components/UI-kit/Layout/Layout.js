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
    /* Hide scrollbar for Chrome, Safari and Opera */
    ::-webkit-scrollbar {
      display: none;
    }
    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

const Content = styled(Layout.Content)`
  padding: 40px 25px;
  background: #202020;
  margin-top: 0 !important;
  margin-left: 355px;
  min-height: 100vh;
`;

Layout.Sider = Sider;
Layout.Content = Content;

export default Layout;
