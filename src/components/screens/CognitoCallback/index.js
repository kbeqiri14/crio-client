import { memo, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { useCurrentUser } from '@app/auth/hooks';
import { useQueryParams } from '@app/hooks/useRouter';
import { signIn } from '@app/graphql/mutations/user.mutation';
import Layout from '@shared/Layout';

export const CognitoCallback = () => {
  const { access_token } = useQueryParams();
  const { user } = useCurrentUser();
  const [createUser] = useMutation(signIn);

  useEffect(() => {
    if (access_token && user) {
      try {
        createUser({
          variables: {
            attributes: {
              userId: user.attributes.sub,
              email: user.attributes.email,
              username: user.attributes.family_name,
              firstName: user.attributes.family_name,
              lastName: user.attributes.given_name,
            }
          },
        });
      } catch (e) {
        console.log('error creating user ', e);
      }
    }
  }, [access_token, user, createUser]);

  return <Layout>
    CognitoCallback
  </Layout>;
};

export default memo(CognitoCallback);
