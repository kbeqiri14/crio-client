import { memo, useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useReactiveVar } from '@apollo/client';

import history from '@configs/history';
import { Tabs } from '@ui-kit';
import EmptyState from '@shared/EmptyState';
import LoadMoreButton from './LoadMoreButton';
import ArtworksList from './Artwork/ArtworksList';
import ProductsList from './Product/ProductsList';
import { categoriesVar } from '@configs/client-cache';
import CategoryTab from '@ui-kit/Custom/CategoryTab';

const Wrapper = styled('div')`
  max-width: 1438px;
  margin: auto;
  padding: 40px 22px;

  @media (max-width: 1437px) {
    max-width: 1084px;
  }
  @media (max-width: 1083px) {
    max-width: 730px;
  }
  @media (max-width: 729px) {
    max-width: 376px;
  }
`;

const CategoryWrapper = styled('div')`
  width: 1316px;
  height: 100%;
  padding-top: 10px;
  padding-bottom: 20px;
  margin-left: 32px;
  overflow-x: auto;
  white-space: nowrap;
`;

const { TabPane } = Tabs;

const tabs = {
  MARKETPLACE: 'Marketplace',
  ARTWORK: 'Content',
};

export const Content = ({
  isProfile,
  visibleLoadMoreProducts,
  visibleLoadMoreArtworks,
  productsCount,
  artworksCount,
  productsList,
  artworksList,
  loading,
  loadMoreProducts,
  loadMoreArtworks,
  initialPolling,
}) => {
  const { pathname } = useLocation(tabs.MARKETPLACE);
  const [activeKey, setActiveKey] = useState(
    pathname.includes('/artworks') ? tabs.ARTWORK : tabs.MARKETPLACE,
  );
  const username = useMemo(() => pathname.split('/').slice(-1)[0], [pathname]);
  const isProfilePage = useMemo(() => pathname.includes('/profile'), [pathname]);

  const onTabClick = useCallback(
    (key) => {
      setActiveKey(key);
      if (key === tabs.MARKETPLACE) {
        history.push(isProfilePage ? `/profile/${username}` : '/');
      } else {
        history.push(isProfilePage ? `/profile/artworks/${username}` : `/artworks`);
      }
    },
    [isProfilePage, username],
  );

  const props = isProfilePage
    ? {
        username,
        isProfile,
        isCreator: true,
      }
    : { isNoResult: true };

  const categories = useReactiveVar(categoriesVar);

  return (
    <Wrapper>
      <Tabs activeKey={activeKey} onTabClick={onTabClick}>
        <TabPane key={tabs.MARKETPLACE} tab={tabs.MARKETPLACE}>
          {!isProfilePage && (
            <CategoryWrapper>
              <CategoryTab>All</CategoryTab>
              {categories.productCategories
                .filter((item) => item.name !== 'Digital Product')
                .map((item) => (
                  <CategoryTab>{item.name}</CategoryTab>
                ))}
            </CategoryWrapper>
          )}
          {!loading && !productsCount && !productsList?.length && (
            <EmptyState {...props} isMarketplace={true} />
          )}
          <ProductsList productsList={productsList} loading={initialPolling && loading} />
          <LoadMoreButton
            visible={visibleLoadMoreProducts}
            loading={loading}
            onClick={loadMoreProducts}
          />
        </TabPane>
        <TabPane key={tabs.ARTWORK} tab={tabs.ARTWORK}>
          {!isProfilePage && (
            <CategoryWrapper>
              <CategoryTab>All</CategoryTab>
              {categories.contentCategories.map((item) => (
                <CategoryTab>{item.name}</CategoryTab>
              ))}
            </CategoryWrapper>
          )}
          {!loading && !artworksCount && !artworksList?.length && <EmptyState {...props} />}
          <ArtworksList artworksList={artworksList} loading={initialPolling && loading} />
          <LoadMoreButton
            visible={visibleLoadMoreArtworks}
            loading={loading}
            onClick={loadMoreArtworks}
          />
        </TabPane>
      </Tabs>
    </Wrapper>
  );
};

export default memo(Content);
