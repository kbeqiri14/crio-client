import { useCallback, useMemo, useState } from 'react';
import { useLazyQuery, useQuery, useReactiveVar } from '@apollo/client';

import { creatorUserIdsVar, randomNumberVar } from '@configs/client-cache';
import {
  getRandomArtworksInfo,
  getRandomArtworksForFeed,
} from '@app/graphql/queries/artworks.query';

const LIMIT = 15;

export const useFeedRandomArtworks = (onCompleted, userId = 2, offset = 0, limit = LIMIT) => {
  const [loading, setLoading] = useState(true);
  const count = useReactiveVar(randomNumberVar);
  // const creatorUserIds = useReactiveVar(creatorUserIdsVar);

  const [requestRandomArtworks, { data }] = useLazyQuery(getRandomArtworksForFeed, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (result) => {
      onCompleted(result);
      setLoading(false);
    },
    onError: () => setLoading(false),
  });

  const { data: artworksCount } = useQuery(getRandomArtworksInfo, {
    onCompleted: ({ getRandomArtworksInfo }) => {
      if (
        getRandomArtworksInfo.count >= 15 ||
        (limit === LIMIT && getRandomArtworksInfo.count >= 27)
      ) {
        const n = Math.floor(Math.random() * getRandomArtworksInfo.count + 1);
        randomNumberVar(n);
        requestRandomArtworks({
          variables: { params: { count: n, userId, offset, limit } },
        });
      } else {
        setLoading(false);
      }
    },
    onError: () => setLoading(false),
  });

  const isEnd = useMemo(
    () => artworksCount?.getRandomArtworksInfo?.count <= offset + 15,
    [artworksCount?.getRandomArtworksInfo?.count, offset],
  );

  const loadMore = useCallback(() => {
    setLoading(true);
    requestRandomArtworks({
      variables: { params: { count, userId: 2, offset, limit: LIMIT } },
    });
  }, [count, offset, requestRandomArtworks]);

  return { isEnd, loading, data: data?.getRandomArtworksForFeed, loadMore };
};
