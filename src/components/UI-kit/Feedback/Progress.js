import { Progress as antProgress } from 'antd';
import styled from 'styled-components';

const Progress = styled(antProgress)`
  &.ant-progress {
    margin-top: 20px;
  }
  &.ant-progress-bg {
    background: 'gradient-4';
    .ant-progress-status-success {
    }
  }
  .ant-progress-inner {
    background-color: rgba(202, 235, 255, 0.25);
    height: 6px;
  }
`;

export default Progress;
