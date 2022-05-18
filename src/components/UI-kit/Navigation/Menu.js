import { Menu as antMenu } from 'antd';
import styled from 'styled-components';

const Menu = styled(antMenu)`
  background-color: ${(props) => props.theme.colors.dark100} !important;
  border-radius: 15px;
  padding: 0;
  margin-top: 15px;
  box-shadow: 0px 4px 5px rgba(12, 17, 36, 0.4);
  // box-shadow: 1px 1px 5px ${(props) => props.theme.colors.white};
  li {
    font-size: ${(props) => props.theme.text[3].size}px;
    font-weight: ${(props) => props.theme.text[3].weight};
    line-height: ${(props) => props.theme.text[3].height}px;
    font-style: ${(props) => props.theme.text[3].style || 'normal'};
    color: ${(props) => props.theme.colors.white} !important;
    padding: 8px 16px;
    &:first-child {
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
    }
    &:last-child {
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;
    }
    &:hover {
      background-color: ${(props) => props.theme.colors.dark50} !important;
    }
  }
`;

export default Menu;
