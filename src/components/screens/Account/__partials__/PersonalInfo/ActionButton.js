import { Fragment, memo, useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { getUser } from '@app/graphql/queries/users.query';
import { createFollowing } from '@app/graphql/mutations/user.mutation';

import { SecondaryButton } from '@ui-kit/Button';
import { ReactComponent as PencilIcon } from '@svgs/pencil.svg';
import { ReactComponent as UnFollowIcon } from '@svgs/unfollow.svg';
import { ReactComponent as FollowIcon } from '@svgs/follow.svg';

import EditProfile from '@screens/Account/__partials__/EditProfile';

const ActionButton = ({ isProfile, isFollow, setIsFollow }) => {
  const { pathname } = useLocation();
  const { user } = useLoggedInUser();
  const [visible, setVisible] = useState(false);

  const id = useMemo(() => pathname.split('/').slice(-1)[0], [pathname]);

  const buttonLabel = useMemo(
    () => (isProfile ? `${isFollow ? 'UN' : ''}FOLLOW` : 'EDIT PROFILE'),
    [isProfile, isFollow],
  );
  const buttonIcon = useMemo(() => {
    if (isProfile) {
      return isFollow ? <UnFollowIcon /> : <FollowIcon />;
    }
    return <PencilIcon />;
  }, [isProfile, isFollow]);

  const editProfile = useCallback(() => setVisible(true), []);
  const closeModal = useCallback(() => setVisible(false), []);

  const [follow, { loading }] = useMutation(createFollowing, {
    variables: { followingId: id },
    update: (cache, mutationResult) => {
      if (mutationResult.data.createFollowing) {
        const existingData = cache.readQuery({ query: getUser, variables: { id } });
        cache.writeQuery({
          query: getUser,
          variables: { id },
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

  const handleClick = useCallback(() => follow({ variables: { followingId: id } }), [follow, id]);

  return (
    <Fragment>
      <SecondaryButton
        size='large'
        textColor={isProfile ? undefined : 'white'}
        borderColor={isProfile ? undefined : 'white'}
        icon={buttonIcon}
        loading={loading}
        onClick={isProfile ? handleClick : editProfile}
      >
        {buttonLabel}
      </SecondaryButton>
      {visible && <EditProfile user={user} visible={visible} closeModal={closeModal} />}
    </Fragment>
  );
};

export default memo(ActionButton);
