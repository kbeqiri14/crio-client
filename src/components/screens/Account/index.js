import { Fragment, memo, useCallback, useState } from 'react';
import { Space, Switch } from 'antd';
import { useQuery } from '@apollo/client';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { me } from '@app/graphql/queries/users.query';
import { Title } from '@ui-kit/Text';
import PersonalInfo from './__partials__/PersonalInfo';
import EditProfile from './__partials__/EditProfile';
import Details from './Details';

export const MyAccount = () => {
  const [visible, setVisible] = useState(false);
  const [isCreator, setIsCreator] = useState(true);
  const { user, dispatchUser } = useLoggedInUser();

  const editProfile = useCallback(() => setVisible(true), []);
  const closeModal = useCallback(() => setVisible(false), []);
  useQuery(me, {
    onCompleted: (data) => dispatchUser(data?.me),
    onError: (data) => console.log(data, 'error'),
  });

  return (
    <Fragment>
      <Space style={{ padding: '10px 40px' }}>
        <Title inline level='10' color='white'>Creator view</Title>
        <Switch checked={isCreator} onChange={() => setIsCreator(!isCreator)} />
      </Space>
      <PersonalInfo user={user} editProfile={editProfile} />
      {visible && <EditProfile user={user} visible={visible} closeModal={closeModal} />}
      <Details isCreator={isCreator} />
    </Fragment>
  );
};

export default memo(MyAccount);
