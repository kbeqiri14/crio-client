import { Typography } from 'antd';
import styled, { css } from 'styled-components';

const Text = styled(Typography.Text)`
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

  ${(props) =>
    props?.break &&
    css`
      word-break: ${props.break};
    `}

  ${(props) =>
    props?.onClick &&
    css`
      cursor: pointer;
    `}

  ${(props) =>
    props?.align &&
    css`
      display: inline-block;
      text-align: ${props.align};
    `}
`;

export default Text;
