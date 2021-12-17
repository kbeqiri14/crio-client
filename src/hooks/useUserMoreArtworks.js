import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import { isFollowing } from '@app/graphql/queries/users.query';
import { getRandomArtworks } from '@app/graphql/queries/artworks.query';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';

export const useUserMoreArtworks = (userId, artworkId) => {
  const [loading, setLoading] = useState(true);
  const { user } = useLoggedInUser();

  const [requestRandomArtworks, { data }] = useLazyQuery(getRandomArtworks, {
    fetchPolicy: 'no-cache',
    variables: { params: { userId, artworkId, limit: 3 } },
    onCompleted: () => setLoading(false),
    onError: () => setLoading(false),
  });
  const [requestIsFollowing] = useLazyQuery(isFollowing, {
    variables: { followingId: userId },
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      if (data?.isFollowing) {
        requestRandomArtworks();
      }
    },
  });

  useEffect(() => {
    if (!user || user.isCreator) {
      requestRandomArtworks();
    } else {
      requestIsFollowing();
    }
  }, [requestIsFollowing, requestRandomArtworks, user]);

  return { loading, data: data?.getRandomArtworks };
};
