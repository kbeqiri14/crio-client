import styled from 'styled-components';

const CategoryTab = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 10px 12px;
  height: 40px;
  color: #111419;
  background-color: ${(props) => props.theme.colors.white};
`;

export default CategoryTab;
