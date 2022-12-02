import React, { memo, useCallback, useContext, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
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

const Card = ({ id, name, selectedCategory, searchByCategory }) => {
  // const visibility = useContext(VisibilityContext);

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
    <Tag selected={getSelected(id, selectedCategory)} onClick={searchByCategory(id)}>
      {name}
    </Tag>
  );
};

const Categories = ({ isProduct, isProfilePage, categories, refetchProducts, refetchArtworks }) => {
  const { pathname } = useLocation();
  const searchProductCategory = useReactiveVar(searchProductCategoryVar);
  const searchArtworkCategory = useReactiveVar(searchArtworkCategoryVar);
  const [selectedProductCategory, setSelectedProductCategory] = useState();
  const [selectedArtworkCategory, setSelectedArtworkCategory] = useState();

  const username = useMemo(() => pathname.split('/').slice(-1)[0] || undefined, [pathname]);
  const selectedCategory = useMemo(() => {
    if (isProduct) {
      return isProfilePage ? selectedProductCategory : searchProductCategory;
    }
    return isProfilePage ? selectedArtworkCategory : searchArtworkCategory;
  }, [
    isProduct,
    isProfilePage,
    searchArtworkCategory,
    searchProductCategory,
    selectedArtworkCategory,
    selectedProductCategory,
  ]);

  const searchByCategory = useCallback(
    (id) => () => {
      if (isProduct) {
        if (isProfilePage) {
          if (id === selectedProductCategory) {
            return;
          }
          setSelectedProductCategory(id);
          refetchProducts({ variables: { params: { username, categoryId: id } } });
          return;
        }
        if (id === searchProductCategory) {
          return;
        }
        searchProductCategoryVar(id);
      } else {
        if (isProfilePage) {
          if (id === selectedArtworkCategory) {
            return;
          }
          setSelectedArtworkCategory(id);
          refetchArtworks({ variables: { params: { username, categoryId: id } } });
          return;
        }
        if (id === searchArtworkCategory) {
          return;
        }
        searchArtworkCategoryVar(id);
      }
      refetchArtworkVar(true);
      refetchMarketplaceVar(true);
    },
    [
      username,
      isProduct,
      isProfilePage,
      refetchProducts,
      refetchArtworks,
      searchProductCategory,
      searchArtworkCategory,
      selectedProductCategory,
      selectedArtworkCategory,
      setSelectedProductCategory,
      setSelectedArtworkCategory,
    ],
  );

  return (
    <Wrapper>
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        <Card
          itemId={0}
          name='All'
          selectedCategory={selectedCategory}
          searchByCategory={searchByCategory}
        />
        {categories.map(({ id, name }) => (
          <Card
            key={id}
            itemId={id}
            id={id}
            name={name}
            isProfilePage={isProfilePage}
            searchProductCategory={searchProductCategory}
            selectedArtworkCategory={selectedArtworkCategory}
            selectedCategory={selectedCategory}
            searchByCategory={searchByCategory}
          />
        ))}
      </ScrollMenu>
    </Wrapper>
  );
};

export default memo(Categories);
