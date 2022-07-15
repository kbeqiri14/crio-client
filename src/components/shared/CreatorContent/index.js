import { memo, useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import history from '@configs/history';
import { Tabs, Paragraph } from '@ui-kit';
import EmptyState from '@shared/EmptyState';
import LoadMoreButton from './LoadMoreButton';
import ArtworksList from './Artwork/ArtworksList';
import ProductsList from './Product/ProductsList';
import { ReactComponent as EmptyIcon } from '@svgs/marketplace-empty.svg';

const Wrapper = styled('div')`
  max-width: 1438px;
  margin: auto;
  padding: 40px 22px;

  .empty {
    text-align: center;
  }

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
const EmptyWrapper = styled('div')`
  padding: 100px 0;
  svg {
    margin-bottom: 40px;
  }
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
      setActiveKey(key);
      if (key === tabs.MARKETPLACE) {
        history.push(isProfilePage ? `/profile/${username}` : '/');
      } else {
        history.push(isProfilePage ? `/profile/artworks/${username}` : `/artworks`);
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
          {isProfilePage && !productsCount && !productsList?.length && (
            <EmptyState
              username={username}
              isCreator={true}
              isProfile={isProfile}
              isMarketplace={true}
            />
          )}

          {!isProfilePage && !loading && !productsList?.length && (
            <div className='empty'>
              <EmptyWrapper>
                <EmptyIcon />
                <Paragraph level={4} color='dark25'>
                  No result
                </Paragraph>
              </EmptyWrapper>
            </div>
          )}

          <ProductsList productsList={productsList} />
          <LoadMoreButton
            visible={visibleLoadMoreProducts}
            loading={loading}
            onClick={loadMoreProducts}
          />
        </TabPane>
        <TabPane key={tabs.ARTWORK} tab={tabs.ARTWORK}>
          {isProfilePage && !artworksCount && !artworksList?.length && (
            <EmptyState username={username} isCreator={true} isProfile={isProfile} />
          )}

          {!isProfilePage && !loading && !artworksList?.length && (
            <div className='empty' padding-top='100px'>
              <EmptyWrapper>
                <EmptyIcon />
                <Paragraph level={4} color='dark25'>
                  No result
                </Paragraph>
              </EmptyWrapper>
            </div>
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
