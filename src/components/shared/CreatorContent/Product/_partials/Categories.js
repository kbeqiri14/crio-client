import React, { useContext, memo } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import styled from 'styled-components';

import { ReactComponent as ArrowRightIcon } from '@svgs/arrow-down.svg';

const Wrapper = styled('div')`
  max-width: 1400px;
  padding-top: 10px;
  padding-bottom: 20px;
  white-space: nowrap;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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

  return isFirstItemVisible ? null : (
    <ArrowRightIcon className='arrow-left' onClick={() => scrollPrev()} />
  );
};

const RightArrow = () => {
  const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

  return isLastItemVisible ? null : (
    <ArrowRightIcon className='arrow-right' onClick={() => scrollNext()} />
  );
};

const Card = ({ name, onClick }) => {
  const visibility = useContext(VisibilityContext);

  return (
    <div onClick={() => onClick(visibility)} tabIndex={0}>
      <Tag>{name}</Tag>
    </div>
  );
};

const Categories = ({ categories }) => (
  <Wrapper>
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      <Tag>All</Tag>
      {categories.map(({ id, name }) => (
        <Card key={id} name={name} />
      ))}
    </ScrollMenu>
  </Wrapper>
);

export default memo(Categories);
