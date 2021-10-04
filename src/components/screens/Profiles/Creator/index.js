import { memo } from 'react';

import Layout from '../../../shared/Layout';
import PersonalInfo from '../shared/PersonalInfo';
import Menu from './Menu';

export const CreatorProfile = () => {
  return <Layout>
    <PersonalInfo />
    <Menu />
  </Layout>;
};

export default memo(CreatorProfile);
