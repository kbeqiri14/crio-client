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
  const { pathname } = useLocation();
  const [productsList, setProductsList] = useState([]);
  const [artworksList, setArtworksList] = useState([]);
  const [initialArtworkPolling, setInitialArtworkPolling] = useState(true);
  const [initialProductPolling, setInitialProductPolling] = useState(true);

  const tab = useMemo(
    () => (followingsCount ? `${tabs.FOLLOWING}: ${followingsCount}` : tabs.FOLLOWING),
    [followingsCount],
  );

  const [requestArtworks, { loading: artworkLoading, fetchMore: fetchMoreArtworks }] = useLazyQuery(
    getUserArtworks,
    {
      // pollInterval: 30000,
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
      onCompleted: ({ getUserArtworks }) => {
        if (initialArtworkPolling) {
          setInitialArtworkPolling(false);
          setArtworksList(getUserArtworks);
        }
      },
    },
  );

  const [requestProducts, { loading: productLoading, fetchMore: fetchMoreProducts }] = useLazyQuery(
    getUserProducts,
    {
      // pollInterval: 30000,
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
      onCompleted: ({ getUserProducts }) => {
        if (initialProductPolling) {
          setInitialProductPolling(false);
          setProductsList(getUserProducts);
        }
      },
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
        loadingProducts={productLoading}
        loadingArtworks={artworkLoading}
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
