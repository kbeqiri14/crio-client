import { Fragment, memo, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { isFollowing, getUser } from '@app/graphql/queries/users.query';
import PersonalInfo from '@screens/Account/__partials__/PersonalInfo';
import Details from '@screens/Account/Details';
import { GlobalSpinner } from '@ui-kit/GlobalSpinner';

export const Profile = () => {
  const { pathname } = useLocation();
  const { user } = useLoggedInUser();
  const [isFollow, setIsFollow] = useState(false);
  const username = useMemo(() => pathname.split('/').slice(-1)[0], [pathname]);

  const { data: userData, loading: loadingUser } = useQuery(getUser, { variables: { username } });
  const { loading: loadingIsFollowing } = useQuery(isFollowing, {
    variables: { followingUsername: username },
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      if (data?.isFollowing) {
        setIsFollow(true);
      }
    },
  });

  return (
    <Fragment>
      {loadingUser && loadingIsFollowing && <GlobalSpinner />}
      <PersonalInfo
        isProfile
        loadingUser={loadingUser}
        user={userData?.getUser}
        followersCount={userData?.getUser?.followersCount}
        isFollow={isFollow}
        setIsFollow={setIsFollow}
        isSubscribed={user?.isSubscribed}
        isCreator={user?.isCreator}
        isAuthenticated={user?.id}
      />
      <Details
        isProfile
        name={userData?.getUser?.username}
        artworksCount={userData?.getUser?.artworksCount}
        isAuthenticated={user?.id}
        isCreator={user?.isCreator}
        isFollow={isFollow}
        loadingIsFollowing={loadingIsFollowing}
      />
    </Fragment>
  );
};

export default memo(Profile);
