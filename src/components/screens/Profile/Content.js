import { memo, useMemo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useLazyQuery } from '@apollo/client';

import { getUserArtworks } from '@app/graphql/queries/artworks.query';
import { getUserProducts } from '@app/graphql/queries/products.query';
import { Tabs } from '@ui-kit';
import Followings from './Followings';
import Content from '@shared/CreatorContent';

const Wrapper = styled('div')`
  padding: 40px 22px;
`;

const { TabPane } = Tabs;

const tabs = {
  MARKETPLACE: 'Marketplace',
  ARTWORK: 'Artwork',
  FOLLOWING: 'Following',
};

const ProfileContent = ({
  username,
  followingsCount,
  productsCount,
  artworksCount,
  isCreator,
  isProfile,
  isSubscribed,
}) => {
  const tab = useMemo(
    () => (followingsCount ? `${tabs.FOLLOWING}: ${followingsCount}` : tabs.FOLLOWING),
    [followingsCount],
  );

  const { pathname } = useLocation();
  const [initialPolling, setInitialPolling] = useState(true);

  const [requestArtworks, { data: Artworks, loading: artworkLoading }] = useLazyQuery(
    getUserArtworks,
    {
      variables: { username: pathname.split('/').slice(-1)[0] || undefined },
      fetchPolicy: 'no-cache',
      notifyOnNetworkStatusChange: true,
      pollInterval: 30000,
      onCompleted: () => setInitialPolling(false),
    },
  );

  const [requestProducts, { data: Products, loading: productLoading }] = useLazyQuery(
    getUserProducts,
    {
      variables: { username: pathname.split('/').slice(-1)[0] || undefined },
      fetchPolicy: 'no-cache',
      notifyOnNetworkStatusChange: true,
      pollInterval: 30000,
      onCompleted: () => setInitialPolling(false),
    },
  );

  useEffect(() => {
    if (isCreator) {
      requestArtworks();
      requestProducts();
    }
  }, [isCreator, requestArtworks, requestProducts]);

  if (isCreator) {
    return (
      <Content
        isProfile={isProfile}
        productsCount={productsCount}
        artworksCount={artworksCount}
        productsList={Products?.getUserProducts}
        artworksList={Artworks?.getUserArtworks}
        loadingProducts={initialPolling && productLoading}
        loadingArtworks={initialPolling && artworkLoading}
      />
    );
  }
  return (
    <Wrapper>
      <Tabs>
        <TabPane key='Following' tab={tab}>
          <Followings
            username={username}
            isProfile={isProfile}
            isSubscribed={isSubscribed}
            followingsCount={followingsCount}
          />
        </TabPane>
      </Tabs>
    </Wrapper>
  );
};

export default memo(ProfileContent);
