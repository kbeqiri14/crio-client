import { memo } from 'react';

import PersonalInfo from '../shared/PersonalInfo';
import Menu from './Menu';
import '../styles.less';

export const CreatorProfile = () => {
  return <>
    <PersonalInfo />
    <Menu />
  </>;
};

export default memo(CreatorProfile);
