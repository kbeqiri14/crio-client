import styled from 'styled-components';

const Dot = styled.span`
  background-color: ${(props) => props.theme.colors.dark25};
  border-radius: 50%;
  display: inline-block;
  height: 4px;
  left: -12px;
  position: relative;
  top: -4px;
  width: 4px;
`;
export default Dot;
