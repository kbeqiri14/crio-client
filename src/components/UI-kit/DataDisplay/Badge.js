import { Badge as antBadge } from 'antd';
import styled, { css } from 'styled-components';

const Badge = styled(antBadge)`
  display: block;
  padding-left: 22px;
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
    margin-left: -11px;
  }
  ${(props) =>
    props?.color &&
    css`
      .ant-badge-status-text {
        color: ${props.theme.colors[props.color]};
      }
    `}
  ${(props) =>
    props?.level &&
    css`
      .ant-badge-status-text {
        font-size: ${props.theme.text[props.level].size}px;
        font-weight: ${props.theme.text[props.level].weight};
        line-height: ${props.theme.text[props.level].height}px;
        font-style: ${props.theme.text[props.level].style || 'normal'};
      }
    `}
`;

export default Badge;
