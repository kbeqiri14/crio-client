import React, { useContext, memo } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import styled from 'styled-components';

import { ReactComponent as ArrowRightIcon } from '@svgs/arrow-down.svg';

const Wrapper = styled('div')`
  max-width: 1394px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  white-space: nowrap;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  .arrow-left {
    cursor: pointer;
    padding: 0 10px;
    svg {
      opacity: 1;
      visibility: visible;
      transform: rotate(90deg);
    }
    &.hide {
      svg {
        opacity: 0;
        visibility: hidden;
        transition: visibility 0s, opacity 0.2s linear;
      }
    }
  }
  .arrow-right {
    cursor: pointer;
    padding: 0 10px;
    svg {
      opacity: 1;
      visibility: visible;
      transform: rotate(270deg);
    }
    &.hide {
      svg {
        opacity: 0;
        visibility: hidden;
        transition: visibility 0s, opacity 0.2s linear;
      }
    }
`;

const Tag = styled('span')`
  padding: 8px 12px;
  margin-right: 4px;
  border-radius: 4px;
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.text[3].size}px;
  font-weight: ${(props) => props.theme.text[3].weight};
  line-height: ${(props) => props.theme.text[3].height}px;
  font-style: ${(props) => props.theme.text[3].style || 'normal'};
  :hover {
    color: #1a1e24;
    background-color: ${(props) => props.theme.colors.white};
  }
`;

const LeftArrow = () => {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

  return (
    <span className={`arrow-left ${isFirstItemVisible ? 'hide' : ''}`}>
      <ArrowRightIcon onClick={() => scrollPrev()} />
    </span>
  );
};

const RightArrow = () => {
  const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

  return (
    <span className={`arrow-right ${isLastItemVisible ? 'hide' : ''}`}>
      <ArrowRightIcon onClick={() => scrollNext()} />
    </span>
  );
};

const Categories = ({ categories }) => (
  <Wrapper>
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      <Tag>All</Tag>
      {categories.map(({ id, name }) => (
        <Tag key={id}>{name}</Tag>
      ))}
    </ScrollMenu>
  </Wrapper>
);

export default memo(Categories);
