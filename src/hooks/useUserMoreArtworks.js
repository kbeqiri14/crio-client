import { useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';

import { getRandomArtworksCount, getRandomArtworks } from '@app/graphql/queries/artworks.query';

export const useUserMoreArtworks = (userId) => {
  const [loading, setLoading] = useState(true);

  const [requestRandomArtworks, { data }] = useLazyQuery(getRandomArtworks, {
    fetchPolicy: 'no-cache',
    onCompleted: () => setLoading(false),
    onError: () => setLoading(false),
  });

  useQuery(getRandomArtworksCount, {
    onCompleted: ({ getRandomArtworksCount }) => {
      const n = Math.floor(Math.random() * getRandomArtworksCount + 1);
      requestRandomArtworks({
        variables: { params: { userId, count: n, limit: 3 } },
      });
    },
    onError: () => setLoading(false),
  });

  return { loading, data: data?.getRandomArtworks };
};
