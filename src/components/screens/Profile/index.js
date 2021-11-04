import { Fragment, memo, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { isFollowing, getUser } from '@app/graphql/queries/users.query';
import { createFollowing } from '@app/graphql/mutations/user.mutation';
import PersonalInfo from '@screens/Account/__partials__/PersonalInfo';
import Details from '@screens/Account/Details';
import { Spinner } from '@ui-kit/Spinner';

export const Profile = () => {
  const { pathname } = useLocation();
  const [isFollow, setIsFollow] = useState(false);

  const { data: users, loading: loadingUser } = useQuery(getUser, {
    variables: { id: pathname.split('/')[2] },
  });
  const { loading: loadingIsFollowing } = useQuery(isFollowing, {
    variables: { followingId: pathname.split('/')[2] },
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      if (data?.isFollowing) {
        setIsFollow(true);
      }
    },
  });
  const [follow, { loading: loadingFollowing }] = useMutation(createFollowing, {
    variables: { followingId: pathname.split('/')[2] },
    onCompleted: data => {
      if (data?.createFollowing) {
        setIsFollow(!isFollow);
      }
    },
  });
  const handleClick = useCallback(() => follow({ variables: { followingId: pathname.split('/')[2] } }), [follow, pathname])

  return (
    <Fragment>
      <Spinner spinning={loadingUser || loadingIsFollowing} color='white'>
        <PersonalInfo
          isProfile
          user={users?.getUser}
          isFollow={isFollow}
          loading={loadingFollowing}
          onClick={handleClick}
        />
      </Spinner>
      <Details isProfile isFollow={isFollow} loadingIsFollowing={loadingIsFollowing} />
    </Fragment>
  );
};

export default memo(Profile);
