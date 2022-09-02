import { memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { getUser, me } from '@app/graphql/queries/users.query';
import { createFollowing } from '@app/graphql/mutations/user.mutation';
import { useReactiveVar } from '@apollo/client';

import history from '@configs/history';
import { loggedInUserLoadingVar } from '@configs/client-cache';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { Button } from '@ui-kit';
import { ReactComponent as UnFollowIcon } from '@svgs/unfollow.svg';
import { ReactComponent as FollowIcon } from '@svgs/follow.svg';
import { ReactComponent as LockIcon } from '@svgs/lock.svg';

const ActionButton = ({ userId, isProfile, isSubscribed, isFollow }) => {
  const { user } = useLoggedInUser();
  const { pathname } = useLocation();
  const loggedInUserLoading = useReactiveVar(loggedInUserLoadingVar);
  const username = useMemo(() => pathname.split('/').slice(-1)[0], [pathname]);

  const [follow, { loading }] = useMutation(createFollowing, {
    variables: { followingUsername: username },
    update: (cache, mutationResult) => {
      if (mutationResult.data.createFollowing) {
        const existingUser = cache.readQuery({ query: getUser, variables: { username } });
        const existingLoggedInUser = cache.readQuery({ query: me });
        const count = isFollow ? -1 : 1;
        cache.writeQuery({
          query: getUser,
          variables: { username },
          data: {
            getUser: {
              ...existingUser?.getUser,
              followersCount: existingUser?.getUser?.followersCount + count,
              followingsCount: existingUser?.getUser?.followingsCount + count,
              isFollowing: !isFollow,
            },
          },
        });
        cache.writeQuery({
          query: me,
          data: {
            me: {
              ...existingLoggedInUser?.me,
              followersCount: existingLoggedInUser?.me?.followersCount + count,
              followingsCount: existingLoggedInUser?.me?.followingsCount + count,
              followings: isFollow
                ? existingLoggedInUser?.me?.followings?.filter((item) => item !== userId)
                : [...existingLoggedInUser?.me?.followings, `${userId}`],
            },
          },
        });
      }
    },
  });

  const [label, icon, type, onClick] = useMemo(() => {
    let label = 'FOLLOW';
    let type = 'primary';
    let icon = <LockIcon />;
    let onClick = () => history.push('/pricing');
    if (!loggedInUserLoading && !user.id) {
      label = 'SUBSCRIBE TO SUPPORT';
      icon = <FollowIcon />;
    }
    if (isProfile && isSubscribed) {
      if (isFollow) {
        label = 'UNFOLLOW';
        type = 'link';
        icon = <UnFollowIcon />;
      } else {
        icon = <FollowIcon />;
      }
      onClick = follow;
    }
    return [label, icon, type, onClick];
  }, [loggedInUserLoading, user.id, isProfile, isSubscribed, isFollow, follow]);

  return (
    <Button block icon={icon} loading={loading} onClick={onClick} type={type}>
      {label}
    </Button>
  );
};

export default memo(ActionButton);
