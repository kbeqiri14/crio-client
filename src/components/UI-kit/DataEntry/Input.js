import { Input as antInput } from 'antd';
import styled from 'styled-components';

const Input = styled(antInput)`
  font-size: ${(props) => props.theme.text[4].size}px;
  font-weight: ${(props) => props.theme.text[4].weight};
  font-style: ${(props) => props.theme.text[4].style || 'normal'};
  padding: 10px 11px;
  background-color: #202020;
  border-radius: 8px;
  border: 1px solid #202020;
  color: ${(props) => props.theme.colors.white};

  :hover,
  :focus {
    box-shadow: none;
    border: 1px solid ${(props) => props.theme.colors.primary} !important;
  }

  &.ant-input-disabled {
    border: 1px solid transparent !important;
    background-color: rgba(32, 32, 32, 0.6);
    color: ${(props) => props.theme.colors.dark50};
    ::placeholder {
      color: ${(props) => props.theme.colors.dark50};
    }
  }
  &.ant-input-error {
    border: 1px solid #e9112b !important;
    margin-bottom: 1px;
  }
`;

const TextArea = styled(Input.TextArea)`
  font-size: ${(props) => props.theme.text[4].size}px;
  font-weight: ${(props) => props.theme.text[4].weight};
  font-style: ${(props) => props.theme.text[4].style || 'normal'};
  padding: 10px 11px;
  background-color: #202020;
  border-radius: 8px;
  border: 1px solid #202020;
  color: ${(props) => props.theme.colors.white};
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  :hover,
  :focus {
    box-shadow: none;
    border: 1px solid ${(props) => props.theme.colors.primary} !important;
  }
`;

Input.TextArea = TextArea;

export default Input;
