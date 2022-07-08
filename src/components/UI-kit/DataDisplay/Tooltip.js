import { Tooltip as antTooltip } from 'antd';
import styled from 'styled-components';

const Tooltip = styled(antTooltip)`
  .ant-tooltip-inner {
    font-size: ${(props) => props.theme.text[1].size}px;
    font-weight: ${(props) => props.theme.text[1].weight};
    line-height: ${(props) => props.theme.text[1].height}px;
    width: ${(props) => props.width || 180}px;
    padding: 8px;
    border-radius: 8px;
    text-align: center;
  }
  .ant-tooltip-arrow {
    display: none;
  }
`;

export default Tooltip;
