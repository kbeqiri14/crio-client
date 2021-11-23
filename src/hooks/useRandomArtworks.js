import { useCallback, useMemo, useState } from 'react';
import { useLazyQuery, useQuery, useReactiveVar } from '@apollo/client';

import { randomNumberVar } from '@configs/client-cache';
import { getRandomArtworksCount, getRandomArtworks } from '@app/graphql/queries/artworks.query';

const LIMIT = 15;

export const useRandomArtworks = (onCompleted, offset = 0, limit = LIMIT) => {
  const [loading, setLoading] = useState(true);
  const count = useReactiveVar(randomNumberVar);

  const [requestRandomArtworks] = useLazyQuery(getRandomArtworks, {
    fetchPolicy: 'no-cache',
    onCompleted: (result) => {
      onCompleted(result);
      setLoading(false);
    },
    onError: () => setLoading(false),
  });

  const { data: artworksCount } = useQuery(
    getRandomArtworksCount,
    {
      onCompleted: ({ getRandomArtworksCount }) => {
        const n = Math.floor(Math.random() * getRandomArtworksCount + 1);
        randomNumberVar(n);
        requestRandomArtworks({
          variables: { params: { count: n, offset, limit } },
        });
      },
      onError: () => setLoading(false),
    },
  );

  const isEnd = useMemo(
    () => artworksCount?.getRandomArtworksCount <= offset,
    [artworksCount?.getRandomArtworksCount, offset],
  );

  const loadMore = useCallback( () => {
    setLoading(true);
    requestRandomArtworks({
      variables: { params: { count, offset, limit: LIMIT } },
    });
  }, [count, offset, requestRandomArtworks]);

  return { isEnd, loading, loadMore };
};
