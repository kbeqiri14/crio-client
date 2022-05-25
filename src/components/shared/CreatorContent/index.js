import { memo, useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Tabs } from '@ui-kit';
import LoadMoreButton from './LoadMoreButton';
import EmptyState from '@shared/EmptyState';
import ArtworksList from './Artwork/ArtworksList';
import ProductsList from './Product/ProductsList';

const Wrapper = styled('div')`
  max-width: 1438px;
  @media (max-width: 1437px) {
    max-width: 1084px;
  }
  @media (max-width: 1083px) {
    max-width: 730px;
  }
  @media (max-width: 729px) {
    max-width: 376px;
  }
  margin: auto;
  padding: 28px 22px;
`;

const { TabPane } = Tabs;

const tabs = {
  MARKETPLACE: 'Marketplace',
  ARTWORK: 'Artwork',
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
}) => {
  const { pathname } = useLocation(tabs.MARKETPLACE);
  const [activeKey, setActiveKey] = useState(
    pathname.includes('/artworks') ? tabs.ARTWORK : tabs.MARKETPLACE,
  );
  const username = useMemo(() => pathname.split('/').slice(-1)[0], [pathname]);
  const isProfilePage = useMemo(() => pathname.includes('/profile'), [pathname]);

  const onTabClick = useCallback(
    (key) => {
      if (key === tabs.MARKETPLACE) {
        setActiveKey(tabs.MARKETPLACE);
        window.history.replaceState('', '', isProfilePage ? `/profile/${username}` : '/');
      } else {
        setActiveKey(tabs.ARTWORK);
        window.history.replaceState(
          '',
          '',
          isProfilePage ? `/profile/artworks/${username}` : `/artworks`,
        );
      }
    },
    [isProfilePage, username],
  );

  // if ((!loading || !initialPolling) && !works?.length) {
  //   return <EmptyState username={username} isCreator={true} isProfile={isProfile} />;
  // }
  return (
    <Wrapper>
      <Tabs activeKey={activeKey} onTabClick={onTabClick}>
        <TabPane key={tabs.MARKETPLACE} tab={tabs.MARKETPLACE}>
          {isProfilePage && !productsCount && (
            <EmptyState
              username={username}
              isCreator={true}
              isProfile={isProfile}
              isMarketPlace={true}
            />
          )}
          <ProductsList productsList={productsList} />
          <LoadMoreButton
            visible={visibleLoadMoreProducts}
            loading={loading}
            onClick={loadMoreProducts}
          />
        </TabPane>
        <TabPane key={tabs.ARTWORK} tab={tabs.ARTWORK}>
          {isProfilePage && !artworksCount && (
            <EmptyState username={username} isCreator={true} isProfile={isProfile} />
          )}
          <ArtworksList artworksList={artworksList} />
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
