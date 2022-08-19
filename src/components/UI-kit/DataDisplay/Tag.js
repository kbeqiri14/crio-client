import { Tag as antTag } from 'antd';
import styled from 'styled-components';

const Tag = styled(antTag)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 129px;
  background: #202020;
  border: 1px solid #202020;
  border-radius: 100px;
  position: absolute;
  top: 20px;
  left: 30px;
`;

export default Tag;
