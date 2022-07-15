import { Typography } from 'antd';
import styled, { css } from 'styled-components';

const Paragraph = styled(Typography.Paragraph)`
  color: ${(props) => props.theme.colors.white};
  &.ant-typography-disabled {
    color: ${(props) => props.theme.colors.dark50};
  }

  ${(props) =>
    props?.level &&
    css`
      font-size: ${props.theme.text[props.level].size}px;
      font-weight: ${props.theme.text[props.level].weight};
      line-height: ${props.theme.text[props.level].height}px;
      font-style: ${props.theme.text[props.level].style || 'normal'};
    `}

  ${(props) =>
    props?.color &&
    css`
      color: ${props.theme.colors[props.color]};
    `}
`;

export default Paragraph;
