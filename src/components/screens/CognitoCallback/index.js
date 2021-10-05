import { memo } from 'react';

import { useQueryParams } from '@app/hooks/useRouter';
import Layout from '@shared/Layout';

export const CognitoCallback = () => {
  let { access_token } = useQueryParams();
  console.log(access_token);

  return <Layout>
    CognitoCallback
  </Layout>;
};

export default memo(CognitoCallback);
