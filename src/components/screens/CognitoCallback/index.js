import { memo } from 'react';
import Layout from '../../shared/Layout';
import { useQueryParams } from '../../../auth/hooks';

export const CognitoCallback = () => {
  const { access_token } = useQueryParams();
  console.log(access_token);

  return <Layout>
    CognitoCallback
  </Layout>;
};

export default memo(CognitoCallback);
