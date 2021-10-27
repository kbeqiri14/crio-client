import { DEFAULT_PRIVATE_ROUTE } from '@configs/constants';
import { memo, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import history from '@app/configs/history';
import { useCurrentUser } from '@app/auth/hooks';
import { useQueryParams } from '@app/hooks/useRouter';
import { signIn } from '@app/graphql/mutations/user.mutation';
import { GlobalSpinner } from '@ui-kit/GlobalSpinner';

export const CognitoCallback = () => {
  const { access_token } = useQueryParams();
  const { user } = useCurrentUser();

  const [createUser] = useMutation(signIn);

  useEffect(() => {
    if (!access_token) {
      history.push('/');
    }
    if (user) {
      try {
        createUser().then();
      } catch (e) {
        console.log('error creating user ', e);
      } finally {
        history.push(DEFAULT_PRIVATE_ROUTE);
      }
    }
  }, [access_token, user, createUser]);

  return <GlobalSpinner />;
};

export default memo(CognitoCallback);
