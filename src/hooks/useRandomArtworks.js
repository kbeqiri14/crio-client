import { useCallback, useMemo, useState } from 'react';
import { useLazyQuery, useQuery, useReactiveVar } from '@apollo/client';

import { randomNumberVar } from '@configs/client-cache';
import { getRandomArtworks, getRandomArtworksInfo } from '@app/graphql/queries/artworks.query';

const LIMIT = 16;

export const useRandomArtworks = (onCompleted, offset = 0, limit = LIMIT) => {
  const [loading, setLoading] = useState(true);
  const count = useReactiveVar(randomNumberVar);

  const [requestRandomArtworks] = useLazyQuery(getRandomArtworks, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (result) => {
      onCompleted(result);
      setLoading(false);
    },
    onError: () => setLoading(false),
  });

  const { data: artworksInfo } = useQuery(getRandomArtworksInfo, {
    onCompleted: ({ getRandomArtworksInfo }) => {
      const n = Math.floor(Math.random() * getRandomArtworksInfo.count + 1);
      randomNumberVar(n);
      requestRandomArtworks({ variables: { params: { count: n, offset, limit } } });
    },
    onError: () => setLoading(false),
  });

  const isEnd = useMemo(
    () => artworksInfo?.getRandomArtworksInfo?.count <= offset,
    [artworksInfo?.getRandomArtworksInfo?.count, offset],
  );

  const loadMore = useCallback(() => {
    setLoading(true);
    requestRandomArtworks({ variables: { params: { count, offset, limit: LIMIT } } });
  }, [count, offset, requestRandomArtworks]);

  return {
    carouselPosters: artworksInfo?.getRandomArtworksInfo?.artworks || [],
    isEnd,
    loading,
    loadMore,
  };
};
