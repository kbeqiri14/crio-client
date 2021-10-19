import { Fragment, memo, useMemo, useState } from 'react';

import { useLoggedInUser } from '@app/hooks/useLoggedInUser';
import { useCurrentUser } from '@app/auth/hooks';
import PersonalInfo from '../__partials__/PersonalInfo';
import EditProfile from '../__partials__/EditProfile';
import WorksAndPerks from './WorksAndPerks';
import '../styles.less';

export const CreatorProfile = () => {
  const [visible, setVisible] = useState(false);
  const { user } = useCurrentUser();
  const { user: loggedInUser } = useLoggedInUser();

  const userInfo = useMemo(() => ({ ...user?.attributes, ...loggedInUser }), [user?.attributes, loggedInUser]);

  return (
    <Fragment>
      <PersonalInfo user={userInfo} editProfile={() => setVisible(true)} />
      <WorksAndPerks />
      <EditProfile user={userInfo} visible={visible} closeModal={() => setVisible(false)} />
    </Fragment>
  );
};

export default memo(CreatorProfile);
