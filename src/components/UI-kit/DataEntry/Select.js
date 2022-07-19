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
  border-radius: 4px !important;
  height: 50px !important;

  .ant-select-arrow {
    color: #878c94;
  }
  .ant-select-selection-placeholder {
    line-height: 45px !important;
  }
  .ant-select-dropdown {
    background: #2b2b2b !important;
    box-shadow: 0px 7px 25px rgba(0, 0, 0, 0.35);
  }
  .ant-select-item-option-content {
    color: white;
    border-bottom: 1px solid rgba(96, 96, 96, 0.2);

    padding: 8px;
    :hover {
      background: transparent;
      color: #878c94;
    }
  }
  .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
    background: transparent !important;
  }
`;

Select.Option = Component.Option;

export default Select;
