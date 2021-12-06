import { GlobalSpinner } from '@ui-kit/GlobalSpinner';
import { Fragment, memo, useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { isFollowing, getUser } from '@app/graphql/queries/users.query';
import { createFollowing } from '@app/graphql/mutations/user.mutation';
import PersonalInfo from '@screens/Account/__partials__/PersonalInfo';
import Details from '@screens/Account/Details';

export const Profile = () => {
  const { pathname } = useLocation();
  const { user } = useLoggedInUser();
  const [isFollow, setIsFollow] = useState(false);
  const id = useMemo(() => pathname.split('/').slice(-1)[0], [pathname]);

  const { data: userData, loading: loadingUser } = useQuery(getUser, { variables: { id } });
  const { loading: loadingIsFollowing } = useQuery(isFollowing, {
    variables: { followingId: id },
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      if (data?.isFollowing) {
        setIsFollow(true);
      }
    },
  });
  const [follow, { loading: loadingFollowing }] = useMutation(createFollowing, {
    variables: { followingId: id },
    onCompleted: (data) => {
      if (data?.createFollowing) {
        setIsFollow(!isFollow);
      }
    },
  });

  const name = useMemo(() => {
    const { visibility, ...user } = userData?.getUser || {};
    if (visibility?.includes('name')) {
      return `${user?.firstName} ${user?.lastName}`;
    }
    if (visibility?.includes('username')) {
      return user?.username;
    }
    return user?.email;
  }, [userData?.getUser]);

  const handleClick = useCallback(() => follow({ variables: { followingId: id } }), [follow, id]);

  return (
    <Fragment>
      {loadingUser && <GlobalSpinner />}
      <PersonalInfo
        isProfile
        user={userData?.getUser}
        isFollow={isFollow}
        isCreator={user?.isCreator}
        isCurrentUser={id === user.id}
        loading={loadingFollowing}
        onClick={handleClick}
      />
      <Details
        isProfile
        id={id}
        name={name}
        isCreator={user?.isCreator}
        isFollow={isFollow}
        loadingIsFollowing={loadingIsFollowing}
      />
    </Fragment>
  );
};

export default memo(Profile);
