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
  const [action, setAction] = useState('FOLLOW');

  const { data: users, loading: loadingUser } = useQuery(getUser, {
    variables: { id: pathname.split('/')[2] },
  });
  const { data: following, loading: loadingIsFollowing } = useQuery(isFollowing, {
    variables: { followingId: pathname.split('/')[2] },
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      if (data?.isFollowing) {
        setAction('UNFOLLOW');
      }
    },
  });
  const [follow, { loading: loadingFollowing }] = useMutation(createFollowing, {
    variables: { followingId: pathname.split('/')[2] },
    onCompleted: data => {
      if (data?.createFollowing) {
        setAction('UNFOLLOW');
      }
    },
  });
  const hasFollowings = useMemo(() => following?.isFollowing, [following?.isFollowing]);
  const handleClick = useCallback(() => follow({ variables: { followingId: pathname.split('/')[2] } }), [follow, pathname])
console.log('action---',action)
  return (
    <Fragment>
      <Spinner spinning={loadingUser || loadingIsFollowing} color='white'>
        <PersonalInfo
          isProfile
          user={{
            ...users?.getUser,
            picture: users?.getUser?.firstName ? require(`../../../assets/images/mock-creators/${users?.getUser?.firstName}.png`).default : undefined,
          }}
          action={action}
          loading={loadingFollowing}
          onClick={handleClick}
        />
      </Spinner>
      <Details
        isProfile
        loadingIsFollowing={loadingIsFollowing}
        hasFollowings={hasFollowings}
        action={action} />
    </Fragment>
  );
};

export default memo(Profile);
