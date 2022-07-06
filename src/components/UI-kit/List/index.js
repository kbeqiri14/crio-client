import styled, { css } from 'styled-components';

const OrderedList = styled.ol`
  column-gap: 24px;

  li {
    font-size: 16px;
    margin-bottom: 8px;
    color: #bbbcbc;
    text-align: left;
    line-height: 24px;
  }
  li > span {
    color: #bbbcbc;
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
