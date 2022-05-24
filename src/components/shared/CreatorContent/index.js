import { memo, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import history from '@app/configs/history';
import { Tabs } from '@ui-kit';
import LoadMoreButton from './LoadMoreButton';
import ArtworksList from './ArtworksList';
import ProductsList from './ProductsList';

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
  visibleLoadMoreProducts,
  visibleLoadMoreArtworks,
  productsList,
  artworksList,
  loading,
  loadMoreProducts,
  loadMoreArtworks,
}) => {
  const { pathname } = useLocation();
  const username = useMemo(() => pathname.split('/').slice(-1)[0], [pathname]);
  const isProfile = useMemo(() => pathname.includes('/profile'), [pathname]);
  const activeKey = useMemo(
    () => (pathname.includes('/artworks') ? tabs.ARTWORK : tabs.MARKETPLACE),
    [pathname],
  );
  const onTabClick = useCallback(
    (key) => {
      if (key === tabs.MARKETPLACE) {
        return history.push(isProfile ? `/profile/${username}` : '/');
      }
      return history.push(isProfile ? `/profile/artworks/${username}` : `/artworks`);
    },
    [username, isProfile],
  );

  // if ((!loading || !initialPolling) && !works?.length) {
  //   return <EmptyState username={username} isCreator={true} isProfile={isProfile} />;
  // }
  return (
    <Wrapper>
      <Tabs activeKey={activeKey} onTabClick={onTabClick}>
        <TabPane key={tabs.MARKETPLACE} tab={tabs.MARKETPLACE}>
          <ProductsList productsList={productsList} />
          <LoadMoreButton
            visible={visibleLoadMoreProducts}
            loading={loading}
            onClick={loadMoreProducts}
          />
        </TabPane>
        <TabPane key={tabs.ARTWORK} tab={tabs.ARTWORK}>
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
