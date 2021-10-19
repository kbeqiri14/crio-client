import { Fragment, memo, useMemo, useState } from 'react';

import { useCurrentUser } from '@app/auth/hooks';
import PersonalInfo from '../__partials__/PersonalInfo';
import EditProfile from '../__partials__/EditProfile';
import WorksAndPerks from './WorksAndPerks';
import { useQuery } from '@apollo/client';
import { me } from '@app/graphql/queries/users.query';
import '../styles.less';

export const CreatorProfile = () => {
  const [visible, setVisible] = useState(false);
  const { user } = useCurrentUser();
  const { data } = useQuery(me);

  const userInfo = useMemo(() => ({ ...user?.attributes, ...data?.me }), [data?.me, user?.attributes]);

  return (
    <Fragment>
      <PersonalInfo user={userInfo} editProfile={() => setVisible(true)} />
      <WorksAndPerks />
      <EditProfile user={userInfo} visible={visible} closeModal={() => setVisible(false)} />
    </Fragment>
  );
};

export default memo(CreatorProfile);
