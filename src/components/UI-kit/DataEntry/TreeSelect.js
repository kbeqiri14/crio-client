import React, { forwardRef } from 'react';
import { TreeSelect as Component } from 'antd';
import styled from 'styled-components';

const TreeSelect = styled(
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

  .ant-tree-select-dropdown {
    padding: 0px !important;
    background: #202020 !important;
    border-radius: 8px;
    z-index: 1 !important;
  }
  .ant-select-single.ant-select-lg:not(.ant-select-customize-input) .ant-select-selector {
    padding: 0px 20px;
  }

  .ant-select-tree-treenode {
    display: flex;
    align-items: center;
    height: 50px;
    color: ${(props) => props.theme.colors.dark50};
    line-height: 50px !important;
    font-weight: initial;
    font-size: ${(props) => props.theme.text[4].size}px;
    padding: 8px;

    :hover {
      background: transparent;
      color: ${(props) => props.theme.colors.dark25};
    }
  }
  .ant-select-tree-treenode:not(:last-child) {
    border-bottom: 1px solid rgba(96, 96, 96, 0.2);
  }

  .ant-select-arrow {
    color: ${(props) => props.theme.colors.dark50};
  }
  .ant-select-tree-switcher {
    line-height: 30px;
  }

  .ant-select-selection-placeholder {
    line-height: 50px !important;
  }
  .ant-select-tree {
    background: ${(props) => props.theme.colors.dark100} !important;
    box-shadow: 0px 7px 25px rgba(0, 0, 0, 0.35) !important;
    border-radius: 8px !important;
  }

  .ant-select-tree-node-content-wrapper-normal {
    line-height: 50px;
  }
  .ant-select-tree-node-content-wrapper:hover {
    background: transparent !important;
  }
  .ant-select-tree-node-selected {
    background: transparent !important;
  }

  .ant-select-selector {
    color: white !important;
    background: #202020 !important;
    border-radius: 8px !important;
    border: 1px solid #202020 !important;
    :hover {
      border: 1px solid #202020;
    }
  }

  .ant-select-tree-list-holder-inner {
    background: ${(props) => props.theme.colors.dark100} !important;
    box-shadow: 0px 7px 25px rgba(0, 0, 0, 0.35);
    border-radius: 8px;
  }
`;

TreeSelect.TreeNode = Component.TreeNode;

export default TreeSelect;
