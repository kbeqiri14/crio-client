import { Fragment, memo, useEffect, useCallback, useState } from 'react';
import { Space, Switch } from 'antd';
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { getCreatorUsers, me } from '@app/graphql/queries/users.query';
import { updateArtworks } from '@app/graphql/mutations/artwork.mutation';
import { Title } from '@ui-kit/Text';
import { SecondaryButton } from '@ui-kit/Button';
import { Spinner } from '@ui-kit/Spinner';
import PersonalInfo from './__partials__/PersonalInfo';
import EditProfile from './__partials__/EditProfile';
import Details from './Details';

export const MyAccount = () => {
  const [visible, setVisible] = useState(false);
  const [isCreator, setIsCreator] = useState(true);
  const { user, dispatchUser } = useLoggedInUser();

  const editProfile = useCallback(() => setVisible(true), []);
  const closeModal = useCallback(() => setVisible(false), []);
  const { loading } = useQuery(me, {
    onCompleted: (data) => dispatchUser(data?.me),
    onError: (data) => console.log(data, 'error'),
  });
  const [getCreators, { data: creators, loading: loadingCreators }] = useLazyQuery(getCreatorUsers);
  // const [getUserFollowings, { data: followings, loading: loadingFollowings }] = useLazyQuery(getFollowings, { fetchPolicy: 'no-cache' });
  const [requestUpdateArtworks, { loading: updatingArtworks }] = useMutation(updateArtworks, {
    onCompleted: () => window.location.assign(window.location.href),
  });

  useEffect(() => {
    if (!isCreator) {
      // getUserFollowings();
      getCreators();
    }
  }, [isCreator, getCreators]);

  return (
    <Fragment>
      <Space style={{ padding: '10px 40px' }}>
        <Title inline level='10' color='white'>
          Creator view
        </Title>
        <Switch checked={isCreator} onChange={() => setIsCreator(!isCreator)} />
        <SecondaryButton loading={updatingArtworks} onClick={requestUpdateArtworks}>
          Update artworks
        </SecondaryButton>
      </Space>
      <Spinner spinning={loading} color='white'>
        <PersonalInfo user={user} onClick={editProfile} isCreator={isCreator} />
      </Spinner>
      {visible && <EditProfile user={user} visible={visible} closeModal={closeModal} />}
      <Details
        isCreator={isCreator}
        followings={creators?.getCreatorUsers}
        loadingFollowings={loadingCreators}
      />
    </Fragment>
  );
};

export default memo(MyAccount);
