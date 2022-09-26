import styled from 'styled-components';

const CategoryTab = styled('span')`
  color: ${(props) => props.theme.colors.white};
  border-radius: 4px;
  padding: 8px 12px;
  margin-right: 4px;
  font-size: ${(props) => props.theme.text[3].size}px;
  font-weight: ${(props) => props.theme.text[3].weight};
  line-height: ${(props) => props.theme.text[3].height}px;
  font-style: ${(props) => props.theme.text[3].style || 'normal'};
  :hover {
    color: #1a1e24;
    background-color: ${(props) => props.theme.colors.white};
  }
`;

export default CategoryTab;
