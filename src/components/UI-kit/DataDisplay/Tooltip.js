import { Tooltip as antTooltip } from 'antd';
import styled from 'styled-components';

const Tooltip = styled(antTooltip)`
  .ant-tooltip-inner {
    width: ${(props) => props.width || 180}px;
    padding: 2px 8px;
    border-radius: 8px;
    text-align: center;
  }
  .ant-tooltip-arrow {
    display: none;
  }
`;

export default Tooltip;
