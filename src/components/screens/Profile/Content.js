import { memo, useCallback, useEffect, useMemo, useState } from 'react';
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
  userCategories,
}) => {
  const [productsList, setProductsList] = useState([]);
  const [artworksList, setArtworksList] = useState([]);
  const tab = useMemo(
    () => (followingsCount ? `${tabs.FOLLOWING}: ${followingsCount}` : tabs.FOLLOWING),
    [followingsCount],
  );

  const { pathname } = useLocation();
  const [initialPolling] = useState(true);

  const [requestArtworks, { loading: artworkLoading, fetchMore: fetchMoreArtworks }] = useLazyQuery(
    getUserArtworks,
    {
      fetchPolicy: 'cache-and-network',
      // notifyOnNetworkStatusChange: true,
      // pollInterval: 30000,
      // onCompleted: () => setInitialPolling(false),
      onCompleted: ({ getUserArtworks }) => setArtworksList(getUserArtworks),
    },
  );

  const [requestProducts, { loading: productLoading, fetchMore: fetchMoreProducts }] = useLazyQuery(
    getUserProducts,
    {
      fetchPolicy: 'cache-and-network',
      // notifyOnNetworkStatusChange: true,
      // pollInterval: 30000,
      // onCompleted: () => setInitialPolling(false),
      onCompleted: ({ getUserProducts }) => setProductsList(getUserProducts),
    },
  );
  const refetchArtworks = useCallback(
    (variables) =>
      fetchMoreArtworks({
        variables,
        updateQuery: (_, { fetchMoreResult }) => setArtworksList(fetchMoreResult.getUserArtworks),
      }),
    [fetchMoreArtworks],
  );
  const refetchProducts = useCallback(
    (variables) =>
      fetchMoreProducts({
        variables,
        updateQuery: (_, { fetchMoreResult }) => setProductsList(fetchMoreResult.getUserProducts),
      }),
    [fetchMoreProducts],
  );

  useEffect(() => {
    if (isCreator) {
      const username = pathname.split('/').slice(-1)[0] || undefined;
      requestArtworks({ variables: { params: { username } } });
      requestProducts({ variables: { params: { username } } });
    }
  }, [pathname, isCreator, requestArtworks, requestProducts]);

  if (isCreator) {
    return (
      <Content
        isProfile={isProfile}
        productsCount={productsCount}
        artworksCount={artworksCount}
        productsList={productsList}
        artworksList={artworksList}
        loadingProducts={initialPolling && productLoading}
        loadingArtworks={initialPolling && artworkLoading}
        refetchProducts={refetchProducts}
        refetchArtworks={refetchArtworks}
        userCategories={userCategories}
      />
    );
  }
  return (
    <Wrapper>
      <Tabs
        items={[
          {
            label: tab,
            key: 'Following',
            children: (
              <Followings
                username={username}
                isProfile={isProfile}
                isSubscribed={isSubscribed}
                followingsCount={followingsCount}
              />
            ),
          },
        ]}
      />
    </Wrapper>
  );
};

export default memo(ProfileContent);
