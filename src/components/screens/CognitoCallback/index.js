import { memo, useEffect } from 'react';
import { Spin } from 'antd';
import { useMutation } from '@apollo/client';

import history from '@app/configs/history';
import { useCurrentUser } from '@app/auth/hooks';
import { useQueryParams } from '@app/hooks/useRouter';
import { signIn } from '@app/graphql/mutations/user.mutation';

export const CognitoCallback = () => {
  const { access_token } = useQueryParams();
  const { user, loading } = useCurrentUser();
  const [createUser] = useMutation(signIn);

  useEffect(() => {
    if (access_token && user) {
      try {
        createUser();
        history.push('/');
      } catch (e) {
        console.log('error creating user ', e);
      }
    }
  }, [access_token, user, createUser]);

  return <Spin spinning={loading} />;
};

export default memo(CognitoCallback);
