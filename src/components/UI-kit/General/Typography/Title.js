import { Typography } from 'antd';
import styled, { css } from 'styled-components';

const Title = styled(Typography.Title)`
  color: ${(props) => props.theme.colors.white} !important;
  margin-bottom: ${(props) => (props && props.margin_bottom) || 0}px !important;

  ${(props) =>
    props?.level !== undefined &&
    css`
      font-size: ${props.theme.title[props.level].size}px !important;
      font-weight: ${props.theme.title[props.level].weight} !important;
      line-height: ${props.theme.title[props.level].height}px !important;
    `}

  ${(props) =>
    props?.color &&
    css`
      color: ${props.theme.colors[props.color]} !important;
    `}

  ${(props) =>
    props?.display === 'inline' &&
    css`
      display: inline-block;
    `}

  ${(props) =>
    props?.max_width &&
    css`
      max-width: ${props.max_width}px;
    `}

  ${(props) =>
    props?.align &&
    css`
      text-align: ${props.align};
    `}
`;

export default Title;
