import { Fragment, memo, useState } from 'react';

import { useCurrentUser } from '@app/auth/hooks';
import PersonalInfo from '../shared/PersonalInfo';
import EditProfile from '../shared/EditProfile';
import WorksAndPerks from './WorksAndPerks';
import '../styles.less';

export const CreatorProfile = () => {
  const [visible, setVisible] = useState(false);
  const { user } = useCurrentUser();

  return (
    <Fragment>
      <PersonalInfo user={user} editProfile={() => setVisible(true)} />
      <WorksAndPerks />
      <EditProfile user={user} visible={visible} closeModal={() => setVisible(false)} />
    </Fragment>
  );
};

export default memo(CreatorProfile);
