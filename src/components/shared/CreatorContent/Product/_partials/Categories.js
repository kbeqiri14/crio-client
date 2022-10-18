import React, { useContext, memo, useCallback } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import styled, { css } from 'styled-components';
import { useReactiveVar } from '@apollo/client';

import {
  searchArtworkCategoryVar,
  searchProductCategoryVar,
  refetchArtworkVar,
  refetchMarketplaceVar,
} from '@configs/client-cache';
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
  }
  .react-horizontal-scrolling-menu--scroll-container {
    scrollbar-width: none; /* Firefox */
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
  cursor: pointer;
  :hover {
    color: #1a1e24;
    background-color: ${(props) => props.theme.colors.white};
  }

  ${(props) =>
    props?.selected &&
    css`
      color: #1a1e24;
      background-color: ${(props) => props.theme.colors.white};
    `}
`;

const getSelected = (id, selectedCategory) => {
  if (id) {
    return selectedCategory === id;
  }
  return !selectedCategory;
};

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

const Card = ({ id, name, isProduct, searchByCategory }) => {
  // const visibility = useContext(VisibilityContext);
  const selectedProductCategory = useReactiveVar(searchProductCategoryVar);
  const selectedArtworkCategory = useReactiveVar(searchArtworkCategoryVar);

  // useEffect(() => {
  //   if (!visibility.isItemVisible(selectedProductCategory || 0)) {
  //     visibility.scrollToItem(visibility.getItemById(selectedProductCategory || 0));
  //   }
  // }, [selectedProductCategory, visibility]);

  // useEffect(() => {
  //   if (!visibility.isItemVisible(selectedArtworkCategory || 0)) {
  //     visibility.scrollToItem(visibility.getItemById(selectedArtworkCategory || 0));
  //   }
  // }, [selectedArtworkCategory, visibility]);

  return (
    <Tag
      selected={getSelected(id, isProduct ? selectedProductCategory : selectedArtworkCategory)}
      onClick={searchByCategory(id)}
    >
      {name}
    </Tag>
  );
};

const Categories = ({ isProduct, categories }) => {
  const selectedProductCategory = useReactiveVar(searchProductCategoryVar);
  const selectedArtworkCategory = useReactiveVar(searchArtworkCategoryVar);
  const searchByCategory = useCallback(
    (id) => () => {
      if (isProduct) {
        if (id === selectedProductCategory) {
          return;
        }
        searchProductCategoryVar(id);
      } else {
        if (id === selectedArtworkCategory) {
          return;
        }
        searchArtworkCategoryVar(id);
      }
      refetchArtworkVar(true);
      refetchMarketplaceVar(true);
    },
    [isProduct, selectedArtworkCategory, selectedProductCategory],
  );

  return (
    <Wrapper>
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        <Card itemId={0} name='All' isProduct={isProduct} searchByCategory={searchByCategory} />
        {categories.map(({ id, name }) => (
          <Card
            key={id}
            itemId={id}
            id={id}
            name={name}
            isProduct={isProduct}
            searchByCategory={searchByCategory}
          />
        ))}
      </ScrollMenu>
    </Wrapper>
  );
};

export default memo(Categories);
