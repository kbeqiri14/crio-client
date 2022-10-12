import { useCallback, useMemo, useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';

import { getRandomInfo, getRandomProducts } from '@app/graphql/queries/products.query';
import { getRandomArtworks } from '@app/graphql/queries/artworks.query';

const useRandomInfo = ({
  keyword,
  productsOffset = 0,
  artworksOffset = 0,
  productsLimit,
  artworksLimit,
  getRandomProductsCompleted,
  getRandomArtworksCompleted,
}) => {
  const [loading, setLoading] = useState(true);

  const [requestRandomProducts] = useLazyQuery(getRandomProducts, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (result) => {
      getRandomProductsCompleted(result);
      setLoading(false);
    },
    onError: () => setLoading(false),
  });
  const [requestRandomArtworks] = useLazyQuery(getRandomArtworks, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (result) => {
      getRandomArtworksCompleted(result);
      setLoading(false);
    },
    onError: () => setLoading(false),
  });

  const { data: productsInfo } = useQuery(getRandomInfo, {
    variables: { keyword },
    onCompleted: () => {
      setLoading(true);
      requestRandomProducts({
        variables: {
          params: {
            offset: keyword ? 0 : productsOffset,
            limit: productsLimit,
            keyword,
          },
        },
      });
      requestRandomArtworks({
        variables: {
          params: {
            offset: keyword ? 0 : artworksOffset,
            limit: artworksLimit,
            keyword,
          },
        },
      });
    },
    onError: () => setLoading(false),
  });

  const isProductsEnd = useMemo(
    () => productsInfo?.getRandomInfo?.productsCount <= productsOffset,
    [productsInfo?.getRandomInfo?.productsCount, productsOffset],
  );

  const isArtworksEnd = useMemo(
    () => productsInfo?.getRandomInfo?.artworksCount <= artworksOffset,
    [productsInfo?.getRandomInfo?.artworksCount, artworksOffset],
  );

  const loadMoreProducts = useCallback(() => {
    setLoading(true);
    requestRandomProducts({
      variables: {
        params: { offset: productsOffset, limit: productsLimit, keyword },
      },
    });
  }, [productsOffset, productsLimit, keyword, requestRandomProducts]);

  const loadMoreArtworks = useCallback(() => {
    setLoading(true);
    requestRandomArtworks({
      variables: {
        params: { offset: artworksOffset, limit: artworksLimit, keyword },
      },
    });
  }, [artworksOffset, artworksLimit, keyword, requestRandomArtworks]);

  return {
    topProducts: productsInfo?.getRandomInfo?.products || [],
    isProductsEnd,
    isArtworksEnd,
    loading,
    loadMoreProducts,
    loadMoreArtworks,
  };
};

export default useRandomInfo;
