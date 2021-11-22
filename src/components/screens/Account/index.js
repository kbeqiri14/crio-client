import { Fragment, memo, useEffect, useCallback, useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { getCreatorUsers, me } from '@app/graphql/queries/users.query';
import { Spinner } from '@ui-kit/Spinner';
import PersonalInfo from './__partials__/PersonalInfo';
import EditProfile from './__partials__/EditProfile';
import Details from './Details';

export const MyAccount = () => {
  const [visible, setVisible] = useState(false);
  const { user, dispatchUser } = useLoggedInUser();

  const editProfile = useCallback(() => setVisible(true), []);
  const closeModal = useCallback(() => setVisible(false), []);
  const { loading } = useQuery(me, {
    onCompleted: (data) => dispatchUser(data?.me),
    onError: (data) => console.log(data, 'error'),
  });
  const [getCreators, { data: creators, loading: loadingCreators }] = useLazyQuery(getCreatorUsers);
  // const [getUserFollowings, { data: followings, loading: loadingFollowings }] = useLazyQuery(getFollowings, { fetchPolicy: 'no-cache' });

  useEffect(() => {
    if (!loading && user && !user.isCreator) {
      // getUserFollowings();
      getCreators();
    }
  }, [loading, user, getCreators]);

  return (
    <Fragment>
      <Spinner spinning={loading} color='white'>
        <PersonalInfo user={user} onClick={editProfile} isCreator={user.isCreator} />
      </Spinner>
      {visible && <EditProfile user={user} visible={visible} closeModal={closeModal} />}
      <Details
        isCreator={user.isCreator}
        followings={creators?.getCreatorUsers}
        loadingFollowings={loadingCreators}
      />
    </Fragment>
  );
};

export default memo(MyAccount);
