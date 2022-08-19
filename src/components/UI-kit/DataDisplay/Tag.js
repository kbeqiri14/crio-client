import { Tag as antTag } from 'antd';
import styled from 'styled-components';

const Tag = styled(antTag)`
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.text[1].size}px;
  font-weight: ${(props) => props.theme.text[1].weight};
  line-height: ${(props) => props.theme.text[1].height}px;
  font-style: ${(props) => props.theme.text[1].style || 'normal'};
  padding: 9px 20px;
  background: #202020;
  border: none;
  border-radius: 100px;
  position: absolute;
  top: 20px;
  left: 30px;
`;

export default Tag;
