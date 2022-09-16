import styled from 'styled-components';

const TagButton = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid transparent;
  border-radius: 8px;
  height: 40px;
  color: white;
  background-color: ${(props) => props.b_color};
  width: ${(props) => props.width}px;
`;

export default TagButton;
