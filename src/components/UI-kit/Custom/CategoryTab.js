import styled from 'styled-components';

const CategoryTab = styled('span')`
  border-radius: 4px;
  padding: 8px 12px;
  color: #ffffff;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400px;
  font-style: normal;
  margin-right: 4px;

  :hover {
    color: #1a1e24;
    background-color: ${(props) => props.theme.colors.white};
  }
`;

export default CategoryTab;
