import { Fragment, memo, useMemo, useState } from 'react';
import { Space, Switch } from 'antd';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { useCurrentUser } from '@app/auth/hooks';
import { Title } from '@ui-kit/Text';
import PersonalInfo from './__partials__/PersonalInfo';
import EditProfile from './__partials__/EditProfile';
import Details from './Details';

export const MyAccount = () => {
  const [visible, setVisible] = useState(false);
  const [isCreator, setIsCreator] = useState(true);
  const { user } = useCurrentUser();
  const { user: loggedInUser } = useLoggedInUser();

  const userInfo = useMemo(
    () => ({ ...user?.attributes, ...loggedInUser }),
    [user?.attributes, loggedInUser],
  );
  return (
    <Fragment>
      <Space style={{ padding: '10px 40px' }}>
        <Title inline level='10' color='white'>Creator view</Title>
        <Switch checked={isCreator} onChange={() => setIsCreator(!isCreator)} />
      </Space>
      <PersonalInfo user={userInfo} editProfile={() => setVisible(true)} />
      <EditProfile user={userInfo} visible={visible} closeModal={() => setVisible(false)} />
      <Details isCreator={isCreator} />
    </Fragment>
  );
};

export default memo(MyAccount);
