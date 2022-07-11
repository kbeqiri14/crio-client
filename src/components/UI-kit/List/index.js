import styled, { css } from 'styled-components';

const OrderedList = styled.ol`
  column-gap: 24px;

  li {
    font-size: ${(props) => props.theme.text[3].size}px;
    font-weight: ${(props) => props.theme.text[3].weight};
    line-height: ${(props) => props.theme.text[3].height}px;
    color: ${(props) => props.theme.colors.dark25};
    margin-bottom: 8px;
    text-align: left;
  }
  li > span {
    color: ${(props) => props.theme.colors.dark25};
  }
  ${(props) =>
    props.$listWidth &&
    css`
      width: ${props.$listWidth};
    `}
  ${(props) =>
    props.$columns &&
    css`
      column-count: ${props.$columns};
    `}
  ${(props) =>
    props.$type === 'none' &&
    css`
      li {
        list-style-type: none;
      }
      padding: ${props.$padding};
    `}
  ${(props) =>
    props.$type === 'disc' &&
    css`
      li {
        list-style-type: disc;
      }
      padding: ${props.$padding};
    `}
  ${(props) =>
    props.$padding &&
    css`
      li {
        padding: ${props.$padding}px;
      }
    `}
`;

const List = ({ items, ...props }) =>
  items ? (
    <OrderedList {...props}>
      {items.map((l, index) => (
        <li key={index}>{l}</li>
      ))}
    </OrderedList>
  ) : null;

List.defaultProps = {
  $columns: '1',
  $listWidth: '270px',
  $padding: '8px',
};
export default List;
