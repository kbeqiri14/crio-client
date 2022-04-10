import { Fragment, memo, useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { getUser } from '@app/graphql/queries/users.query';
import { createFollowing } from '@app/graphql/mutations/user.mutation';

import history from '@app/configs/history';
import { SecondaryButton } from '@ui-kit/Button';
import { ReactComponent as PencilIcon } from '@svgs/pencil.svg';
import { ReactComponent as UnFollowIcon } from '@svgs/unfollow.svg';
import { ReactComponent as FollowIcon } from '@svgs/follow.svg';
import { ReactComponent as LockIcon } from '@svgs/lock.svg';

import EditProfile from '@screens/Account/__partials__/EditProfile';

const ActionButton = ({ isProfile, isSubscribed, isFollow, setIsFollow }) => {
  const { pathname } = useLocation();
  const { user } = useLoggedInUser();
  const [visible, setVisible] = useState(false);

  const username = useMemo(() => pathname.split('/').slice(-1)[0], [pathname]);

  const buttonLabel = useMemo(
    () => (isProfile ? `${isFollow ? 'UN' : ''}FOLLOW` : 'EDIT PROFILE'),
    [isProfile, isFollow],
  );
  const buttonIcon = useMemo(() => {
    if (isProfile) {
      if (isSubscribed) {
        return <FollowIcon />;
      }
      if (isFollow) {
        return <UnFollowIcon />;
      }
      return <LockIcon />;
    }
    return <PencilIcon />;
  }, [isProfile, isSubscribed, isFollow]);

  const editProfile = useCallback(() => setVisible(true), []);
  const closeModal = useCallback(() => setVisible(false), []);

  const [follow, { loading }] = useMutation(createFollowing, {
    variables: { followingUsername: username },
    update: (cache, mutationResult) => {
      if (mutationResult.data.createFollowing) {
        const existingData = cache.readQuery({ query: getUser, variables: { username } });
        cache.writeQuery({
          query: getUser,
          variables: { username },
          data: {
            getUser: {
              ...existingData?.getUser,
              followersCount: existingData?.getUser?.followersCount + (isFollow ? -1 : 1),
            },
          },
        });
      }
    },
    onCompleted: (data) => {
      if (data?.createFollowing) {
        setIsFollow(!isFollow);
      }
    },
  });

  const onClick = useCallback(() => {
    if (isProfile) {
      if (isSubscribed) {
        follow();
      } else {
        history.push('/pricing');
      }
      return;
    }
    editProfile();
  }, [isProfile, isSubscribed, editProfile, follow]);

  return (
    <Fragment>
      <SecondaryButton
        size='large'
        textColor={isProfile ? undefined : 'white'}
        borderColor={isProfile ? undefined : 'white'}
        icon={buttonIcon}
        loading={loading}
        onClick={onClick}
      >
        {buttonLabel}
      </SecondaryButton>
      {visible && <EditProfile user={user} visible={visible} closeModal={closeModal} />}
    </Fragment>
  );
};

export default memo(ActionButton);
