import { GlobalSpinner } from '@ui-kit/GlobalSpinner';
import { Fragment, memo, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { getFollowings, getFollowersCount } from '@app/graphql/queries/users.query';
import PersonalInfo from './__partials__/PersonalInfo';
import Details from './Details';

export const MyAccount = () => {
  const { user } = useLoggedInUser();

  const [requestFollowings, { data: followings, loading: loadingFollowings }] = useLazyQuery(
    getFollowings,
    { fetchPolicy: 'cache-and-network' },
  );
  const [requestFollowersCount, { data: followersCount }] = useLazyQuery(getFollowersCount, {
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (user?.id) {
      if (user?.isCreator) {
        requestFollowersCount();
      } else {
        requestFollowings();
      }
    }
  }, [user?.id, user?.isCreator, requestFollowings, requestFollowersCount]);

  return (
    <Fragment>
      {!user?.id && <GlobalSpinner />}
      <PersonalInfo
        user={user}
        followersCount={followersCount?.getFollowersCount}
        isCreator={user?.isCreator}
        isAuthenticated={user?.id}
      />
      <Details
        isAuthenticated={user?.id}
        isCreator={user.isCreator}
        followings={followings?.getFollowings}
        loadingFollowings={loadingFollowings}
      />
    </Fragment>
  );
};

export default memo(MyAccount);
