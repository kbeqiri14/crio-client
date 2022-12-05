import { memo, useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import history from '@configs/history';
import { Tabs } from '@ui-kit';
import EmptyState from '@shared/EmptyState';
import LoadMoreButton from './LoadMoreButton';
import ArtworksList from './Artwork/ArtworksList';
import ProductsList from './Product/ProductsList';
import Categories from './Product/_partials/Categories';
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
  loadingProducts,
  loadingArtworks,
  loadingMoreProducts,
  loadingMoreArtworks,
  loadMoreProducts,
  loadMoreArtworks,
  refetchProducts,
  refetchArtworks,
  userCategories,
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
                <Categories
                  isProduct
                  isProfilePage={isProfilePage}
                  categories={
                    userCategories
                      ? categories.products
                          .filter(({ name }) => name !== 'Digital Product')
                          .filter(({ id }) => userCategories?.productCategories?.includes(id))
                      : categories.products.filter(({ name }) => name !== 'Digital Product')
                  }
                  refetchProducts={refetchProducts}
                />
                {!loadingProducts && !productsCount && !productsList?.length && (
                  <EmptyState {...props} isMarketplace={true} />
                )}
                <ProductsList
                  productsList={productsList}
                  loading={loadingProducts && !loadingMoreProducts}
                />
                <LoadMoreButton
                  visible={visibleLoadMoreProducts}
                  disabled={loadingProducts && !loadingMoreProducts}
                  loading={loadingMoreProducts}
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
                <Categories
                  isProfilePage={isProfilePage}
                  categories={
                    userCategories
                      ? categories.contents.filter(({ id }) =>
                          userCategories?.artworkCategories?.includes(id),
                        )
                      : categories.contents
                  }
                  refetchArtworks={refetchArtworks}
                />
                {!loadingArtworks && !artworksCount && !artworksList?.length && (
                  <EmptyState {...props} />
                )}
                <ArtworksList
                  artworksList={artworksList}
                  loading={loadingArtworks && !loadingMoreArtworks}
                />
                <LoadMoreButton
                  visible={visibleLoadMoreArtworks}
                  disabled={loadingArtworks && !loadingMoreArtworks}
                  loading={loadingMoreArtworks}
                  onClick={loadMoreArtworks}
                />
              </>
            ),
          },
        ]}
      />
    </Wrapper>
  );
};

export default memo(Content);
