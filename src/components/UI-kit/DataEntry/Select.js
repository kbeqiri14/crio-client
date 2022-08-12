import React, { forwardRef } from 'react';
import { Select as Component } from 'antd';
import styled from 'styled-components';

const Select = styled(
  forwardRef(({ parentContainer = true, ...props }, ref) => (
    <Component
      getPopupContainer={(triggerNode) =>
        parentContainer ? triggerNode.parentElement : document.body
      }
      {...props}
      ref={ref}
    />
  )),
)`
  width: 100% !important;
  font-size: ${(props) => props.theme.text[4].size}px;
  background: #202020 !important;
  border-radius: 8px;
  min-height: 50px !important;

  .ant-select-selector {
    align-items: center;
    min-height: 50px !important;
    padding: 0px 12px !important;
  }
  .ant-select-single.ant-select-lg:not(.ant-select-customize-input) .ant-select-selector {
    padding: 0px 20px;
  }
  .ant-select-selection-item {
    color: white;
    line-height: 45px !important;
  }
  .ant-select-arrow {
    color: #878c94;
  }
  .ant-select-selection-placeholder {
    line-height: 45px !important;
  }
  .ant-select-dropdown {
    background: #2b2b2b !important;
    box-shadow: 0px 7px 25px rgba(0, 0, 0, 0.35);
    border-radius: 8px;
  }
  .ant-select-item-option-content {
    color: white;
    font-weight: initial;
    font-size: ${(props) => props.theme.text[4].size}px;
    padding: 8px;
    :hover {
      background: transparent;
      color: #878c94;
    }
  }
  .ant-select-item-option:not(:last-child) {
    border-bottom: 1px solid rgba(96, 96, 96, 0.2);
  }
  .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
    background: transparent !important;
  }
  .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
    background: transparent !important;
  }
  .ant-select-selector {
    background: #202020 !important;
    border-radius: 8px !important;
    border: 1px solid #202020 !important;
    :hover {
      border: 1px solid #202020;
    }
  }
  .ant-select-selection-search {
    margin-inline-start: -4px !important;
  }
`;

Select.Option = Component.Option;

export default Select;
