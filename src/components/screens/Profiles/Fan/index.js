import { memo } from 'react';
import Layout from '../../../shared/Layout';
import PersonalInfo from '../shared/PersonalInfo';

export const FanProfile = () => {
  return <Layout>
    <PersonalInfo />
  </Layout>;
};

export default memo(FanProfile);
