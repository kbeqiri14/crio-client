import { useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';

import { getRandomArtworksInfo, getRandomArtworks } from '@app/graphql/queries/artworks.query';

export const useUserMoreArtworks = (userId, artworkId) => {
  const [loading, setLoading] = useState(true);

  const [requestRandomArtworks, { data }] = useLazyQuery(getRandomArtworks, {
    fetchPolicy: 'no-cache',
    onCompleted: () => setLoading(false),
    onError: () => setLoading(false),
  });

  useQuery(getRandomArtworksInfo, {
    onCompleted: ({ getRandomArtworksInfo }) => {
      const n = Math.floor(Math.random() * getRandomArtworksInfo.count + 1);
      requestRandomArtworks({
        variables: { params: { userId, artworkId, count: n, limit: 3 } },
      });
    },
    onError: () => setLoading(false),
  });

  return { loading, data: data?.getRandomArtworks };
};
