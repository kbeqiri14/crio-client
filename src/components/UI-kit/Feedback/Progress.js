import { Progress as antProgress } from 'antd';
import styled from 'styled-components';

const Progress = styled(antProgress)`
  margin-top: 20px;
  .ant-progress-bg {
    background: linear-gradient(151.27deg, #04a7fd 13.55%, #0b47fd 80.64%);
    .ant-progress-status-success {
      background: linear-gradient(151.27deg, #04a7fd 13.55%, #0b47fd 80.64%);
    }
  }
  .ant-progress-inner {
    background-color: rgba(202, 235, 255, 0.25);
    height: 6px;
  }
`;

export default Progress;
