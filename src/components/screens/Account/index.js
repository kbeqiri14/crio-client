import { GlobalSpinner } from '@ui-kit/GlobalSpinner';
import { Fragment, memo, useEffect, useCallback, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { getFollowings, getFollowersCount } from '@app/graphql/queries/users.query';
import PersonalInfo from './__partials__/PersonalInfo';
import EditProfile from './__partials__/EditProfile';
import Details from './Details';

export const MyAccount = () => {
  const [visible, setVisible] = useState(false);
  const { user } = useLoggedInUser();

  const editProfile = useCallback(() => setVisible(true), []);
  const closeModal = useCallback(() => setVisible(false), []);

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
        onClick={editProfile}
        isCreator={user.isCreator}
      />
      {visible && <EditProfile user={user} visible={visible} closeModal={closeModal} />}
      <Details
        isCreator={user.isCreator}
        followings={followings?.getFollowings}
        loadingFollowings={loadingFollowings}
      />
    </Fragment>
  );
};

export default memo(MyAccount);
