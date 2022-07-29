import { Badge as antBadge } from 'antd';
import styled from 'styled-components';

const Badge = styled(antBadge)`
  .ant-badge-status-text {
    color: ${(props) => props.theme.colors.dark25};
    font-size: 18px;
    font-style: normal;
  }
  .ant-badge-status-dot {
    background-color: ${(props) => props.theme.colors.dark25};
    top: -3px;
    width: 4px;
    height: 4px;
  }
`;

export default Badge;
