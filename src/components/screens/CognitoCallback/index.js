import { DEFAULT_PRIVATE_ROUTE } from '@configs/constants';
import { memo, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { signupErrorVar } from '@configs/client-cache';
import history from '@configs/history';
import { useCurrentUser } from '@app/auth/hooks';
import { useQueryParams } from '@app/hooks/useRouter';
import { signIn } from '@app/graphql/mutations/user.mutation';
import { GlobalSpinner } from '@ui-kit/GlobalSpinner';
import { errorToast } from '@ui-kit/Notification';

export const CognitoCallback = () => {
  const { access_token } = useQueryParams();
  const { user } = useCurrentUser();

  const [createUser] = useMutation(signIn, {
    onCompleted: (data) => {
      if (data.saveUser.error) {
        localStorage.clear();
        errorToast('Sign up error', data.saveUser.error);
      } else {
        signupErrorVar(false);
      }
    },
    onError: () => {
      localStorage.clear();
      errorToast('Something went wrong!', 'Please, try again later!');
    },
  });

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
