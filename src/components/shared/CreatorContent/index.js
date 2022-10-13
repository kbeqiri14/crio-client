import { memo, useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import history from '@configs/history';
import { Tabs } from '@ui-kit';
import Categories from './Product/_partials/Categories';
import EmptyState from '@shared/EmptyState';
import LoadMoreButton from './LoadMoreButton';
import ArtworksList from './Artwork/ArtworksList';
import ProductsList from './Product/ProductsList';
import useCategories from '@app/hooks/useCategories';

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
  const { categories } = useCategories();

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

  return (
    <Wrapper>
      <Tabs
        activeKey={activeKey}
        onTabClick={onTabClick}
        items={[
          {
            label: tabs.MARKETPLACE,
            key: tabs.MARKETPLACE,
            children: (
              <>
                {!isProfilePage && (
                  <Categories
                    isProduct
                    categories={categories.products.filter(
                      ({ name }) => name !== 'Digital Product',
                    )}
                  />
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
              </>
            ),
          },
          {
            label: tabs.ARTWORK,
            key: tabs.ARTWORK,
            children: (
              <>
                {!isProfilePage && <Categories categories={categories.contents} />}
                {!loading && !artworksCount && !artworksList?.length && <EmptyState {...props} />}
                <ArtworksList artworksList={artworksList} loading={initialPolling && loading} />
                <LoadMoreButton
                  visible={visibleLoadMoreArtworks}
                  loading={loading}
                  onClick={loadMoreArtworks}
                />
              </>
            ),
          },
        ]}
      ></Tabs>
    </Wrapper>
  );
};

export default memo(Content);
