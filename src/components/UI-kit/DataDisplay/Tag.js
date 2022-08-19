import { Tag as antTag } from 'antd';
import styled, { css } from 'styled-components';

const Tag = styled(antTag)`
  color: ${(props) => props.theme.colors.white};
  padding: 9px 20px;
  background: #202020;
  border: none;
  border-radius: 100px;
  position: absolute;
  top: 20px;
  left: 30px;

  ${(props) =>
    props?.level &&
    css`
      font-size: ${props.theme.text[props.level].size}px;
      font-weight: ${props.theme.text[props.level].weight};
      line-height: ${props.theme.text[props.level].height}px;
      font-style: ${props.theme.text[props.level].style || 'normal'};
    `}
`;

export default Tag;
