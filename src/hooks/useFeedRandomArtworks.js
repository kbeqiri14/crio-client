import { useCallback, useMemo, useState } from 'react';
import { useLazyQuery, useQuery, useReactiveVar } from '@apollo/client';

import { creatorUserIdsVar, randomNumberVar } from '@configs/client-cache';
import { getCreatorUserIds } from '@app/graphql/queries/users.query';
import {
  getRandomArtworksCount,
  getRandomArtworksForFeed,
} from '@app/graphql/queries/artworks.query';

const LIMIT = 15;

export const useFeedRandomArtworks = (onCompleted, userId = 2, offset = 0, limit = LIMIT) => {
  const [loading, setLoading] = useState(true);
  const count = useReactiveVar(randomNumberVar);
  // const creatorUserIds = useReactiveVar(creatorUserIdsVar);

  useQuery(getCreatorUserIds, {
    onCompleted: (data) => creatorUserIdsVar(data.getCreatorUserIds),
  });
  const [requestRandomArtworks, { data }] = useLazyQuery(getRandomArtworksForFeed, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (result) => {
      onCompleted(result);
      setLoading(false);
    },
    onError: () => setLoading(false),
  });

  const { data: artworksCount } = useQuery(getRandomArtworksCount, {
    onCompleted: ({ getRandomArtworksCount }) => {
      if (getRandomArtworksCount >= 15 || (limit === LIMIT && getRandomArtworksCount >= 27)) {
        const n = Math.floor(Math.random() * getRandomArtworksCount + 1);
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
    () => artworksCount?.getRandomArtworksCount <= offset + 15,
    [artworksCount?.getRandomArtworksCount, offset],
  );

  const loadMore = useCallback(() => {
    setLoading(true);
    requestRandomArtworks({
      variables: { params: { count, userId: 2, offset, limit: LIMIT } },
    });
  }, [count, offset, requestRandomArtworks]);

  return { isEnd, loading, data: data?.getRandomArtworksForFeed, loadMore };
};
