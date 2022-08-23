import styled from 'styled-components';

const Circle = styled('span')`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background: #202020;
  border: ${(props) => props.border};
  font-size: ${(props) => props.theme.text[2].size}px;
  font-weight: ${(props) => props.theme.text[2].weight};
  font-style: ${(props) => props.theme.text[2].style || 'normal'};
  color: ${(props) => props.theme.colors.white};
`;

export default Circle;
