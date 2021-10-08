import { memo, useEffect } from 'react';
import { Spin } from 'antd';
import { useMutation } from '@apollo/client';

import { useCurrentUser } from '@app/auth/hooks';
import { useQueryParams } from '@app/hooks/useRouter';
import { signIn } from '@app/graphql/mutations/user.mutation';
import Layout from '@shared/Layout';

export const CognitoCallback = () => {
  const { access_token } = useQueryParams();
  const { user, loading } = useCurrentUser();
  const [createUser] = useMutation(signIn);

  useEffect(() => {
    if (access_token && user) {
      try {
        const attr = user.attributes || {};
        createUser({
          variables: {
            attributes: {
              userId: attr.sub,
              email: attr.email,
              username: attr.sub,
              firstName: attr.family_name,
              lastName: attr.given_name,
            }
          },
        });
      } catch (e) {
        console.log('error creating user ', e);
      }
    }
  }, [access_token, user, createUser]);

  return <Layout>
    <Spin spinning={loading} />
  </Layout>;
};

export default memo(CognitoCallback);
