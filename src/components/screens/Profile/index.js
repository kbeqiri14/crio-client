import { Fragment, memo, useCallback, useMemo, useState } from 'react';
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
  const id = useMemo(() => pathname.split('/').slice(-1)[0], [pathname]);

  const { data: users, loading: loadingUser } = useQuery(getUser, { variables: { id } });
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

  const handleClick = useCallback(() => follow({ variables: { followingId: id } }), [follow, id]);

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
      <Details isProfile id={id} isFollow={isFollow} loadingIsFollowing={loadingIsFollowing} />
    </Fragment>
  );
};

export default memo(Profile);
