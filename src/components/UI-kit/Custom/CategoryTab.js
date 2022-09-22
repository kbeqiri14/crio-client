import styled from 'styled-components';

const CategoryTab = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 4px;
  padding: 10px 12px;
  height: 40px;
  color: #ffffff;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400px;
  font-style: normal;

  :hover {
    color: #1a1e24;
    background-color: ${(props) => props.theme.colors.white};
  }
`;

export default CategoryTab;
