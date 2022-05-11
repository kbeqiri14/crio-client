import { memo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { getUserArtworks } from '@app/graphql/queries/artworks.query';
import { Spinner } from '@ui-kit/Spinner';
import EmptyState from '@shared/EmptyState';
import PostersList from '@app/components/screens/ExplorePage/PostersList';

const Works = ({ username, isProfile, isFollowing, isLock }) => {
  const { pathname } = useLocation();
  const [initialPolling, setInitialPolling] = useState(true);
  const [works, setWorks] = useState([]);

  const { loading } = useQuery(getUserArtworks, {
    variables: { username: pathname.split('/').slice(-1)[0] || undefined },
    onCompleted: ({ getUserArtworks }) => {
      setInitialPolling(false);
      setWorks(getUserArtworks);
    },
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    pollInterval: 30000,
  });

  return (
    <Spinner spinning={initialPolling && loading && !works?.length} color='white'>
      {(!loading || !initialPolling) && !works?.length ? (
        <EmptyState username={username} isCreator={true} isProfile={isProfile} />
      ) : (
        <PostersList postersList={works} />
      )}
    </Spinner>
  );
};

export default memo(Works);
