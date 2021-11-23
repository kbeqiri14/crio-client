import { useCallback, useEffect, useMemo } from 'react';
import { useLazyQuery, useReactiveVar } from '@apollo/client';

import { randomNumberVar } from '@configs/client-cache';
import { getRandomArtworksCount, getRandomArtworks } from '@app/graphql/queries/artworks.query';

const LIMIT = 15;

export const useRandomArtworks = (onCompleted, offset = 0, limit = LIMIT) => {
  const count = useReactiveVar(randomNumberVar);

  const [requestRandomArtworks, { loading: loadingArtworks }] = useLazyQuery(getRandomArtworks, {
    fetchPolicy: 'no-cache',
    onCompleted,
  });

  const [requestRandomArtworksCount, { data, loading: loadingArtworksCount }] = useLazyQuery(
    getRandomArtworksCount,
    {
      onCompleted: ({ getRandomArtworksCount }) => {
        const n = Math.floor(Math.random() * getRandomArtworksCount + 1);
        randomNumberVar(n);
        requestRandomArtworks({
          variables: { params: { count: n, offset, limit } },
        });
      },
    },
  );

  const isEnd = useMemo(
    () => data?.getRandomArtworksCount <= offset,
    [data?.getRandomArtworksCount, offset],
  );

  const loadMore = useCallback(
    () =>
      requestRandomArtworks({
        variables: { params: { count, offset, limit: LIMIT } },
      }),
    [count, offset, requestRandomArtworks],
  );

  useEffect(requestRandomArtworksCount, [requestRandomArtworksCount]);

  return {
    isEnd,
    loadingArtworks,
    loadingArtworksCount,
    loadMore,
  };
};
