import { useCallback, useMemo, useState } from 'react';
import { useLazyQuery, useQuery, useReactiveVar } from '@apollo/client';

import { creatorIdsVar, randomNumberVar } from '@configs/client-cache';
import {
  getRandomArtworksInfo,
  getRandomArtworksForFeed,
} from '@app/graphql/queries/artworks.query';

const LIMIT = 15;

export const useFeedRandomArtworks = (onCompleted, offset = 0, limit = LIMIT) => {
  const [loading, setLoading] = useState(true);
  const count = useReactiveVar(randomNumberVar);
  const creatorIds = useReactiveVar(creatorIdsVar);

  const [requestRandomArtworks] = useLazyQuery(getRandomArtworksForFeed, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (result) => {
      onCompleted(result);
      setLoading(false);
    },
    onError: () => setLoading(false),
  });

  const { data: artworksInfo } = useQuery(getRandomArtworksInfo, {
    onCompleted: ({ getRandomArtworksInfo }) => {
      if (getRandomArtworksInfo.count >= 8) {
        const n = Math.floor(Math.random() * getRandomArtworksInfo.count + 1);
        randomNumberVar(n);
        creatorIdsVar(getRandomArtworksInfo.creatorIds);
        requestRandomArtworks({
          variables: {
            params: { count: n, userId: getRandomArtworksInfo.creatorIds?.[0], offset, limit },
          },
        });
      } else {
        setLoading(false);
      }
    },
    onError: () => setLoading(false),
  });

  const isEnd = useMemo(
    () => artworksInfo?.getRandomArtworksInfo?.count <= offset + LIMIT,
    [artworksInfo?.getRandomArtworksInfo?.count, offset],
  );

  const loadMore = useCallback(() => {
    setLoading(true);
    requestRandomArtworks({
      variables: {
        params: {
          count,
          userId: creatorIds?.[parseInt((offset - (8 + LIMIT)) / LIMIT) + 1],
          offset,
          limit: LIMIT,
        },
      },
    });
  }, [count, creatorIds, offset, requestRandomArtworks]);

  return {
    isEnd,
    loading,
    carouselPosters: artworksInfo?.getRandomArtworksInfo?.artworks || [],
    loadMore,
  };
};
