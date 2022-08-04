import { Badge as antBadge } from 'antd';
import styled, { css } from 'styled-components';

const Badge = styled(antBadge)`
  .ant-badge-status-text {
    color: ${(props) => props.theme.colors.dark25};
    font-size: ${(props) => props.theme.text[4].size}px;
    font-weight: ${(props) => props.theme.text[4].weight};
    font-style: ${(props) => props.theme.text[4].style || 'normal'};
  }
  .ant-badge-status-dot {
    background-color: ${(props) => props.theme.colors.dark25};
    top: -3px;
    width: 4px;
    height: 4px;
  }
  ${(props) =>
    props?.color &&
    css`
      .ant-badge-status-text {
        color: ${props.theme.colors[props.color]};
      }
    `}
  ${(props) =>
    props?.size &&
    css`
      .ant-badge-status-text {
        font-size: ${props.size}px;
      }
    `}
`;

export default Badge;
