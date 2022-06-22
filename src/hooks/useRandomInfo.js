import { useCallback, useMemo, useState } from 'react';
import { useLazyQuery, useQuery, useReactiveVar } from '@apollo/client';

import { randomNumberVar } from '@configs/client-cache';
import { getRandomProducts } from '@app/graphql/queries/products.query';
import { getRandomArtworks, getRandomInfo } from '@app/graphql/queries/artworks.query';

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
  const count = useReactiveVar(randomNumberVar);

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
    onCompleted: ({ getRandomInfo }) => {
      const n = Math.floor(Math.random() * getRandomInfo.artworksCount + 1);
      randomNumberVar(n);
      requestRandomProducts({
        variables: { params: { count: n, offset: productsOffset, limit: productsLimit, keyword } },
      });
      requestRandomArtworks({
        variables: { params: { count: n, offset: artworksOffset, limit: artworksLimit, keyword } },
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
      variables: { params: { count, offset: productsOffset, limit: productsLimit, keyword } },
    });
  }, [count, productsOffset, productsLimit, keyword, requestRandomProducts]);

  const loadMoreArtworks = useCallback(() => {
    setLoading(true);
    requestRandomArtworks({
      variables: { params: { count, offset: artworksOffset, limit: artworksLimit, keyword } },
    });
  }, [count, artworksOffset, artworksLimit, keyword, requestRandomArtworks]);

  return {
    carouselArtworks: productsInfo?.getRandomInfo?.artworks || [],
    isProductsEnd,
    isArtworksEnd,
    loading,
    loadMoreProducts,
    loadMoreArtworks,
  };
};

export default useRandomInfo;
