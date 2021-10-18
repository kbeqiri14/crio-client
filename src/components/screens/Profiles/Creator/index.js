import { Fragment, memo, useState } from 'react';

import { useCurrentUser } from '@app/auth/hooks';
import PersonalInfo from '../__partials__/PersonalInfo';
import EditProfile from '../__partials__/EditProfile';
import WorksAndPerks from './WorksAndPerks';
import '../styles.less';

export const CreatorProfile = () => {
  const [visible, setVisible] = useState(false);
  const { user } = useCurrentUser();

  return (
    <Fragment>
      <PersonalInfo user={user?.attributes} editProfile={() => setVisible(true)} />
      <WorksAndPerks />
      <EditProfile user={user?.attributes} visible={visible} closeModal={() => setVisible(false)} />
    </Fragment>
  );
};

export default memo(CreatorProfile);
