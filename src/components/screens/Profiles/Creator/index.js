import { Fragment, memo } from 'react';

import PersonalInfo from '../shared/PersonalInfo';
import WorksAndPerks from './WorksAndPerks';
import '../styles.less';

export const CreatorProfile = () => {
  return <Fragment>
    <PersonalInfo />
    <WorksAndPerks />
  </Fragment>;
};

export default memo(CreatorProfile);
